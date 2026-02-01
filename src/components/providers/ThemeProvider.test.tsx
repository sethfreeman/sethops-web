/**
 * Unit tests for ThemeProvider component
 * 
 * These tests verify that the ThemeProvider correctly manages theme state,
 * localStorage persistence, and system theme detection.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider, useTheme } from './ThemeProvider';
import fc from 'fast-check';

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

// Mock matchMedia
const mockMatchMedia = jest.fn();

// Test component that uses the theme context
function TestComponent() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  
  return (
    <div>
      <div data-testid="current-theme">{theme}</div>
      <div data-testid="resolved-theme">{resolvedTheme}</div>
      <button 
        data-testid="set-light" 
        onClick={() => setTheme('light')}
      >
        Set Light
      </button>
      <button 
        data-testid="set-dark" 
        onClick={() => setTheme('dark')}
      >
        Set Dark
      </button>
      <button 
        data-testid="set-system" 
        onClick={() => setTheme('system')}
      >
        Set System
      </button>
    </div>
  );
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    });
    
    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      value: mockMatchMedia,
      writable: true,
    });
    
    // Default matchMedia mock (light theme)
    mockMatchMedia.mockReturnValue({
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Basic functionality', () => {
    it('should provide theme context to child components', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('current-theme')).toBeInTheDocument();
      expect(screen.getByTestId('resolved-theme')).toBeInTheDocument();
    });

    it('should throw error when useTheme is used outside provider', () => {
      // Suppress console.error for this test
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      expect(() => {
        render(<TestComponent />);
      }).toThrow('useTheme must be used within a ThemeProvider');
      
      consoleSpy.mockRestore();
    });

    it('should initialize with default theme', () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      
      render(
        <ThemeProvider defaultTheme="light">
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
      expect(screen.getByTestId('resolved-theme')).toHaveTextContent('light');
    });
  });

  describe('Theme switching', () => {
    it('should switch to light theme when set', async () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      fireEvent.click(screen.getByTestId('set-light'));

      await waitFor(() => {
        expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
        expect(screen.getByTestId('resolved-theme')).toHaveTextContent('light');
      });
    });

    it('should switch to dark theme when set', async () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      fireEvent.click(screen.getByTestId('set-dark'));

      await waitFor(() => {
        expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
        expect(screen.getByTestId('resolved-theme')).toHaveTextContent('dark');
      });
    });

    it('should resolve system theme correctly', async () => {
      // Mock system dark theme
      mockMatchMedia.mockReturnValue({
        matches: true, // Dark theme
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        addListener: jest.fn(),
        removeListener: jest.fn(),
      });

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      fireEvent.click(screen.getByTestId('set-system'));

      await waitFor(() => {
        expect(screen.getByTestId('current-theme')).toHaveTextContent('system');
        expect(screen.getByTestId('resolved-theme')).toHaveTextContent('dark');
      });
    });
  });

  describe('localStorage persistence', () => {
    it('should save theme to localStorage when changed', async () => {
      render(
        <ThemeProvider storageKey="test-theme">
          <TestComponent />
        </ThemeProvider>
      );

      fireEvent.click(screen.getByTestId('set-dark'));

      await waitFor(() => {
        expect(mockLocalStorage.setItem).toHaveBeenCalledWith('test-theme', 'dark');
      });
    });

    it('should load theme from localStorage on initialization', () => {
      mockLocalStorage.getItem.mockReturnValue('dark');

      render(
        <ThemeProvider storageKey="test-theme">
          <TestComponent />
        </ThemeProvider>
      );

      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('test-theme');
      expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
    });

    it('should handle localStorage errors gracefully', () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      mockLocalStorage.getItem.mockImplementation(() => {
        throw new Error('localStorage unavailable');
      });

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to read theme from localStorage:',
        expect.any(Error)
      );
      
      consoleSpy.mockRestore();
    });
  });

  describe('System theme detection', () => {
    it('should detect light system theme', () => {
      mockMatchMedia.mockReturnValue({
        matches: false, // Light theme
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        addListener: jest.fn(),
        removeListener: jest.fn(),
      });

      render(
        <ThemeProvider defaultTheme="system">
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('resolved-theme')).toHaveTextContent('light');
    });

    it('should detect dark system theme', () => {
      mockMatchMedia.mockReturnValue({
        matches: true, // Dark theme
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        addListener: jest.fn(),
        removeListener: jest.fn(),
      });

      render(
        <ThemeProvider defaultTheme="system">
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('resolved-theme')).toHaveTextContent('dark');
    });

    it('should handle matchMedia errors gracefully', () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      mockMatchMedia.mockImplementation(() => {
        throw new Error('matchMedia not supported');
      });

      render(
        <ThemeProvider defaultTheme="system">
          <TestComponent />
        </ThemeProvider>
      );

      expect(consoleSpy).toHaveBeenCalledWith(
        'System theme detection failed, falling back to light theme:',
        expect.any(Error)
      );
      
      // Should fallback to light theme
      expect(screen.getByTestId('resolved-theme')).toHaveTextContent('light');
      
      consoleSpy.mockRestore();
    });
  });

  describe('System theme change listening', () => {
    it('should listen for system theme changes when theme is system', async () => {
      const mockAddEventListener = jest.fn();
      const mockRemoveEventListener = jest.fn();
      
      mockMatchMedia.mockReturnValue({
        matches: false,
        addEventListener: mockAddEventListener,
        removeEventListener: mockRemoveEventListener,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      });

      const { unmount } = render(
        <ThemeProvider defaultTheme="system">
          <TestComponent />
        </ThemeProvider>
      );

      // Should set up listener when theme is system
      expect(mockAddEventListener).toHaveBeenCalledWith('change', expect.any(Function));

      // Should clean up listener on unmount
      unmount();
      expect(mockRemoveEventListener).toHaveBeenCalledWith('change', expect.any(Function));
    });

    it('should fallback to addListener for older browsers', async () => {
      const mockAddListener = jest.fn();
      const mockRemoveListener = jest.fn();
      
      mockMatchMedia.mockReturnValue({
        matches: false,
        addEventListener: undefined, // Not available
        removeEventListener: undefined,
        addListener: mockAddListener,
        removeListener: mockRemoveListener,
      });

      const { unmount } = render(
        <ThemeProvider defaultTheme="system">
          <TestComponent />
        </ThemeProvider>
      );

      expect(mockAddListener).toHaveBeenCalledWith(expect.any(Function));

      unmount();
      expect(mockRemoveListener).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  describe('withTheme HOC', () => {
    it('should wrap component with ThemeProvider', () => {
      const { withTheme } = require('./ThemeProvider');
      
      function TestComponentForHOC() {
        const { theme } = useTheme();
        return <div data-testid="hoc-theme">{theme}</div>;
      }

      const WrappedComponent = withTheme(TestComponentForHOC);

      render(<WrappedComponent />);

      expect(screen.getByTestId('hoc-theme')).toBeInTheDocument();
    });
  });

  describe('Property-Based Tests', () => {
    // Feature: seth-freeman-portfolio, Property 2: Theme Toggle Functionality
    // **Validates: Requirements 4.2**
    describe('Property 2: Theme Toggle Functionality', () => {
      it('should switch to opposite theme for any current theme state', () => {
        fc.assert(
          fc.property(
            fc.constantFrom('light', 'dark'), // Generate initial theme states
            (initialTheme) => {
              // Mock localStorage for this test
              mockLocalStorage.getItem.mockReturnValue(initialTheme);
              mockLocalStorage.setItem.mockClear();

              // Mock matchMedia for consistent behavior
              mockMatchMedia.mockReturnValue({
                matches: initialTheme === 'dark',
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                addListener: jest.fn(),
                removeListener: jest.fn(),
              });

              // Render the component with initial theme
              const { unmount } = render(
                <ThemeProvider defaultTheme={initialTheme}>
                  <TestComponent />
                </ThemeProvider>
              );

              // Verify initial state
              expect(screen.getByTestId('current-theme')).toHaveTextContent(initialTheme);
              expect(screen.getByTestId('resolved-theme')).toHaveTextContent(initialTheme);

              // Determine expected opposite theme
              const expectedOppositeTheme = initialTheme === 'light' ? 'dark' : 'light';

              // Click the appropriate toggle button to switch to opposite theme
              const toggleButton = initialTheme === 'light' 
                ? screen.getByTestId('set-dark')
                : screen.getByTestId('set-light');
              
              fireEvent.click(toggleButton);

              // Verify theme switched to opposite
              expect(screen.getByTestId('current-theme')).toHaveTextContent(expectedOppositeTheme);
              expect(screen.getByTestId('resolved-theme')).toHaveTextContent(expectedOppositeTheme);

              // Verify localStorage was updated
              expect(mockLocalStorage.setItem).toHaveBeenCalledWith('portfolio-theme', expectedOppositeTheme);

              // Verify DOM class was applied (simulate document.documentElement)
              // Note: In jsdom, we can't easily test the actual DOM class changes,
              // but we can verify the theme state changes which drive the DOM updates

              unmount();
            }
          ),
          { numRuns: 100 }
        );
      });

      it('should update all themed elements when theme toggles', () => {
        // Create a test component that shows multiple themed elements
        function MultiElementTestComponent() {
          const { resolvedTheme, setTheme } = useTheme();
          
          return (
            <div>
              <div data-testid="theme-indicator" className={`theme-${resolvedTheme}`}>
                Current theme: {resolvedTheme}
              </div>
              <div data-testid="themed-element-1" className={`bg-${resolvedTheme}`}>
                Element 1
              </div>
              <button 
                data-testid="toggle-theme" 
                onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
              >
                Toggle Theme
              </button>
            </div>
          );
        }

        mockLocalStorage.getItem.mockReturnValue('light');
        mockMatchMedia.mockReturnValue({
          matches: false,
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          addListener: jest.fn(),
          removeListener: jest.fn(),
        });

        render(
          <ThemeProvider defaultTheme="light">
            <MultiElementTestComponent />
          </ThemeProvider>
        );

        // Verify initial state
        expect(screen.getByTestId('theme-indicator')).toHaveTextContent('Current theme: light');
        expect(screen.getByTestId('themed-element-1')).toHaveClass('bg-light');

        // Toggle theme
        fireEvent.click(screen.getByTestId('toggle-theme'));

        // Verify theme changed
        expect(screen.getByTestId('theme-indicator')).toHaveTextContent('Current theme: dark');
        expect(screen.getByTestId('themed-element-1')).toHaveClass('bg-dark');
      });
    });

    // Feature: seth-freeman-portfolio, Property 3: Theme Persistence
    // **Validates: Requirements 4.3**
    describe('Property 3: Theme Persistence', () => {
      it('should maintain theme preference after page reload for any theme selection', () => {
        fc.assert(
          fc.property(
            fc.constantFrom('light', 'dark', 'system'), // Generate any valid theme selection
            (selectedTheme) => {
              // Clear localStorage before test
              mockLocalStorage.getItem.mockClear();
              mockLocalStorage.setItem.mockClear();

              // Mock system theme for consistent behavior with 'system' theme
              const mockSystemTheme = selectedTheme === 'system' ? 'dark' : 'light';
              mockMatchMedia.mockReturnValue({
                matches: mockSystemTheme === 'dark',
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                addListener: jest.fn(),
                removeListener: jest.fn(),
              });

              // First render: User selects a theme
              const { unmount: unmount1 } = render(
                <ThemeProvider storageKey="test-persistence-theme">
                  <TestComponent />
                </ThemeProvider>
              );

              // Simulate user selecting the theme
              const setThemeButton = selectedTheme === 'light' 
                ? screen.getByTestId('set-light')
                : selectedTheme === 'dark'
                ? screen.getByTestId('set-dark')
                : screen.getByTestId('set-system');

              fireEvent.click(setThemeButton);

              // Verify theme was saved to localStorage
              expect(mockLocalStorage.setItem).toHaveBeenCalledWith('test-persistence-theme', selectedTheme);

              // Determine what the resolved theme should be
              const expectedResolvedTheme = selectedTheme === 'system' ? mockSystemTheme : selectedTheme;

              // Verify current state before "reload"
              expect(screen.getByTestId('current-theme')).toHaveTextContent(selectedTheme);
              expect(screen.getByTestId('resolved-theme')).toHaveTextContent(expectedResolvedTheme);

              // Unmount to simulate page unload
              unmount1();

              // Mock localStorage returning the saved theme (simulating page reload)
              mockLocalStorage.getItem.mockReturnValue(selectedTheme);

              // Second render: Simulate page reload
              const { unmount: unmount2 } = render(
                <ThemeProvider storageKey="test-persistence-theme">
                  <TestComponent />
                </ThemeProvider>
              );

              // Verify localStorage was read on initialization
              expect(mockLocalStorage.getItem).toHaveBeenCalledWith('test-persistence-theme');

              // Verify theme preference was maintained after "reload"
              expect(screen.getByTestId('current-theme')).toHaveTextContent(selectedTheme);
              expect(screen.getByTestId('resolved-theme')).toHaveTextContent(expectedResolvedTheme);

              // Verify the theme is still the same as what was selected before reload
              // This ensures persistence across page reloads
              const currentTheme = screen.getByTestId('current-theme').textContent;
              const currentResolvedTheme = screen.getByTestId('resolved-theme').textContent;
              
              expect(currentTheme).toBe(selectedTheme);
              expect(currentResolvedTheme).toBe(expectedResolvedTheme);

              unmount2();
            }
          ),
          { numRuns: 100 }
        );
      });

      it('should handle localStorage failures gracefully while maintaining theme state', () => {
        fc.assert(
          fc.property(
            fc.constantFrom('light', 'dark', 'system'),
            (selectedTheme) => {
              // Mock localStorage to fail on setItem (simulating storage quota exceeded, private browsing, etc.)
              mockLocalStorage.setItem.mockImplementation(() => {
                throw new Error('localStorage unavailable');
              });
              mockLocalStorage.getItem.mockReturnValue(null);

              // eslint-disable-next-line @typescript-eslint/no-empty-function
              const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

              mockMatchMedia.mockReturnValue({
                matches: selectedTheme === 'system' ? true : false,
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                addListener: jest.fn(),
                removeListener: jest.fn(),
              });

              const { unmount } = render(
                <ThemeProvider storageKey="test-failing-storage">
                  <TestComponent />
                </ThemeProvider>
              );

              // Attempt to set theme (should fail to save but still work in memory)
              const setThemeButton = selectedTheme === 'light' 
                ? screen.getByTestId('set-light')
                : selectedTheme === 'dark'
                ? screen.getByTestId('set-dark')
                : screen.getByTestId('set-system');

              fireEvent.click(setThemeButton);

              // Verify localStorage save was attempted but failed
              expect(mockLocalStorage.setItem).toHaveBeenCalledWith('test-failing-storage', selectedTheme);
              expect(consoleSpy).toHaveBeenCalledWith(
                'Failed to save theme to localStorage:',
                expect.any(Error)
              );

              // Verify theme still works in memory despite localStorage failure
              const expectedResolvedTheme = selectedTheme === 'system' 
                ? (mockMatchMedia().matches ? 'dark' : 'light')
                : selectedTheme;

              expect(screen.getByTestId('current-theme')).toHaveTextContent(selectedTheme);
              expect(screen.getByTestId('resolved-theme')).toHaveTextContent(expectedResolvedTheme);

              consoleSpy.mockRestore();
              unmount();
            }
          ),
          { numRuns: 100 }
        );
      });
    });

    // Feature: seth-freeman-portfolio, Property 4: System Theme Preference
    // **Validates: Requirements 4.4**
    describe('Property 4: System Theme Preference', () => {
      it('should respect and apply system preference when no user preference exists for any system theme', () => {
        fc.assert(
          fc.property(
            fc.constantFrom('light', 'dark'), // Generate any system theme preference
            (systemTheme) => {
              // Clear localStorage to simulate no user preference
              mockLocalStorage.getItem.mockReturnValue(null);
              mockLocalStorage.setItem.mockClear();

              // Mock system theme preference
              const systemPrefersDark = systemTheme === 'dark';
              mockMatchMedia.mockReturnValue({
                matches: systemPrefersDark,
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                addListener: jest.fn(),
                removeListener: jest.fn(),
              });

              // Render component with no user preference (should default to system)
              const { unmount } = render(
                <ThemeProvider defaultTheme="system" storageKey="test-system-theme">
                  <TestComponent />
                </ThemeProvider>
              );

              // Verify localStorage was checked for existing preference
              expect(mockLocalStorage.getItem).toHaveBeenCalledWith('test-system-theme');

              // Verify system theme detection was used
              expect(mockMatchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)');

              // Verify the resolved theme matches the system preference
              expect(screen.getByTestId('resolved-theme')).toHaveTextContent(systemTheme);

              // When no user preference exists, theme should be 'system' but resolved to system preference
              expect(screen.getByTestId('current-theme')).toHaveTextContent('system');

              // Verify the system preference is properly applied
              const resolvedThemeElement = screen.getByTestId('resolved-theme');
              expect(resolvedThemeElement.textContent).toBe(systemTheme);

              // Verify that the theme context provides the correct resolved theme
              // This ensures that all themed components will receive the system preference
              const currentResolvedTheme = resolvedThemeElement.textContent;
              expect(currentResolvedTheme).toBe(systemTheme);

              unmount();
            }
          ),
          { numRuns: 100 }
        );
      });

      it('should prioritize user preference over system preference when user preference exists', () => {
        fc.assert(
          fc.property(
            fc.constantFrom('light', 'dark'), // System theme preference
            fc.constantFrom('light', 'dark'), // User's saved preference
            (systemTheme, userTheme) => {
              // Mock localStorage returning user's saved preference
              mockLocalStorage.getItem.mockReturnValue(userTheme);

              // Mock system theme (should be ignored when user preference exists)
              const systemPrefersDark = systemTheme === 'dark';
              mockMatchMedia.mockReturnValue({
                matches: systemPrefersDark,
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                addListener: jest.fn(),
                removeListener: jest.fn(),
              });

              const { unmount } = render(
                <ThemeProvider defaultTheme="system" storageKey="test-user-priority">
                  <TestComponent />
                </ThemeProvider>
              );

              // Verify localStorage was checked
              expect(mockLocalStorage.getItem).toHaveBeenCalledWith('test-user-priority');

              // Verify user preference takes priority over system preference
              expect(screen.getByTestId('current-theme')).toHaveTextContent(userTheme);
              expect(screen.getByTestId('resolved-theme')).toHaveTextContent(userTheme);

              // Verify that user preference overrides system preference
              const currentTheme = screen.getByTestId('current-theme').textContent;
              const resolvedTheme = screen.getByTestId('resolved-theme').textContent;
              
              expect(currentTheme).toBe(userTheme);
              expect(resolvedTheme).toBe(userTheme);

              unmount();
            }
          ),
          { numRuns: 100 }
        );
      });
    });
  });
});