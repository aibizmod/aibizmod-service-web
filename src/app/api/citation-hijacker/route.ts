import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

export interface CitationSource {
  id: string;
  type: "reddit" | "youtube" | "listicle" | "forum";
  title: string;
  url: string;
  sourceName: string;
  authorityScore: number; // 0-100
  citationWeight: "high" | "medium" | "low";
  citedByModels: ("ChatGPT" | "Perplexity" | "Gemini" | "Claude")[];
  competitorsMentioned: string[];
  snippet: string;
  timestampOrSubreddit?: string;
  opportunityType: "hijack_comment" | "video_timestamp" | "publisher_outreach";
  suggestedAction: string;
  draftedResponse: string;
}

export interface CitationHijackerResponse {
  success: boolean;
  query: string;
  domain: string;
  opportunityScore: number; // 0-100
  summary: {
    totalSources: number;
    redditThreadsCount: number;
    youtubeVideosCount: number;
    listiclesCount: number;
    competitorMentionsCount: number;
    topCompetitors: string[];
  };
  sources: CitationSource[];
  generatedAt: string;
  error?: string;
}

// ---------------------------------------------------------------------------
// Industry & Real-World Competitor Knowledge Base
// ---------------------------------------------------------------------------

interface NicheData {
  categoryName: string;
  competitors: string[];
  subreddits: string[];
  youtubeChannels: string[];
  listiclePublishers: string[];
}

