/**
 * SEO Utility Functions Tests
 * 
 * Tests for SEO utility functions including section metadata generation,
 * structured data validation, and social media meta tag generation.
 */

import { describe, it, expect } from '@jest/globals';
import {
  generateSectionMetadata,
  generateSectionBreadcrumb,
  generateFAQStructuredData,
  generateOrganizationStructuredData,
  generateSkillsStructuredData,
  validateStructuredData,
  generateSocialMetaTags,
} from './seo';
import { resumeData } from '@/lib/data/resume-data';

describe('SEO Utility Functions', () => {
  describe('generateSectionMetadata', () => {
    it('should generate metadata for summary section', () => {
      const metadata = generateSectionMetadata('summary');
      expect(metadata.title).toContain('Seth Freeman');
      expect(metadata.title).toContain('Professional Summary');
      expect(metadata.description).toContain('Professional summary');
    });

    it('should generate metadata for experience section', () => {
      const metadata = generateSectionMetadata('experience');
      expect(metadata.title).toContain('Work Experience');
      expect(metadata.description).toContain('work experience');
      expect(metadata.description).toContain('12+ years');
    });

    it('should generate metadata for skills section', () => {
      const metadata = generateSectionMetadata('skills');
      expect(metadata.title).toContain('Technical Skills');
      expect(metadata.description).toContain('technical skills');
    });

    it('should return default metadata for unknown section', () => {
      const metadata = generateSectionMetadata('unknown');
      expect(metadata.title).toContain('Seth Freeman');
      expect(metadata.description).toContain('Professional portfolio');
    });
  });

  describe('generateSectionBreadcrumb', () => {
    it('should generate valid breadcrumb structured data', () => {
      const breadcrumb = generateSectionBreadcrumb('experience');
      expect(breadcrumb['@context']).toBe('https://schema.org');
      expect(breadcrumb['@type']).toBe('BreadcrumbList');
      expect(breadcrumb.itemListElement).toHaveLength(2);
      expect(breadcrumb.itemListElement[0].name).toBe('Home');
      expect(breadcrumb.itemListElement[1].name).toBe('Experience');
    });

    it('should include correct URLs in breadcrumb', () => {
      const breadcrumb = generateSectionBreadcrumb('skills');
      expect(breadcrumb.itemListElement[0].item).toBe('https://sethops.org');
      expect(breadcrumb.itemListElement[1].item).toBe('https://sethops.org#skills');
    });
  });

  describe('generateFAQStructuredData', () => {
    const faqData = generateFAQStructuredData();

    it('should generate valid FAQ structured data', () => {
      expect(faqData['@context']).toBe('https://schema.org');
      expect(faqData['@type']).toBe('FAQPage');
      expect(Array.isArray(faqData.mainEntity)).toBe(true);
      expect(faqData.mainEntity.length).toBeGreaterThan(0);
    });

    it('should include questions about DevOps experience', () => {
      const questions = faqData.mainEntity.map((entity: any) => entity.name);
      expect(questions.some((q: string) => q.includes('DevOps'))).toBe(true);
    });

    it('should include contact information question', () => {
      const questions = faqData.mainEntity.map((entity: any) => entity.name);
      expect(questions.some((q: string) => q.includes('contact'))).toBe(true);
    });

    it('should have properly formatted answers', () => {
      faqData.mainEntity.forEach((entity: any) => {
        expect(entity['@type']).toBe('Question');
        expect(entity.acceptedAnswer['@type']).toBe('Answer');
        expect(entity.acceptedAnswer.text).toBeDefined();
        expect(entity.acceptedAnswer.text.length).toBeGreaterThan(0);
      });
    });
  });

  describe('generateOrganizationStructuredData', () => {
    const orgData = generateOrganizationStructuredData();

    it('should generate valid organization structured data', () => {
      expect(orgData['@context']).toBe('https://schema.org');
      expect(orgData['@type']).toBe('Organization');
      expect(orgData.name).toBe(resumeData.experience[0].company);
    });

    it('should include employee information', () => {
      expect(orgData.employee['@type']).toBe('Person');
      expect(orgData.employee.name).toBe(resumeData.personalInfo.name);
      expect(orgData.employee.jobTitle).toBe(resumeData.experience[0].title);
    });

    it('should include address information', () => {
      expect(orgData.address['@type']).toBe('PostalAddress');
      expect(orgData.address.addressCountry).toBe('US');
    });
  });

  describe('generateSkillsStructuredData', () => {
    const skillsData = generateSkillsStructuredData();

    it('should generate structured data for all skill categories', () => {
      expect(Array.isArray(skillsData)).toBe(true);
      expect(skillsData.length).toBe(resumeData.skills.length);
    });

    it('should have valid structure for each skill category', () => {
      skillsData.forEach((skillCategory: any) => {
        expect(skillCategory['@context']).toBe('https://schema.org');
        expect(skillCategory['@type']).toBe('DefinedTerm');
        expect(skillCategory.name).toBeDefined();
        expect(skillCategory.inDefinedTermSet).toBeDefined();
      });
    });

    it('should include all skills from resume data', () => {
      const allSkillNames = skillsData.map((category: any) => category.name);
      resumeData.skills.forEach((skillCategory) => {
        expect(allSkillNames).toContain(skillCategory.category);
      });
    });
  });

  describe('validateStructuredData', () => {
    it('should validate correct structured data', () => {
      const validData = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Test Person',
      };
      expect(validateStructuredData(validData)).toBe(true);
    });

    it('should reject data without @context', () => {
      const invalidData = {
        '@type': 'Person',
        name: 'Test Person',
      };
      expect(validateStructuredData(invalidData)).toBe(false);
    });

    it('should reject data without @type', () => {
      const invalidData = {
        '@context': 'https://schema.org',
        name: 'Test Person',
      };
      expect(validateStructuredData(invalidData)).toBe(false);
    });

    it('should reject data with wrong @context', () => {
      const invalidData = {
        '@context': 'https://example.com',
        '@type': 'Person',
        name: 'Test Person',
      };
      expect(validateStructuredData(invalidData)).toBe(false);
    });
  });

  describe('generateSocialMetaTags', () => {
    it('should generate default social meta tags', () => {
      const metaTags = generateSocialMetaTags();
      expect(metaTags.openGraph.title).toContain('Seth Freeman');
      expect(metaTags.openGraph.url).toBe('https://sethops.org');
      expect(metaTags.twitter.card).toBe('summary_large_image');
    });

    it('should generate section-specific social meta tags', () => {
      const metaTags = generateSocialMetaTags('experience');
      expect(metaTags.openGraph.title).toContain('Work Experience');
      expect(metaTags.openGraph.url).toBe('https://sethops.org#experience');
      expect(metaTags.openGraph.description).toContain('work experience');
    });

    it('should include proper image URLs', () => {
      const metaTags = generateSocialMetaTags();
      expect(metaTags.openGraph.images[0].url).toBe('https://sethops.org/og-image.jpg');
      expect(metaTags.twitter.images[0]).toBe('https://sethops.org/twitter-image.jpg');
    });
  });
});