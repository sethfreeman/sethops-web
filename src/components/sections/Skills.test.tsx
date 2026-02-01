import React from 'react';
import { render, screen } from '@testing-library/react';
import { Skills } from './Skills';

// Mock resume data
jest.mock('@/lib/data/resume-data', () => ({
  resumeData: {
    skills: [
      {
        category: 'Programming Languages',
        skills: ['JavaScript', 'Python', 'Go']
      },
      {
        category: 'Cloud Platforms',
        skills: ['AWS', 'Azure']
      }
    ]
  }
}));

describe('Skills Component', () => {
  it('renders skills section', () => {
    render(<Skills />);
    expect(screen.getByRole('heading', { name: /skills/i })).toBeInTheDocument();
  });

  it('displays skill categories', () => {
    render(<Skills />);
    const articles = screen.getAllByRole('article');
    expect(articles.length).toBeGreaterThan(0);
  });

  it('shows category names and skills', () => {
    render(<Skills />);
    expect(screen.getByText('Programming Languages')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('AWS')).toBeInTheDocument();
  });
});