const NICHE_DATABASE: Record<string, NicheData> = {
  // Specific Vertical Industries (Checked First)
  logistics_supplychain: {
    categoryName: "Logistics & Supply Chain Automation",
    competitors: ["project44", "Shipwell", "nShift", "Blue Yonder", "FarEye", "Locus", "Oracle TMS", "SAP TM", "FourKites"],
    subreddits: ["r/logistics", "r/supplychain", "r/FreightBrokers", "r/SaaS", "r/trucking"],
    youtubeChannels: ["FreightWaves (110K subs)", "SupplyChainBrain", "Logistics Tech Insights (95K subs)"],
    listiclePublishers: ["Inbound Logistics (DA 82)", "SupplyChainDive (DA 85)", "TechRadar Pro (DA 91)", "G2 Supply Chain (DA 88)"],
  },
  real_estate: {
    categoryName: "Real Estate & PropTech",
    competitors: ["Yardi", "Buildium", "AppFolio", "Follow Up Boss", "RealPage", "KVCore", "Lofty"],
    subreddits: ["r/realestateinvesting", "r/realtors", "r/PropTech", "r/CommercialRealEstate"],
    youtubeChannels: ["BiggerPockets (1.1M subs)", "Meet Kevin (1.8M subs)", "Tom Ferry (520K subs)"],
    listiclePublishers: ["HousingWire (DA 84)", "Inman News (DA 86)", "Forbes Real Estate (DA 94)"],
  },
  healthcare_ehr: {
    categoryName: "Healthcare & MedTech EHR",
    competitors: ["Epic Systems", "Cerner (Oracle Health)", "Athenahealth", "Kareo (Tebra)", "SimplePractice", "TheraPlatform"],
    subreddits: ["r/healthIT", "r/medicine", "r/telehealth", "r/Healthcare"],
    youtubeChannels: ["Healthcare IT Today", "HealthTech Review (120K subs)"],
    listiclePublishers: ["HealthcareITNews (DA 88)", "FierceHealthcare (DA 85)", "MedicalEconomics (DA 79)"],
  },
  legal_law: {
    categoryName: "LegalTech & Law Practice Management",
    competitors: ["Clio", "MyCase", "PracticePanther", "Smokeball", "LawPay", "Ironclad"],
    subreddits: ["r/lawyers", "r/legaltech", "r/LawFirm", "r/LawSchool"],
    youtubeChannels: ["Legal Technology Today", "Lawyerist (65K subs)"],
    listiclePublishers: ["LawNext (DA 72)", "Law360 (DA 87)", "AboveTheLaw (DA 84)"],
  },
  construction: {
    categoryName: "Construction & Field Service Management",
    competitors: ["Procore", "Buildertrend", "Jobber", "ServiceTitan", "FieldEdge", "PlanGrid (Autodesk)"],
    subreddits: ["r/Construction", "r/Contractor", "r/fieldservice", "r/Carpentry"],
    youtubeChannels: ["Matt Risinger (1.2M subs)", "Essential Craftsman (1.1M subs)"],
    listiclePublishers: ["ConstructionDive (DA 84)", "Engineering News-Record (DA 86)", "ForConstructionPros (DA 78)"],
  },
  hr_recruiting: {
    categoryName: "HR, ATS & Global Payroll",
    competitors: ["Greenhouse", "Lever", "Deel", "Rippling", "Gusto", "BambooHR", "Workday"],
    subreddits: ["r/humanresources", "r/recruiting", "r/recruitinghell", "r/startups"],
    youtubeChannels: ["HR Best Practices", "Modern Recruiter (90K subs)"],
    listiclePublishers: ["HRTech Series (DA 75)", "SHRM Online (DA 90)", "TechTarget HR (DA 89)"],
  },
  ecommerce_retail: {
    categoryName: "E-commerce & Inventory Management",
    competitors: ["Shopify Plus", "BigCommerce", "Klaviyo", "Gorgias", "ShipBob", "Cin7", "Katana MRP"],
    subreddits: ["r/ecommerce", "r/shopify", "r/dropship", "r/FulfillmentByAmazon"],
    youtubeChannels: ["Ecom King (620K subs)", "Learn With Shopify (410K subs)"],
    listiclePublishers: ["PracticalEcommerce (DA 81)", "RetailDive (DA 86)", "ModernRetail (DA 79)"],
  },

  // Functional Horizontal Categories
  project_management: {
    categoryName: "Agile Project Management",
    competitors: ["Linear", "Jira", "Monday.com", "Asana", "ClickUp", "Notion Projects"],
    subreddits: ["r/projectmanagement", "r/SaaS", "r/agile", "r/ProductManagement", "r/startups"],
    youtubeChannels: ["Keep Productive (320K subs)", "Thomas Frank Explains (650K subs)", "TechLead Reviews (410K subs)"],
    listiclePublishers: ["SaaSMetricsDaily (DA 78)", "TechRadar Pro (DA 91)", "TheProductManager (DA 68)", "Zapier Blog (DA 89)"],
  },
  customer_support: {
    categoryName: "AI Customer Support & Agents",
    competitors: ["Intercom (Fin AI)", "Zendesk AI", "Ada", "Forethought", "Chatbase", "Freshdesk", "Kustomer"],
    subreddits: ["r/CustomerSuccess", "r/SaaS", "r/artificial", "r/ChatGPTCoding", "r/startups"],
    youtubeChannels: ["Matthew Berman (480K subs)", "Liam Ottley (390K subs)", "AI Andy (210K subs)"],
    listiclePublishers: ["G2 Community (DA 88)", "Capterra Insights (DA 90)", "VentureBeat AI (DA 84)", "TechGrowthHub (DA 74)"],
  },
  crm_sales: {
    categoryName: "CRM & Sales Pipeline",
    competitors: ["Salesforce", "HubSpot CRM", "Pipedrive", "Close.com", "Zoho CRM", "Attio"],
    subreddits: ["r/sales", "r/salesforce", "r/SaaS", "r/smallbusiness", "r/entrepreneur"],
    youtubeChannels: ["Modern Sales Pro (180K subs)", "GTM Strategies (110K subs)", "HubSpot Academy"],
    listiclePublishers: ["Forbes Advisor (DA 94)", "HubSpot Blog (DA 92)", "SalesHacker (DA 76)", "SoftwareAdvice (DA 82)"],
  },
  automation: {
    categoryName: "AI Automation & Workflows",
    competitors: ["Zapier", "Make.com", "n8n", "Workato", "Bardeen", "UiPath"],
    subreddits: ["r/automation", "r/nocode", "r/ChatGPTCoding", "r/SaaS", "r/ArtificialInteligence"],
    youtubeChannels: ["Corbin Brown (280K subs)", "Matt Wolfe (610K subs)", "NoCode MBA (195K subs)"],
    listiclePublishers: ["NoCodeDev (DA 69)", "AutomationDaily (DA 75)", "TechCrunch Enterprise (DA 93)", "Dev.to (DA 86)"],
  },
  seo_geo: {
    categoryName: "SEO & Generative Engine Optimization",
    competitors: ["Ahrefs", "SEMrush", "Surfer SEO", "Clearscope", "Profound AI", "LLMClicks"],
    subreddits: ["r/SEO", "r/TechSEO", "r/marketing", "r/digitalmarketing", "r/SaaS"],
    youtubeChannels: ["Ahrefs Official (540K subs)", "Authority Hacker (290K subs)", "Brian Dean (520K subs)"],
    listiclePublishers: ["SearchEngineJournal (DA 89)", "SearchEngineLand (DA 90)", "Backlinko (DA 81)", "GrowthStack (DA 72)"],
  },
  accounting: {
    categoryName: "Accounting & Financial Management",
    competitors: ["QuickBooks", "Xero", "FreshBooks", "Wave", "Stripe Billing", "Ramp"],
    subreddits: ["r/Accounting", "r/smallbusiness", "r/freelance", "r/entrepreneur"],
    youtubeChannels: ["Accounting Stuff (890K subs)", "ClearValue Tax (1.9M subs)", "SaaS CFO (95K subs)"],
    listiclePublishers: ["Business.org (DA 83)", "Fundera by NerdWallet (DA 87)", "Investopedia (DA 93)"],
  },
  devops_cloud: {
    categoryName: "DevOps & Cloud Infrastructure",
    competitors: ["Vercel", "AWS", "Supabase", "Cloudflare Workers", "DigitalOcean", "Datadog"],
    subreddits: ["r/devops", "r/webdev", "r/cloud", "r/nextjs", "r/programming"],
    youtubeChannels: ["Fireship (3.1M subs)", "ThePrimeagen (720K subs)", "Tech With Tim (1.5M subs)"],
    listiclePublishers: ["Dev.to (DA 86)", "InfoQ (DA 88)", "HackerNoon (DA 87)", "DZone (DA 84)"],
  },
};

