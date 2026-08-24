import type { MetadataRoute } from 'next';
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

// Core static routes plus each individual service page and sub‑page
const staticRoutes = [
  '',
  '/about',
  '/blog',
  '/contact',
  '/faq',
  '/services',
  '/comparisons',
  '/topics',
  '/tools',
  '/tools/brand-audit',
  '/brand-audit',
  '/keywords',
  '/social-media-platforms',
  '/ai-visibility-prompts',
  '/ai-visibility-audit-report',
  '/how-we-audit-ai-visibility',
  '/careers',
  '/clients',
  '/privacy',
  '/terms',
  // All top‑level service pages
  ...services.map((s) => `/services/${s.id}`),
  // All sub‑service pages
  ...Object.entries(subServiceSlugs).flatMap(([parent, slugs]) =>
    slugs.map((slug) => `/services/${parent}/${slug}`)
  ),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const priorityByRoute: Record<string, number> = {
    '': 1,
    '/about': 0.7,
    '/blog': 0.7,
    '/contact': 0.7,
    '/faq': 0.7,
    '/services': 0.9,
    '/comparisons': 0.7,
    '/topics': 0.7,
    '/tools': 0.6,
    '/tools/brand-audit': 0.6,
    '/brand-audit': 0.5,
    '/keywords': 0.6,
    '/social-media-platforms': 0.6,
    '/ai-visibility-prompts': 0.6,
    '/ai-visibility-audit-report': 0.7,
    '/how-we-audit-ai-visibility': 0.6,
    '/careers': 0.5,
    '/clients': 0.5,
    '/privacy': 0.3,
    '/terms': 0.3,
  };

  const statics = staticRoutes.map((route) => ({
    url: `${BASE}${route}`,
    changeFrequency: 'monthly' as const,
    priority: priorityByRoute[route] ?? 0.8,
  }));

  const extraPages = [
    { url: `${BASE}/automation-roi-calculator`, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE}/ai-readiness-score`, changeFrequency: 'monthly' as const, priority: 0.6 },
  ];

  const topicPages = topicHubs.map((t) => ({
    url: `${BASE}/topics/${t.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const comparisonPages = comparisons.map((c) => ({
    url: `${BASE}/comparisons/${c.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
    lastModified: c.date ? new Date(c.date) : undefined,
  }));

  const posts = blogPosts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
    lastModified: post.date ? new Date(post.date) : undefined,
  }));

  return [...statics, ...extraPages, ...topicPages, ...comparisonPages, ...posts];
}
