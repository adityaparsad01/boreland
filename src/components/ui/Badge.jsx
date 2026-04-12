import React from 'react';
import { cn } from '../../lib/utils';

/**
 * Badge Component
 * Display status or count indicators
 */
export function Badge({
  children,
  variant = 'default',
  size = 'default',
  className,
  ...props
}) {
  const baseStyles = 'inline-flex items-center rounded-full font-semibold transition-colors';
  
  const variants = {
    default: 'bg-secondary text-secondary-foreground',
    primary: 'bg-primary text-primary-foreground',
    destructive: 'bg-destructive text-destructive-foreground',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-white',
    info: 'bg-blue-500 text-white',
    outline: 'border border-current bg-transparent',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    default: 'px-2.5 py-0.5 text-xs',
    lg: 'px-3 py-1 text-sm',
  };

  return (
    <span
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
