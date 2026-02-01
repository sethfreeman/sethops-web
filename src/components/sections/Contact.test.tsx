import React from 'react';
import { render, screen } from '@testing-library/react';
import { Contact } from './Contact';

// Mock resume data
jest.mock('@/lib/data/resume-data', () => ({
  resumeData: {
    contact: {
      email: 'seth@sethops.org',
      linkedin: 'https://linkedin.com/in/sethfreeman',
      github: 'https://github.com/sethfreeman'
    }
  }
}));

describe('Contact Component', () => {
  it('renders contact section with proper heading', () => {
    render(<Contact />);
    
    expect(screen.getByRole('heading', { name: /contact/i })).toBeInTheDocument();
  });

  it('displays email contact with mailto link', () => {
    render(<Contact />);
    
    const emailLink = screen.getByRole('link', { name: /send email to seth@sethops\.org/i });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:seth@sethops.org');
    expect(screen.getByText('seth@sethops.org')).toBeInTheDocument();
  });

  it('displays LinkedIn profile link with proper attributes', () => {
    render(<Contact />);
    
    const linkedinLink = screen.getByRole('link', { name: /visit seth freeman's linkedin profile/i });
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/sethfreeman');
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('displays GitHub profile link with proper attributes', () => {
    render(<Contact />);
    
    const githubLink = screen.getByRole('link', { name: /visit seth freeman's github profile/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/sethfreeman');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('displays location information', () => {
    render(<Contact />);
    
    expect(screen.getByText(/based in san francisco, ca/i)).toBeInTheDocument();
  });

  it('has proper semantic structure', () => {
    render(<Contact />);
    
    const section = screen.getByRole('region', { name: /contact/i });
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('id', 'contact');
  });

  it('includes contact introduction text', () => {
    render(<Contact />);
    
    expect(screen.getByText(/let's connect!/i)).toBeInTheDocument();
    expect(screen.getByText(/always interested in discussing new opportunities/i)).toBeInTheDocument();
  });

  it('displays contact method headings', () => {
    render(<Contact />);
    
    expect(screen.getByRole('heading', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /linkedin/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /github/i })).toBeInTheDocument();
  });

  it('has proper link text for social profiles', () => {
    render(<Contact />);
    
    expect(screen.getByText('Professional Profile')).toBeInTheDocument();
    expect(screen.getByText('Code Portfolio')).toBeInTheDocument();
  });
});