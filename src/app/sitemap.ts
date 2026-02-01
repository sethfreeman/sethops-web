import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

/**
 * Generate sitemap for search engine crawling
 * 
 * This sitemap includes all pages and sections of the portfolio website
 * with appropriate priority and change frequency settings for SEO optimization.
 * 
 * Requirements: 5.6 - Generate sitemap configuration for search engines
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sethops.org';
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    // Add section-specific URLs for better SEO
    {
      url: `${baseUrl}#summary`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}#experience`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}#skills`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}#education`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}#contact`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
  ];
}