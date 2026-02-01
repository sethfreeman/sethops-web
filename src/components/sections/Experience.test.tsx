import React from 'react';
import { render, screen } from '@testing-library/react';
import { Experience } from './Experience';

// Mock resume data
jest.mock('@/lib/data/resume-data', () => ({
  resumeData: {
    experience: [
      {
        title: 'Senior Engineer',
        company: 'Test Company',
        location: 'Test City, ST',
        duration: 'Jan 2020 - Present',
        description: ['Test responsibility']
      }
    ]
  }
}));

describe('Experience Component', () => {
  it('renders experience section', () => {
    render(<Experience />);
    expect(screen.getByRole('heading', { name: /experience/i })).toBeInTheDocument();
  });

  it('displays experience entries', () => {
    render(<Experience />);
    const articles = screen.getAllByRole('article');
    expect(articles.length).toBeGreaterThan(0);
  });

  it('shows job titles and companies', () => {
    render(<Experience />);
    expect(screen.getByText('Senior Engineer')).toBeInTheDocument();
    expect(screen.getByText('Test Company')).toBeInTheDocument();
  });
});