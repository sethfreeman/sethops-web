import React from 'react';
import { Section } from '@/components/ui/Section';
import { resumeData } from '@/lib/data/resume-data';
import { EducationEntry as EducationEntryType } from '@/types/resume';

/**
 * Individual Education Entry Component
 * 
 * Displays a single education entry with institution, location, degree information,
 * and additional details like certifications or coursework. Each entry is presented
 * as a professional card with clear visual hierarchy and organized information.
 * 
 * Features:
 * - Professional card-style presentation
 * - Clear institution and location formatting
 * - Degree and field information display
 * - Additional details like certifications and coursework
 * - Responsive design adapting to different screen sizes
 * - Theme-aware styling with smooth transitions
 * - Hover effects for enhanced interactivity
 * - Semantic HTML structure for accessibility
 */
interface EducationEntryProps {
  entry: EducationEntryType;
}

function EducationEntry({ entry }: EducationEntryProps) {
  const { institution, location, degree, field, year, details } = entry;

  return (
    <article className="
      group
      bg-card
      border border-border
      rounded-lg
      p-4 md:p-6
      transition-all duration-300
      hover:shadow-md
      hover:border-primary/20
      hover:-translate-y-1
      focus-within:ring-2
      focus-within:ring-primary/20
      focus-within:ring-offset-2
    ">
      {/* Institution header */}
      <header className="mb-4 md:mb-5">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
          <div className="flex-1">
            <h3 className="
              text-lg md:text-xl font-semibold
              text-foreground
              leading-tight
              transition-colors duration-300
              group-hover:text-primary
              flex items-start gap-2
            ">
              {/* Visual indicator for institution */}
              <span className="
                w-1 h-5 md:h-6
                bg-primary rounded-full
                transition-all duration-300
                group-hover:bg-primary/80
                group-hover:scale-110
                flex-shrink-0
                mt-1
              " />
              <span className="flex-1">
                {institution}
              </span>
            </h3>
            
            {/* Location */}
            <div className="
              mt-1 md:mt-2
              ml-3 md:ml-4
              text-sm md:text-base
              text-muted-foreground
              flex items-center gap-1
              transition-colors duration-300
            ">
              <span className="
                inline-block w-1 h-1
                bg-muted-foreground rounded-full
                transition-colors duration-300
                group-hover:bg-primary/60
              " />
              {location}
            </div>
          </div>

          {/* Year badge */}
          {year && (
            <div className="
              flex-shrink-0
              px-3 py-1
              bg-primary/10
              text-primary
              text-xs md:text-sm
              font-medium
              rounded-full
              border border-primary/20
              transition-all duration-300
              group-hover:bg-primary/20
              group-hover:border-primary/30
            ">
              {year}
            </div>
          )}
        </div>
      </header>

      {/* Degree and field information */}
      {(degree || field) && (
        <div className="mb-4 md:mb-5">
          <div className="
            ml-3 md:ml-4
            space-y-1
          ">
            {degree && (
              <div className="
                text-base md:text-lg
                font-medium
                text-foreground/90
                transition-colors duration-300
                group-hover:text-foreground
              ">
                {degree}
              </div>
            )}
            
            {field && (
              <div className="
                text-sm md:text-base
                text-muted-foreground
                font-normal
                transition-colors duration-300
              ">
                {field}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Additional details */}
      {details && details.length > 0 && (
        <div className="
          ml-3 md:ml-4
          space-y-2 md:space-y-3
        ">
          <ul className="
            list-none space-y-2
            text-sm md:text-base
            leading-relaxed
          ">
            {details.map((detail, detailIndex) => (
              <li
                key={`${institution}-detail-${detailIndex}`}
                className="
                  relative pl-4 md:pl-5
                  text-foreground/90
                  transition-all duration-300
                  hover:text-foreground
                  hover:pl-5 md:hover:pl-6
                  group/detail
                "
              >
                {/* Custom detail bullet point */}
                <span
                  className="
                    absolute left-0 top-2 md:top-2.5
                    w-1.5 h-1.5 md:w-2 md:h-2
                    bg-muted-foreground rounded-full
                    transition-all duration-300
                    group-hover/detail:bg-primary
                    group-hover/detail:scale-110
                    group-hover:bg-primary/60
                  "
                  aria-hidden="true"
                />
                
                <span className="
                  block
                  font-normal
                  tracking-normal
                  transition-colors duration-300
                ">
                  {detail}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Entry type indicator */}
      <footer className="
        mt-4 md:mt-5
        pt-3 md:pt-4
        border-t border-border/50
        transition-colors duration-300
      ">
        <div className="
          text-xs md:text-sm
          text-muted-foreground
          font-medium
          flex items-center justify-between
          transition-colors duration-300
        ">
          <span className="flex items-center gap-2">
            <span className="
              w-1.5 h-1.5 md:w-2 md:h-2
              bg-primary/60 rounded-full
              transition-colors duration-300
              group-hover:bg-primary
            " />
            {degree ? 'Formal Education' : 'Professional Certification'}
          </span>
          
          {/* Visual indicator */}
          <div className="
            flex items-center gap-1
            opacity-60
            group-hover:opacity-100
            transition-opacity duration-300
          ">
            {details && details.length > 0 && (
              <span className="text-xs">
                {details.length} item{details.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
      </footer>
    </article>
  );
}

/**
 * Education Section Component
 * 
 * Displays Seth Freeman's educational background including formal education
 * and professional certifications in a responsive layout. The component
 * presents each education entry as an individual card with clear visual
 * hierarchy and professional formatting.
 * 
 * Features:
 * - Responsive layout adapting to different screen sizes
 * - Education entries organized chronologically
 * - Professional card-style presentation for each entry
 * - Clear formatting of institution and location information
 * - Display of degrees, fields of study, and additional details
 * - Interactive hover effects and smooth transitions
 * - Accessible design with proper semantic HTML structure
 * - Theme-aware styling with consistent visual hierarchy
 * - Optimized for both mobile and desktop viewing
 * - Support for both formal degrees and professional certifications
 * 
 * Layout:
 * - Mobile (< 768px): Single column layout with full-width cards
 * - Tablet (768px - 1023px): Single column with optimized spacing
 * - Desktop (≥ 1024px): Single column for optimal readability
 * - Cards maintain consistent height and spacing across all breakpoints
 * 
 * Requirements: 3.7 - Display Education section with academic background
 */
export function Education() {
  const { education } = resumeData;

  return (
    <Section id="education" title="Education & Certifications">
      <div className="
        space-y-4 md:space-y-6
        max-w-4xl
      ">
        {education.map((entry, index) => (
          <EducationEntry
            key={`education-entry-${entry.institution}-${index}`}
            entry={entry}
          />
        ))}
      </div>

      {/* Optional summary statistics */}
      <div className="
        mt-8 md:mt-10
        pt-6 md:pt-8
        border-t border-border/30
        transition-colors duration-300
      ">
        <div className="
          flex flex-col sm:flex-row
          items-center justify-center
          gap-4 md:gap-8
          text-sm md:text-base
          text-muted-foreground
        ">
          <div className="
            flex items-center gap-2
            transition-colors duration-300
            hover:text-foreground
          ">
            <span className="
              w-2 h-2 bg-primary rounded-full
              transition-colors duration-300
            " />
            <span className="font-medium">
              {education.filter(entry => entry.degree).length} Formal Degree{education.filter(entry => entry.degree).length !== 1 ? 's' : ''}
            </span>
          </div>
          
          <div className="
            flex items-center gap-2
            transition-colors duration-300
            hover:text-foreground
          ">
            <span className="
              w-2 h-2 bg-primary rounded-full
              transition-colors duration-300
            " />
            <span className="font-medium">
              {education.filter(entry => !entry.degree).length} Professional Certification{education.filter(entry => !entry.degree).length !== 1 ? 's' : ''}
            </span>
          </div>
          
          <div className="
            flex items-center gap-2
            transition-colors duration-300
            hover:text-foreground
          ">
            <span className="
              w-2 h-2 bg-primary rounded-full
              transition-colors duration-300
            " />
            <span className="font-medium">
              Continuous Learning
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Education;