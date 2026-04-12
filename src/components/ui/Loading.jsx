import React from 'react';
import { cn } from '../../lib/utils';

/**
 * Loading/Skeleton Components
 * Display loading states for content
 */
export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm space-y-4">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-8 w-1/2" />
      <div className="flex gap-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5, columns = 4 }) {
  return (
    <div className="rounded-lg border bg-card shadow-sm">
      <div className="p-4 border-b">
        <Skeleton className="h-6 w-1/4" />
      </div>
      <div className="p-4 space-y-4">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex gap-4">
            {Array.from({ length: columns }).map((_, j) => (
              <Skeleton key={j} className="h-10 flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Spinner({ size = 'default', className }) {
  const sizes = {
    sm: 'h-4 w-4',
    default: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  return (
    <svg
      className={cn('animate-spin', sizes[size], className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}

export function LoadingOverlay({ isLoading, children }) {
  if (!isLoading) return children;

  return (
    <div className="relative">
      {children}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
        <Spinner size="lg" />
      </div>
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center space-y-4">
        <Spinner size="lg" className="mx-auto" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
