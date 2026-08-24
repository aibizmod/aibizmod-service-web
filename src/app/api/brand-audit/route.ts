import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

type Impact = "high" | "medium" | "low";
type Rating = "excellent" | "good" | "partial" | "weak" | "missing";

interface BrandAuditInput {
  url: string;
  brandName?: string;
  businessType?: string;
  industry?: string;
  niche?: string;
  location?: string;
  platforms?: string[];
}

interface AuditCheck {
  key: string;
  name: string;
  rating: Rating;
  score: number;
  maxScore: number;
  impact: Impact;
  note: string;
}

interface PlatformReadiness {
  platform: string;
  score: number;
  verdict: string;
  topFix: string;
}

function cleanDomain(input: string): string {
  let value = input.trim().toLowerCase();
  value = value.replace(/^https?:\/\//i, "");
  value = value.split("/")[0];
  value = value.split("?")[0];
  return value.replace(/\/+$/, "");
}

async function safeFetch(url: string, timeoutMs = 8000): Promise<{ text: string | null; status: number }> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; AIBizMod-BrandAuditBot/1.0; +https://aibizmod.com/tools/brand-audit)",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,text/plain;q=0.8,*/*;q=0.8",
      },
    });
    clearTimeout(timer);
    if (!response.ok) return { text: null, status: response.status };
    return { text: await response.text(), status: response.status };
  } catch {
    return { text: null, status: 0 };
  }
}

function stripHtmlTags(html: string): string {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<script(?![^>]+application\/ld\+json)[^>]*>[\s\S]*?<\/script>/gi, " ")
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

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getMetaContent(html: string, attr: "name" | "property", key: string): string {
  const first = new RegExp(`<meta\\s+${attr}=["']${escapeRegExp(key)}["']\\s+content=["'](.*?)["']`, "i").exec(html)?.[1];
  const second = new RegExp(`<meta\\s+content=["'](.*?)["']\\s+${attr}=["']${escapeRegExp(key)}["']`, "i").exec(html)?.[1];
  return stripHtmlTags(first || second || "");
}

