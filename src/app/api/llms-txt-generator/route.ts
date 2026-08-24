import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const maxDuration = 30; // Vercel / serverless timeout allowance

// ---------------------------------------------------------------------------
// Type Definitions
// ---------------------------------------------------------------------------
export interface AuditCheck {
  name: string;
  passed: boolean;
  score: number;
  maxScore: number;
  impact: "high" | "medium" | "low";
  note: string;
}

export interface ExistingAuditResult {
  found: boolean;
  score: number;
  band: "missing" | "critical" | "needs-work" | "good" | "excellent";
  content: string | null;
  checks: AuditCheck[];
  issues: string[];
  recommendations: string[];
}

export interface ClassifiedUrl {
  url: string;
  title: string;
  category: "core" | "product" | "solution" | "resource" | "company" | "optional";
  description: string;
}

export interface LlmsGeneratorResponse {
  success: boolean;
  domain: string;
  siteName: string;
  tagline: string;
  analyzed: {
    homepage: boolean;
    aboutPage: boolean;
    sitemap: boolean;
    sitemapUrlCount: number;
  };
  existingAudit: ExistingAuditResult;
  generatedLlmsTxt: string;
  generatedLlmsFullTxt: string;
  stats: {
    wordCount: number;
    tokenEstimate: number;
    linkCount: number;
    sectionsCount: number;
  };
  error?: string;
}

// ---------------------------------------------------------------------------
// Network & Scraper Helpers
// ---------------------------------------------------------------------------
function cleanDomain(input: string): string {
  let s = input.trim().toLowerCase();
  s = s.replace(/^https?:\/\//i, "");
  s = s.replace(/\/+$/, "");
  s = s.split("/")[0]; // keep only host
  s = s.split("?")[0];
  return s;
}

async function safeFetch(url: string, timeoutMs = 8000): Promise<{ text: string | null; status: number }> {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; AIBizMod-LLMsBot/2.0; +https://aibizmod.com/tools/llms-txt-generator)",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,text/plain;q=0.8,*/*;q=0.8",
      },
    });
    clearTimeout(timer);
    if (!res.ok) return { text: null, status: res.status };
    const text = await res.text();
    return { text, status: res.status };
  } catch {
    return { text: null, status: 0 };
  }
}

