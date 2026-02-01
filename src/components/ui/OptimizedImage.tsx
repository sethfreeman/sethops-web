import React from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  fill?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
  loading?: 'lazy' | 'eager';
  unoptimized?: boolean;
}

/**
 * OptimizedImage component that wraps Next.js Image with accessibility enhancements
 * 
 * Features:
 * - Automatic image optimization and lazy loading
 * - Responsive image sizing with srcset generation
 * - Accessibility-first design with proper alt text validation
 * - Performance optimizations with blur placeholders
 * - Error handling and fallback support
 * - WCAG 2.1 AA compliance for images
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  sizes,
  fill = false,
  objectFit = 'cover',
  objectPosition = 'center',
  loading = 'lazy',
  unoptimized = false,
  ...props
}: OptimizedImageProps) {
  // Validate alt text for accessibility
  const validateAltText = (altText: string): string => {
    if (!altText || altText.trim() === '') {
      console.warn('OptimizedImage: Alt text is required for accessibility. Provide descriptive alt text or use alt="" for decorative images.');
      return '';
    }
    
    // Check for common alt text anti-patterns
    const antiPatterns = [
      'image', 'picture', 'photo', 'graphic', 'icon',
      'image of', 'picture of', 'photo of'
    ];
    
    const lowerAlt = altText.toLowerCase();
    const hasAntiPattern = antiPatterns.some(pattern => 
      lowerAlt.startsWith(pattern) || lowerAlt.includes(`${pattern} `)
    );
    
    if (hasAntiPattern) {
      console.warn(`OptimizedImage: Alt text "${altText}" may contain redundant words. Consider more descriptive text.`);
    }
    
    return altText;
  };

  // Generate responsive sizes if not provided
  const getResponsiveSizes = (): string => {
    if (sizes) return sizes;
    
    // Default responsive sizes for common use cases
    if (fill) {
      return '100vw';
    }
    
    if (width && width <= 400) {
      return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
    }
    
    return '(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw';
  };

  // Generate blur placeholder for better loading experience
  const getBlurDataURL = (): string | undefined => {
    if (blurDataURL) return blurDataURL;
    
    if (placeholder === 'blur' && !blurDataURL) {
      // Generate a simple blur placeholder
      return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=';
    }
    
    return undefined;
  };

  const validatedAlt = validateAltText(alt);
  const responsiveSizes = getResponsiveSizes();
  const blurPlaceholder = getBlurDataURL();

  // Common image props
  const imageProps = {
    src,
    alt: validatedAlt,
    className: `transition-opacity duration-300 ${className}`,
    priority,
    quality,
    placeholder,
    blurDataURL: blurPlaceholder,
    sizes: responsiveSizes,
    loading: priority ? 'eager' : loading,
    unoptimized,
    style: {
      objectFit: fill ? objectFit : undefined,
      objectPosition: fill ? objectPosition : undefined,
    },
    ...props,
  };

  // Render with fill prop or explicit dimensions
  if (fill) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          {...imageProps}
          fill
          alt={validatedAlt}
          className="transition-opacity duration-300"
        />
      </div>
    );
  }

  // Require width and height for non-fill images
  if (!width || !height) {
    console.error('OptimizedImage: width and height are required when not using fill prop');
    return (
      <div 
        className={`bg-muted flex items-center justify-center text-muted-foreground ${className}`}
        style={{ width: width || 200, height: height || 200 }}
        role="img"
        aria-label={validatedAlt || 'Image failed to load'}
      >
        <span className="text-sm">Image</span>
      </div>
    );
  }

  return (
    <Image
      {...imageProps}
      width={width}
      height={height}
      alt={validatedAlt}
    />
  );
}

/**
 * Avatar component for profile images with accessibility enhancements
 */
interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
  className?: string;
}

export function Avatar({ 
  src, 
  alt, 
  size = 'md', 
  fallback, 
  className = '' 
}: AvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const sizePixels = {
    sm: 32,
    md: 48,
    lg: 64,
    xl: 96,
  };

  // Generate initials from alt text as fallback
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const initials = fallback || getInitials(alt);
  const pixelSize = sizePixels[size];

  if (!src) {
    return (
      <div
        className={`
          ${sizeClasses[size]}
          rounded-full
          bg-primary/10
          flex items-center justify-center
          text-primary
          font-medium
          ${className}
        `}
        role="img"
        aria-label={alt}
      >
        <span className="text-sm">{initials}</span>
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden ${className}`}>
      <OptimizedImage
        src={src}
        alt={alt}
        width={pixelSize}
        height={pixelSize}
        className="rounded-full"
        objectFit="cover"
        priority={size === 'xl'} // Prioritize large avatars
      />
    </div>
  );
}

/**
 * Icon component for SVG icons with accessibility enhancements
 */
interface IconProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  'aria-label'?: string;
  'aria-hidden'?: boolean;
  role?: string;
}

export function Icon({ 
  children, 
  size = 'md', 
  className = '',
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden = true,
  role = 'img',
  ...props 
}: IconProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <span
      className={`inline-flex items-center justify-center ${sizeClasses[size]} ${className}`}
      role={ariaHidden ? undefined : role}
      aria-label={ariaHidden ? undefined : ariaLabel}
      aria-hidden={ariaHidden}
      {...props}
    >
      {children}
    </span>
  );
}

export default OptimizedImage;