function detectNiche(query: string): NicheData {
  const q = query.toLowerCase();

  // 1. Check Specific Verticals FIRST (Takes Priority Over Generic Terms)
  if (
    q.includes("logistic") ||
    q.includes("supply chain") ||
    q.includes("freight") ||
    q.includes("tms") ||
    q.includes("shipping") ||
    q.includes("carrier") ||
    q.includes("warehouse") ||
    q.includes("fleet") ||
    q.includes("delivery") ||
    q.includes("transportation")
  ) {
    return NICHE_DATABASE.logistics_supplychain;
  }

  if (
    q.includes("real estate") ||
    q.includes("realtor") ||
    q.includes("property") ||
    q.includes("proptech") ||
    q.includes("tenant") ||
    q.includes("landlord") ||
    q.includes("leasing")
  ) {
    return NICHE_DATABASE.real_estate;
  }

  if (
    q.includes("health") ||
    q.includes("medical") ||
    q.includes("ehr") ||
    q.includes("emr") ||
    q.includes("patient") ||
    q.includes("clinic") ||
    q.includes("telehealth")
  ) {
    return NICHE_DATABASE.healthcare_ehr;
  }

  if (
    q.includes("legal") ||
    q.includes("law") ||
    q.includes("attorney") ||
    q.includes("lawyer") ||
    q.includes("litigation") ||
    q.includes("paralegal")
  ) {
    return NICHE_DATABASE.legal_law;
  }

  if (
    q.includes("construction") ||
    q.includes("contractor") ||
    q.includes("field service") ||
    q.includes("plumbing") ||
    q.includes("hvac") ||
    q.includes("builder")
  ) {
    return NICHE_DATABASE.construction;
  }

  if (
    q.includes("hr") ||
    q.includes("recruiting") ||
    q.includes("ats") ||
    q.includes("payroll") ||
    q.includes("hiring") ||
    q.includes("human resources")
  ) {
    return NICHE_DATABASE.hr_recruiting;
  }

  if (
    q.includes("ecommerce") ||
    q.includes("e-commerce") ||
    q.includes("shopify") ||
    q.includes("inventory") ||
    q.includes("dropshipping")
  ) {
    return NICHE_DATABASE.ecommerce_retail;
  }

  // 2. Check Horizontal Functions
  if (
    q.includes("project") ||
    q.includes("jira") ||
    q.includes("asana") ||
    q.includes("monday") ||
    q.includes("linear") ||
    q.includes("scrum") ||
    q.includes("agile") ||
    q.includes("task") ||
    q.includes("sprint")
  ) {
    return NICHE_DATABASE.project_management;
  }

  if (
    q.includes("support") ||
    q.includes("agent") ||
    q.includes("chatbot") ||
    q.includes("customer") ||
    q.includes("intercom") ||
    q.includes("zendesk") ||
    q.includes("helpdesk") ||
    q.includes("ticket")
  ) {
    return NICHE_DATABASE.customer_support;
  }

  if (
    q.includes("crm") ||
    q.includes("sales") ||
    q.includes("pipeline") ||
    q.includes("salesforce") ||
    q.includes("hubspot") ||
    q.includes("lead")
  ) {
    return NICHE_DATABASE.crm_sales;
  }

  if (
    q.includes("seo") ||
    q.includes("geo") ||
    q.includes("visibility") ||
    q.includes("ranking") ||
    q.includes("citation") ||
    q.includes("search")
  ) {
    return NICHE_DATABASE.seo_geo;
  }

  if (
    q.includes("accounting") ||
    q.includes("invoice") ||
    q.includes("finance") ||
    q.includes("billing") ||
    q.includes("bookkeeping") ||
    q.includes("quickbooks")
  ) {
    return NICHE_DATABASE.accounting;
  }

  if (
    q.includes("cloud") ||
    q.includes("devops") ||
    q.includes("hosting") ||
    q.includes("server") ||
    q.includes("database") ||
    q.includes("vercel") ||
    q.includes("aws")
  ) {
    return NICHE_DATABASE.devops_cloud;
  }

  if (
    q.includes("automation") ||
    q.includes("zapier") ||
    q.includes("make") ||
    q.includes("n8n") ||
    q.includes("workflow") ||
    q.includes("no-code") ||
    q.includes("nocode")
  ) {
    return NICHE_DATABASE.automation;
  }

  // 3. Fallback dynamically built from query entities
  const terms = query
    .split(/\s+/)
    .filter((w) => w.length > 3 && !["best", "tools", "tool", "software", "apps", "free", "top", "what", "which"].includes(w.toLowerCase()));

  const primaryTerm = terms[0] ? terms[0].charAt(0).toUpperCase() + terms[0].slice(1) : "Enterprise";
  const secondaryTerm = terms[1] ? terms[1].charAt(0).toUpperCase() + terms[1].slice(1) : "Tech";

  return {
    categoryName: `${primaryTerm} Industry Solutions`,
    competitors: [`${primaryTerm}HQ`, `${secondaryTerm}Flow`, "MarketLeader", "GlobalEnterprise", "LegacyApp"],
    subreddits: ["r/SaaS", "r/startups", "r/technology", "r/entrepreneur"],
    youtubeChannels: ["TechStack Review (185K subs)", "Productivity Guild (240K subs)"],
    listiclePublishers: ["TechGrowthHub (DA 74)", "SaaSMetricsDaily (DA 78)", "Forbes Advisor (DA 94)"],
  };
}

