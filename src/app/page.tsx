'use client';

import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Summary } from '@/components/sections/Summary';
import { KeyAccomplishments } from '@/components/sections/KeyAccomplishments';
import { Experience } from '@/components/sections/Experience';
import { Skills } from '@/components/sections/Skills';
import { Education } from '@/components/sections/Education';
import { Contact } from '@/components/sections/Contact';
import { resumeData } from '@/lib/data/resume-data';

/**
 * Main Portfolio Page
 * 
 * Single-page scrollable structure displaying Seth Freeman's professional portfolio.
 * Features a header section with personal information and theme toggle, followed by
 * content sections for resume information.
 * 
 * Requirements:
 * - 3.1: Single-page scrollable home page
 * - 3.2: No hero section included
 * - 4.1: Theme toggle functionality
 * - 7.3: Comprehensive accessibility features
 * - 7.4: Keyboard navigation support
 * - 6.6: Focus management and visual indicators
 */
export default function Home() {
  const { personalInfo } = resumeData;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Skip to main content link for screen readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium transition-all duration-200"
        tabIndex={1}
      >
        Skip to main content
      </a>

      {/* Header Section */}
      <header 
        className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border"
        role="banner"
      >
        <div className="container-responsive">
          <div className="flex items-center justify-between py-4 md:py-6">
            {/* Personal Information */}
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                {personalInfo.name}
              </h1>
              <div className="mt-1 md:mt-2 space-y-1">
                <p 
                  className="text-sm md:text-base lg:text-lg text-muted-foreground font-medium"
                  aria-label={`Professional title: ${personalInfo.title}`}
                >
                  {personalInfo.title}
                </p>
                <p 
                  className="text-xs md:text-sm text-muted-foreground flex items-center gap-1"
                  aria-label={`Location: ${personalInfo.location}`}
                >
                  <span className="inline-block w-1 h-1 bg-primary rounded-full" aria-hidden="true" />
                  {personalInfo.location}
                </p>
              </div>
            </div>

            {/* Theme Toggle */}
            <div className="flex-shrink-0 ml-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main 
        id="main-content"
        className="container-responsive"
        role="main"
        aria-label="Seth Freeman's professional portfolio content"
        tabIndex={-1}
      >
        {/* Navigation landmarks for screen readers */}
        <nav aria-label="Page sections" className="sr-only">
          <ul>
            <li><a href="#summary" className="focus:not-sr-only">Summary</a></li>
            <li><a href="#key-accomplishments" className="focus:not-sr-only">Key Accomplishments</a></li>
            <li><a href="#experience" className="focus:not-sr-only">Experience</a></li>
            <li><a href="#skills" className="focus:not-sr-only">Skills</a></li>
            <li><a href="#education" className="focus:not-sr-only">Education</a></li>
            <li><a href="#contact" className="focus:not-sr-only">Contact</a></li>
          </ul>
        </nav>

        {/* Summary Section */}
        <Summary />
        
        {/* Key Accomplishments Section */}
        <KeyAccomplishments />
        
        {/* Experience Section */}
        <Experience />
        
        {/* Skills Section */}
        <Skills />
        
        {/* Education Section */}
        <Education />
        
        {/* Contact Section */}
        <Contact />
        
        {/* Footer content */}
        <footer 
          className="section-spacing"
          role="contentinfo"
          aria-label="Page footer"
        >
          <div className="text-center py-8 md:py-12">
            <div className="max-w-2xl mx-auto">
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Thank you for visiting my portfolio. I look forward to connecting with you!
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}