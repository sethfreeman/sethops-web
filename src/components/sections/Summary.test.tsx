import React from 'react';
import { render, screen } from '@testing-library/react';
import { Summary } from './Summary';

// Mock resume data
jest.mock('@/lib/data/resume-data', () => ({
  resumeData: {
    summary: 'Experienced software engineer with expertise in cloud technologies and DevOps practices.'
  }
}));

describe('Summary Component', () => {
  it('renders summary section', () => {
    render(<Summary />);
    expect(screen.getByRole('heading', { name: /summary/i })).toBeInTheDocument();
  });

  it('displays summary content', () => {
    render(<Summary />);
    expect(screen.getByText(/experienced software engineer/i)).toBeInTheDocument();
  });
});