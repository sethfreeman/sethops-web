import React from 'react';
import { SectionProps } from '@/types/resume';

/**
 * Reusable Section component for content organization
 * 
 * Provides consistent spacing, typography, and semantic HTML structure
 * for organizing portfolio content sections with proper visual separation
 * and accessibility features.
 * 
 * Features:
 * - Responsive padding and margin handling
 * - Semantic HTML structure with proper heading hierarchy
 * - Consistent typography and spacing
 * - Theme-aware styling with smooth transitions
 * - Accessibility-focused design with proper ARIA attributes
 * - Enhanced keyboard navigation support
 * - Screen reader optimizations
 */
export function Section({ id, title, children, className = '' }: SectionProps) {
  return (
    <section
      id={id}
      className={`
        section-spacing
        container-responsive
        scroll-mt-20
        focus-within:ring-2
        focus-within:ring-primary/20
        focus-within:ring-offset-2
        focus-within:ring-offset-background
        transition-all duration-300
        ${className}
      `}
      aria-labelledby={`${id}-heading`}
      role="region"
      tabIndex={-1}
    >
      {/* Section header with consistent typography hierarchy */}
      <header className="mb-6 md:mb-8">
        <h2
          id={`${id}-heading`}
          className="
            text-2xl md:text-3xl font-semibold
            text-foreground
            border-b-2 border-primary/20
            pb-2 mb-4
            tracking-tight
            transition-colors duration-300
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-primary
            focus-visible:ring-offset-2
            focus-visible:ring-offset-background
            scroll-mt-20
          "
          tabIndex={-1}
        >
          {title}
        </h2>
      </header>

      {/* Section content with consistent spacing and accessibility */}
      <div 
        className="space-y-4 md:space-y-6"
        role="group"
        aria-labelledby={`${id}-heading`}
      >
        {children}
      </div>
    </section>
  );
}

/**
 * Compact Section variant for smaller content areas
 * 
 * Provides reduced spacing while maintaining semantic structure
 * and accessibility features. Ideal for secondary sections or
 * nested content areas.
 */
export function SectionCompact({ id, title, children, className = '' }: SectionProps) {
  return (
    <section
      id={id}
      className={`
        section-spacing-sm
        scroll-mt-16
        ${className}
      `}
      aria-labelledby={`${id}-heading`}
    >
      {/* Compact header with smaller typography */}
      <header className="mb-4 md:mb-6">
        <h3
          id={`${id}-heading`}
          className="
            text-xl md:text-2xl font-medium
            text-foreground
            border-b border-border
            pb-2 mb-3
            tracking-tight
            transition-colors duration-300
          "
        >
          {title}
        </h3>
      </header>

      {/* Content with compact spacing */}
      <div className="space-y-3 md:space-y-4">
        {children}
      </div>
    </section>
  );
}

/**
 * Section with card-style background
 * 
 * Provides elevated appearance with background and shadow
 * while maintaining all semantic and accessibility features.
 * Ideal for highlighting important sections or creating
 * visual separation.
 */
export function SectionCard({ id, title, children, className = '' }: SectionProps) {
  return (
    <section
      id={id}
      className={`
        card-elevated
        section-spacing
        container-responsive
        scroll-mt-20
        ${className}
      `}
      aria-labelledby={`${id}-heading`}
    >
      {/* Card header with enhanced styling */}
      <header className="mb-6 md:mb-8">
        <h2
          id={`${id}-heading`}
          className="
            text-2xl md:text-3xl font-semibold
            text-foreground
            flex items-center gap-3
            tracking-tight
            transition-colors duration-300
          "
        >
          <span className="
            w-1 h-8 bg-primary rounded-full
            transition-colors duration-300
          " />
          {title}
        </h2>
      </header>

      {/* Card content with enhanced spacing */}
      <div className="space-y-4 md:space-y-6">
        {children}
      </div>
    </section>
  );
}

/**
 * Section with minimal styling
 * 
 * Provides semantic structure and accessibility without
 * visual styling. Ideal for nested sections or when
 * custom styling is needed.
 */
export function SectionMinimal({ id, title, children, className = '' }: SectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-16 ${className}`}
      aria-labelledby={`${id}-heading`}
    >
      {/* Minimal header */}
      <header className="mb-4">
        <h3
          id={`${id}-heading`}
          className="
            text-lg md:text-xl font-medium
            text-foreground
            tracking-tight
            transition-colors duration-300
          "
        >
          {title}
        </h3>
      </header>

      {/* Content without additional spacing */}
      <div>
        {children}
      </div>
    </section>
  );
}

/**
 * Section with custom heading level
 * 
 * Allows specification of heading level for proper
 * document outline and accessibility. Maintains
 * consistent styling while providing semantic flexibility.
 */
interface SectionWithHeadingProps extends SectionProps {
  /** Heading level (1-6) for semantic HTML structure */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function SectionWithHeading({ 
  id, 
  title, 
  children, 
  className = '', 
  headingLevel = 2 
}: SectionWithHeadingProps) {
  const HeadingTag = `h${headingLevel}` as keyof JSX.IntrinsicElements;
  
  // Responsive text sizes based on heading level
  const getHeadingClasses = (level: number) => {
    switch (level) {
      case 1:
        return 'text-3xl md:text-4xl font-bold';
      case 2:
        return 'text-2xl md:text-3xl font-semibold';
      case 3:
        return 'text-xl md:text-2xl font-medium';
      case 4:
        return 'text-lg md:text-xl font-medium';
      case 5:
      case 6:
        return 'text-base md:text-lg font-medium';
      default:
        return 'text-2xl md:text-3xl font-semibold';
    }
  };

  return (
    <section
      id={id}
      className={`
        section-spacing
        container-responsive
        scroll-mt-20
        ${className}
      `}
      aria-labelledby={`${id}-heading`}
    >
      {/* Dynamic heading with appropriate level */}
      <header className="mb-6 md:mb-8">
        <HeadingTag
          id={`${id}-heading`}
          className={`
            ${getHeadingClasses(headingLevel)}
            text-foreground
            border-b-2 border-primary/20
            pb-2 mb-4
            tracking-tight
            transition-colors duration-300
          `}
        >
          {title}
        </HeadingTag>
      </header>

      {/* Section content */}
      <div className="space-y-4 md:space-y-6">
        {children}
      </div>
    </section>
  );
}

// Export the main Section component as default
export default Section;