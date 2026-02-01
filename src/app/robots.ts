import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

/**
 * Generate robots.txt for search engine crawling directives
 * 
 * This configuration allows all search engines to crawl the portfolio website
 * and provides the sitemap location for optimal indexing.
 * 
 * Requirements: 5.6 - Generate sitemap configuration for search engines
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://sethops.org';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/static/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/_next/static/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/_next/static/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}