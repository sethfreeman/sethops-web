import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { 
  Section, 
  SectionCompact, 
  SectionCard, 
  SectionMinimal, 
  SectionWithHeading 
} from './Section';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const renderWithThemeProvider = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('Section Component', () => {
  const defaultProps = {
    id: 'test-section',
    title: 'Test Section',
    children: <p>Test content</p>,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  describe('Section (default)', () => {
    it('renders with correct semantic structure', () => {
      renderWithThemeProvider(<Section {...defaultProps} />);
      
      const section = screen.getByRole('region', { name: 'Test Section' });
      expect(section).toBeInTheDocument();
      expect(section).toHaveAttribute('id', 'test-section');
      expect(section).toHaveAttribute('aria-labelledby', 'test-section-heading');
    });

    it('renders heading with correct hierarchy', () => {
      renderWithThemeProvider(<Section {...defaultProps} />);
      
      const heading = screen.getByRole('heading', { level: 2, name: 'Test Section' });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveAttribute('id', 'test-section-heading');
    });

    it('renders children content', () => {
      renderWithThemeProvider(<Section {...defaultProps} />);
      
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      renderWithThemeProvider(<Section {...defaultProps} className="custom-class" />);
      
      const section = screen.getByRole('region');
      expect(section).toHaveClass('custom-class');
    });

    it('has proper responsive spacing classes', () => {
      renderWithThemeProvider(<Section {...defaultProps} />);
      
      const section = screen.getByRole('region');
      expect(section).toHaveClass('section-spacing');
      expect(section).toHaveClass('container-responsive');
      expect(section).toHaveClass('scroll-mt-20');
    });

    it('has proper heading styling', () => {
      renderWithThemeProvider(<Section {...defaultProps} />);
      
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveClass('text-2xl', 'md:text-3xl', 'font-semibold');
      expect(heading).toHaveClass('border-b-2', 'border-primary/20');
    });
  });

  describe('SectionCompact', () => {
    it('renders with compact styling', () => {
      renderWithThemeProvider(<SectionCompact {...defaultProps} />);
      
      const section = screen.getByRole('region');
      expect(section).toHaveClass('section-spacing-sm');
      expect(section).toHaveClass('scroll-mt-16');
    });

    it('uses h3 heading for compact sections', () => {
      renderWithThemeProvider(<SectionCompact {...defaultProps} />);
      
      const heading = screen.getByRole('heading', { level: 3, name: 'Test Section' });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveClass('text-xl', 'md:text-2xl', 'font-medium');
    });

    it('has compact border styling', () => {
      renderWithThemeProvider(<SectionCompact {...defaultProps} />);
      
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toHaveClass('border-b', 'border-border');
    });
  });

  describe('SectionCard', () => {
    it('renders with card styling', () => {
      renderWithThemeProvider(<SectionCard {...defaultProps} />);
      
      const section = screen.getByRole('region');
      expect(section).toHaveClass('card-elevated');
      expect(section).toHaveClass('section-spacing');
    });

    it('includes visual accent element', () => {
      renderWithThemeProvider(<SectionCard {...defaultProps} />);
      
      const heading = screen.getByRole('heading', { level: 2 });
      const accent = heading.querySelector('span');
      expect(accent).toBeInTheDocument();
      expect(accent).toHaveClass('w-1', 'h-8', 'bg-primary', 'rounded-full');
    });
  });

  describe('SectionMinimal', () => {
    it('renders with minimal styling', () => {
      renderWithThemeProvider(<SectionMinimal {...defaultProps} />);
      
      const section = screen.getByRole('region');
      expect(section).toHaveClass('scroll-mt-16');
      expect(section).not.toHaveClass('section-spacing');
    });

    it('uses h3 heading for minimal sections', () => {
      renderWithThemeProvider(<SectionMinimal {...defaultProps} />);
      
      const heading = screen.getByRole('heading', { level: 3, name: 'Test Section' });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveClass('text-lg', 'md:text-xl', 'font-medium');
    });
  });

  describe('SectionWithHeading', () => {
    it('renders with default h2 heading', () => {
      renderWithThemeProvider(<SectionWithHeading {...defaultProps} />);
      
      const heading = screen.getByRole('heading', { level: 2, name: 'Test Section' });
      expect(heading).toBeInTheDocument();
    });

    it('renders with custom heading level', () => {
      renderWithThemeProvider(<SectionWithHeading {...defaultProps} headingLevel={1} />);
      
      const heading = screen.getByRole('heading', { level: 1, name: 'Test Section' });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveClass('text-3xl', 'md:text-4xl', 'font-bold');
    });

    it('applies correct classes for h3 heading', () => {
      renderWithThemeProvider(<SectionWithHeading {...defaultProps} headingLevel={3} />);
      
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toHaveClass('text-xl', 'md:text-2xl', 'font-medium');
    });

    it('applies correct classes for h4 heading', () => {
      renderWithThemeProvider(<SectionWithHeading {...defaultProps} headingLevel={4} />);
      
      const heading = screen.getByRole('heading', { level: 4 });
      expect(heading).toHaveClass('text-lg', 'md:text-xl', 'font-medium');
    });

    it('applies correct classes for h5 and h6 headings', () => {
      renderWithThemeProvider(<SectionWithHeading {...defaultProps} headingLevel={5} />);
      
      const heading = screen.getByRole('heading', { level: 5 });
      expect(heading).toHaveClass('text-base', 'md:text-lg', 'font-medium');
    });
  });

  describe('Accessibility', () => {
    it('provides proper ARIA labeling', () => {
      renderWithThemeProvider(<Section {...defaultProps} />);
      
      const section = screen.getByRole('region');
      const heading = screen.getByRole('heading', { level: 2 });
      
      expect(section).toHaveAttribute('aria-labelledby', heading.id);
      expect(heading.id).toBe('test-section-heading');
    });

    it('maintains semantic HTML structure', () => {
      renderWithThemeProvider(<Section {...defaultProps} />);
      
      // Check that section contains header and content div
      const section = screen.getByRole('region');
      const header = section.querySelector('header');
      const contentDiv = section.querySelector('div.space-y-4');
      
      expect(header).toBeInTheDocument();
      expect(contentDiv).toBeInTheDocument();
    });

    it('supports keyboard navigation with scroll margin', () => {
      renderWithThemeProvider(<Section {...defaultProps} />);
      
      const section = screen.getByRole('region');
      expect(section).toHaveClass('scroll-mt-20');
    });
  });

  describe('Responsive Design', () => {
    it('includes responsive typography classes', () => {
      renderWithThemeProvider(<Section {...defaultProps} />);
      
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveClass('text-2xl', 'md:text-3xl');
    });

    it('includes responsive spacing classes', () => {
      renderWithThemeProvider(<Section {...defaultProps} />);
      
      const section = screen.getByRole('region');
      expect(section).toHaveClass('container-responsive');
      
      const contentDiv = section.querySelector('div.space-y-4');
      expect(contentDiv).toHaveClass('md:space-y-6');
    });

    it('includes responsive margin classes for headers', () => {
      renderWithThemeProvider(<Section {...defaultProps} />);
      
      const header = screen.getByRole('region').querySelector('header');
      expect(header).toHaveClass('mb-6', 'md:mb-8');
    });
  });

  describe('Theme Integration', () => {
    it('includes theme-aware transition classes', () => {
      renderWithThemeProvider(<Section {...defaultProps} />);
      
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveClass('transition-colors', 'duration-300');
    });

    it('uses theme color variables', () => {
      renderWithThemeProvider(<Section {...defaultProps} />);
      
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveClass('text-foreground');
      expect(heading).toHaveClass('border-primary/20');
    });
  });

  describe('Content Organization', () => {
    it('organizes content with proper spacing', () => {
      const multipleChildren = (
        <div>
          <p>First paragraph</p>
          <p>Second paragraph</p>
          <p>Third paragraph</p>
        </div>
      );

      renderWithThemeProvider(
        <Section {...defaultProps}>
          {multipleChildren}
        </Section>
      );
      
      const contentDiv = screen.getByRole('region').querySelector('div.space-y-4');
      expect(contentDiv).toBeInTheDocument();
      expect(contentDiv).toHaveClass('md:space-y-6');
    });

    it('maintains consistent visual hierarchy', () => {
      renderWithThemeProvider(<Section {...defaultProps} />);
      
      const section = screen.getByRole('region');
      const header = section.querySelector('header');
      const heading = screen.getByRole('heading', { level: 2 });
      
      expect(header).toContainElement(heading);
      expect(heading).toHaveClass('pb-2', 'mb-4');
    });
  });
});