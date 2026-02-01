'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeContextType } from '@/types/resume';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: 'light' | 'dark' | 'system';
  storageKey?: string;
}

/**
 * ThemeProvider component that manages theme state with localStorage persistence
 * and system theme preference detection.
 * 
 * Features:
 * - Supports light, dark, and system theme options
 * - Persists user preferences in localStorage
 * - Automatically detects and respects system theme preferences
 * - Provides smooth theme transitions
 * - Handles localStorage unavailability gracefully
 * - Compatible with static site generation
 */
export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'portfolio-theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<'light' | 'dark' | 'system'>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  // Get system theme preference
  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    
    try {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch (error) {
      // Fallback if matchMedia is not supported
      console.warn('System theme detection failed, falling back to light theme:', error);
      return 'light';
    }
  };

  // Load theme from localStorage with error handling
  const getStoredTheme = (): 'light' | 'dark' | 'system' | null => {
    if (typeof window === 'undefined') return null;
    
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored && ['light', 'dark', 'system'].includes(stored)) {
        return stored as 'light' | 'dark' | 'system';
      }
    } catch (error) {
      // Handle localStorage unavailability (private browsing, quota exceeded, etc.)
      console.warn('Failed to read theme from localStorage:', error);
    }
    
    return null;
  };

  // Save theme to localStorage with error handling
  const saveTheme = (newTheme: 'light' | 'dark' | 'system') => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(storageKey, newTheme);
    } catch (error) {
      // Handle localStorage unavailability gracefully
      console.warn('Failed to save theme to localStorage:', error);
    }
  };

  // Resolve the actual theme (light or dark) based on current theme setting
  const resolveTheme = (currentTheme: 'light' | 'dark' | 'system'): 'light' | 'dark' => {
    if (currentTheme === 'system') {
      return getSystemTheme();
    }
    return currentTheme;
  };

  // Apply theme to document
  const applyTheme = (newResolvedTheme: 'light' | 'dark') => {
    if (typeof window === 'undefined') return;
    
    const root = window.document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    
    // Add new theme class
    root.classList.add(newResolvedTheme);
    
    // Update the resolved theme state
    setResolvedTheme(newResolvedTheme);
  };

  // Set theme function that updates both state and localStorage
  const setTheme = (newTheme: 'light' | 'dark' | 'system') => {
    setThemeState(newTheme);
    saveTheme(newTheme);
    
    const newResolvedTheme = resolveTheme(newTheme);
    applyTheme(newResolvedTheme);
  };

  // Initialize theme on mount
  useEffect(() => {
    try {
      // Get stored theme or fall back to default
      const storedTheme = getStoredTheme() || defaultTheme;
      const initialResolvedTheme = resolveTheme(storedTheme);
      
      setThemeState(storedTheme);
      setResolvedTheme(initialResolvedTheme);
      applyTheme(initialResolvedTheme);
    } catch (error) {
      // Handle any initialization errors gracefully
      console.warn('Theme initialization failed, using default theme:', error);
      setThemeState(defaultTheme);
      setResolvedTheme('light');
      applyTheme('light');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultTheme, storageKey]);

  // Listen for system theme changes when theme is set to 'system'
  useEffect(() => {
    if (typeof window === 'undefined' || theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const newSystemTheme = e.matches ? 'dark' : 'light';
      setResolvedTheme(newSystemTheme);
      applyTheme(newSystemTheme);
    };

    try {
      // Use addEventListener if available (modern browsers)
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleSystemThemeChange);
        return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
      } 
      // Fallback for older browsers
      else if (mediaQuery.addListener) {
        mediaQuery.addListener(handleSystemThemeChange);
        return () => mediaQuery.removeListener(handleSystemThemeChange);
      }
    } catch (error) {
      console.warn('Failed to listen for system theme changes:', error);
    }
  }, [theme]);

  const contextValue: ThemeContextType = {
    theme,
    setTheme,
    resolvedTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to use the theme context
 * @returns ThemeContextType object with theme state and setter
 * @throws Error if used outside of ThemeProvider
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}

/**
 * Higher-order component to provide theme context to any component tree
 * Useful for testing or when you need to wrap specific parts of your app
 */
export function withTheme<P extends object>(Component: React.ComponentType<P>) {
  return function ThemedComponent(props: P) {
    return (
      <ThemeProvider>
        <Component {...props} />
      </ThemeProvider>
    );
  };
}