import React from 'react';
import { render, screen } from '@testing-library/react';
import { KeyAccomplishments } from './KeyAccomplishments';
import { resumeData } from '@/lib/data/resume-data';

// Mock the ThemeProvider context
jest.mock('@/components/providers/ThemeProvider', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: jest.fn(),
    resolvedTheme: 'light'
  })
}));

describe('KeyAccomplishments Component', () => {
  it('renders the key accomplishments section with correct title', () => {
    render(<KeyAccomplishments />);
    
    // Check that the section title is rendered
    expect(screen.getByRole('heading', { name: /core impact/i })).toBeInTheDocument();
  });

  it('displays all key accomplishments from resume data', () => {
    render(<KeyAccomplishments />);
    
    // Check that all accomplishments are rendered by looking for key phrases
    // Since text is split by highlighting, we check for distinctive parts
    expect(screen.getByText(/microservices architecture on AWS/i)).toBeInTheDocument();
    expect(screen.getByText(/enterprise-grade Kubernetes platform/i)).toBeInTheDocument();
    expect(screen.getByText(/reduced infrastructure costs/i)).toBeInTheDocument();
    expect(screen.getByText(/comprehensive CI\/CD pipeline/i)).toBeInTheDocument();
    expect(screen.getByText(/established DevSecOps practices/i)).toBeInTheDocument();
    expect(screen.getByText(/mentored and developed/i)).toBeInTheDocument();
  });

  it('renders accomplishments as a properly structured list', () => {
    render(<KeyAccomplishments />);
    
    // Check that accomplishments are rendered as list items
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(resumeData.keyAccomplishments.length);
    
    // Check that the list is properly structured
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
  });

  it('has proper semantic structure with section and heading', () => {
    render(<KeyAccomplishments />);
    
    // Check semantic structure
    const section = screen.getByRole('region', { name: /core impact/i });
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('id', 'key-accomplishments');
    
    // Check heading hierarchy
    const heading = screen.getByRole('heading', { name: /core impact/i });
    expect(heading).toHaveAttribute('id', 'key-accomplishments-heading');
  });

  it('highlights quantifiable metrics and numbers', () => {
    render(<KeyAccomplishments />);
    
    // Check that specific metrics are highlighted by looking for them individually
    expect(screen.getByText('10M')).toBeInTheDocument();
    expect(screen.getByText('200+')).toBeInTheDocument();
    expect(screen.getByText('2.4M annually')).toBeInTheDocument();
    expect(screen.getByText('4 hours')).toBeInTheDocument();
    expect(screen.getByText('12 minutes')).toBeInTheDocument();
    expect(screen.getByText('95%')).toBeInTheDocument();
    expect(screen.getByText('15+')).toBeInTheDocument();
    expect(screen.getByText('80%')).toBeInTheDocument();
    expect(screen.getByText('18 months')).toBeInTheDocument();
  });

  it('applies responsive typography and spacing classes', () => {
    render(<KeyAccomplishments />);
    
    // Check that the list has responsive typography
    const list = screen.getByRole('list');
    expect(list).toHaveClass('text-base', 'md:text-lg');
    expect(list).toHaveClass('leading-relaxed');
  });

  it('includes proper accessibility attributes', () => {
    render(<KeyAccomplishments />);
    
    // Check ARIA attributes
    const section = screen.getByRole('region');
    expect(section).toHaveAttribute('aria-labelledby', 'key-accomplishments-heading');
    
    // Check that bullet points are properly hidden from screen readers
    const bulletPoints = document.querySelectorAll('[aria-hidden="true"]');
    expect(bulletPoints.length).toBeGreaterThan(0);
  });

  it('renders with theme-aware styling classes', () => {
    render(<KeyAccomplishments />);
    
    // Check that theme transition classes are present on list items
    const listItems = screen.getAllByRole('listitem');
    listItems.forEach((item) => {
      expect(item).toHaveClass('transition-colors', 'duration-300');
    });
  });

  it('displays custom bullet points with primary color', () => {
    render(<KeyAccomplishments />);
    
    // Check that custom bullet points are rendered
    const bulletPoints = document.querySelectorAll('.bg-primary.rounded-full');
    expect(bulletPoints).toHaveLength(resumeData.keyAccomplishments.length);
  });

  it('includes hover effects for interactive elements', () => {
    render(<KeyAccomplishments />);
    
    // Check that list items have group hover classes
    const listItems = screen.getAllByRole('listitem');
    listItems.forEach((item) => {
      expect(item).toHaveClass('group');
    });
  });

  it('contains specific key accomplishments content', () => {
    render(<KeyAccomplishments />);
    
    // Check for specific key phrases from accomplishments
    expect(screen.getByText(/microservices architecture/i)).toBeInTheDocument();
    expect(screen.getByText(/kubernetes platform/i)).toBeInTheDocument();
    expect(screen.getByText(/infrastructure costs/i)).toBeInTheDocument();
    expect(screen.getByText(/ci\/cd pipeline/i)).toBeInTheDocument();
    expect(screen.getByText(/devsecops practices/i)).toBeInTheDocument();
    expect(screen.getByText(/mentored and developed/i)).toBeInTheDocument();
  });

  it('applies proper spacing between accomplishments', () => {
    render(<KeyAccomplishments />);
    
    // Check that the list has proper spacing classes
    const list = screen.getByRole('list');
    expect(list).toHaveClass('space-y-3', 'md:space-y-4');
  });

  it('includes visual enhancement elements', () => {
    render(<KeyAccomplishments />);
    
    // Check for the gradient line visual element
    const gradientLine = document.querySelector('.bg-gradient-to-r');
    expect(gradientLine).toBeInTheDocument();
  });

  it('renders accomplishments in the correct order', () => {
    render(<KeyAccomplishments />);
    
    const listItems = screen.getAllByRole('listitem');
    
    // Check that accomplishments are rendered in the same order as in data
    resumeData.keyAccomplishments.forEach((accomplishment, index) => {
      expect(listItems[index]).toHaveTextContent(accomplishment);
    });
  });

  it('uses semantic list markup without default list styling', () => {
    render(<KeyAccomplishments />);
    
    // Check that the list uses semantic markup but removes default styling
    const list = screen.getByRole('list');
    expect(list).toHaveClass('list-none');
  });
});