function stripHtmlTags(html: string): string {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<svg[^>]*>[\s\S]*?<\/svg>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractMetadata(html: string, fallbackDomain: string) {
  // Title
  let title = "";
  const ogTitle = html.match(/<meta\s+property=["']og:title["']\s+content=["'](.*?)["']/i)?.[1]
    || html.match(/<meta\s+content=["'](.*?)["']\s+property=["']og:title["']/i)?.[1];
  const titleTag = html.match(/<title[^>]*>(.*?)<\/title>/i)?.[1];
  title = ogTitle || titleTag || fallbackDomain;
  title = stripHtmlTags(title).split(/[|\-–—]/)[0].trim();
  if (!title || title.length < 2) title = fallbackDomain;

  // Site name
  const siteNameMeta = html.match(/<meta\s+property=["']og:site_name["']\s+content=["'](.*?)["']/i)?.[1]
    || html.match(/<meta\s+content=["'](.*?)["']\s+property=["']og:site_name["']/i)?.[1];
  const siteName = siteNameMeta ? stripHtmlTags(siteNameMeta).trim() : title;

  // Description
  const metaDesc = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i)?.[1]
    || html.match(/<meta\s+content=["'](.*?)["']\s+name=["']description["']/i)?.[1]
    || html.match(/<meta\s+property=["']og:description["']\s+content=["'](.*?)["']/i)?.[1]
    || html.match(/<meta\s+content=["'](.*?)["']\s+property=["']og:description["']/i)?.[1];
  const description = metaDesc ? stripHtmlTags(metaDesc).trim() : "";

  // H1
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h1 = h1Match ? stripHtmlTags(h1Match[1]) : "";

  // H2s
  const h2s: string[] = [];
  const h2Re = /<h2[^>]*>([\s\S]*?)<\/h2>/gi;
  let m: RegExpExecArray | null;
  while ((m = h2Re.exec(html)) !== null && h2s.length < 8) {
    const text = stripHtmlTags(m[1]);
    if (text.length > 3 && text.length < 90 && !h2s.includes(text)) {
      h2s.push(text);
    }
  }

  // JSON-LD
  let jsonLdDesc = "";
  const jsonLdRe = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let jsonMatch: RegExpExecArray | null;
  while ((jsonMatch = jsonLdRe.exec(html)) !== null) {
    try {
      const parsed = JSON.parse(jsonMatch[1]);
      const checkNode = (node: Record<string, unknown>) => {
        if (node && typeof node === "object") {
          if (node.description && typeof node.description === "string" && !jsonLdDesc) {
            jsonLdDesc = node.description;
          }
        }
      };
      if (Array.isArray(parsed)) parsed.forEach(checkNode);
      else if (parsed["@graph"] && Array.isArray(parsed["@graph"])) parsed["@graph"].forEach(checkNode);
      else checkNode(parsed);
    } catch {
      // ignore JSON parse error
    }
  }

  // Main body text preview
  const bodyText = stripHtmlTags(html).slice(0, 3000);

  return {
    title,
    siteName,
    description: description || jsonLdDesc || h1,
    h1,
    h2s,
    bodyText,
  };
}

// ---------------------------------------------------------------------------
// Sitemap Parser
// ---------------------------------------------------------------------------
function parseSitemapUrls(xmlText: string, baseUrl: string): string[] {
  const urls: string[] = [];
  const locRe = /<loc>\s*(https?:\/\/[^\s<]+)\s*<\/loc>/gi;
  let m: RegExpExecArray | null;
  const baseHost = new URL(baseUrl).hostname.replace(/^www\./, "");

  while ((m = locRe.exec(xmlText)) !== null) {
    const u = m[1].trim();
    try {
      const parsedUrl = new URL(u);
      const urlHost = parsedUrl.hostname.replace(/^www\./, "");
      if (urlHost === baseHost || urlHost.endsWith(`.${baseHost}`)) {
        // filter out unwanted extensions & query params
        if (!u.match(/\.(jpg|jpeg|png|webp|gif|svg|pdf|zip|xml|css|js)($|\?)/i)) {
          if (!urls.includes(u)) urls.push(u);
        }
      }
    } catch {
      // ignore invalid URLs
    }
  }

  return urls;
}

function extractLinksFromHtml(html: string, baseUrl: string): string[] {
  const urls: string[] = [];
  const hrefRe = /href=["']([^"']+)["']/gi;
  let m: RegExpExecArray | null;
  const baseHost = new URL(baseUrl).hostname.replace(/^www\./, "");

  while ((m = hrefRe.exec(html)) !== null) {
    const raw = m[1].trim();
    if (!raw || raw.startsWith("#") || raw.startsWith("javascript:") || raw.startsWith("mailto:") || raw.startsWith("tel:")) {
      continue;
    }
    try {
      const resolved = new URL(raw, baseUrl).href;
      const parsed = new URL(resolved);
      const host = parsed.hostname.replace(/^www\./, "");
      if (host === baseHost) {
        const clean = `${parsed.origin}${parsed.pathname}`.replace(/\/+$/, "");
        if (!clean.match(/\.(jpg|jpeg|png|webp|gif|svg|pdf|zip|xml|css|js)$/i)) {
          if (!urls.includes(clean)) urls.push(clean);
        }
      }
    } catch {
      // ignore
    }
  }
  return urls;
}

function urlToHumanTitle(urlStr: string, siteName: string): string {
  try {
    const parsed = new URL(urlStr);
    const pathname = parsed.pathname.replace(/\/+$/, "");
    if (!pathname || pathname === "") return "Homepage";
    const segments = pathname.split("/").filter(Boolean);
    const last = segments[segments.length - 1] || "";
    
    // Custom mappings
    const lo = last.toLowerCase();
    if (lo === "about" || lo === "about-us") return "About Us";
    if (lo === "contact" || lo === "contact-us") return "Contact";
    if (lo === "pricing" || lo === "plans") return "Pricing & Plans";
    if (lo === "features") return "Features";
    if (lo === "demo" || lo === "request-demo") return "Request a Demo";
    if (lo === "blog" || lo === "posts" || lo === "articles") return "Blog & Insights";
    if (lo === "docs" || lo === "documentation") return "Documentation";
    if (lo === "faq" || lo === "faqs") return "Frequently Asked Questions";
    if (lo === "careers" || lo === "jobs") return "Careers & Opportunities";
    if (lo === "team" || lo === "leadership") return `The ${siteName} Team`;
    if (lo === "privacy" || lo === "privacy-policy") return "Privacy Policy";
    if (lo === "terms" || lo === "terms-of-service" || lo === "terms-and-conditions") return "Terms of Service";
    if (lo === "security") return "Security & Compliance";

    // Format kebab/snake case
    return last
      .split(/[-_]+/)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");
  } catch {
    return "Page";
  }
}

function classifyUrl(urlStr: string, siteName: string): ClassifiedUrl {
  const title = urlToHumanTitle(urlStr, siteName);
  const lo = urlStr.toLowerCase();

  let category: ClassifiedUrl["category"] = "core";
  let description = `Explore the ${title} page on ${siteName}.`;

  if (lo.includes("privacy") || lo.includes("terms") || lo.includes("cookie") || lo.includes("legal") || lo.includes("disclaimer") || lo.includes("compliance")) {
    category = "optional";
    description = `Legal guidelines, policies, and terms for using ${siteName}.`;
  } else if (lo.includes("/service") || lo.includes("/product") || lo.includes("/feature") || lo.includes("/module") || lo.includes("/platform")) {
    category = "product";
    description = `Key capabilities, features, and platform modules offered by ${siteName}.`;
  } else if (lo.includes("/solution") || lo.includes("/use-case") || lo.includes("/industry") || lo.includes("/for-")) {
    category = "solution";
    description = `Tailored solutions and industry use cases powered by ${siteName}.`;
  } else if (lo.includes("/blog") || lo.includes("/doc") || lo.includes("/resource") || lo.includes("/guide") || lo.includes("/help") || lo.includes("/faq") || lo.includes("/case-stud") || lo.includes("/whitepaper")) {
    category = "resource";
    description = `Guides, articles, technical documentation, and educational resources.`;
  } else if (lo.includes("/about") || lo.includes("/team") || lo.includes("/career") || lo.includes("/contact") || lo.includes("/press") || lo.includes("/partner")) {
    category = "company";
    description = `Company history, leadership, career opportunities, and direct contact channels.`;
  } else {
    // Root or core top-level pages
    category = "core";
    if (urlStr.endsWith("/") || !urlStr.split("/")[3]) {
      description = `The main entry point to learn about ${siteName} and its offerings.`;
    } else if (lo.includes("demo") || lo.includes("try") || lo.includes("signup") || lo.includes("register")) {
      description = `Get started, sign up, or request a product demo.`;
    } else if (lo.includes("pricing")) {
      description = `Detailed pricing tiers, plans, and subscription options.`;
    }
  }

  return {
    url: urlStr,
    title,
    category,
    description,
  };
}

// ---------------------------------------------------------------------------
// Auditor Engine for Existing /llms.txt
// ---------------------------------------------------------------------------
function auditExistingLlmsTxt(content: string | null): ExistingAuditResult {
  if (!content || !content.trim()) {
    return {
      found: false,
      score: 0,
      band: "missing",
      content: null,
      checks: [
        { name: "Live llms.txt Accessibility", passed: false, score: 0, maxScore: 20, impact: "high", note: "No llms.txt file found at the root URL (/llms.txt)." },
        { name: "H1 Project Title", passed: false, score: 0, maxScore: 15, impact: "high", note: "Missing # Title standard header." },
        { name: "Blockquote Summary", passed: false, score: 0, maxScore: 20, impact: "high", note: "Missing > Blockquote executive summary." },
        { name: "Categorized Sections", passed: false, score: 0, maxScore: 15, impact: "medium", note: "No ## Section headers detected." },
        { name: "Markdown Link Descriptions", passed: false, score: 0, maxScore: 20, impact: "high", note: "No formatted link lists with descriptions found." },
        { name: "Optional Pages Section", passed: false, score: 0, maxScore: 10, impact: "low", note: "No ## Optional section found for legal/ancillary pages." },
      ],
      issues: [
        "Your site is currently missing an llms.txt file at /llms.txt.",
        "AI crawlers (ChatGPT Search, Perplexity, Claude) cannot quickly discover your canonical pages.",
        "No curated brand identity or executive summary is provided for AI citations.",
      ],
      recommendations: [
        "Generate and deploy the optimized llms.txt below to your website's root directory (/llms.txt).",
        "Include an H1 header and blockquote summary defining your primary value proposition.",
        "Categorize all key URLs and provide 1-sentence plain-English descriptions for each link.",
      ],
    };
  }

  const checks: AuditCheck[] = [];
  const issues: string[] = [];
  const recommendations: string[] = [];

  // Check 1: H1 Title
  const hasH1 = /^#\s+[^\n]+/m.test(content);
  checks.push({
    name: "H1 Project Title",
    passed: hasH1,
    score: hasH1 ? 15 : 0,
    maxScore: 15,
    impact: "high",
    note: hasH1 ? "H1 title detected defining the project/brand name." : "Missing standard # Title header at the start of the file.",
  });
  if (!hasH1) {
    issues.push("Missing # Title header (e.g. # Company Name).");
    recommendations.push("Add a top-level # Title header as the first line of your file.");
  }

  // Check 2: Blockquote Summary
  const hasBlockquote = /^>\s+[^\n]+/m.test(content);
  checks.push({
    name: "Blockquote Executive Summary",
    passed: hasBlockquote,
    score: hasBlockquote ? 20 : 0,
    maxScore: 20,
    impact: "high",
    note: hasBlockquote ? "Executive blockquote summary is present (> Summary)." : "Missing > Blockquote 1-2 sentence core definition.",
  });
  if (!hasBlockquote) {
    issues.push("Missing blockquote summary (> 1-2 sentence explanation of what your company does).");
    recommendations.push("Include a blockquote (> Summary) right under the H1 to provide a concise entity definition for LLMs.");
  }

  // Check 3: Section Headers (##)
  const h2Count = (content.match(/^##\s+[^\n]+/gm) || []).length;
  const hasH2 = h2Count >= 1;
  const scoreH2 = h2Count >= 2 ? 15 : hasH2 ? 10 : 0;
  checks.push({
    name: "Structured Section Headers",
    passed: hasH2,
    score: scoreH2,
    maxScore: 15,
    impact: "medium",
    note: hasH2 ? `Found ${h2Count} structured ## section header(s).` : "Missing ## section headers to organize links.",
  });
  if (!hasH2) {
    issues.push("No ## section headers found to group URLs logically.");
    recommendations.push("Organize your links into sections like ## Core Pages, ## Products, and ## Optional.");
  }

  // Check 4: Markdown Links with Descriptions
  const linkMatches = content.match(/- \[[^\]]+\]\((https?:\/\/[^\)]+)\)(:\s*[^\n]+)?/g) || [];
  const linksWithDesc = content.match(/- \[[^\]]+\]\((https?:\/\/[^\)]+)\):\s*[^\n]+/g) || [];
  const hasLinks = linkMatches.length > 0;
  let scoreLinks = 0;
  if (linksWithDesc.length >= 5) scoreLinks = 25;
  else if (linksWithDesc.length > 0) scoreLinks = 18;
  else if (hasLinks) scoreLinks = 10;
  
  checks.push({
    name: "Markdown Links with Context",
    passed: linksWithDesc.length > 0,
    score: scoreLinks,
    maxScore: 25,
    impact: "high",
    note: `Found ${linkMatches.length} link(s), with ${linksWithDesc.length} containing full descriptive context.`,
  });
  if (linkMatches.length === 0) {
    issues.push("No valid markdown links found in `- [Title](URL): Description` format.");
    recommendations.push("List key pages with markdown links and one-sentence explanations.");
  } else if (linksWithDesc.length < linkMatches.length / 2) {
    issues.push("Several links are missing descriptions (e.g. `- [Page](url)` without `: Description`).");
    recommendations.push("Add a colon and a 1-sentence summary after each markdown link so AI bots understand page contents before crawling.");
  }

  // Check 5: Optional Section
  const hasOptional = /^##\s+Optional/im.test(content);
  checks.push({
    name: "Optional Pages Segregation",
    passed: hasOptional,
    score: hasOptional ? 10 : 0,
    maxScore: 10,
    impact: "low",
    note: hasOptional ? "Optional / legal pages are properly quarantined under ## Optional." : "Missing ## Optional section for secondary/legal pages.",
  });
  if (!hasOptional) {
    issues.push("Legal and peripheral links (Terms, Privacy) are not quarantined in a ## Optional section.");
    recommendations.push("Move Terms of Service and Privacy Policy to a ## Optional header to save LLM context tokens.");
  }

  // Check 6: Absolute URLs & Clean Markdown
  const relativeLinks = content.match(/\[[^\]]+\]\((\/[^\)]+)\)/g) || [];
  const hasRelative = relativeLinks.length > 0;
  const scoreClean = hasRelative ? 5 : 15;
  checks.push({
    name: "Absolute URL Compliance",
    passed: !hasRelative,
    score: scoreClean,
    maxScore: 15,
    impact: "medium",
    note: hasRelative ? `Detected ${relativeLinks.length} relative URL(s). llms.txt requires absolute URLs.` : "All links use fully-qualified absolute HTTPS URLs.",
  });
  if (hasRelative) {
    issues.push("Relative URLs detected (e.g. `(/about)` instead of `(https://example.com/about)`).");
    recommendations.push("Replace all relative paths with full absolute URLs including protocol.");
  }

  const totalScore = checks.reduce((sum, c) => sum + c.score, 0);
  let band: ExistingAuditResult["band"] = "needs-work";
  if (totalScore >= 90) band = "excellent";
  else if (totalScore >= 75) band = "good";
  else if (totalScore >= 50) band = "needs-work";
  else band = "critical";

  return {
    found: true,
    score: totalScore,
    band,
    content,
    checks,
    issues,
    recommendations,
  };
}

// ---------------------------------------------------------------------------
// Markdown Generator Engine
// ---------------------------------------------------------------------------
function generateStandardLlmsTxt(
  siteName: string,
  tagline: string,
  overview: string,
  classifiedUrls: ClassifiedUrl[],
  baseUrl: string
): string {
  let doc = `# ${siteName}\n`;
  doc += `> ${tagline}\n\n`;

  if (overview && overview.trim()) {
    doc += `${overview.trim()}\n\n`;
  }

  // Group by categories
  const categories: { key: ClassifiedUrl["category"]; title: string }[] = [
    { key: "core", title: "Core Pages" },
    { key: "product", title: "Products & Capabilities" },
    { key: "solution", title: "Solutions & Use Cases" },
    { key: "resource", title: "Resources & Documentation" },
    { key: "company", title: "Company & Contact" },
    { key: "optional", title: "Optional" },
  ];

  for (const cat of categories) {
    const urlsInCat = classifiedUrls.filter(u => u.category === cat.key);
    if (urlsInCat.length > 0) {
      doc += `## ${cat.title}\n`;
      for (const item of urlsInCat) {
        doc += `- [${item.title}](${item.url}): ${item.description}\n`;
      }
      doc += "\n";
    }
  }

  // Ensure Optional always has something if privacy/terms exist
  const hasOptionalInUrls = classifiedUrls.some(u => u.category === "optional");
  if (!hasOptionalInUrls) {
    doc += `## Optional\n`;
    doc += `- [Privacy Policy](${baseUrl}/privacy): Information on data privacy and security practices.\n`;
    doc += `- [Terms of Service](${baseUrl}/terms): Legal terms governing platform and website usage.\n\n`;
  }

  return doc.trim() + "\n";
}

function generateExtendedLlmsFullTxt(
  standardLlmsTxt: string,
  siteName: string,
  bodyPreview: string
): string {
  let doc = `${standardLlmsTxt}\n\n`;
  doc += `---\n\n`;
  doc += `# ${siteName} — Extended Knowledge Base & Documentation\n\n`;
  doc += `This full document provides extended context, feature descriptions, and technical specifications for LLMs and AI agents indexing ${siteName}.\n\n`;
  doc += `## Platform Overview & Ingestion Context\n\n`;
  doc += `${bodyPreview}\n\n`;
  doc += `## Technical Support & AI Verification\n`;
  doc += `- Generated and verified by AIBizMod LLMs.txt Engine (https://aibizmod.com/tools/llms-txt-generator)\n`;
  doc += `- Format specification compliance: https://llmstxt.org/\n`;
  return doc.trim() + "\n";
}

// ---------------------------------------------------------------------------
// Main POST Route Handler
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const rawDomain = body.domain;

    if (!rawDomain || typeof rawDomain !== "string" || rawDomain.trim().length < 3) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid website domain (e.g. yourdomain.com)." },
        { status: 400 }
      );
    }

    const domain = cleanDomain(rawDomain);
    const baseUrl = `https://${domain}`;

    // 1. Parallel Fetch of Homepage, About, Sitemaps, Existing llms.txt, and Robots.txt
    const [
      homeRes,
      aboutRes,
      sitemapRes,
      sitemapIndexRes,
      llmsTxtRes,
      llmsFullRes, // eslint-disable-line @typescript-eslint/no-unused-vars
      robotsRes,
    ] = await Promise.all([
      safeFetch(baseUrl),
      safeFetch(`${baseUrl}/about`),
      safeFetch(`${baseUrl}/sitemap.xml`),
      safeFetch(`${baseUrl}/sitemap_index.xml`),
      safeFetch(`${baseUrl}/llms.txt`),
      safeFetch(`${baseUrl}/llms-full.txt`),
      safeFetch(`${baseUrl}/robots.txt`),
    ]);

    const homeHtml = homeRes.text;
    const aboutHtml = aboutRes.text;

    if (!homeHtml) {
      // If direct https failed, try with www or http
      const wwwUrl = `https://www.${domain}`;
      const fallbackRes = await safeFetch(wwwUrl);
      if (!fallbackRes.text) {
        return NextResponse.json(
          {
            success: false,
            error: `Unable to access https://${domain}. Please verify the domain is live and accessible.`,
          },
          { status: 404 }
        );
      }
    }

    const effectiveHtml = homeHtml || "";

    // 2. Extract Metadata & Identity
    const meta = extractMetadata(effectiveHtml, domain);
    const aboutMeta = aboutHtml ? extractMetadata(aboutHtml, domain) : null;

    const siteName = meta.siteName || meta.title || domain;
    
    // Tagline synthesis
    let tagline = meta.description;
    if (!tagline || tagline.length < 15) {
      tagline = `${siteName} is a modern digital platform providing innovative solutions and technology services for enterprise teams.`;
    }
    if (tagline.length > 250) {
      tagline = tagline.slice(0, 247).trim() + "...";
    }

    // Overview Paragraph synthesis
    let overview = "";
    if (aboutMeta?.description && aboutMeta.description !== meta.description) {
      overview = `${aboutMeta.description} ${meta.bodyText.slice(0, 400).trim()}...`;
    } else if (meta.bodyText) {
      overview = `${siteName} delivers industry-leading solutions tailored for modern business environments. ${meta.bodyText.slice(0, 450).trim()}...`;
    }

    // 3. Sitemap & Page Extraction
    let discoveredUrls: string[] = [];
    let sitemapUsed = false;

    // Check sitemap.xml or sitemap_index.xml
    const sitemapContent = sitemapRes.text || sitemapIndexRes.text;
    if (sitemapContent && sitemapContent.includes("<loc>")) {
      discoveredUrls = parseSitemapUrls(sitemapContent, baseUrl);
      sitemapUsed = true;
    }

    // Also check robots.txt for sitemap declarations if not found yet
    if (discoveredUrls.length === 0 && robotsRes.text) {
      const sitemapMatch = robotsRes.text.match(/sitemap:\s*(https?:\/\/[^\s]+)/i);
      if (sitemapMatch) {
        const directSitemap = await safeFetch(sitemapMatch[1].trim());
        if (directSitemap.text) {
          discoveredUrls = parseSitemapUrls(directSitemap.text, baseUrl);
          if (discoveredUrls.length > 0) sitemapUsed = true;
        }
      }
    }

    // Fallback: extract links directly from HTML
    if (discoveredUrls.length === 0) {
      discoveredUrls = extractLinksFromHtml(effectiveHtml, baseUrl);
    }

    // Ensure homepage is in list
    if (!discoveredUrls.includes(baseUrl) && !discoveredUrls.includes(`${baseUrl}/`)) {
      discoveredUrls.unshift(baseUrl);
    }

    // Limit to top 30 most relevant URLs
    const topUrls = discoveredUrls.slice(0, 35);
    const classifiedUrls: ClassifiedUrl[] = topUrls.map(u => classifyUrl(u, siteName));

    // 4. Audit Existing llms.txt
    const existingContent = llmsTxtRes.text;
    const existingAudit = auditExistingLlmsTxt(existingContent);

    // 5. Generate AIBizMod Standard llms.txt & llms-full.txt
    const generatedLlmsTxt = generateStandardLlmsTxt(
      siteName,
      tagline,
      overview,
      classifiedUrls,
      baseUrl
    );

    const generatedLlmsFullTxt = generateExtendedLlmsFullTxt(
      generatedLlmsTxt,
      siteName,
      meta.bodyText.slice(0, 2000)
    );

    // Compute Stats
    const wordCount = generatedLlmsTxt.split(/\s+/).filter(Boolean).length;
    const tokenEstimate = Math.round(wordCount * 1.35);
    const linkCount = (generatedLlmsTxt.match(/^- \[[^\]]+\]/gm) || []).length;
    const sectionsCount = (generatedLlmsTxt.match(/^## /gm) || []).length;

    const responsePayload: LlmsGeneratorResponse = {
      success: true,
      domain,
      siteName,
      tagline,
      analyzed: {
        homepage: Boolean(homeRes.text),
        aboutPage: Boolean(aboutRes.text),
        sitemap: sitemapUsed && discoveredUrls.length > 0,
        sitemapUrlCount: discoveredUrls.length,
      },
      existingAudit,
      generatedLlmsTxt,
      generatedLlmsFullTxt,
      stats: {
        wordCount,
        tokenEstimate,
        linkCount,
        sectionsCount,
      },
    };

    return NextResponse.json(responsePayload, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to generate llms.txt. Please try again.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
