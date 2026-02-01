# Design Document: Seth Freeman Portfolio Website

## Overview

The Seth Freeman Portfolio Website is a modern, responsive Next.js 15+ application that serves as a comprehensive digital resume and professional landing page. Built with the App Router architecture and styled with Tailwind CSS, the site presents Seth's extensive DevOps and engineering leadership experience in a clean, accessible single-page format.

The application emphasizes performance, accessibility, and SEO optimization while providing an intuitive user experience across all devices. Key features include dark/light mode theming, responsive design, and strategic content organization that highlights Seth's progression from individual contributor to senior leadership roles.

## Architecture

### Technology Stack

**Frontend Framework:**
- Next.js 15+ with App Router for optimal performance and developer experience
- React 18+ with modern hooks and concurrent features
- TypeScript for type safety and enhanced developer experience

**Styling and UI:**
- Tailwind CSS for utility-first styling and responsive design
- CSS custom properties for theme variables
- Framer Motion for smooth animations and transitions

**Performance and SEO:**
- Next.js built-in image optimization
- Static site generation (SSG) for optimal loading speeds
- Automatic code splitting and lazy loading
- Structured data markup for search engines

**Deployment:**
- Vercel platform for seamless CI/CD and global CDN
- Environment-specific configuration management
- Automatic HTTPS and performance monitoring

### Application Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Main portfolio page
│   ├── globals.css         # Global styles and CSS variables
│   └── metadata.ts         # SEO metadata configuration
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── ThemeToggle.tsx
│   │   ├── Section.tsx
│   │   └── ContactLink.tsx
│   ├── sections/           # Content sections
│   │   ├── Header.tsx
│   │   ├── Summary.tsx
│   │   ├── KeyAccomplishments.tsx
│   │   ├── Experience.tsx
│   │   ├── Skills.tsx
│   │   ├── Education.tsx
│   │   └── Contact.tsx
│   └── providers/
│       └── ThemeProvider.tsx
├── lib/
│   ├── data/
│   │   └── resume-data.ts  # Structured resume content
│   └── utils.ts            # Utility functions
└── types/
    └── resume.ts           # TypeScript type definitions
```

## Components and Interfaces

### Core Components

**ThemeProvider Component:**
```typescript
interface ThemeContextType {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  resolvedTheme: 'light' | 'dark';
}
```

**Section Component:**
```typescript
interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}
```

**Experience Entry Component:**
```typescript
interface ExperienceEntry {
  title: string;
  company: string;
  location: string;
  duration: string;
  description: string[];
  highlights?: string[];
}
```

**Skills Component:**
```typescript
interface SkillCategory {
  category: string;
  skills: string[];
}
```

### Layout and Navigation

**Responsive Breakpoints:**
- Mobile: 320px - 767px (single column, stacked layout)
- Tablet: 768px - 1023px (optimized spacing, larger text)
- Desktop: 1024px+ (full layout with optimal line lengths)

**Content Organization:**
1. Header with name, title, and theme toggle
2. Summary section with professional overview
3. Key Accomplishments highlighting major achievements
4. Experience section with chronological work history
5. Skills section organized by technology categories
6. Education section with academic background
7. Contact section with email and social links

## Data Models

### Resume Data Structure

```typescript
interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  keyAccomplishments: string[];
  experience: ExperienceEntry[];
  skills: SkillCategory[];
  education: EducationEntry[];
  contact: ContactInfo;
}

interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
}

interface ExperienceEntry {
  title: string;
  company: string;
  location: string;
  duration: string;
  description: string[];
  isContract?: boolean;
}

interface SkillCategory {
  category: string;
  skills: string[];
}

interface EducationEntry {
  institution: string;
  location: string;
  degree?: string;
  field?: string;
}

interface ContactInfo {
  email: string;
  linkedin: string;
  github: string;
}
```

### Theme Configuration

```typescript
interface ThemeConfig {
  colors: {
    light: ColorPalette;
    dark: ColorPalette;
  };
  typography: TypographyScale;
  spacing: SpacingScale;
}

