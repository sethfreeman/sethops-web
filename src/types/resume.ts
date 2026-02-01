/**
 * TypeScript interfaces for Seth Freeman's portfolio resume data structure
 * 
 * These interfaces define the shape of all resume data used throughout the application,
 * ensuring type safety and consistent data handling across components.
 */

/**
 * Personal information interface containing basic contact and identity details
 */
export interface PersonalInfo {
  /** Full name */
  name: string;
  /** Professional title/role */
  title: string;
  /** Current location (city, state) */
  location: string;
  /** Primary email address */
  email: string;
  /** Phone number */
  phone: string;
  /** LinkedIn profile URL */
  linkedin: string;
  /** GitHub profile URL */
  github: string;
}

/**
 * Individual work experience entry
 */
export interface ExperienceEntry {
  /** Job title/position */
  title: string;
  /** Company/organization name */
  company: string;
  /** Work location (city, state) */
  location: string;
  /** Employment duration (e.g., "Jan 2020 - Present") */
  duration: string;
  /** Detailed job responsibilities and achievements */
  description: string[];
  /** Optional highlights or key accomplishments for this role */
  highlights?: string[];
  /** Whether this was a contract position */
  isContract?: boolean;
}

/**
 * Skills organized by technology category
 */
export interface SkillCategory {
  /** Category name (e.g., "Cloud Platforms", "Programming Languages") */
  category: string;
  /** Array of skills within this category */
  skills: string[];
}

/**
 * Educational background entry
 */
export interface EducationEntry {
  /** Educational institution name */
  institution: string;
  /** Institution location (city, state) */
  location: string;
  /** Degree type (optional - for formal degrees) */
  degree?: string;
  /** Field of study (optional) */
  field?: string;
  /** Graduation year or attendance period (optional) */
  year?: string;
  /** Additional details like certifications, honors, etc. (optional) */
  details?: string[];
}

/**
 * Contact information for the contact section
 */
export interface ContactInfo {
  /** Primary email address */
  email: string;
  /** LinkedIn profile URL */
  linkedin: string;
  /** GitHub profile URL */
  github: string;
}

/**
 * Color palette for theme configuration
 */
export interface ColorPalette {
  /** Primary background color */
  background: string;
  /** Primary text/foreground color */
  foreground: string;
  /** Primary accent color */
  primary: string;
  /** Secondary accent color */
  secondary: string;
  /** Accent color for highlights */
  accent: string;
  /** Muted/subdued color for less important text */
  muted: string;
  /** Border color */
  border: string;
}

/**
 * Typography scale configuration
 */
export interface TypographyScale {
  /** Font sizes for different text elements */
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
  };
  /** Line heights corresponding to font sizes */
  lineHeight: {
    tight: string;
    normal: string;
    relaxed: string;
  };
  /** Font weights */
  fontWeight: {
    normal: string;
    medium: string;
    semibold: string;
    bold: string;
  };
}

/**
 * Spacing scale configuration
 */
export interface SpacingScale {
  /** Spacing values for margins and padding */
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
  };
}

/**
 * Complete theme configuration including colors, typography, and spacing
 */
export interface ThemeConfig {
  /** Color palettes for light and dark themes */
  colors: {
    light: ColorPalette;
    dark: ColorPalette;
  };
  /** Typography scale settings */
  typography: TypographyScale;
  /** Spacing scale settings */
  spacing: SpacingScale;
}

/**
 * Complete resume data structure combining all resume information
 * This is the main interface that represents all data for Seth Freeman's portfolio
 */
export interface ResumeData {
  /** Personal information and contact details */
  personalInfo: PersonalInfo;
  /** Professional summary/overview */
  summary: string;
  /** Key accomplishments and achievements */
  keyAccomplishments: string[];
  /** Work experience history */
  experience: ExperienceEntry[];
  /** Technical skills organized by category */
  skills: SkillCategory[];
  /** Educational background */
  education: EducationEntry[];
  /** Contact information for the contact section */
  contact: ContactInfo;
}

/**
 * Theme context type for the theme provider
 */
export interface ThemeContextType {
  /** Current theme setting */
  theme: 'light' | 'dark' | 'system';
  /** Function to update theme setting */
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  /** Resolved theme (light or dark, never system) */
  resolvedTheme: 'light' | 'dark';
}

/**
 * Props for reusable Section component
 */
export interface SectionProps {
  /** Unique identifier for the section */
  id: string;
  /** Section title/heading */
  title: string;
  /** Section content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Props for ContactLink component
 */
export interface ContactLinkProps {
  /** Link URL */
  href: string;
  /** Link text/label */
  children: React.ReactNode;
  /** Optional icon component */
  icon?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}