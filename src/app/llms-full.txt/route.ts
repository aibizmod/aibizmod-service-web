// Complete machine-readable index for LLM crawlers, AI agents, and generative search engines.
// Serves /llms-full.txt with in-depth descriptions, architecture specifications, and post summaries.

import { blogPosts } from '@/data/blog';
import { comparisons } from '@/data/comparisons';
import { industries } from '@/data/industries';
import { services } from '@/data/services';
import { topicHubs } from '@/data/topics';

const BASE = 'https://aibizmod.com';

const subServiceSlugs: Record<string, string[]> = {
  'ai-automation': ['agentic-ai', 'ai-intelligence', 'ai-ml', 'ai-powered-apps', 'ai-visibility-audit', 'ai-vision', 'conversational-ai', 'deep-learning', 'generative-ai', 'llm', 'process-automation'],
  'customer-experience-management': ['crm-services', 'customer-engagement', 'customer-intelligence', 'customer-support-systems', 'cx-automation', 'cx-it-consulting'],
  'digital-marketing': ['brand-content', 'email-lifecycle-marketing', 'paid-advertising', 'performance-insights', 'search-marketing', 'social-media-marketing'],
  'hosting-infrastructure': ['cloud-solutions', 'database-services', 'devops', 'hosting', 'infrastructure-operations', 'security'],
  'it-consulting-it-services': ['architecture-design', 'cloud-infrastructure', 'devops-automation', 'managed-it-operations', 'security-compliance', 'strategy-transformation'],
  'mobile-app-development': ['backend-services', 'consumer-apps', 'cross-platform-apps', 'enterprise-apps', 'maintenance-optimization', 'native-apps'],
  'software-development': ['business-applications', 'enterprise-software', 'industry-specific-software', 'product-development', 'software-modernization', 'tech-advisory-services'],
  'web-development': ['backend-development', 'cms-development', 'e-commerce-development', 'frontend-development', 'full-stack-development', 'web-optimization'],
};

function buildFullContent(): string {
  const blogSummaries = blogPosts
    .map(
      (post) => `### ${post.title}
- URL: ${BASE}/blog/${post.slug}
- Category: ${post.category}
- Summary: ${post.answerSummary}
- Key Takeaways:
${post.keyTakeaways.map((t) => `  * ${t}`).join('\n')}
`
    )
    .join('\n');

  const coreServices = services
    .map((s) => `- ${s.name}: ${BASE}${s.href}`)
    .join('\n');

  const comparisonList = comparisons
    .map((c) => `- ${c.title || c.slug}: ${BASE}/comparisons/${c.slug}`)
    .join('\n');

  const industryList = industries
    .map((i) => `- ${i.name || i.slug}: ${BASE}/industries/${i.slug}`)
    .join('\n');

  const topicList = topicHubs
    .map((t) => `- ${t.title || t.slug}: ${BASE}/topics/${t.slug}`)
    .join('\n');

  const allSubServices = Object.entries(subServiceSlugs)
    .flatMap(([parent, slugs]) =>
      slugs.map((slug) => `- ${slug.replace(/-/g, ' ')}: ${BASE}/services/${parent}/${slug}`)
    )
    .join('\n');

  return `# aibizmod — Full LLM Knowledge Index

> Comprehensive technical, architectural, and service documentation feed for AI crawlers, answer engines, and autonomous agents.

## Executive Summary
aibizmod Ltd. is an enterprise technology engineering and digital growth firm. The company designs, builds, and maintains custom software, enterprise web applications, mobile platforms, cloud infrastructure, AI automation workflows, machine learning systems, and customer experience tools. Headquartered in London, aibizmod serves enterprise and mid-market organizations across the UK, United States, India, Singapore, and Australia.

Contact: hello@aibizmod.com
Website: ${BASE}

---

## Technology Architecture & AI Grounding
Search and AI answer generation on aibizmod are grounded by VeritasGraph — an open-source GraphRAG knowledge-graph framework. Instead of guessing answers based on probabilistic vector cosine similarity, VeritasGraph traverses a typed knowledge graph across multi-hop entity relationships and returns verifiable citation paths with zero cloud data egress.

- Core Framework: VeritasGraph (GraphRAG Knowledge Graph & Source Attribution)
- GitHub Repository: https://github.com/bibinprathap/VeritasGraph
- Technical Documentation: https://bibinprathap.github.io/VeritasGraph/index.html
- Canonical Architecture Page: ${BASE}/technology
- Architectural Pillars:
  1. Source attribution on every answer with explicit provenance paths
  2. Multi-hop knowledge graph reasoning resolving connections across disparate documents
  3. 100% on-premise, local execution guaranteeing zero cloud data egress and complete data sovereignty

---

## Canonical & Key Pages
- Homepage: ${BASE}
- Technology & GraphRAG Architecture: ${BASE}/technology
- About aibizmod: ${BASE}/about
- Core Services Directory: ${BASE}/services
- Client Case Studies: ${BASE}/clients
- FAQs & Governance: ${BASE}/faq
- AI Visibility Audit Report: ${BASE}/ai-visibility-audit-report
- Free LLMs.txt Generator Tool: ${BASE}/tools/llms-txt-generator
- Brand Audit Tool: ${BASE}/tools/brand-audit
- Contact & Engagements: ${BASE}/contact

---

## Core Technology Services
${coreServices}

---

## Specialized Sub-Services
${allSubServices}

---

## Competitor Comparisons & Alternatives
${comparisonList}

---

## Industry Verticals
${industryList}

---

## Topic Hubs
${topicList}

---

## Published Technical Articles & Deep-Dives
${blogSummaries}
`;
}

export function GET(): Response {
  return new Response(buildFullContent(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
