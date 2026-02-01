import React from 'react';
import { render, screen } from '@testing-library/react';
import { Contact } from './Contact';

// Mock resume data
jest.mock('@/lib/data/resume-data', () => ({
  resumeData: {
    contact: {
      email: 'test@example.com',
      linkedin: 'https://linkedin.com/in/testuser',
      github: 'https://github.com/testuser'
    }
  }
}));

describe('Contact Component', () => {
  it('renders contact section', () => {
    render(<Contact />);
    expect(screen.getByRole('heading', { name: /contact/i })).toBeInTheDocument();
  });

  it('displays email link', () => {
    render(<Contact />);
    const emailLinks = screen.getAllByRole('link');
    const emailLink = emailLinks.find(link => 
      link.getAttribute('href')?.startsWith('mailto:')
    );
    expect(emailLink).toBeInTheDocument();
  });

  it('displays social media links', () => {
    render(<Contact />);
    const links = screen.getAllByRole('link');
    
    // Should have LinkedIn link
    const linkedinLink = links.find(link => 
      link.getAttribute('href')?.includes('linkedin.com')
    );
    expect(linkedinLink).toBeInTheDocument();
    
    // Should have GitHub link  
    const githubLink = links.find(link => 
      link.getAttribute('href')?.includes('github.com')
    );
    expect(githubLink).toBeInTheDocument();
  });

  it('opens external links in new tabs', () => {
    render(<Contact />);
    const externalLinks = screen.getAllByRole('link').filter(link => 
      link.getAttribute('target') === '_blank'
    );
    expect(externalLinks.length).toBeGreaterThan(0);
  });
});