interface ColorPalette {
  background: string;
  foreground: string;
  primary: string;
  secondary: string;
  accent: string;
  muted: string;
  border: string;
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Based on the prework analysis, the following properties validate the universal behaviors and characteristics that must hold across all valid executions of the portfolio website:

**Property 1: Responsive Layout Adaptation**
*For any* viewport width from 320px to desktop sizes, the website layout should adapt appropriately without horizontal scrolling or content overflow
**Validates: Requirements 2.1, 2.2, 2.3, 2.4**

**Property 2: Theme Toggle Functionality**
*For any* current theme state (light or dark), clicking the theme toggle should switch to the opposite theme and update all themed elements
**Validates: Requirements 4.2**

**Property 3: Theme Persistence**
*For any* theme selection made by the user, reloading the page should maintain the same theme preference
**Validates: Requirements 4.3**

**Property 4: System Theme Preference**
*For any* system theme preference (light or dark), the initial page load should respect and apply the system preference when no user preference exists
**Validates: Requirements 4.4**

**Property 5: External Link Behavior**
*For any* external link in the contact section, clicking the link should open in a new tab with appropriate security attributes
**Validates: Requirements 6.5**

**Property 6: Keyboard Navigation Accessibility**
*For any* interactive element on the page, it should be reachable and operable using only keyboard navigation
**Validates: Requirements 6.6, 7.4**

**Property 7: ARIA and Semantic HTML**
*For any* content section or interactive element, appropriate ARIA labels and semantic HTML elements should be used to convey meaning and structure
**Validates: Requirements 7.3**

**Property 8: Color Contrast Compliance**
*For any* text and background color combination in both light and dark themes, the contrast ratio should meet WCAG accessibility standards
**Validates: Requirements 7.5**

**Property 9: Image Accessibility**
*For any* image element used in the website, it should include descriptive alt text that conveys the image's purpose or content
**Validates: Requirements 7.6**

**Property 10: Content Section Organization**
*For any* resume section displayed on the page, it should be clearly defined with proper semantic structure and visual separation
**Validates: Requirements 3.8**

## Error Handling

### Theme System Error Handling

**Local Storage Failures:**
- Gracefully handle localStorage unavailability (private browsing, storage quota exceeded)
- Fall back to system theme preference when localStorage is inaccessible
- Provide visual feedback if theme preferences cannot be saved

**System Theme Detection:**
- Handle cases where system theme preference is unavailable
- Default to light theme when system preference cannot be determined
- Ensure theme toggle remains functional regardless of initial detection

### Content Loading and Display

**Missing Content Handling:**
- Display placeholder content or graceful degradation when resume data is incomplete
- Ensure page structure remains intact even with missing sections
- Provide meaningful error messages for content loading failures

**Image Loading Failures:**
- Implement fallback behavior for any profile images or icons
- Ensure layout stability when images fail to load
- Use appropriate alt text as fallback content

### Responsive Design Edge Cases

**Extreme Viewport Sizes:**
- Handle very narrow viewports (< 320px) with horizontal scrolling prevention
- Ensure content remains accessible on very wide screens (> 2000px)
- Maintain readability at extreme zoom levels (up to 200%)

**Dynamic Content Sizing:**
- Handle varying content lengths in experience descriptions
- Ensure consistent spacing with different skill list lengths
- Maintain layout integrity with long company names or titles

## Testing Strategy

### Dual Testing Approach

The testing strategy employs both unit testing and property-based testing to ensure comprehensive coverage:

**Unit Tests:**
- Verify specific examples and edge cases for individual components
- Test integration points between theme system and UI components
- Validate specific content rendering with known resume data
- Test error conditions and fallback behaviors
- Focus on concrete scenarios like "theme toggle switches from light to dark"

**Property-Based Tests:**
- Verify universal properties across all possible inputs and states
- Test responsive behavior across random viewport dimensions
- Validate theme consistency across all UI elements
- Ensure accessibility compliance across all content variations
- Handle comprehensive input coverage through randomization

### Property-Based Testing Configuration

**Testing Framework:** Jest with @fast-check/jest for property-based testing
**Minimum Iterations:** 100 iterations per property test to ensure thorough coverage
**Test Tagging:** Each property test includes a comment referencing its design document property

**Example Test Structure:**
```typescript
// Feature: seth-freeman-portfolio, Property 1: Responsive Layout Adaptation
test('responsive layout adapts to all viewport widths', () => {
  fc.assert(fc.property(
    fc.integer(320, 2560), // viewport width
    (width) => {
      // Test implementation
    }
  ), { numRuns: 100 });
});
```

### Unit Testing Focus Areas

**Component Integration:**
- Theme provider integration with all themed components
- Section component rendering with various content types
- Contact link component behavior with different link types

**Content Rendering:**
- Resume data parsing and display accuracy
- Section visibility and ordering
- Responsive text sizing and spacing

**Accessibility Testing:**
- Keyboard navigation paths through all interactive elements
- Screen reader compatibility with semantic HTML structure
- Focus management during theme transitions

**Performance Testing:**
- Bundle size optimization verification
- Image loading and optimization
- CSS-in-JS performance impact measurement

### End-to-End Testing

**Critical User Journeys:**
- Complete page load and theme detection
- Theme switching and persistence across sessions
- Contact link functionality and external navigation
- Responsive behavior across device types

**Lighthouse Integration:**
- Automated performance score validation (≥90)
- Accessibility score validation (≥90)
- SEO optimization verification
- Best practices compliance checking

The testing strategy ensures that both specific examples work correctly (unit tests) and that universal properties hold across all possible inputs (property tests), providing comprehensive validation of the portfolio website's correctness and reliability.