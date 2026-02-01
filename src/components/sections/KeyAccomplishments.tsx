import React from 'react';
import { Section } from '@/components/ui/Section';
import { resumeData } from '@/lib/data/resume-data';

/**
 * KeyAccomplishments Section Component
 * 
 * Displays Seth Freeman's key achievements as a formatted list with responsive
 * bullet points and proper spacing. The component highlights quantifiable results
 * and impact metrics to showcase professional accomplishments effectively.
 * 
 * Features:
 * - Responsive bullet points with consistent spacing
 * - Professional list formatting with visual hierarchy
 * - Emphasis on quantifiable results and metrics
 * - Theme-aware styling with smooth transitions
 * - Semantic HTML structure for accessibility
 * - Optimized typography for readability across devices
 * 
 * Requirements: 3.4 - Display Core Impact section highlighting key achievements
 */
export function KeyAccomplishments() {
  const { keyAccomplishments } = resumeData;

  return (
    <Section id="key-accomplishments" title="Core Impact">
      <div className="space-y-3 md:space-y-4">
        <ul className="
          list-none space-y-3 md:space-y-4
          text-base md:text-lg
          leading-relaxed
        ">
          {keyAccomplishments.map((accomplishment, index) => (
            <li
              key={index}
              className="
                relative pl-6 md:pl-8
                text-foreground/90
                transition-colors duration-300
                group
              "
            >
              {/* Custom bullet point with primary color */}
              <span
                className="
                  absolute left-0 top-2 md:top-2.5
                  w-2 h-2 md:w-2.5 md:h-2.5
                  bg-primary rounded-full
                  transition-all duration-300
                  group-hover:scale-110
                  group-hover:bg-primary/80
                "
                aria-hidden="true"
              />
              
              {/* Accomplishment text with enhanced formatting */}
              <span className="
                block
                font-normal
                tracking-normal
                transition-colors duration-300
                group-hover:text-foreground
              ">
                {/* Highlight quantifiable metrics and numbers */}
                {accomplishment.split(/(\d+[%+]?(?:\.\d+)?[MK]?(?:\s*(?:daily active users|annually|teams|engineers|hours|minutes|vulnerabilities|months))?)/g).map((part, partIndex) => {
                  // Check if this part contains numbers or metrics
                  const isMetric = /\d+[%+]?(?:\.\d+)?[MK]?(?:\s*(?:daily active users|annually|teams|engineers|hours|minutes|vulnerabilities|months))?/.test(part);
                  
                  if (isMetric) {
                    return (
                      <span
                        key={partIndex}
                        className="
                          font-semibold
                          text-primary
                          transition-colors duration-300
                        "
                      >
                        {part}
                      </span>
                    );
                  }
                  
                  return part;
                })}
              </span>
            </li>
          ))}
        </ul>
        
        {/* Optional visual enhancement - subtle gradient line */}
        <div className="
          mt-6 md:mt-8
          h-px
          bg-gradient-to-r from-transparent via-border to-transparent
          opacity-50
        " />
      </div>
    </Section>
  );
}

export default KeyAccomplishments;