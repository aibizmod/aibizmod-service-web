export interface TopicResource {
  title: string;
  description: string;
  href: string;
  type: 'guide' | 'service' | 'comparison' | 'checklist' | 'blog' | 'template';
}

export interface ComparisonRow {
  term: string;
  focus: string;
  bestFor: string;
}

export interface TopicHub {
  slug: string;
  title: string;
  excerpt: string;
  summary: string;
  corePage: TopicResource;
  supportingAssets: TopicResource[];
  comparison?: {
    heading: string;
    intro: string;
    rows: ComparisonRow[];
  };
}

export const topicHubs: TopicHub[] = [
  {
    slug: 'geo-for-service-businesses',
    title: 'GEO, AEO & AI SEO for Service Businesses',
    excerpt: 'Improve AI search visibility across ChatGPT, Perplexity, Gemini, Claude, and Google AI Overviews with practical GEO, AEO, and AI SEO guidance.',
    summary:
      'GEO, AEO, and AI SEO help service businesses become easier for answer engines to understand, extract, cite, and recommend. GEO focuses on generative engine optimisation, AEO focuses on answer-ready content, and traditional SEO remains the technical and content foundation. This hub brings together aibizmod\'s guides, AI visibility audit, SEO services, and practical resources for teams targeting queries like geo seo, seo aeo, ai seo services, and AI search visibility.',
    corePage: {
      title: 'What Is Generative Engine Optimization (GEO)?',
      description: 'A comprehensive guide to GEO, AI search visibility, answer-engine citation, and how service businesses can make content citable.',
      href: '/blog/what-is-generative-engine-optimization-geo',
      type: 'guide',
    },
    supportingAssets: [
      {
        title: 'AI SEO Services: What Businesses Need Before AI Search Takes More Clicks',
        description: 'What AI SEO services include, how they differ from traditional SEO, and how to improve visibility across ChatGPT, Perplexity, Gemini, and Google AI Search.',
        href: '/blog/ai-seo-services',
        type: 'blog',
      },
      {
        title: 'AI SEO Tools vs AI SEO Services',
        description: 'Whether to buy AI monitoring software, hire expert-led services, or combine both — with a decision framework for each situation.',
        href: '/blog/ai-seo-tools-vs-ai-seo-services',
        type: 'comparison',
      },
      {
        title: 'Generative Engine Optimisation for Service Businesses',
        description: 'Practical GEO strategies for agencies, consultancies, and technology service providers that need clearer AI search visibility.',
        href: '/blog/generative-engine-optimisation-for-service-businesses',
        type: 'blog',
      },
      {
        title: 'How To Improve AI Ranking Across ChatGPT, Perplexity, Gemini, and Google AI Search',
        description: 'The visibility ladder from retrieved to recommended — and what improves each rung across AI answer platforms.',
        href: '/blog/how-to-improve-ai-ranking',
        type: 'guide',
      },
      {
        title: 'Google AI Search Optimization: What Helps, What Does Not, and What To Measure',
        description: 'What Google actually says about AI Overviews and AI Mode, what does not help, and how to measure progress.',
        href: '/blog/google-ai-search-optimization',
        type: 'guide',
      },
      {
        title: 'AI Monitoring Tools for Brand Visibility',
        description: 'What to track before buying AI visibility software: prompt sets, baselines, citation sources, and monthly cadence.',
        href: '/blog/ai-monitoring-tools',
        type: 'blog',
      },
      {
        title: 'AI Visibility Benchmarks: How Service Businesses Compare in AI Search',
        description: 'How to build an AI visibility benchmark: the five metrics, prompt set construction, and what audits typically reveal.',
        href: '/blog/ai-visibility-benchmarks-service-businesses',
        type: 'guide',
      },
      {
        title: 'AI Visibility Audit Prompts',
        description: '54 free, ready-to-run prompts for auditing brand visibility, competitor comparisons, citations, and sentiment across answer engines.',
        href: '/ai-visibility-prompts',
        type: 'checklist',
      },
      {
        title: 'How We Audit AI Visibility: Methodology, Metrics & Scoring',
        description: 'The documented five-metric methodology, prompt sets, and scoring rubric behind every AI visibility audit.',
        href: '/how-we-audit-ai-visibility',
        type: 'guide',
      },
      {
        title: 'LLMClicks Alternative: AI Visibility Audit Services vs a DIY Tracking Tool',
        description: 'When to buy an AI visibility tracking subscription and when a managed audit-and-implementation engagement closes the gap faster.',
        href: '/comparisons/llmclicks-alternative',
        type: 'comparison',
      },
      {
        title: 'AI Visibility Audit, AI Ranking & GEO Roadmap',
        description: 'Benchmark how your business appears across ChatGPT, Gemini, Claude, Perplexity, and Google AI Search, then prioritise citation and recommendation gaps.',
        href: '/services/ai-automation/ai-visibility-audit',
        type: 'service',
      },
      {
        title: 'SEO Services & AI Search Optimization',
        description: 'SEO, AEO, GEO, and AI SEO services for businesses that need stronger rankings, clearer answer blocks, and better AI-search citability.',
        href: '/services/digital-marketing/search-marketing',
        type: 'service',
      },
      {
        title: 'Website Performance Optimisation',
        description: 'Core Web Vitals, semantic page structure, and technical SEO fixes that support both traditional rankings and AI-powered content extraction.',
        href: '/services/web-development/web-optimization',
        type: 'service',
      },
    ],
    comparison: {
      heading: 'SEO vs AEO vs GEO',
      intro:
        'The three disciplines overlap, but each targets a different discovery surface. Most service businesses need all three — the difference is where the optimisation is aimed.',
      rows: [
        {
          term: 'SEO',
          focus: 'Ranking in traditional search engine results pages.',
          bestFor:
            'Technical visibility, search traffic, and being the page Google lists for a query.',
        },
        {
          term: 'AEO',
          focus: 'Answer engine optimisation — answer-ready content.',
          bestFor:
            'Featured snippets and short, extractable answers in search and assistant surfaces.',
        },
        {
          term: 'GEO',
          focus: 'Generative engine optimisation — citation and recommendation in AI answers.',
          bestFor:
            'Being retrieved, cited, mentioned, and recommended by ChatGPT, Perplexity, Gemini, and Google AI Overviews.',
        },
        {
          term: 'AI SEO',
          focus: 'The combined practical operating layer across all of the above.',
          bestFor:
            'A coordinated programme: technical SEO, schema, entity clarity, citations, and prompt monitoring.',
        },
      ],
    },
  },
  {
    slug: 'business-automation',
    title: 'Business Automation — AI, Workflows & Process Improvement',
    excerpt: 'Automate manual processes, integrate AI, and build custom workflows that save time and reduce errors.',
    summary:
      'Business automation covers everything from simple workflow triggers to AI agent pipelines. The right approach depends on your process complexity, data sensitivity, and transaction volume. This hub connects you to aibizmod\'s automation services, guides, and comparison resources.',
    corePage: {
      title: 'AI Automation Services',
      description: 'Custom automation pipelines, AI agents, generative AI systems, and predictive analytics for UK and India-based businesses.',
      href: '/services/ai-automation',
      type: 'service',
    },
    supportingAssets: [
      {
        title: 'Automation Platform vs Custom Workflow',
        description: 'Compare Zapier, Make, and n8n against custom Python and Node.js workflows — with decision rules for each approach.',
        href: '/comparisons/automation-platform-vs-custom-workflow',
        type: 'comparison',
      },
      {
        title: 'AI Agents vs Traditional Automation',
        description: 'Understand the difference between rule-based automation and AI agent systems — and when to use each.',
        href: '/blog/ai-agents-vs-traditional-automation',
        type: 'blog',
      },
      {
        title: 'How AI Automation Saves Businesses Time and Money',
        description: 'Real examples of automation reducing manual work, eliminating errors, and freeing up team capacity.',
        href: '/blog/how-ai-automation-saves-businesses-time-and-money',
        type: 'blog',
      },
      {
        title: 'Business Process Automation Services',
        description: 'Workflow automation, invoice routing, CRM sync, and approval process automation that connects your existing tools.',
        href: '/services/ai-automation/process-automation',
        type: 'service',
      },
      {
        title: 'AI Chatbot Development & Conversational AI',
        description: 'AI chatbot development, voice agents, and knowledge assistants built on GPT-4 and Claude.',
        href: '/services/ai-automation/conversational-ai',
        type: 'service',
      },
      {
        title: 'Generative AI Development & LLM Integration',
        description: 'Custom GPT development, RAG systems, and LLM integration for business products and workflows.',
        href: '/services/ai-automation/generative-ai',
        type: 'service',
      },
    ],
  },
  {
    slug: 'web-software-buying-decisions',
    title: 'Web & Software Buying Decisions — Build, Buy, or Upgrade',
    excerpt: 'Make informed decisions about custom software, SaaS subscriptions, website redesigns, and technology modernisation.',
    summary:
      'Every business faces technology buying decisions: build custom software or buy SaaS, redesign the website or improve incrementally, go native or cross-platform. Getting these decisions right saves money, time, and competitive position. This hub connects you to aibizmod\'s comparison guides, service offerings, and planning resources.',
    corePage: {
      title: 'Custom Software Development Services',
      description: 'Bespoke software development for businesses that need systems built around their processes, not the reverse.',
      href: '/services/software-development',
      type: 'service',
    },
    supportingAssets: [
      {
        title: 'Custom Software vs SaaS',
        description: 'Compare custom software and SaaS across cost, control, timeline, and lock-in risk — with decision rules for each scenario.',
        href: '/comparisons/custom-software-vs-saas',
        type: 'comparison',
      },
      {
        title: 'Website Redesign vs Incremental Improvements',
        description: 'Decide whether to rebuild your website or fix specific issues — covering SEO risk, cost, timeline, and conversion impact.',
        href: '/comparisons/redesign-vs-improve-existing-website',
        type: 'comparison',
      },
      {
        title: 'Native vs Cross-Platform Apps',
        description: 'Compare native iOS and Android development against Flutter and React Native — performance, cost, and maintenance trade-offs.',
        href: '/comparisons/native-vs-cross-platform-apps',
        type: 'comparison',
      },
      {
        title: 'Web Development Services',
        description: 'Custom websites, SaaS dashboards, e-commerce platforms, and web applications built with React, Next.js, and Node.js.',
        href: '/services/web-development',
        type: 'service',
      },
      {
        title: 'IT Consulting & Digital Transformation',
        description: 'Technology roadmaps, cloud advisory, cybersecurity assessments, and managed IT services.',
        href: '/services/it-consulting-it-services',
        type: 'service',
      },
    ],
  },
];

export function getTopicHub(slug: string): TopicHub | undefined {
  return topicHubs.find((t) => t.slug === slug);
}
