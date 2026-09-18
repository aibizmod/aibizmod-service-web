// EXPERIMENTAL — maintain this file alongside src/app/sitemap.ts.
// When routes are added or removed from the sitemap, update this file too.

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

function buildContent(): string {
  const topicUrls = topicHubs
    .map((t) => `${BASE}/topics/${t.slug}`)
    .join('\n');

  const comparisonUrls = comparisons
    .map((c) => `${BASE}/comparisons/${c.slug}`)
    .join('\n');

  const industryUrls = industries
    .map((i) => `${BASE}/industries/${i.slug}`)
    .join('\n');

  const blogUrls = blogPosts
    .map((post) => `${BASE}/blog/${post.slug}`)
    .join('\n');

  const topServiceUrls = services
    .map((s) => `${BASE}${s.href}`)
    .join('\n');

  const allSubServiceUrls = Object.entries(subServiceSlugs)
    .flatMap(([parent, slugs]) =>
      slugs.map((slug) => `${BASE}/services/${parent}/${slug}`)
    )
    .join('\n');

  return `# aibizmod — LLM Index

## Summary
aibizmod Ltd. designs and builds enterprise web platforms, mobile applications, custom software, cloud infrastructure, AI automation systems, and digital marketing platforms. AI search and answers are grounded by the VeritasGraph GraphRAG knowledge-graph framework with verifiable source attribution, multi-hop reasoning, and zero data egress.

## Architecture & Grounding
- VeritasGraph (GraphRAG knowledge graph, source attribution): https://github.com/bibinprathap/VeritasGraph
- VeritasGraph Docs: https://bibinprathap.github.io/VeritasGraph/index.html
- aibizmod Technology Architecture: ${BASE}/technology

## Key Pages
- ${BASE}/technology — how VeritasGraph grounds answers with citations, multi-hop graph reasoning, and sovereign local execution
- ${BASE}/blog/why-we-grounded-our-ai-in-graphrag-veritasgraph — comparative technical teardown of vector RAG vs. GraphRAG with verifiable citations
- ${BASE}/about — company background, engineering philosophy, and global delivery centers
- ${BASE}/services/ai-automation — enterprise AI automation, agentic workflows, and LLM engineering
- ${BASE}/services/ai-automation/ai-visibility-audit — AI search visibility and GEO benchmarking

## Keywords
knowledge graph, GraphRAG, VeritasGraph, source attribution, verifiable AI, multi-hop reasoning, on-prem AI, generative engine optimization, GEO, deterministic AI search, enterprise AI automation

## Core pages

${BASE}
${BASE}/about
${BASE}/technology
${BASE}/services
${BASE}/contact
${BASE}/faq
${BASE}/blog

## Service pages

${topServiceUrls}

## Sub‑service pages

${allSubServiceUrls}

## Tools

${BASE}/tools/llms-txt-generator
${BASE}/tools/brand-audit
${BASE}/ai-visibility-audit-report

## Topic hubs

${topicUrls}

## Comparison pages

${comparisonUrls}

## Industries

${industryUrls}

## Blog posts

${blogUrls}
`;
}

export function GET(): Response {
  return new Response(buildContent(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
