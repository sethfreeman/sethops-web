import React from 'react';
import { render, screen } from '@testing-library/react';
import { Education } from './Education';

// Mock resume data
jest.mock('@/lib/data/resume-data', () => ({
  resumeData: {
    education: [
      {
        institution: 'Test University',
        location: 'Test City, ST',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        year: '2020'
      }
    ]
  }
}));

describe('Education Component', () => {
  it('renders education section', () => {
    render(<Education />);
    expect(screen.getByRole('heading', { name: /education/i })).toBeInTheDocument();
  });

  it('displays education entries', () => {
    render(<Education />);
    const articles = screen.getAllByRole('article');
    expect(articles.length).toBeGreaterThan(0);
  });

  it('shows institution names', () => {
    render(<Education />);
    expect(screen.getByText('Test University')).toBeInTheDocument();
  });
});