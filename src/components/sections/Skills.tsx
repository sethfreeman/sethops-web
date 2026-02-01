import React from 'react';
import { Section } from '@/components/ui/Section';
import { resumeData } from '@/lib/data/resume-data';
import { SkillCategory as SkillCategoryType } from '@/types/resume';

/**
 * Individual Skill Category Component
 * 
 * Displays a single skill category with its associated skills in a clean,
 * organized format. Each category is presented as a card with a clear
 * heading and skills listed in an accessible, readable manner.
 * 
 * Features:
 * - Professional card-style presentation
 * - Clear category headings with visual hierarchy
 * - Skills displayed as organized lists with proper spacing
 * - Responsive design adapting to different screen sizes
 * - Theme-aware styling with smooth transitions
 * - Hover effects for enhanced interactivity
 * - Semantic HTML structure for accessibility
 */
interface SkillCategoryProps {
  category: SkillCategoryType;
}

function SkillCategory({ category }: SkillCategoryProps) {
  const { category: categoryName, skills } = category;

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
      {/* Category header */}
      <header className="mb-4 md:mb-5">
        <h3 className="
          text-lg md:text-xl font-semibold
          text-foreground
          leading-tight
          transition-colors duration-300
          group-hover:text-primary
          flex items-center gap-2
        ">
          {/* Visual indicator for category */}
          <span className="
            w-1 h-5 md:h-6
            bg-primary rounded-full
            transition-all duration-300
            group-hover:bg-primary/80
            group-hover:scale-110
          " />
          {categoryName}
        </h3>
      </header>

      {/* Skills list */}
      <div className="space-y-2 md:space-y-3">
        <ul className="
          list-none space-y-2
          text-sm md:text-base
          leading-relaxed
        ">
          {skills.map((skill, skillIndex) => (
            <li
              key={`${categoryName}-${skill}-${skillIndex}`}
              className="
                relative pl-4 md:pl-5
                text-foreground/90
                transition-all duration-300
                hover:text-foreground
                hover:pl-5 md:hover:pl-6
                group/skill
              "
            >
              {/* Custom skill bullet point */}
              <span
                className="
                  absolute left-0 top-2 md:top-2.5
                  w-1.5 h-1.5 md:w-2 md:h-2
                  bg-muted-foreground rounded-full
                  transition-all duration-300
                  group-hover/skill:bg-primary
                  group-hover/skill:scale-110
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
                {skill}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Skill count indicator */}
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
          <span>
            {skills.length} skill{skills.length !== 1 ? 's' : ''}
          </span>
          
          {/* Visual progress indicator based on skill count */}
          <div className="
            flex items-center gap-1
            opacity-60
            group-hover:opacity-100
            transition-opacity duration-300
          ">
            {Array.from({ length: Math.min(5, Math.ceil(skills.length / 2)) }).map((_, dotIndex) => (
              <span
                key={dotIndex}
                className="
                  w-1 h-1 md:w-1.5 md:h-1.5
                  bg-primary rounded-full
                  transition-all duration-300
                  group-hover:bg-primary/80
                "
                style={{
                  animationDelay: `${dotIndex * 100}ms`
                }}
              />
            ))}
          </div>
        </div>
      </footer>
    </article>
  );
}

/**
 * Skills Section Component
 * 
 * Displays Seth Freeman's technical skills organized by technology categories
 * in a responsive grid layout. The component presents each skill category
 * as an individual card with clear visual hierarchy and professional formatting.
 * 
 * Features:
 * - Responsive grid layout adapting to different screen sizes
 * - Skills organized by technology categories matching resume structure
 * - Professional card-style presentation for each category
 * - Interactive hover effects and smooth transitions
 * - Accessible design with proper semantic HTML structure
 * - Theme-aware styling with consistent visual hierarchy
 * - Optimized for both mobile and desktop viewing
 * - Visual indicators showing skill count per category
 * 
 * Grid Layout:
 * - Mobile (< 768px): Single column layout
 * - Tablet (768px - 1023px): Two column layout
 * - Desktop (≥ 1024px): Three column layout
 * - Large screens (≥ 1280px): Four column layout for optimal space usage
 * 
 * Requirements: 3.6 - Display Skills section with technical competencies
 */
export function Skills() {
  const { skills } = resumeData;

  return (
    <Section id="skills" title="Technical Skills">
      <div className="
        grid gap-4 md:gap-6
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        auto-rows-fr
      ">
        {skills.map((category, index) => (
          <SkillCategory
            key={`skill-category-${category.category}-${index}`}
            category={category}
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
              {skills.length} Technology Categories
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
              {skills.reduce((total, category) => total + category.skills.length, 0)} Total Skills
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
              20+ Years Experience
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Skills;