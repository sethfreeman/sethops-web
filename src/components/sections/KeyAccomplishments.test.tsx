import React from 'react';
import { render, screen } from '@testing-library/react';
import { KeyAccomplishments } from './KeyAccomplishments';

// Mock resume data
jest.mock('@/lib/data/resume-data', () => ({
  resumeData: {
    keyAccomplishments: [
      'Built scalable microservices architecture',
      'Reduced infrastructure costs by 40%',
      'Led team of 15+ engineers'
    ]
  }
}));

describe('KeyAccomplishments Component', () => {
  it('renders key accomplishments section', () => {
    render(<KeyAccomplishments />);
    expect(screen.getByRole('heading', { name: /impact/i })).toBeInTheDocument();
  });

  it('displays accomplishments as list items', () => {
    render(<KeyAccomplishments />);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems.length).toBeGreaterThan(0);
  });

  it('shows accomplishment content', () => {
    render(<KeyAccomplishments />);
    expect(screen.getByText(/microservices architecture/i)).toBeInTheDocument();
    expect(screen.getByText(/infrastructure costs/i)).toBeInTheDocument();
  });
});