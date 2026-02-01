/**
 * SEO Metadata Tests
 * 
 * Tests for comprehensive SEO metadata configuration and structured data generation.
 * Validates that all metadata components are properly configured for search engine optimization.
 */

import { describe, it, expect } from '@jest/globals';
import { portfolioMetadata, generateStructuredData, generateJsonLdScript } from './metadata';
import { resumeData } from '@/lib/data/resume-data';

describe('SEO Metadata Configuration', () => {
  describe('portfolioMetadata', () => {
    it('should include all required basic metadata fields', () => {
      expect(portfolioMetadata.title).toBeDefined();
      expect(portfolioMetadata.description).toBeDefined();
      expect(portfolioMetadata.keywords).toBeDefined();
      expect(portfolioMetadata.authors).toBeDefined();
      expect(portfolioMetadata.creator).toBe(resumeData.personalInfo.name);
      expect(portfolioMetadata.publisher).toBe(resumeData.personalInfo.name);
    });

    it('should include comprehensive Open Graph metadata', () => {
      expect(portfolioMetadata.openGraph).toBeDefined();
      expect(portfolioMetadata.openGraph?.title).toBeDefined();
      expect(portfolioMetadata.openGraph?.description).toBeDefined();
      expect(portfolioMetadata.openGraph?.url).toBe('https://sethops.org');
      expect(portfolioMetadata.openGraph?.type).toBe('website');
      expect(portfolioMetadata.openGraph?.locale).toBe('en_US');
      expect(portfolioMetadata.openGraph?.images).toBeDefined();
    });

    it('should include Twitter Card metadata', () => {
      expect(portfolioMetadata.twitter).toBeDefined();
      expect(portfolioMetadata.twitter?.card).toBe('summary_large_image');
      expect(portfolioMetadata.twitter?.title).toBeDefined();
      expect(portfolioMetadata.twitter?.description).toBeDefined();
      expect(portfolioMetadata.twitter?.creator).toBe('@sethfreeman');
    });

    it('should include proper robots configuration', () => {
      expect(portfolioMetadata.robots).toBeDefined();
      expect(portfolioMetadata.robots?.index).toBe(true);
      expect(portfolioMetadata.robots?.follow).toBe(true);
      expect(portfolioMetadata.robots?.googleBot).toBeDefined();
    });

    it('should include canonical URL', () => {
      expect(portfolioMetadata.alternates?.canonical).toBe('https://sethops.org');
    });

    it('should include site verification placeholders', () => {
      expect(portfolioMetadata.verification).toBeDefined();
      expect(portfolioMetadata.verification?.google).toBeDefined();
    });

    it('should include keywords derived from resume data', () => {
      const keywords = portfolioMetadata.keywords as string[];
      expect(keywords).toContain(resumeData.personalInfo.name);
      expect(keywords).toContain('DevOps Engineer');
      expect(keywords).toContain('AWS');
      expect(keywords).toContain('Kubernetes');
    });
  });

  describe('generateStructuredData', () => {
    const structuredData = generateStructuredData();

    it('should generate person schema with correct information', () => {
      expect(structuredData.person['@context']).toBe('https://schema.org');
      expect(structuredData.person['@type']).toBe('Person');
      expect(structuredData.person.name).toBe(resumeData.personalInfo.name);
      expect(structuredData.person.jobTitle).toBe(resumeData.personalInfo.title);
      expect(structuredData.person.email).toBe(resumeData.personalInfo.email);
      expect(structuredData.person.url).toBe('https://sethops.org');
    });

    it('should generate website schema', () => {
      expect(structuredData.website['@context']).toBe('https://schema.org');
      expect(structuredData.website['@type']).toBe('WebSite');
      expect(structuredData.website.name).toContain(resumeData.personalInfo.name);
      expect(structuredData.website.url).toBe('https://sethops.org');
    });

    it('should generate professional service schema', () => {
      expect(structuredData.professionalService['@context']).toBe('https://schema.org');
      expect(structuredData.professionalService['@type']).toBe('ProfessionalService');
      expect(structuredData.professionalService.provider.name).toBe(resumeData.personalInfo.name);
    });

    it('should generate breadcrumb schema', () => {
      expect(structuredData.breadcrumb['@context']).toBe('https://schema.org');
      expect(structuredData.breadcrumb['@type']).toBe('BreadcrumbList');
      expect(structuredData.breadcrumb.itemListElement).toHaveLength(1);
    });

    it('should include skills in person schema', () => {
      expect(structuredData.person.knowsAbout).toBeDefined();
      expect(Array.isArray(structuredData.person.knowsAbout)).toBe(true);
      expect(structuredData.person.knowsAbout.length).toBeGreaterThan(0);
    });

    it('should include social media links', () => {
      expect(structuredData.person.sameAs).toContain(resumeData.personalInfo.linkedin);
      expect(structuredData.person.sameAs).toContain(resumeData.personalInfo.github);
    });
  });

  describe('generateJsonLdScript', () => {
    const jsonLdScript = generateJsonLdScript();

    it('should generate valid JSON-LD script object', () => {
      expect(jsonLdScript.__html).toBeDefined();
      expect(typeof jsonLdScript.__html).toBe('string');
    });

    it('should contain valid JSON', () => {
      expect(() => JSON.parse(jsonLdScript.__html)).not.toThrow();
    });

    it('should include all structured data schemas', () => {
      const parsedData = JSON.parse(jsonLdScript.__html);
      expect(Array.isArray(parsedData)).toBe(true);
      expect(parsedData.length).toBe(4); // person, website, professionalService, breadcrumb
      
      const types = parsedData.map((item: any) => item['@type']);
      expect(types).toContain('Person');
      expect(types).toContain('WebSite');
      expect(types).toContain('ProfessionalService');
      expect(types).toContain('BreadcrumbList');
    });
  });

  describe('SEO Requirements Validation', () => {
    it('should meet requirement 5.1 - appropriate SEO meta tags', () => {
      expect(portfolioMetadata.title).toBeDefined();
      expect(portfolioMetadata.description).toBeDefined();
      expect(portfolioMetadata.keywords).toBeDefined();
    });

    it('should meet requirement 5.2 - descriptive title tag', () => {
      const title = portfolioMetadata.title as any;
      const titleString = typeof title === 'object' ? title.default : title;
      expect(titleString).toContain('Seth Freeman');
      expect(titleString).toContain('DevOps');
    });

    it('should meet requirement 5.3 - meta description', () => {
      expect(portfolioMetadata.description).toContain('Seth Freeman');
      expect(portfolioMetadata.description).toContain('DevOps');
      expect(portfolioMetadata.description).toContain('experience');
    });

    it('should meet requirement 5.4 - Open Graph tags', () => {
      expect(portfolioMetadata.openGraph).toBeDefined();
      expect(portfolioMetadata.openGraph?.title).toBeDefined();
      expect(portfolioMetadata.openGraph?.description).toBeDefined();
      expect(portfolioMetadata.openGraph?.images).toBeDefined();
    });

    it('should meet requirement 5.5 - structured data markup', () => {
      const structuredData = generateStructuredData();
      expect(structuredData.person['@type']).toBe('Person');
      expect(structuredData.person.name).toBe(resumeData.personalInfo.name);
      expect(structuredData.person.jobTitle).toBe(resumeData.personalInfo.title);
    });
  });
});