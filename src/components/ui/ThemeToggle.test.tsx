import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ThemeToggle, ThemeToggleIcon } from './ThemeToggle';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    button: ({ children, onClick, className, ...props }: any) => (
      <button onClick={onClick} className={className} {...props}>
        {children}
      </button>
    ),
    div: ({ children, className, ...props }: any) => (
      <div className={className} {...props}>
        {children}
      </div>
    ),
    span: ({ children, className, ...props }: any) => (
      <span className={className} {...props}>
        {children}
      </span>
    ),
  },
  AnimatePresence: ({ children }: any) => children,
}));

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

describe('ThemeToggle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  describe('Basic Functionality', () => {
    it('renders with correct initial state', () => {
      renderWithThemeProvider(<ThemeToggle />);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('aria-label', expect.stringContaining('Switch theme'));
    });

    it('displays sun icon for light theme', () => {
      renderWithThemeProvider(<ThemeToggle />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('☀️');
    });

    it('cycles through themes when clicked', async () => {
      const user = userEvent.setup();
      renderWithThemeProvider(<ThemeToggle />);
      
      const button = screen.getByRole('button');
      
      // Initial state should be system (light)
      expect(button).toHaveAttribute('aria-label', expect.stringContaining('System'));
      
      // Click to go to light
      await user.click(button);
      await waitFor(() => {
        expect(button).toHaveAttribute('aria-label', expect.stringContaining('Light'));
      });
      
      // Click to go to dark
      await user.click(button);
      await waitFor(() => {
        expect(button).toHaveAttribute('aria-label', expect.stringContaining('Dark'));
      });
      
      // Click to go back to system
      await user.click(button);
      await waitFor(() => {
        expect(button).toHaveAttribute('aria-label', expect.stringContaining('System'));
      });
    });

    it('shows theme text on larger screens', () => {
      renderWithThemeProvider(<ThemeToggle />);
      
      const themeText = screen.getByText(/System/);
      expect(themeText).toHaveClass('hidden', 'sm:inline');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels', () => {
      renderWithThemeProvider(<ThemeToggle />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label');
      expect(button).toHaveAttribute('title');
      
      const icon = button.querySelector('[aria-hidden="true"]');
      expect(icon).toBeInTheDocument();
    });

    it('is keyboard accessible', async () => {
      const user = userEvent.setup();
      renderWithThemeProvider(<ThemeToggle />);
      
      const button = screen.getByRole('button');
      
      // Focus the button
      await user.tab();
      expect(button).toHaveFocus();
      
      // Activate with Enter
      await user.keyboard('{Enter}');
      await waitFor(() => {
        expect(button).toHaveAttribute('aria-label', expect.stringContaining('Light'));
      });
      
      // Activate with Space
      await user.keyboard(' ');
      await waitFor(() => {
        expect(button).toHaveAttribute('aria-label', expect.stringContaining('Dark'));
      });
    });

    it('has proper focus styles', () => {
      renderWithThemeProvider(<ThemeToggle />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-primary');
    });
  });

  describe('Theme Persistence', () => {
    it('saves theme preference to localStorage', async () => {
      const user = userEvent.setup();
      renderWithThemeProvider(<ThemeToggle />);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('portfolio-theme', 'light');
    });

    it('loads theme preference from localStorage', () => {
      mockLocalStorage.getItem.mockReturnValue('dark');
      
      renderWithThemeProvider(<ThemeToggle />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('🌙');
    });
  });

  describe('Visual Feedback', () => {
    it('has hover and transition classes', () => {
      renderWithThemeProvider(<ThemeToggle />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('hover:bg-accent', 'transition-colors', 'duration-300');
    });

    it('shows correct icons for different themes', async () => {
      const user = userEvent.setup();
      renderWithThemeProvider(<ThemeToggle />);
      
      const button = screen.getByRole('button');
      
      // Start with light theme (sun icon)
      await user.click(button); // Go to light
      expect(button).toHaveTextContent('☀️');
      
      // Switch to dark theme (moon icon)
      await user.click(button); // Go to dark
      await waitFor(() => {
        expect(button).toHaveTextContent('🌙');
      });
    });
  });
});

describe('ThemeToggleIcon', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  describe('Basic Functionality', () => {
    it('renders as a circular button', () => {
      renderWithThemeProvider(<ThemeToggleIcon />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('w-10', 'h-10', 'rounded-full');
    });

    it('toggles between light and dark themes only', async () => {
      const user = userEvent.setup();
      renderWithThemeProvider(<ThemeToggleIcon />);
      
      const button = screen.getByRole('button');
      
      // Should start with moon icon (indicating it will switch to dark)
      expect(button).toHaveTextContent('🌙');
      expect(button).toHaveAttribute('aria-label', 'Switch to dark theme');
      
      // Click to switch to dark
      await user.click(button);
      await waitFor(() => {
        expect(button).toHaveTextContent('☀️');
        expect(button).toHaveAttribute('aria-label', 'Switch to light theme');
      });
      
      // Click to switch back to light
      await user.click(button);
      await waitFor(() => {
        expect(button).toHaveTextContent('🌙');
        expect(button).toHaveAttribute('aria-label', 'Switch to dark theme');
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels that update with theme', async () => {
      const user = userEvent.setup();
      renderWithThemeProvider(<ThemeToggleIcon />);
      
      const button = screen.getByRole('button');
      
      // Initial state
      expect(button).toHaveAttribute('aria-label', 'Switch to dark theme');
      expect(button).toHaveAttribute('title', 'Switch to dark theme');
      
      // After clicking
      await user.click(button);
      await waitFor(() => {
        expect(button).toHaveAttribute('aria-label', 'Switch to light theme');
        expect(button).toHaveAttribute('title', 'Switch to light theme');
      });
    });

    it('is keyboard accessible', async () => {
      const user = userEvent.setup();
      renderWithThemeProvider(<ThemeToggleIcon />);
      
      const button = screen.getByRole('button');
      
      await user.tab();
      expect(button).toHaveFocus();
      
      await user.keyboard('{Enter}');
      await waitFor(() => {
        expect(button).toHaveAttribute('aria-label', 'Switch to light theme');
      });
    });
  });

  describe('Visual Design', () => {
    it('has compact circular design', () => {
      renderWithThemeProvider(<ThemeToggleIcon />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass(
        'inline-flex',
        'items-center',
        'justify-center',
        'w-10',
        'h-10',
        'rounded-full'
      );
    });

    it('has proper transition classes', () => {
      renderWithThemeProvider(<ThemeToggleIcon />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('transition-colors', 'duration-300');
    });
  });
});

describe('Theme Integration', () => {
  it('applies theme changes to document root', async () => {
    const user = userEvent.setup();
    renderWithThemeProvider(<ThemeToggle />);
    
    const button = screen.getByRole('button');
    
    // Click to set light theme
    await user.click(button);
    await waitFor(() => {
      expect(document.documentElement).toHaveClass('light');
    });
    
    // Click to set dark theme
    await user.click(button);
    await waitFor(() => {
      expect(document.documentElement).toHaveClass('dark');
    });
  });

  it('handles system theme preference', () => {
    // Mock system preference for dark theme
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    renderWithThemeProvider(<ThemeToggle />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', expect.stringContaining('System (dark)'));
  });
});