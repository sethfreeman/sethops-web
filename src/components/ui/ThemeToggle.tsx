'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/components/providers/ThemeProvider';

/**
 * ThemeToggle component that provides a button to cycle through theme options
 * Supports light, dark, and system theme preferences with smooth transitions
 * Features enhanced animations and visual feedback using Framer Motion
 */
export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const handleThemeToggle = () => {
    // Cycle through themes: light -> dark -> system -> light
    switch (theme) {
      case 'light':
        setTheme('dark');
        break;
      case 'dark':
        setTheme('system');
        break;
      case 'system':
        setTheme('light');
        break;
      default:
        setTheme('light');
    }
  };

  // Get display text for current theme
  const getThemeDisplayText = () => {
    switch (theme) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      case 'system':
        return `System (${resolvedTheme})`;
      default:
        return 'Light';
    }
  };

  // Get icon for current theme with enhanced visual representation
  const getThemeIcon = () => {
    switch (resolvedTheme) {
      case 'dark':
        return '🌙';
      case 'light':
        return '☀️';
      default:
        return '☀️';
    }
  };

  // Animation variants for smooth icon transitions
  const iconVariants = {
    initial: { 
      scale: 0.8, 
      rotate: -90, 
      opacity: 0 
    },
    animate: { 
      scale: 1, 
      rotate: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        duration: 0.3
      }
    },
    exit: { 
      scale: 0.8, 
      rotate: 90, 
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  // Button animation variants for press feedback
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { 
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 600,
        damping: 15
      }
    }
  };

  return (
    <motion.button
      onClick={handleThemeToggle}
      className="
        inline-flex items-center gap-2 px-3 py-2 
        text-sm font-medium rounded-md
        bg-secondary hover:bg-accent
        text-secondary-foreground hover:text-accent-foreground
        border border-border
        transition-colors duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
        focus:ring-offset-background
        relative overflow-hidden
      "
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      aria-label={`Switch theme. Current theme: ${getThemeDisplayText()}`}
      title={`Current theme: ${getThemeDisplayText()}. Click to cycle through themes.`}
    >
      {/* Background gradient animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Animated icon with smooth transitions */}
      <div className="relative text-base">
        <AnimatePresence mode="wait">
          <motion.span
            key={resolvedTheme}
            variants={iconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            aria-hidden="true"
            className="inline-block"
          >
            {getThemeIcon()}
          </motion.span>
        </AnimatePresence>
      </div>
      
      {/* Theme text with smooth opacity transition */}
      <motion.span 
        className="hidden sm:inline"
        initial={{ opacity: 0.8 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {getThemeDisplayText()}
      </motion.span>
    </motion.button>
  );
}

/**
 * Minimal theme toggle that only shows an icon
 * Useful for compact layouts or mobile views
 * Features enhanced animations and smooth transitions
 */
export function ThemeToggleIcon() {
  const { setTheme, resolvedTheme } = useTheme();

  const handleThemeToggle = () => {
    // Simple toggle between light and dark (no system option)
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  };

  const getThemeIcon = () => {
    return resolvedTheme === 'dark' ? '☀️' : '🌙';
  };

  const getAriaLabel = () => {
    return `Switch to ${resolvedTheme === 'light' ? 'dark' : 'light'} theme`;
  };

  // Animation variants for the icon toggle
  const iconVariants = {
    initial: { 
      scale: 0.7, 
      rotate: -180, 
      opacity: 0 
    },
    animate: { 
      scale: 1, 
      rotate: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.4
      }
    },
    exit: { 
      scale: 0.7, 
      rotate: 180, 
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  // Button animation variants
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { 
      scale: 0.9,
      transition: {
        type: "spring",
        stiffness: 600,
        damping: 15
      }
    }
  };

  return (
    <motion.button
      onClick={handleThemeToggle}
      className="
        inline-flex items-center justify-center
        w-10 h-10 rounded-full
        bg-secondary hover:bg-accent
        text-secondary-foreground hover:text-accent-foreground
        border border-border
        transition-colors duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
        focus:ring-offset-background
        relative overflow-hidden
      "
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      aria-label={getAriaLabel()}
      title={getAriaLabel()}
    >
      {/* Background pulse animation on hover */}
      <motion.div
        className="absolute inset-0 bg-primary/10 rounded-full opacity-0"
        whileHover={{ 
          opacity: [0, 0.5, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 0.6,
          repeat: Infinity,
          repeatType: "loop"
        }}
      />
      
      {/* Animated icon */}
      <div className="relative text-lg">
        <AnimatePresence mode="wait">
          <motion.span
            key={resolvedTheme}
            variants={iconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            aria-hidden="true"
            className="inline-block"
          >
            {getThemeIcon()}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.button>
  );
}