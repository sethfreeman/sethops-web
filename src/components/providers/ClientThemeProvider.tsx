'use client';

import { ThemeProvider } from './ThemeProvider';

interface ClientThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: 'light' | 'dark' | 'system';
  storageKey?: string;
}

/**
 * Client-side wrapper for ThemeProvider to ensure proper hydration
 * This component ensures the theme provider only runs on the client side
 */
export function ClientThemeProvider({ 
  children, 
  defaultTheme = 'system', 
  storageKey = 'portfolio-theme' 
}: ClientThemeProviderProps) {
  return (
    <ThemeProvider defaultTheme={defaultTheme} storageKey={storageKey}>
      {children}
    </ThemeProvider>
  );
}