function extractMetadata(html: string, fallbackDomain: string) {
  const titleTag = /<title[^>]*>(.*?)<\/title>/i.exec(html)?.[1] || "";
  const title = stripHtmlTags(getMetaContent(html, "property", "og:title") || titleTag || fallbackDomain);
  const siteName = stripHtmlTags(getMetaContent(html, "property", "og:site_name") || title.split(/[|\-–—]/)[0] || fallbackDomain);
  const description = stripHtmlTags(
    getMetaContent(html, "name", "description") || getMetaContent(html, "property", "og:description")
  );
  const canonical = /<link[^>]+rel=["']canonical["'][^>]+href=["'](.*?)["']/i.exec(html)?.[1]
    || /<link[^>]+href=["'](.*?)["'][^>]+rel=["']canonical["']/i.exec(html)?.[1]
    || "";
  const h1 = stripHtmlTags(/<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(html)?.[1] || "");
  const h2s: string[] = [];
  const h2Re = /<h2[^>]*>([\s\S]*?)<\/h2>/gi;
  let match: RegExpExecArray | null;
  while ((match = h2Re.exec(html)) !== null && h2s.length < 12) {
    const text = stripHtmlTags(match[1]);
    if (text.length > 3 && text.length < 110 && !h2s.includes(text)) h2s.push(text);
  }

  return {
    title,
    siteName,
    description,
    canonical,
    h1,
    h2s,
    bodyText: stripHtmlTags(html).slice(0, 7000),
  };
}

function collectJsonLdTypes(html: string): string[] {
  const types = new Set<string>();
  const scripts = html.match(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [];

  const walk = (node: unknown) => {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }

    const record = node as Record<string, unknown>;
    const type = record["@type"];
    if (typeof type === "string") types.add(type);
    if (Array.isArray(type)) type.filter((item): item is string => typeof item === "string").forEach((item) => types.add(item));
    Object.values(record).forEach(walk);
  };

  for (const script of scripts) {
    const json = /<script[^>]*>([\s\S]*?)<\/script>/i.exec(script)?.[1];
    if (!json) continue;
    try {
      walk(JSON.parse(json.trim()));
    } catch {
      // Ignore malformed structured data.
    }
  }

  return Array.from(types).slice(0, 12);
}

function extractLinks(html: string, baseUrl: string): string[] {
  const urls = new Set<string>();
  const hrefRe = /href=["']([^"']+)["']/gi;
  let match: RegExpExecArray | null;
  const host = new URL(baseUrl).hostname.replace(/^www\./, "");

  while ((match = hrefRe.exec(html)) !== null) {
    const raw = match[1].trim();
    if (!raw || raw.startsWith("#") || raw.startsWith("mailto:") || raw.startsWith("tel:") || raw.startsWith("javascript:")) continue;
    try {
      const resolved = new URL(raw, baseUrl);
      const resolvedHost = resolved.hostname.replace(/^www\./, "");
      if (resolvedHost === host) {
        urls.add(`${resolved.origin}${resolved.pathname}`.replace(/\/+$/, ""));
      } else if (/linkedin|twitter|x\.com|youtube|instagram|facebook|github|crunchbase|g2\.com/i.test(resolved.hostname)) {
        urls.add(resolved.href);
      }
    } catch {
      // Ignore invalid links.
    }
  }

  return Array.from(urls).slice(0, 80);
}

function pickPages(links: string[], baseUrl: string) {
  const home = baseUrl.replace(/\/+$/, "");
  const about = links.find((url) => /\/about(?:-|\/|$)|\/company(?:\/|$)/i.test(url));
  const contact = links.find((url) => /\/contact(?:-|\/|$)|\/demo(?:\/|$)|\/book/i.test(url));
  const pricing = links.find((url) => /\/pricing(?:\/|$)|\/plans(?:\/|$)/i.test(url));
  const blog = links.find((url) => /\/blog(?:\/|$)|\/resources(?:\/|$)|\/insights(?:\/|$)/i.test(url));
  const caseStudy = links.find((url) => /case-stud|customer|testimonial|portfolio|clients/i.test(url));
  const docs = links.find((url) => /\/docs(?:\/|$)|documentation|help|guide|learn/i.test(url));
  return Array.from(new Set([home, about, contact, pricing, blog, caseStudy, docs].filter(Boolean) as string[]));
}

function ratingFromRatio(ratio: number): Rating {
  if (ratio >= 0.88) return "excellent";
  if (ratio >= 0.72) return "good";
  if (ratio >= 0.5) return "partial";
  if (ratio > 0) return "weak";
  return "missing";
}

function makeCheck(
  key: string,
  name: string,
  points: number,
  maxScore: number,
  impact: Impact,
  note: string
): AuditCheck {
  return {
    key,
    name,
    rating: ratingFromRatio(points / maxScore),
    score: Math.max(0, Math.min(maxScore, Math.round(points))),
    maxScore,
    impact,
    note,
  };
}

function inferThemes(meta: ReturnType<typeof extractMetadata>, niche: string, industry: string): string[] {
  const candidates = [
    ...meta.h2s,
    ...niche.split(","),
    industry,
    meta.h1,
  ]
    .map((item) => item.trim())
    .filter((item) => item.length > 3 && item.length < 80);

  return Array.from(new Set(candidates)).slice(0, 8);
}

function buildQueries(brandName: string, industry: string, niche: string, location: string, businessType: string): string[] {
  const nicheCore = niche.split(",")[0]?.trim() || industry || "solution";
  const place = location?.trim() ? ` in ${location.trim()}` : "";
  const type = businessType || "company";

  return [
    `What is ${brandName}, and what does it do?`,
    `Is ${brandName} a good ${nicheCore} for ${type.toLowerCase()} buyers?`,
    `Best ${industry || nicheCore} companies${place}`,
    `${brandName} alternatives for ${nicheCore}`,
    `Compare ${brandName} with leading ${nicheCore} providers`,
    `Which ${nicheCore} tools should a business evaluate${place}?`,
    `Does ${brandName} have customer proof, pricing, and implementation details?`,
    `Summarize ${brandName}'s services, target customers, and differentiators`,
  ];
}

function buildReport(params: {
  brandName: string;
  domain: string;
  score: number;
  band: string;
  tagline: string;
  checks: AuditCheck[];
  platforms: PlatformReadiness[];
  queries: string[];
  actions: string[];
}) {
  const { brandName, domain, score, band, tagline, checks, platforms, queries, actions } = params;
  return `# ${brandName} Brand Audit
> ${tagline}

Domain: https://${domain}
Overall score: ${score}/100 (${band})

## Signal Scores
${checks.map((check) => `- ${check.name}: ${check.score}/${check.maxScore} - ${check.note}`).join("\n")}

## AI Platform Readiness
${platforms.map((platform) => `- ${platform.platform}: ${platform.score}/100 - ${platform.verdict}. Fix: ${platform.topFix}`).join("\n")}

## AI Test Queries
${queries.map((query) => `- ${query}`).join("\n")}

## Priority Actions
${actions.map((action) => `- ${action}`).join("\n")}
`;
}

export async function POST(req: NextRequest) {
  try {
    const input = (await req.json().catch(() => ({}))) as BrandAuditInput;

    if (!input.url || typeof input.url !== "string" || input.url.trim().length < 3) {
      return NextResponse.json({ success: false, error: "Please enter a valid website URL." }, { status: 400 });
    }

    const domain = cleanDomain(input.url);
    if (!domain.includes(".")) {
      return NextResponse.json({ success: false, error: "Please enter a full domain, such as example.com." }, { status: 400 });
    }

    let baseUrl = `https://${domain}`;
    let home = await safeFetch(baseUrl);
    if (!home.text) {
      const wwwBase = `https://www.${domain.replace(/^www\./, "")}`;
      const wwwHome = await safeFetch(wwwBase);
      if (wwwHome.text) {
        baseUrl = wwwBase;
        home = wwwHome;
      }
    }

    if (!home.text) {
      return NextResponse.json(
        { success: false, error: `Unable to access https://${domain}. Please verify the domain is live and public.` },
        { status: 404 }
      );
    }

    const links = extractLinks(home.text, baseUrl);
    const pagesToFetch = pickPages(links, baseUrl).slice(1, 7);
    const [llmsTxt, robotsTxt, ...pageResponses] = await Promise.all([
      safeFetch(`${baseUrl}/llms.txt`, 5000),
      safeFetch(`${baseUrl}/robots.txt`, 5000),
      ...pagesToFetch.map((page) => safeFetch(page, 5500)),
    ]);

    const joinedHtml = [home.text, ...pageResponses.map((page) => page.text || "")].join("\n");
    const meta = extractMetadata(home.text, domain);
    const joinedText = stripHtmlTags(joinedHtml);
    const brandName = (input.brandName || meta.siteName || meta.title || domain).trim();
    const businessType = (input.businessType || "Business").trim();
    const industry = (input.industry || "Technology").trim();
    const niche = (input.niche || meta.description || industry).trim();
    const location = (input.location || "").trim();
    const schemaTypes = collectJsonLdTypes(joinedHtml);
    const socialProfiles = links.filter((url) => /linkedin|twitter|x\.com|youtube|instagram|facebook|github|crunchbase|g2\.com/i.test(url)).slice(0, 8);
    const internalLinks = links.filter((url) => {
      try {
        return new URL(url).hostname.replace(/^www\./, "") === new URL(baseUrl).hostname.replace(/^www\./, "");
      } catch {
        return false;
      }
    });

    const brandRegex = new RegExp(escapeRegExp(brandName), "gi");
    const brandMentions = (joinedText.match(brandRegex) || []).length;
    const hasOrgSchema = schemaTypes.some((type) => /Organization|LocalBusiness|Corporation|SoftwareApplication|Product|Service/i.test(type));
    const hasFaqSignals = /faq|frequently asked|question/i.test(joinedText) || schemaTypes.some((type) => /FAQPage|Question/i.test(type));
    const hasProofSignals = /case stud|testimonial|customer|review|client|portfolio|award|certified|partner/i.test(joinedText);
    const hasContactSignals = /contact|book a|schedule|demo|email|phone/i.test(joinedText) || internalLinks.some((url) => /contact|demo|book/i.test(url));
    const hasPrivacy = internalLinks.some((url) => /privacy|terms|security|compliance/i.test(url));
    const hasLlms = Boolean(llmsTxt.text && llmsTxt.text.trim().length > 50);
    const hasRobots = Boolean(robotsTxt.text && robotsTxt.text.trim().length > 10);
    const hasCanonical = Boolean(meta.canonical);
    const hasDescription = meta.description.length >= 70;
    const brandInTitle = meta.title.toLowerCase().includes(brandName.toLowerCase());
    const brandInH1 = meta.h1.toLowerCase().includes(brandName.toLowerCase());

    const checks: AuditCheck[] = [
      makeCheck(
        "entity",
        "Brand Entity Clarity",
        (hasDescription ? 12 : 4) + (brandInTitle ? 7 : 0) + (brandInH1 ? 5 : 0) + Math.min(6, brandMentions),
        30,
        "high",
        hasDescription
          ? "Homepage metadata gives AI systems a usable brand definition."
          : "Meta description is thin; AI systems may struggle to define the brand accurately."
      ),
      makeCheck(
        "citability",
        "AI Citability Signals",
        (hasLlms ? 12 : 0) + (hasOrgSchema ? 9 : 0) + (hasCanonical ? 4 : 0) + (hasRobots ? 3 : 0) + (hasFaqSignals ? 2 : 0),
        30,
        "high",
        hasLlms
          ? "llms.txt and crawl guidance signals are present."
          : "No substantial /llms.txt file was detected at the site root."
      ),
      makeCheck(
        "proof",
        "Trust & Proof",
        (hasProofSignals ? 10 : 0) + (hasContactSignals ? 6 : 0) + (hasPrivacy ? 4 : 0),
        20,
        "medium",
        hasProofSignals
          ? "The site includes proof language AI answers can cite."
          : "Customer proof, case studies, or review signals were not prominent."
      ),
      makeCheck(
        "coverage",
        "Service Coverage",
        Math.min(12, meta.h2s.length * 2) + (internalLinks.length >= 8 ? 5 : 0) + (pagesToFetch.length >= 3 ? 3 : 0),
        20,
        "medium",
        internalLinks.length >= 8
          ? "The crawl found a healthy set of internal brand and service pages."
          : "The crawl found limited internal coverage for services, resources, or company pages."
      ),
    ];

    const score = checks.reduce((sum, check) => sum + check.score, 0);
    const band = score >= 85 ? "excellent" : score >= 70 ? "strong" : score >= 50 ? "needs work" : "at risk";
    const themes = inferThemes(meta, niche, industry);
    const selectedPlatforms = (input.platforms?.length ? input.platforms : ["ChatGPT", "Perplexity", "Gemini", "Claude"]).slice(0, 6);
    const platformReadiness: PlatformReadiness[] = selectedPlatforms.map((platform) => {
      const normalized = platform.toLowerCase();
      let platformScore = score;
      let topFix = "Tighten entity copy and add more citation-ready proof.";
      if (normalized.includes("chatgpt")) {
        platformScore = Math.round(score + (hasLlms ? 4 : -8) + (hasOrgSchema ? 3 : -4));
        topFix = hasLlms ? "Expand llms.txt with all service and proof pages." : "Create /llms.txt with a concise brand summary and canonical URLs.";
      } else if (normalized.includes("perplexity")) {
        platformScore = Math.round(score + (hasProofSignals ? 5 : -8) + (hasCanonical ? 2 : -3));
        topFix = hasProofSignals ? "Add dated proof points and comparison pages." : "Publish citeable case studies, reviews, and statistics.";
      } else if (normalized.includes("gemini")) {
        platformScore = Math.round(score + (socialProfiles.length ? 4 : -5) + (hasOrgSchema ? 4 : -6));
        topFix = hasOrgSchema ? "Connect sameAs social profiles in Organization schema." : "Add Organization schema with logo, sameAs links, and contact data.";
      } else if (normalized.includes("claude")) {
        platformScore = Math.round(score + (hasLlms ? 6 : -7) + (hasPrivacy ? 2 : -3));
        topFix = hasLlms ? "Add deeper documentation and FAQs for long-context answers." : "Create llms.txt and llms-full.txt for structured context.";
      }

      const clamped = Math.max(0, Math.min(100, platformScore));
      return {
        platform,
        score: clamped,
        verdict: clamped >= 80 ? "Ready to be cited" : clamped >= 65 ? "Visible but improvable" : clamped >= 45 ? "Partial brand understanding" : "Low answer confidence",
        topFix,
      };
    });

    const actionPlan = [
      !hasLlms ? "Create /llms.txt with a 150-300 word brand summary, service categories, and canonical page URLs." : "Expand /llms.txt with proof pages, comparison pages, and FAQs.",
      !hasOrgSchema ? "Add Organization or LocalBusiness schema with logo, sameAs profiles, founding details, and contact links." : "Validate structured data and add sameAs links for every authoritative profile.",
      !hasProofSignals ? "Publish citeable proof: customer outcomes, case studies, testimonials, reviews, certifications, or partner badges." : "Turn strongest proof points into concise answer-style snippets on core pages.",
      !hasDescription ? "Rewrite the homepage meta description so it states who you help, what you offer, and why the brand is different." : "Align homepage, about page, and service page descriptions around the same positioning.",
      "Run the generated AI test queries monthly and record whether the brand is mentioned, cited, and positioned correctly.",
    ];

    const generatedQueries = buildQueries(brandName, industry, niche, location, businessType);
    const tagline = meta.description || `${brandName} is positioned in ${industry}${niche ? ` for ${niche}` : ""}.`;

    const response = {
      success: true,
      domain: new URL(baseUrl).hostname,
      brandName,
      tagline,
      score,
      band,
      summary:
        score >= 70
          ? `${brandName} has a solid brand entity foundation, with the biggest upside in stronger AI-ready proof and platform-specific crawl signals.`
          : `${brandName} needs clearer machine-readable brand signals before AI engines can cite it confidently in recommendation answers.`,
      inputs: {
        businessType,
        industry,
        niche,
        location,
      },
      analyzed: {
        homepage: true,
        pagesChecked: 1 + pageResponses.filter((page) => Boolean(page.text)).length,
        internalLinks: internalLinks.length,
        llmsTxt: hasLlms,
        robotsTxt: hasRobots,
      },
      detectedSignals: {
        schemaTypes,
        socialProfiles,
        serviceThemes: themes,
        canonical: meta.canonical || null,
      },
      checks,
      platformReadiness,
      generatedQueries,
      actionPlan,
      reportMarkdown: buildReport({
        brandName,
        domain: new URL(baseUrl).hostname,
        score,
        band,
        tagline,
        checks,
        platforms: platformReadiness,
        queries: generatedQueries,
        actions: actionPlan,
      }),
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to run the brand audit. Please try again.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
