import React from 'react';
import { render, screen } from '@testing-library/react';
import { Summary } from './Summary';
import { resumeData } from '@/lib/data/resume-data';

// Mock the ThemeProvider context
jest.mock('@/components/providers/ThemeProvider', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: jest.fn(),
    resolvedTheme: 'light'
  })
}));

describe('Summary Component', () => {
  it('renders the summary section with correct title', () => {
    render(<Summary />);
    
    // Check that the section title is rendered
    expect(screen.getByRole('heading', { name: /professional summary/i })).toBeInTheDocument();
  });

  it('displays Seth\'s professional summary content', () => {
    render(<Summary />);
    
    // Check that the summary content is rendered
    expect(screen.getByText(resumeData.summary)).toBeInTheDocument();
  });

  it('has proper semantic structure with section and heading', () => {
    render(<Summary />);
    
    // Check semantic structure
    const section = screen.getByRole('region', { name: /professional summary/i });
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('id', 'summary');
    
    // Check heading hierarchy
    const heading = screen.getByRole('heading', { name: /professional summary/i });
    expect(heading).toHaveAttribute('id', 'summary-heading');
  });

  it('applies responsive typography classes', () => {
    render(<Summary />);
    
    // Find the paragraph containing the summary text
    const summaryParagraph = screen.getByText(resumeData.summary);
    
    // Check that responsive typography classes are applied
    expect(summaryParagraph).toHaveClass('text-base', 'md:text-lg');
    expect(summaryParagraph).toHaveClass('leading-relaxed', 'md:leading-relaxed');
  });

  it('includes proper accessibility attributes', () => {
    render(<Summary />);
    
    // Check ARIA attributes
    const section = screen.getByRole('region');
    expect(section).toHaveAttribute('aria-labelledby', 'summary-heading');
  });

  it('renders with theme-aware styling classes', () => {
    render(<Summary />);
    
    // Check that theme transition classes are present
    const summaryParagraph = screen.getByText(resumeData.summary);
    expect(summaryParagraph).toHaveClass('transition-colors', 'duration-300');
  });

  it('contains the complete summary text without truncation', () => {
    render(<Summary />);
    
    // Verify the full summary text is present
    const fullSummary = resumeData.summary;
    expect(screen.getByText(fullSummary)).toBeInTheDocument();
    
    // Check that key phrases from the summary are present
    expect(screen.getByText(/12\+ years of experience/)).toBeInTheDocument();
    expect(screen.getByText(/Fortune 500 companies/)).toBeInTheDocument();
    expect(screen.getByText(/99\.9% uptime/)).toBeInTheDocument();
  });

  it('uses proper line height for readability', () => {
    render(<Summary />);
    
    const summaryParagraph = screen.getByText(resumeData.summary);
    
    // Check that proper line height classes are applied for readability
    expect(summaryParagraph).toHaveClass('leading-relaxed');
  });
});