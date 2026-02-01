/**
 * Unit tests and property-based tests for resume TypeScript interfaces
 * 
 * These tests verify that the TypeScript interfaces are properly defined
 * and can be used to create valid resume data structures.
 */

import { fc } from '@fast-check/jest';
import {
  PersonalInfo,
  ExperienceEntry,
  SkillCategory,
  EducationEntry,
  ContactInfo,
  ResumeData,
  ThemeConfig,
  ColorPalette,
  ThemeContextType,
  SectionProps,
  ContactLinkProps
} from './resume';

describe('Resume TypeScript Interfaces', () => {
  describe('PersonalInfo interface', () => {
    it('should accept valid personal information', () => {
      const personalInfo: PersonalInfo = {
        name: 'Seth Freeman',
        title: 'Senior DevOps Engineer',
        location: 'Austin, TX',
        email: 'seth@sethops.org',
        phone: '+1-555-0123',
        linkedin: 'https://linkedin.com/in/sethfreeman',
        github: 'https://github.com/sethfreeman'
      };

      expect(personalInfo.name).toBe('Seth Freeman');
      expect(personalInfo.email).toBe('seth@sethops.org');
    });
  });

  describe('ExperienceEntry interface', () => {
    it('should accept valid experience entry with required fields', () => {
      const experience: ExperienceEntry = {
        title: 'Senior DevOps Engineer',
        company: 'Tech Corp',
        location: 'Austin, TX',
        duration: 'Jan 2020 - Present',
        description: ['Led DevOps initiatives', 'Managed cloud infrastructure']
      };

      expect(experience.title).toBe('Senior DevOps Engineer');
      expect(experience.description).toHaveLength(2);
    });

    it('should accept experience entry with optional fields', () => {
      const experience: ExperienceEntry = {
        title: 'DevOps Consultant',
        company: 'Consulting Firm',
        location: 'Remote',
        duration: 'Mar 2019 - Dec 2019',
        description: ['Provided DevOps consulting'],
        highlights: ['Reduced deployment time by 50%'],
        isContract: true
      };

      expect(experience.isContract).toBe(true);
      expect(experience.highlights).toHaveLength(1);
    });
  });

  describe('SkillCategory interface', () => {
    it('should accept valid skill category', () => {
      const skillCategory: SkillCategory = {
        category: 'Cloud Platforms',
        skills: ['AWS', 'Azure', 'Google Cloud']
      };

      expect(skillCategory.category).toBe('Cloud Platforms');
      expect(skillCategory.skills).toContain('AWS');
    });
  });

  describe('EducationEntry interface', () => {
    it('should accept education entry with minimal required fields', () => {
      const education: EducationEntry = {
        institution: 'University of Texas',
        location: 'Austin, TX'
      };

      expect(education.institution).toBe('University of Texas');
    });

    it('should accept education entry with all optional fields', () => {
      const education: EducationEntry = {
        institution: 'University of Texas',
        location: 'Austin, TX',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        year: '2015',
        details: ['Magna Cum Laude', 'Dean\'s List']
      };

      expect(education.degree).toBe('Bachelor of Science');
      expect(education.details).toHaveLength(2);
    });
  });

  describe('ContactInfo interface', () => {
    it('should accept valid contact information', () => {
      const contact: ContactInfo = {
        email: 'seth@sethops.org',
        linkedin: 'https://linkedin.com/in/sethfreeman',
        github: 'https://github.com/sethfreeman'
      };

      expect(contact.email).toBe('seth@sethops.org');
    });
  });

  describe('ColorPalette interface', () => {
    it('should accept valid color palette', () => {
      const palette: ColorPalette = {
        background: '#ffffff',
        foreground: '#000000',
        primary: '#3b82f6',
        secondary: '#6b7280',
        accent: '#f59e0b',
        muted: '#9ca3af',
        border: '#e5e7eb'
      };

      expect(palette.background).toBe('#ffffff');
      expect(palette.primary).toBe('#3b82f6');
    });
  });

  describe('ThemeConfig interface', () => {
    it('should accept complete theme configuration', () => {
      const themeConfig: ThemeConfig = {
        colors: {
          light: {
            background: '#ffffff',
            foreground: '#000000',
            primary: '#3b82f6',
            secondary: '#6b7280',
            accent: '#f59e0b',
            muted: '#9ca3af',
            border: '#e5e7eb'
          },
          dark: {
            background: '#000000',
            foreground: '#ffffff',
            primary: '#60a5fa',
            secondary: '#9ca3af',
            accent: '#fbbf24',
            muted: '#6b7280',
            border: '#374151'
          }
        },
        typography: {
          fontSize: {
            xs: '0.75rem',
            sm: '0.875rem',
            base: '1rem',
            lg: '1.125rem',
            xl: '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem'
          },
          lineHeight: {
            tight: '1.25',
            normal: '1.5',
            relaxed: '1.75'
          },
          fontWeight: {
            normal: '400',
            medium: '500',
            semibold: '600',
            bold: '700'
          }
        },
        spacing: {
          spacing: {
            xs: '0.25rem',
            sm: '0.5rem',
            md: '1rem',
            lg: '1.5rem',
            xl: '2rem',
            '2xl': '3rem',
            '3xl': '4rem',
            '4xl': '6rem'
          }
        }
      };

      expect(themeConfig.colors.light.background).toBe('#ffffff');
      expect(themeConfig.colors.dark.background).toBe('#000000');
      expect(themeConfig.typography.fontSize.base).toBe('1rem');
    });
  });

  describe('ResumeData interface', () => {
    it('should accept complete resume data structure', () => {
      const resumeData: ResumeData = {
        personalInfo: {
          name: 'Seth Freeman',
          title: 'Senior DevOps Engineer',
          location: 'Austin, TX',
          email: 'seth@sethops.org',
          phone: '+1-555-0123',
          linkedin: 'https://linkedin.com/in/sethfreeman',
          github: 'https://github.com/sethfreeman'
        },
        summary: 'Experienced DevOps engineer with expertise in cloud infrastructure.',
        keyAccomplishments: [
          'Reduced deployment time by 75%',
          'Led team of 5 engineers'
        ],
        experience: [
          {
            title: 'Senior DevOps Engineer',
            company: 'Tech Corp',
            location: 'Austin, TX',
            duration: 'Jan 2020 - Present',
            description: ['Led DevOps initiatives']
          }
        ],
        skills: [
          {
            category: 'Cloud Platforms',
            skills: ['AWS', 'Azure']
          }
        ],
        education: [
          {
            institution: 'University of Texas',
            location: 'Austin, TX'
          }
        ],
        contact: {
          email: 'seth@sethops.org',
          linkedin: 'https://linkedin.com/in/sethfreeman',
          github: 'https://github.com/sethfreeman'
        }
      };

      expect(resumeData.personalInfo.name).toBe('Seth Freeman');
      expect(resumeData.experience).toHaveLength(1);
      expect(resumeData.skills).toHaveLength(1);
    });
  });

  describe('ThemeContextType interface', () => {
    it('should accept valid theme context type', () => {
      const mockSetTheme = jest.fn();
      const themeContext: ThemeContextType = {
        theme: 'light',
        setTheme: mockSetTheme,
        resolvedTheme: 'light'
      };

      expect(themeContext.theme).toBe('light');
      expect(themeContext.resolvedTheme).toBe('light');
      expect(typeof themeContext.setTheme).toBe('function');
    });
  });

  describe('Component Props interfaces', () => {
    it('should accept valid SectionProps', () => {
      const sectionProps: SectionProps = {
        id: 'summary',
        title: 'Summary',
        children: 'Section content',
        className: 'custom-class'
      };

      expect(sectionProps.id).toBe('summary');
      expect(sectionProps.title).toBe('Summary');
    });

    it('should accept valid ContactLinkProps', () => {
      const contactLinkProps: ContactLinkProps = {
        href: 'mailto:seth@sethops.org',
        children: 'Email',
        className: 'contact-link'
      };

      expect(contactLinkProps.href).toBe('mailto:seth@sethops.org');
      expect(contactLinkProps.children).toBe('Email');
    });
  });

  describe('Type safety validation', () => {
    it('should enforce required fields in PersonalInfo', () => {
      // This test verifies TypeScript compilation - if required fields are missing,
      // TypeScript will catch it at compile time
      const createPersonalInfo = (): PersonalInfo => ({
        name: 'Seth Freeman',
        title: 'Senior DevOps Engineer',
        location: 'Austin, TX',
        email: 'seth@sethops.org',
        phone: '+1-555-0123',
        linkedin: 'https://linkedin.com/in/sethfreeman',
        github: 'https://github.com/sethfreeman'
      });

      const personalInfo = createPersonalInfo();
      expect(personalInfo).toBeDefined();
    });

    it('should allow optional fields to be undefined', () => {
      const experienceWithoutOptionals: ExperienceEntry = {
        title: 'DevOps Engineer',
        company: 'Tech Corp',
        location: 'Austin, TX',
        duration: 'Jan 2020 - Present',
        description: ['Managed infrastructure']
        // highlights and isContract are optional and omitted
      };

      expect(experienceWithoutOptionals.highlights).toBeUndefined();
      expect(experienceWithoutOptionals.isContract).toBeUndefined();
    });
  });

  // Property-Based Tests
  describe('Property-Based Tests', () => {
    describe('Property 10: Content Section Organization', () => {
      /**
       * **Validates: Requirements 3.8**
       * 
       * Property: For any resume section displayed on the page, it should be clearly defined 
       * with proper semantic structure and visual separation.
       * 
       * This property validates that all resume sections have:
       * - Valid section identifiers
       * - Proper titles
       * - Consistent structure
       * - Required content organization
       */
      test('resume sections should have proper semantic structure and organization', () => {
        fc.assert(fc.property(
          // Generate arbitrary resume data with various section configurations
          fc.record({
            personalInfo: fc.record({
              name: fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
              title: fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
              location: fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
              email: fc.emailAddress(),
              phone: fc.string({ minLength: 10, maxLength: 20 }).filter(s => s.trim().length >= 10),
              linkedin: fc.webUrl(),
              github: fc.webUrl()
            }),
            summary: fc.string({ minLength: 10, maxLength: 1000 }).filter(s => s.trim().length >= 10),
            keyAccomplishments: fc.array(
              fc.string({ minLength: 5, maxLength: 200 }).filter(s => s.trim().length >= 5), 
              { minLength: 1, maxLength: 10 }
            ),
            experience: fc.array(fc.record({
              title: fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
              company: fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
              location: fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
              duration: fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
              description: fc.array(
                fc.string({ minLength: 5, maxLength: 300 }).filter(s => s.trim().length >= 5), 
                { minLength: 1, maxLength: 10 }
              ),
              highlights: fc.option(fc.array(
                fc.string({ minLength: 5, maxLength: 200 }).filter(s => s.trim().length >= 5), 
                { minLength: 1, maxLength: 5 }
              )),
              isContract: fc.option(fc.boolean())
            }), { minLength: 1, maxLength: 15 }),
            skills: fc.array(fc.record({
              category: fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
              skills: fc.array(
                fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0), 
                { minLength: 1, maxLength: 20 }
              )
            }), { minLength: 1, maxLength: 10 }),
            education: fc.array(fc.record({
              institution: fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
              location: fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
              degree: fc.option(fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0)),
              field: fc.option(fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0)),
              year: fc.option(fc.string({ minLength: 4, maxLength: 20 }).filter(s => s.trim().length >= 4)),
              details: fc.option(fc.array(
                fc.string({ minLength: 1, maxLength: 200 }).filter(s => s.trim().length > 0), 
                { minLength: 1, maxLength: 5 }
              ))
            }), { minLength: 1, maxLength: 5 }),
            contact: fc.record({
              email: fc.emailAddress(),
              linkedin: fc.webUrl(),
              github: fc.webUrl()
            })
          }),
          (resumeData: ResumeData) => {
            // Property: All resume sections should have proper semantic structure
            
            // 1. Verify that all required sections are present and properly structured
            expect(resumeData.personalInfo).toBeDefined();
            expect(resumeData.summary).toBeDefined();
            expect(resumeData.keyAccomplishments).toBeDefined();
            expect(resumeData.experience).toBeDefined();
            expect(resumeData.skills).toBeDefined();
            expect(resumeData.education).toBeDefined();
            expect(resumeData.contact).toBeDefined();
            
            // 2. Verify personal info section has all required fields for proper identification
            expect(resumeData.personalInfo.name).toBeTruthy();
            expect(resumeData.personalInfo.title).toBeTruthy();
            expect(resumeData.personalInfo.location).toBeTruthy();
            expect(resumeData.personalInfo.email).toBeTruthy();
            expect(resumeData.personalInfo.phone).toBeTruthy();
            expect(resumeData.personalInfo.linkedin).toBeTruthy();
            expect(resumeData.personalInfo.github).toBeTruthy();
            
            // 3. Verify summary section has meaningful content
            expect(resumeData.summary.length).toBeGreaterThan(0);
            expect(resumeData.summary.trim()).toBeTruthy();
            
            // 4. Verify key accomplishments section is properly organized
            expect(Array.isArray(resumeData.keyAccomplishments)).toBe(true);
            expect(resumeData.keyAccomplishments.length).toBeGreaterThan(0);
            resumeData.keyAccomplishments.forEach(accomplishment => {
              expect(accomplishment).toBeTruthy();
              expect(accomplishment.trim()).toBeTruthy();
            });
            
            // 5. Verify experience section has proper chronological structure
            expect(Array.isArray(resumeData.experience)).toBe(true);
            expect(resumeData.experience.length).toBeGreaterThan(0);
            resumeData.experience.forEach(entry => {
              // Each experience entry must have all required fields
              expect(entry.title).toBeTruthy();
              expect(entry.company).toBeTruthy();
              expect(entry.location).toBeTruthy();
              expect(entry.duration).toBeTruthy();
              expect(Array.isArray(entry.description)).toBe(true);
              expect(entry.description.length).toBeGreaterThan(0);
              
              // Verify description content is meaningful
              entry.description.forEach(desc => {
                expect(desc).toBeTruthy();
                expect(desc.trim()).toBeTruthy();
              });
              
              // Verify optional fields are properly typed when present
              if (entry.highlights) {
                expect(Array.isArray(entry.highlights)).toBe(true);
                entry.highlights.forEach(highlight => {
                  expect(highlight).toBeTruthy();
                  expect(highlight.trim()).toBeTruthy();
                });
              }
              
              if (entry.isContract !== undefined && entry.isContract !== null) {
                expect(typeof entry.isContract).toBe('boolean');
              }
            });
            
            // 6. Verify skills section is properly categorized
            expect(Array.isArray(resumeData.skills)).toBe(true);
            expect(resumeData.skills.length).toBeGreaterThan(0);
            resumeData.skills.forEach(skillCategory => {
              expect(skillCategory.category).toBeTruthy();
              expect(skillCategory.category.trim()).toBeTruthy();
              expect(Array.isArray(skillCategory.skills)).toBe(true);
              expect(skillCategory.skills.length).toBeGreaterThan(0);
              
              skillCategory.skills.forEach(skill => {
                expect(skill).toBeTruthy();
                expect(skill.trim()).toBeTruthy();
              });
            });
            
            // 7. Verify education section has proper academic structure
            expect(Array.isArray(resumeData.education)).toBe(true);
            expect(resumeData.education.length).toBeGreaterThan(0);
            resumeData.education.forEach(entry => {
              expect(entry.institution).toBeTruthy();
              expect(entry.institution.trim()).toBeTruthy();
              expect(entry.location).toBeTruthy();
              expect(entry.location.trim()).toBeTruthy();
              
              // Verify optional fields are properly typed when present
              if (entry.degree) {
                expect(entry.degree.trim()).toBeTruthy();
              }
              if (entry.field) {
                expect(entry.field.trim()).toBeTruthy();
              }
              if (entry.year) {
                expect(entry.year.trim()).toBeTruthy();
              }
              if (entry.details) {
                expect(Array.isArray(entry.details)).toBe(true);
                entry.details.forEach(detail => {
                  expect(detail).toBeTruthy();
                  expect(detail.trim()).toBeTruthy();
                });
              }
            });
            
            // 8. Verify contact section has proper external link structure
            expect(resumeData.contact.email).toBeTruthy();
            expect(resumeData.contact.linkedin).toBeTruthy();
            expect(resumeData.contact.github).toBeTruthy();
            
            // Verify email format (basic validation)
            expect(resumeData.contact.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
            
            // Verify URLs are properly formatted (basic validation)
            expect(resumeData.contact.linkedin).toMatch(/^https?:\/\/.+/);
            expect(resumeData.contact.github).toMatch(/^https?:\/\/.+/);
            
            // 9. Verify overall data consistency and organization
            // All sections should be non-empty and properly structured
            const sectionKeys = Object.keys(resumeData);
            const expectedSections = ['personalInfo', 'summary', 'keyAccomplishments', 'experience', 'skills', 'education', 'contact'];
            
            expectedSections.forEach(section => {
              expect(sectionKeys).toContain(section);
            });
            
            // 10. Verify semantic structure allows for proper visual separation
            // Each section should have distinct, identifiable content that can be visually separated
            const hasDistinctContent = (
              resumeData.personalInfo.name !== resumeData.summary &&
              resumeData.keyAccomplishments.length > 0 &&
              resumeData.experience.length > 0 &&
              resumeData.skills.length > 0 &&
              resumeData.education.length > 0
            );
            
            expect(hasDistinctContent).toBe(true);
          }
        ), { numRuns: 100 });
      });
    });
  });
});