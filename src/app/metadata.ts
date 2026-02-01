/**
 * SEO Metadata Configuration for Seth Freeman Portfolio
 * 
 * This file contains comprehensive SEO metadata configuration including
 * Open Graph tags, Twitter cards, and structured data for optimal
 * search engine optimization and social media sharing.
 * 
 * Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6
 */

import { Metadata } from 'next';
import { resumeData } from '@/lib/data/resume-data';

const { personalInfo, summary, skills } = resumeData;

// Base URL for the portfolio website
const baseUrl = 'https://sethops.org';

// SEO-optimized title and description
const siteTitle = `${personalInfo.name} - ${personalInfo.title}`;
const siteDescription = `Professional portfolio of ${personalInfo.name}, a ${personalInfo.title} with 20+ years of experience in cloud architecture, DevOps engineering, and technical leadership. Specializing in AWS, Kubernetes, and scalable infrastructure solutions.`;

// Keywords derived from skills and experience
const siteKeywords = [
  personalInfo.name,
  'DevOps Engineer',
  'Cloud Architecture',
  'AWS',
  'Kubernetes',
  'Infrastructure as Code',
  'CI/CD',
  'Technical Leadership',
  'Platform Engineering',
  'Site Reliability Engineering',
  'Terraform',
  'Docker',
  'Microservices',
  'Monitoring',
  'Automation',
  'San Francisco',
  'Portfolio',
  'Resume'
];

/**
 * Comprehensive metadata configuration for the portfolio website
 */
export const portfolioMetadata: Metadata = {
  // Basic metadata
  title: {
    default: siteTitle,
    template: `%s | ${personalInfo.name}`,
  },
  description: siteDescription,
  keywords: siteKeywords,
  
  // Author and creator information
  authors: [{ 
    name: personalInfo.name, 
    url: baseUrl 
  }],
  creator: personalInfo.name,
  publisher: personalInfo.name,
  
  // Application metadata
  applicationName: `${personalInfo.name} Portfolio`,
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  
  // Format detection
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  // Open Graph metadata for social media sharing
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: `${personalInfo.name} Portfolio`,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${personalInfo.name} - Professional Portfolio`,
        type: 'image/jpeg',
      },
    ],
  },
  
  // Twitter Card metadata
  twitter: {
    card: 'summary_large_image',
    site: '@sethfreeman',
    creator: '@sethfreeman',
    title: siteTitle,
    description: siteDescription,
    images: [`${baseUrl}/twitter-image.jpg`],
  },
  
  // Robots and indexing
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Canonical URL
  alternates: {
    canonical: baseUrl,
  },
  
  // Site verification (placeholder for actual verification codes)
  verification: {
    google: 'google-site-verification-placeholder',
    yandex: 'yandex-verification-placeholder',
    yahoo: 'yahoo-site-verification-placeholder',
    other: {
      'msvalidate.01': 'bing-site-verification-placeholder',
    },
  },
  
  // Category and classification
  category: 'technology',
  
  // Additional metadata
  other: {
    'theme-color': '#ffffff',
    'color-scheme': 'light dark',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': personalInfo.name,
    'application-name': `${personalInfo.name} Portfolio`,
    'msapplication-TileColor': '#ffffff',
    'msapplication-config': '/browserconfig.xml',
  },
};

/**
 * Generate JSON-LD structured data for professional information
 * This helps search engines understand the content and context of the portfolio
 */
export function generateStructuredData() {
  // Person schema for Seth Freeman
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personalInfo.name,
    jobTitle: personalInfo.title,
    description: summary,
    url: baseUrl,
    email: personalInfo.email,
    telephone: personalInfo.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: personalInfo.location.split(', ')[0],
      addressRegion: personalInfo.location.split(', ')[1],
      addressCountry: 'US',
    },
    sameAs: [
      personalInfo.linkedin,
      personalInfo.github,
    ],
    knowsAbout: skills.flatMap(category => category.skills),
    hasOccupation: {
      '@type': 'Occupation',
      name: personalInfo.title,
      occupationLocation: {
        '@type': 'City',
        name: personalInfo.location,
      },
      skills: skills.map(category => category.category).join(', '),
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'University of California, Berkeley',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Berkeley',
        addressRegion: 'CA',
        addressCountry: 'US',
      },
    },
  };

  // Website schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${personalInfo.name} Portfolio`,
    description: siteDescription,
    url: baseUrl,
    author: {
      '@type': 'Person',
      name: personalInfo.name,
    },
    inLanguage: 'en-US',
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: {
      '@type': 'Person',
      name: personalInfo.name,
    },
  };

  // Professional service schema
  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `${personalInfo.name} - DevOps & Cloud Architecture Services`,
    description: `Professional DevOps engineering and cloud architecture services by ${personalInfo.name}`,
    provider: {
      '@type': 'Person',
      name: personalInfo.name,
      jobTitle: personalInfo.title,
      email: personalInfo.email,
      url: baseUrl,
    },
    areaServed: {
      '@type': 'Place',
      name: 'San Francisco Bay Area',
    },
    serviceType: [
      'DevOps Engineering',
      'Cloud Architecture',
      'Infrastructure as Code',
      'CI/CD Pipeline Development',
      'Kubernetes Management',
      'AWS Solutions Architecture',
      'Technical Leadership',
      'Platform Engineering',
    ],
  };

  // Breadcrumb schema for navigation
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
    ],
  };

  return {
    person: personSchema,
    website: websiteSchema,
    professionalService: professionalServiceSchema,
    breadcrumb: breadcrumbSchema,
  };
}

/**
 * Generate JSON-LD script tag for structured data
 */
export function generateJsonLdScript() {
  const structuredData = generateStructuredData();
  
  return {
    __html: JSON.stringify([
      structuredData.person,
      structuredData.website,
      structuredData.professionalService,
      structuredData.breadcrumb,
    ]),
  };
}