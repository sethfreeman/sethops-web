/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './page';

// Mock the ThemeToggle component
jest.mock('@/components/ui/ThemeToggle', () => ({
  ThemeToggle: () => <button data-testid="theme-toggle">Theme Toggle</button>
}));

// Mock the resume data
jest.mock('@/lib/data/resume-data', () => ({
  resumeData: {
    personalInfo: {
      name: 'Seth Freeman',
      title: 'Senior DevOps Engineer & Technical Leader',
      location: 'San Francisco, CA',
      email: 'seth@sethops.org',
      phone: '+1 (555) 123-4567',
      linkedin: 'https://linkedin.com/in/sethfreeman',
      github: 'https://github.com/sethfreeman'
    }
  }
}));

describe('Home Page', () => {
  beforeEach(() => {
    render(<Home />);
  });

  describe('Header Section', () => {
    it('displays Seth Freeman\'s name as main heading', () => {
      const nameHeading = screen.getByRole('heading', { level: 1 });
      expect(nameHeading).toHaveTextContent('Seth Freeman');
    });

    it('displays professional title', () => {
      expect(screen.getByText('Senior DevOps Engineer & Technical Leader')).toBeInTheDocument();
    });

    it('displays location information', () => {
      expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
    });

    it('includes theme toggle component', () => {
      expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
    });

    it('has proper semantic structure with header element', () => {
      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
      expect(header).toHaveClass('sticky', 'top-0', 'z-50');
    });
  });

  describe('Layout Structure', () => {
    it('has main element with proper styling', () => {
      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
      expect(main).toHaveClass('min-h-screen', 'bg-background', 'text-foreground');
    });

    it('displays welcome content', () => {
      expect(screen.getByText('Professional Portfolio')).toBeInTheDocument();
      expect(screen.getByText(/Welcome to Seth Freeman's professional portfolio/)).toBeInTheDocument();
    });

    it('indicates content sections will be added later', () => {
      expect(screen.getByText('Content sections will be implemented in the following tasks')).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('applies responsive container classes', () => {
      const containers = document.querySelectorAll('.container-responsive');
      expect(containers.length).toBeGreaterThan(0);
    });

    it('applies responsive typography classes', () => {
      const nameHeading = screen.getByRole('heading', { level: 1 });
      expect(nameHeading).toHaveClass('text-2xl', 'md:text-3xl', 'lg:text-4xl');
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      const h1 = screen.getByRole('heading', { level: 1 });
      const h2 = screen.getByRole('heading', { level: 2 });
      
      expect(h1).toHaveTextContent('Seth Freeman');
      expect(h2).toHaveTextContent('Professional Portfolio');
    });

    it('has semantic header element', () => {
      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
    });

    it('has semantic main element', () => {
      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
    });
  });

  describe('No Hero Section', () => {
    it('does not include a hero section as per requirements', () => {
      // Verify there's no large hero banner or call-to-action section
      const heroElements = document.querySelectorAll('[class*="hero"], [id*="hero"]');
      expect(heroElements).toHaveLength(0);
      
      // Verify the content starts directly with the header
      const main = screen.getByRole('main');
      const firstChild = main.firstElementChild;
      expect(firstChild?.tagName.toLowerCase()).toBe('header');
    });
  });
});