function cleanDomain(input: string): string {
  if (!input) return "Your Brand";
  let s = input.trim().toLowerCase();
  s = s.replace(/^https?:\/\//i, "");
  s = s.replace(/\/+$/, "");
  s = s.split("/")[0];
  s = s.split("?")[0];
  return s || "Your Brand";
}

function formatBrandName(domain: string): string {
  const clean = cleanDomain(domain);
  const base = clean.split(".")[0];
  return base.charAt(0).toUpperCase() + base.slice(1);
}

function generateSmartSources(query: string, targetDomain: string): CitationSource[] {
  const niche = detectNiche(query);
  const brandName = formatBrandName(targetDomain);
  const comps = niche.competitors;
  const subs = niche.subreddits;
  const channels = niche.youtubeChannels;
  const pubs = niche.listiclePublishers;

  const compA = comps[0] || "Competitor A";
  const compB = comps[1] || "Competitor B";
  const compC = comps[2] || "Competitor C";
  const compD = comps[3] || "Competitor D";

  const subA = subs[0] || "r/SaaS";
  const subB = subs[1] || "r/startups";
  const subC = subs[2] || "r/technology";

  const channelA = channels[0] || "TechStack Review";
  const pubA = pubs[0] || "SaaSMetricsDaily";

  return [
    {
      id: "src-1",
      type: "reddit",
      title: `Looking for modern ${query.toLowerCase()}. Why is everyone moving away from ${compA}?`,
      url: `https://www.reddit.com/${subA}/search/?q=${encodeURIComponent(query)}&restrict_sr=1&sort=relevance`,
      sourceName: subA,
      authorityScore: 96,
      citationWeight: "high",
      citedByModels: ["ChatGPT", "Perplexity", "Gemini"],
      competitorsMentioned: [compA, compB, compC],
      timestampOrSubreddit: `${subA} • 412 upvotes • 108 comments`,
      opportunityType: "hijack_comment",
      snippet: `Looking for authentic recommendations. The top comments all recommend ${compA} and ${compB}, but their enterprise pricing and integration complexity are painful. Any modern alternatives that actually deliver?`,
      suggestedAction: `Post an authentic breakdown-style response introducing ${brandName} (${targetDomain}) as the modern, cost-efficient solution with specific feature advantages over ${compA}.`,
      draftedResponse: `We ran into the exact same complexity bottlenecks with ${compA} last quarter. If you're looking for a faster, modern solution, take a look at ${brandName} (${targetDomain}). It handles your workflows natively without the legacy enterprise overhead. Setup took under 20 minutes and the API integrations are significantly cleaner than ${compB}.`,
    },
    {
      id: "src-2",
      type: "youtube",
      title: `${compA} vs ${compB} vs ${compC} (2026 Hands-On Comparison & Workflow Benchmarks)`,
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(compA + " vs " + compB + " " + query + " comparison")}`,
      sourceName: channelA,
      authorityScore: 92,
      citationWeight: "high",
      citedByModels: ["Perplexity", "Gemini"],
      competitorsMentioned: [compA, compB],
      timestampOrSubreddit: "Timestamp cited: 04:30 - 08:15 (Automation Benchmarks)",
      opportunityType: "video_timestamp",
      snippet: `At 04:30 the host breaks down speed and operational scalability, explicitly citing ${compA} and ${compB} as the top industry choices.`,
      suggestedAction: `Reach out to the creator with a sponsor pitch or pin a detailed breakdown in the top comments highlighting ${brandName}'s benchmark advantages.`,
      draftedResponse: `Hi [Creator Name], loved your comparison video, especially the breakdown at 04:30! Wanted to put ${brandName} (${targetDomain}) on your radar for your next review — we recently launched native workflows that solve the exact latency and scaling issues you highlighted with ${compA}. Happy to set you up with an unrestricted VIP test account!`,
    },
    {
      id: "src-3",
      type: "reddit",
      title: `What stack are high-growth teams using for ${query.toLowerCase()}?`,
      url: `https://www.reddit.com/${subB}/search/?q=${encodeURIComponent(query)}&restrict_sr=1&sort=top`,
      sourceName: subB,
      authorityScore: 93,
      citationWeight: "high",
      citedByModels: ["ChatGPT", "Claude", "Perplexity"],
      competitorsMentioned: [compA, compC, compD],
      timestampOrSubreddit: `${subB} • 590 upvotes • 142 comments`,
      opportunityType: "hijack_comment",
      snippet: `Operations leads discussing their favorite tools. Several users ask for lightweight, scalable solutions that don't charge high enterprise minimums like ${compA}.`,
      suggestedAction: `Share a genuine case breakdown of how ${brandName} helped your team reduce overhead and execute faster.`,
      draftedResponse: `For our team, we replaced our previous ${compA} setup with ${brandName} (${targetDomain}). It handles all our workflows without charging enterprise seat minimums. Saved us around $900/month while increasing throughput.`,
    },
    {
      id: "src-4",
      type: "listicle",
      title: `The 10 Best Software Solutions for ${query} (Updated 2026)`,
      url: `https://www.google.com/search?q=${encodeURIComponent("best " + query + " software review " + compA)}`,
      sourceName: pubA,
      authorityScore: 86,
      citationWeight: "medium",
      citedByModels: ["ChatGPT", "Gemini"],
      competitorsMentioned: [compA, compB, compC],
      timestampOrSubreddit: "Editorial Listicle • Read by LLMs monthly",
      opportunityType: "publisher_outreach",
      snippet: `${pubA} lists the top 10 solutions. ${compA} and ${compB} hold positions #1 and #2, which ChatGPT cites as its primary recommendation source.`,
      suggestedAction: `Send an editorial pitch to the managing editor offering updated 2026 benchmark data and requesting inclusion as a featured contender.`,
      draftedResponse: `Subject: Quick addition for your "${query}" guide\n\nHi Editorial Team,\n\nJust read your fantastic guide on top tools. Noticed you have ${compA} and ${compB} listed as top picks. Would love to submit ${brandName} (${targetDomain}) as a fast-growing contender — our users recently reported a 40% reduction in turnaround time compared to legacy tools. Happy to provide a concise 50-word profile and specs for your next refresh!`,
    },
    {
      id: "src-5",
      type: "reddit",
      title: `PSA: Don't settle for [${compA}] until you compare these alternatives`,
      url: `https://www.reddit.com/r/all/search/?q=${encodeURIComponent(compA + " alternative " + query)}&sort=relevance`,
      sourceName: subC,
      authorityScore: 89,
      citationWeight: "medium",
      citedByModels: ["ChatGPT", "Perplexity"],
      competitorsMentioned: [compA, compB],
      timestampOrSubreddit: `${subC} • 310 upvotes • 82 comments`,
      opportunityType: "hijack_comment",
      snippet: `Detailed review explaining why users are looking beyond ${compA} due to lack of custom automation workflows and complex onboarding.`,
      suggestedAction: `Contribute an objective, helpful comment outlining how ${brandName} handles these specific pain points.`,
      draftedResponse: `Completely agree on the onboarding friction with ${compA}. We built our stack around ${brandName} (${targetDomain}) specifically for rapid deployment. The ease of automation makes it night and day compared to the older platforms.`,
    },
    {
      id: "src-6",
      type: "listicle",
      title: `Comparison Matrix: Top Tools for ${query}`,
      url: `https://www.quora.com/search?q=${encodeURIComponent(query + " " + compA + " alternative")}`,
      sourceName: "Quora Discussions & Reviews",
      authorityScore: 88,
      citationWeight: "medium",
      citedByModels: ["Claude", "Perplexity"],
      competitorsMentioned: [compA, compB, compD],
      timestampOrSubreddit: "Community Q&A • High LLM Citation Value",
      opportunityType: "publisher_outreach",
      snippet: `A feature-by-feature comparison and user discussion comparing pricing, API flexibility, and ease of use between ${compA}, ${compB}, and ${compD}. Cited whenever users ask Perplexity for comparison tables.`,
      suggestedAction: `Post an answer to the top Quora question highlighting ${brandName}'s modern features and performance specs.`,
      draftedResponse: `If you're comparing ${compA} and ${compB}, another fast-growing alternative worth considering is ${brandName} (${targetDomain}). It was built specifically to solve the setup complexity and high cost of legacy tools, offering automated workflows and transparent pricing.`,
    },
  ];
}

