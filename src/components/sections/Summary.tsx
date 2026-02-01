import React from 'react';
import { Section } from '@/components/ui/Section';
import { resumeData } from '@/lib/data/resume-data';

/**
 * Summary Section Component
 * 
 * Displays Seth Freeman's professional overview with responsive typography
 * and proper line heights. The component presents the summary content in
 * a clean, readable format that matches the resume structure.
 * 
 * Features:
 * - Responsive typography with optimal line heights for readability
 * - Professional formatting with proper spacing
 * - Theme-aware styling with smooth transitions
 * - Semantic HTML structure for accessibility
 * - Content matches Seth's resume summary exactly
 * 
 * Requirements: 3.3 - Display Summary section with professional overview
 */
export function Summary() {
  const { summary } = resumeData;

  return (
    <Section id="summary" title="Professional Summary">
      <div className="prose prose-lg max-w-none">
        <p className="
          text-base md:text-lg
          leading-relaxed md:leading-relaxed
          text-foreground/90
          font-normal
          tracking-normal
          transition-colors duration-300
        ">
          {summary}
        </p>
      </div>
    </Section>
  );
}

export default Summary;