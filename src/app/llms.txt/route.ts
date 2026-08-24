// EXPERIMENTAL — maintain this file alongside src/app/sitemap.ts.
// When routes are added or removed from the sitemap, update this file too.

import { blogPosts } from '@/data/blog';
import { comparisons } from '@/data/comparisons';
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

  return `# aibizmod

aibizmod Ltd. is a technology services firm that designs and builds web platforms, mobile applications, custom software, cloud infrastructure, AI automation systems, machine learning pipelines, digital marketing systems, and customer experience tools for businesses of every size. The company is based in London and serves clients across the UK, USA, India, Singapore, and Australia. Contact: hello@aibizmod.com

## Core pages

${BASE}
${BASE}/about
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
${BASE}/automation-roi-calculator
${BASE}/ai-readiness-score
${BASE}/ai-visibility-prompts
${BASE}/how-we-audit-ai-visibility
${BASE}/ai-visibility-audit-report

## Topic hubs

${topicUrls}

## Comparison pages

${comparisonUrls}

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
