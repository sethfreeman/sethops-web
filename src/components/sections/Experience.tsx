import React from 'react';
import { Section } from '@/components/ui/Section';
import { resumeData } from '@/lib/data/resume-data';
import { ExperienceEntry as ExperienceEntryType } from '@/types/resume';

/**
 * Individual Experience Entry Component
 * 
 * Displays a single work experience entry with company, location, duration,
 * and detailed descriptions. Handles contract roles with appropriate visual
 * indicators and provides proper formatting for chronological work history.
 * 
 * Features:
 * - Professional formatting with clear visual hierarchy
 * - Contract role indicators with distinct styling
 * - Responsive layout adapting to different screen sizes
 * - Detailed descriptions with proper bullet point formatting
 * - Optional highlights section for key achievements
 * - Theme-aware styling with smooth transitions
 * - Semantic HTML structure for accessibility
 */
interface ExperienceEntryProps {
  experience: ExperienceEntryType;
  isLatest?: boolean;
}

function ExperienceEntry({ experience, isLatest = false }: ExperienceEntryProps) {
  const { title, company, location, duration, description, highlights, isContract } = experience;

  return (
    <article className="
      relative
      border-l-2 border-border
      pl-6 md:pl-8
      pb-8 md:pb-10
      last:pb-0
      transition-colors duration-300
      group
    ">
      {/* Timeline indicator */}
      <div className="
        absolute -left-2 top-0
        w-4 h-4 md:w-5 md:h-5
        bg-primary rounded-full
        border-2 border-background
        transition-all duration-300
        group-hover:scale-110
        group-hover:bg-primary/80
        z-10
      " />
      
      {/* Experience header */}
      <header className="mb-4 md:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
          <div className="flex-1">
            <h3 className="
              text-lg md:text-xl font-semibold
              text-foreground
              leading-tight
              transition-colors duration-300
              group-hover:text-primary
            ">
              {title}
              {isContract && (
                <span className="
                  ml-2 px-2 py-1
                  text-xs font-medium
                  bg-accent text-accent-foreground
                  rounded-md
                  border border-border
                  transition-colors duration-300
                ">
                  Contract
                </span>
              )}
              {isLatest && (
                <span className="
                  ml-2 px-2 py-1
                  text-xs font-medium
                  bg-primary text-primary-foreground
                  rounded-md
                  transition-colors duration-300
                ">
                  Current
                </span>
              )}
            </h3>
            
            <div className="
              flex flex-col sm:flex-row sm:items-center
              gap-1 sm:gap-3
              text-sm md:text-base
              text-muted-foreground
              mt-1
            ">
              <span className="
                font-medium
                text-foreground/80
                transition-colors duration-300
              ">
                {company}
              </span>
              <span className="hidden sm:inline text-border">•</span>
              <span className="transition-colors duration-300">
                {location}
              </span>
            </div>
          </div>
          
          <div className="
            text-sm md:text-base
            text-muted-foreground
            font-medium
            whitespace-nowrap
            transition-colors duration-300
          ">
            {duration}
          </div>
        </div>
      </header>

      {/* Job description */}
      <div className="space-y-4 md:space-y-6">
        <ul className="
          list-none space-y-2 md:space-y-3
          text-sm md:text-base
          leading-relaxed
        ">
          {description.map((item, index) => (
            <li
              key={index}
              className="
                relative pl-4 md:pl-6
                text-foreground/90
                transition-colors duration-300
                hover:text-foreground
                group/item
              "
            >
              {/* Custom bullet point */}
              <span
                className="
                  absolute left-0 top-2 md:top-2.5
                  w-1.5 h-1.5 md:w-2 md:h-2
                  bg-muted-foreground rounded-full
                  transition-all duration-300
                  group-hover/item:bg-primary
                  group-hover/item:scale-110
                "
                aria-hidden="true"
              />
              
              <span className="
                block
                font-normal
                tracking-normal
                transition-colors duration-300
              ">
                {item}
              </span>
            </li>
          ))}
        </ul>

        {/* Highlights section if available */}
        {highlights && highlights.length > 0 && (
          <div className="
            mt-4 md:mt-6
            p-4 md:p-6
            bg-accent/30
            border border-border
            rounded-lg
            transition-colors duration-300
          ">
            <h4 className="
              text-sm md:text-base font-semibold
              text-foreground
              mb-3 md:mb-4
              flex items-center gap-2
            ">
              <span className="
                w-1 h-4 bg-primary rounded-full
                transition-colors duration-300
              " />
              Key Achievements
            </h4>
            
            <ul className="
              list-none space-y-2 md:space-y-3
              text-sm md:text-base
              leading-relaxed
            ">
              {highlights.map((highlight, index) => (
                <li
                  key={index}
                  className="
                    relative pl-4 md:pl-6
                    text-foreground/90
                    transition-colors duration-300
                    hover:text-foreground
                    group/highlight
                  "
                >
                  {/* Achievement bullet point */}
                  <span
                    className="
                      absolute left-0 top-2 md:top-2.5
                      w-1.5 h-1.5 md:w-2 md:h-2
                      bg-primary rounded-full
                      transition-all duration-300
                      group-hover/highlight:scale-110
                      group-hover/highlight:bg-primary/80
                    "
                    aria-hidden="true"
                  />
                  
                  <span className="
                    block
                    font-medium
                    tracking-normal
                    transition-colors duration-300
                  ">
                    {/* Highlight quantifiable metrics in achievements */}
                    {highlight.split(/(\d+[%+]?(?:\.\d+)?[MK]?(?:\s*(?:daily active users|annually|teams|engineers|hours|minutes|vulnerabilities|months|RTO|uptime))?)/g).map((part, partIndex) => {
                      const isMetric = /\d+[%+]?(?:\.\d+)?[MK]?(?:\s*(?:daily active users|annually|teams|engineers|hours|minutes|vulnerabilities|months|RTO|uptime))?/.test(part);
                      
                      if (isMetric) {
                        return (
                          <span
                            key={partIndex}
                            className="
                              font-bold
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
          </div>
        )}
      </div>
    </article>
  );
}

/**
 * Experience Section Component
 * 
 * Displays Seth Freeman's complete work history in chronological order with
 * proper formatting and visual hierarchy. The component presents each role
 * with detailed descriptions, company information, and duration, creating
 * a comprehensive professional timeline.
 * 
 * Features:
 * - Chronological work history with timeline visualization
 * - Individual ExperienceEntry components for each role
 * - Contract role indicators and current position highlighting
 * - Responsive design adapting to different screen sizes
 * - Professional formatting with consistent spacing
 * - Theme-aware styling with smooth transitions
 * - Semantic HTML structure for accessibility
 * - Visual timeline with connecting lines and indicators
 * 
 * Requirements: 3.5 - Display Experience section with work history
 */
export function Experience() {
  const { experience } = resumeData;

  return (
    <Section id="experience" title="Professional Experience">
      <div className="relative">
        {/* Timeline container */}
        <div className="space-y-0">
          {experience.map((exp, index) => (
            <ExperienceEntry
              key={`${exp.company}-${exp.title}-${index}`}
              experience={exp}
              isLatest={index === 0} // First entry is the most recent
            />
          ))}
        </div>
        
        {/* Optional visual enhancement - subtle gradient at bottom */}
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

export default Experience;