import React from 'react';
import { cn } from '../../lib/utils';

/**
 * Avatar Component
 * Display user profile images with fallback
 */
export function Avatar({ className, ...props }) {
  return (
    <div
      className={cn(
        'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
        className
      )}
      {...props}
    />
  );
}

export function AvatarImage({ className, src, alt, ...props }) {
  return (
    <img
      className={cn('aspect-square h-full w-full object-cover', className)}
      src={src}
      alt={alt}
      {...props}
    />
  );
}

export function AvatarFallback({ className, children, ...props }) {
  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground font-medium',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
