/**
 * SEO Utility Functions
 * 
 * This file contains utility functions for SEO optimization including
 * schema generation, metadata helpers, and structured data utilities.
 */

import { resumeData } from '@/lib/data/resume-data';

/**
 * Generate page-specific metadata for different sections
 */
export function generateSectionMetadata(section: string) {
  const { personalInfo } = resumeData;
  const baseTitle = `${personalInfo.name} - ${personalInfo.title}`;
  
  const sectionMetadata = {
    summary: {
      title: `${baseTitle} | Professional Summary`,
      description: `Professional summary and overview of ${personalInfo.name}'s experience in DevOps engineering and cloud architecture.`,
    },
    experience: {
      title: `${baseTitle} | Work Experience`,
      description: `Detailed work experience and career history of ${personalInfo.name}, showcasing 12+ years in DevOps and technical leadership.`,
    },
    skills: {
      title: `${baseTitle} | Technical Skills`,
      description: `Comprehensive technical skills and expertise of ${personalInfo.name} in cloud platforms, DevOps tools, and programming languages.`,
    },
    education: {
      title: `${baseTitle} | Education & Certifications`,
      description: `Educational background and professional certifications of ${personalInfo.name}, including AWS and Kubernetes certifications.`,
    },
    contact: {
      title: `${baseTitle} | Contact Information`,
      description: `Contact information and professional profiles for ${personalInfo.name}. Get in touch for DevOps and cloud architecture opportunities.`,
    },
  };

  return sectionMetadata[section as keyof typeof sectionMetadata] || {
    title: baseTitle,
    description: `Professional portfolio of ${personalInfo.name}`,
  };
}

/**
 * Generate breadcrumb structured data for a specific section
 */
export function generateSectionBreadcrumb(section: string) {
  const baseUrl = 'https://sethops.org';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: section.charAt(0).toUpperCase() + section.slice(1),
        item: `${baseUrl}#${section}`,
      },
    ],
  };
}

/**
 * Generate FAQ structured data for common questions
 */
export function generateFAQStructuredData() {
  const { personalInfo } = resumeData;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is ${personalInfo.name}'s experience in DevOps?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${personalInfo.name} has 12+ years of experience in DevOps engineering, cloud architecture, and technical leadership. He has worked with companies ranging from startups to Fortune 500 enterprises.`,
        },
      },
      {
        '@type': 'Question',
        name: 'What cloud platforms does Seth Freeman specialize in?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Seth specializes in Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform. He holds multiple AWS certifications including Solutions Architect Professional and DevOps Engineer Professional.`,
        },
      },
      {
        '@type': 'Question',
        name: 'What technologies and tools does Seth Freeman work with?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Seth works with a wide range of technologies including Kubernetes, Docker, Terraform, Jenkins, Python, Go, and various monitoring and observability tools like Prometheus, Grafana, and ELK Stack.`,
        },
      },
      {
        '@type': 'Question',
        name: `How can I contact ${personalInfo.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `You can contact ${personalInfo.name} via email at ${personalInfo.email} or connect with him on LinkedIn and GitHub through the links provided on his portfolio.`,
        },
      },
    ],
  };
}

/**
 * Generate organization structured data for current employer
 */
export function generateOrganizationStructuredData() {
  const currentJob = resumeData.experience[0];
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: currentJob.company,
    address: {
      '@type': 'PostalAddress',
      addressLocality: currentJob.location.split(', ')[0],
      addressRegion: currentJob.location.split(', ')[1],
      addressCountry: 'US',
    },
    employee: {
      '@type': 'Person',
      name: resumeData.personalInfo.name,
      jobTitle: currentJob.title,
    },
  };
}

/**
 * Generate skills and expertise structured data
 */
export function generateSkillsStructuredData() {
  const { personalInfo, skills } = resumeData;
  
  return skills.map((skillCategory) => ({
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: skillCategory.category,
    description: `${personalInfo.name}'s expertise in ${skillCategory.category}`,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'Technical Skills',
      hasDefinedTerm: skillCategory.skills.map((skill) => ({
        '@type': 'DefinedTerm',
        name: skill,
      })),
    },
  }));
}

/**
 * Validate structured data format
 */
export function validateStructuredData(data: Record<string, unknown>): boolean {
  try {
    // Basic validation for required schema.org properties
    if (!data['@context'] || !data['@type']) {
      return false;
    }
    
    // Ensure @context is schema.org
    if (data['@context'] !== 'https://schema.org') {
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Structured data validation error:', error);
    return false;
  }
}

/**
 * Generate social media meta tags for specific content
 */
export function generateSocialMetaTags(section?: string) {
  const { personalInfo } = resumeData;
  const baseUrl = 'https://sethops.org';
  
  const sectionContent = section ? generateSectionMetadata(section) : null;
  const title = sectionContent?.title || `${personalInfo.name} - ${personalInfo.title}`;
  const description = sectionContent?.description || `Professional portfolio of ${personalInfo.name}`;
  
  return {
    openGraph: {
      title,
      description,
      url: section ? `${baseUrl}#${section}` : baseUrl,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/twitter-image.jpg`],
    },
  };
}