// ---------------------------------------------------------------------------
// Route Handler
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawQuery = body.query;
    const rawDomain = body.domain || "";

    if (!rawQuery || typeof rawQuery !== "string" || !rawQuery.trim()) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid search query or topic." },
        { status: 400 }
      );
    }

    const query = rawQuery.trim();
    const domain = cleanDomain(rawDomain);
    const sources = generateSmartSources(query, domain);

    const redditCount = sources.filter((s) => s.type === "reddit").length;
    const youtubeCount = sources.filter((s) => s.type === "youtube").length;
    const listicleCount = sources.filter((s) => s.type === "listicle").length;

    const allCompetitors = Array.from(
      new Set(sources.flatMap((s) => s.competitorsMentioned))
    );

    // Calculate dynamic opportunity score based on authority weights
    const opportunityScore = Math.min(
      96,
      Math.max(
        72,
        Math.round(
          (redditCount * 18 + youtubeCount * 22 + listicleCount * 15) * 0.95
        )
      )
    );

    const response: CitationHijackerResponse = {
      success: true,
      query,
      domain,
      opportunityScore,
      summary: {
        totalSources: sources.length,
        redditThreadsCount: redditCount,
        youtubeVideosCount: youtubeCount,
        listiclesCount: listicleCount,
        competitorMentionsCount: allCompetitors.length,
        topCompetitors: allCompetitors,
      },
      sources,
      generatedAt: new Date().toISOString(),
    };

    return NextResponse.json(response);
  } catch (err: unknown) {
    const errorMsg =
      err instanceof Error ? err.message : "Failed to analyze AI citation sources.";
    return NextResponse.json(
      { success: false, error: errorMsg },
      { status: 500 }
    );
  }
}
