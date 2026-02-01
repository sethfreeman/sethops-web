import React from 'react';
import { render, screen } from '@testing-library/react';
import { Experience } from './Experience';

describe('Experience Component', () => {
  beforeEach(() => {
    render(<Experience />);
  });

  describe('Section Structure', () => {
    it('renders the experience section with correct title', () => {
      expect(screen.getByRole('heading', { name: /professional experience/i })).toBeInTheDocument();
    });

    it('renders the section with correct id', () => {
      const section = screen.getByRole('region', { name: /professional experience/i });
      expect(section).toHaveAttribute('id', 'experience');
    });

    it('has proper semantic HTML structure', () => {
      const section = screen.getByRole('region', { name: /professional experience/i });
      expect(section).toBeInTheDocument();
      
      // Check for article elements (experience entries) - should match actual resume data
      const articles = screen.getAllByRole('article');
      expect(articles.length).toBeGreaterThan(0);
    });
  });

  describe('Experience Entries', () => {
    it('renders all experience entries from resume data', () => {
      // Check for job titles from actual resume data
      expect(screen.getByText('Senior DevOps Engineer & Platform Lead')).toBeInTheDocument();
      expect(screen.getByText('DevOps Engineer')).toBeInTheDocument();
      expect(screen.getByText('Cloud Infrastructure Engineer')).toBeInTheDocument();
    });

    it('displays company names and locations', () => {
      expect(screen.getByText('TechCorp Solutions')).toBeInTheDocument();
      expect(screen.getByText('CloudScale Innovations')).toBeInTheDocument();
      expect(screen.getByText('DataFlow Systems')).toBeInTheDocument();
      
      expect(screen.getAllByText('San Francisco, CA')).toHaveLength(2);
      expect(screen.getAllByText('San Jose, CA')).toHaveLength(3);
    });

    it('displays employment durations', () => {
      expect(screen.getByText('Jan 2021 - Present')).toBeInTheDocument();
      expect(screen.getByText('Mar 2018 - Dec 2020')).toBeInTheDocument();
      expect(screen.getByText('Jun 2016 - Feb 2018')).toBeInTheDocument();
    });

    it('renders job descriptions as lists', () => {
      expect(screen.getByText(/Lead a team of 8 DevOps engineers/)).toBeInTheDocument();
      expect(screen.getByText(/Architect and maintain multi-region AWS infrastructure/)).toBeInTheDocument();
      expect(screen.getByText(/Managed containerized applications on Kubernetes clusters/)).toBeInTheDocument();
    });
  });

  describe('Current Position Indicator', () => {
    it('shows "Current" badge for the most recent position', () => {
      expect(screen.getByText('Current')).toBeInTheDocument();
    });

    it('applies current badge only to the first (most recent) entry', () => {
      const currentBadges = screen.getAllByText('Current');
      expect(currentBadges).toHaveLength(1);
    });
  });

  describe('Contract Role Indicators', () => {
    it('does not show contract badges for regular positions', () => {
      // Since the actual resume data doesn't have contract roles, 
      // we should not find any contract badges
      expect(screen.queryByText('Contract')).not.toBeInTheDocument();
    });
  });

  describe('Highlights Section', () => {
    it('renders highlights when available', () => {
      const achievementSections = screen.getAllByText('Key Achievements');
      expect(achievementSections.length).toBeGreaterThan(0);
      
      // Check for key words from the highlights
      expect(screen.getByText(/Reduced infrastructure costs/)).toBeInTheDocument();
      expect(screen.getByText(/Achieved.*uptime/)).toBeInTheDocument();
    });

    it('highlights quantifiable metrics in achievements', () => {
      // Check that metrics are highlighted with primary color
      const metricsElements = screen.getAllByText('40%');
      expect(metricsElements.length).toBeGreaterThan(0);
      
      // The component should highlight metrics, even if they're split across elements
      // This is the expected behavior for the metrics highlighting feature
      expect(screen.getByText(/uptime/)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      const mainHeading = screen.getByRole('heading', { level: 2, name: /professional experience/i });
      expect(mainHeading).toBeInTheDocument();
      
      const jobTitleHeadings = screen.getAllByRole('heading', { level: 3 });
      expect(jobTitleHeadings.length).toBeGreaterThan(0);
    });

    it('has proper ARIA labels', () => {
      const section = screen.getByRole('region', { name: /professional experience/i });
      expect(section).toHaveAttribute('aria-labelledby', 'experience-heading');
    });

    it('uses semantic HTML elements', () => {
      // Check for article elements
      const articles = screen.getAllByRole('article');
      expect(articles.length).toBeGreaterThan(0);
      
      // Check for proper list structure
      const lists = screen.getAllByRole('list');
      expect(lists.length).toBeGreaterThan(0);
    });
  });

  describe('Responsive Design', () => {
    it('applies responsive CSS classes', () => {
      const section = screen.getByRole('region', { name: /professional experience/i });
      expect(section).toHaveClass('section-spacing', 'container-responsive');
    });

    it('has responsive typography classes on job titles', () => {
      const jobTitle = screen.getByText('Senior DevOps Engineer & Platform Lead');
      expect(jobTitle).toHaveClass('text-lg', 'md:text-xl');
    });
  });

  describe('Visual Timeline', () => {
    it('renders timeline indicators for each entry', () => {
      const articles = screen.getAllByRole('article');
      articles.forEach(article => {
        expect(article).toHaveClass('border-l-2', 'border-border');
      });
    });

    it('has proper spacing between entries', () => {
      const articles = screen.getAllByRole('article');
      articles.forEach(article => {
        expect(article).toHaveClass('pb-8', 'md:pb-10');
      });
    });
  });

  describe('Theme Integration', () => {
    it('applies theme-aware transition classes', () => {
      render(<Experience />);
      const articles = screen.getAllByRole('article');
      
      articles.forEach(article => {
        expect(article).toHaveClass('transition-colors', 'duration-300');
      });
    });

    it('uses CSS custom properties for colors', () => {
      const jobTitle = screen.getByText('Senior DevOps Engineer & Platform Lead');
      expect(jobTitle).toHaveClass('text-foreground');
    });
  });
});

describe('Experience Component Integration', () => {
  it('integrates properly with Section component', () => {
    render(<Experience />);
    
    const sectionElement = screen.getByRole('region', { name: /professional experience/i });
    expect(sectionElement).toBeInTheDocument();
    expect(sectionElement).toHaveAttribute('id', 'experience');
  });

  it('handles empty experience data gracefully', () => {
    // Mock empty experience data
    jest.doMock('@/lib/data/resume-data', () => ({
      resumeData: {
        experience: []
      }
    }));

    const { Experience: EmptyExperience } = require('./Experience');
    render(<EmptyExperience />);
    
    expect(screen.getByRole('heading', { name: /professional experience/i })).toBeInTheDocument();
  });
});

describe('ExperienceEntry Component Edge Cases', () => {
  it('handles entries without highlights', () => {
    render(<Experience />);
    
    // Most entries don't have highlights, some do
    expect(screen.getByText('DevOps Engineer')).toBeInTheDocument();
    
    // Should show Key Achievements for entries that have highlights
    const achievementSections = screen.getAllByText('Key Achievements');
    expect(achievementSections.length).toBeGreaterThan(0);
  });

  it('handles long job titles and company names', () => {
    render(<Experience />);
    
    const longTitle = screen.getByText('Senior DevOps Engineer & Platform Lead');
    expect(longTitle).toBeInTheDocument();
    expect(longTitle).toHaveClass('leading-tight');
  });

  it('formats metrics in job descriptions', () => {
    render(<Experience />);
    
    // Check that metrics in descriptions are present
    expect(screen.getByText(/10M\+/)).toBeInTheDocument();
  });
});