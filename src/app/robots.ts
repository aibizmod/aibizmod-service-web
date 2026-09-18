import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/*'],
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'ClaudeBot',
          'PerplexityBot',
          'Google-Extended',
          'Applebot-Extended',
          'Amazonbot',
          'cohere-ai',
          'Bytespider',
        ],
        allow: ['/', '/technology', '/blog', '/llms.txt', '/llms-full.txt'],
        disallow: ['/admin', '/admin/*'],
      },
    ],
    sitemap: 'https://aibizmod.com/sitemap.xml',
  };
}
