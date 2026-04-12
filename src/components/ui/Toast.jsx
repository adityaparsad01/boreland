import React, { createContext, useContext, useState } from 'react';
import { Toaster, toast as hotToast } from 'react-hot-toast';
import { cn } from '../../lib/utils';

/**
 * Toast Component
 * Notification system using react-hot-toast
 */
const ToastContext = createContext(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

export function ToastProvider({ children }) {
  const toast = {
    success: (message, options = {}) => {
      return hotToast.success(message, {
        style: {
          background: '#10B981',
          color: '#fff',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#10B981',
        },
        ...options,
      });
    },
    error: (message, options = {}) => {
      return hotToast.error(message, {
        style: {
          background: '#EF4444',
          color: '#fff',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#EF4444',
        },
        ...options,
      });
    },
    warning: (message, options = {}) => {
      return hotToast(message, {
        style: {
          background: '#F59E0B',
          color: '#fff',
        },
        icon: '⚠️',
        ...options,
      });
    },
    info: (message, options = {}) => {
      return hotToast(message, {
        style: {
          background: '#3B82F6',
          color: '#fff',
        },
        icon: 'ℹ️',
        ...options,
      });
    },
    loading: (message, options = {}) => {
      return hotToast.loading(message, {
        style: {
          background: '#6B7280',
          color: '#fff',
        },
        ...options,
      });
    },
    promise: (promise, options = {}) => {
      return hotToast.promise(promise, {
        loading: options.loading || 'Loading...',
        success: options.success || 'Success!',
        error: options.error || 'Error!',
        ...options,
      });
    },
    dismiss: (toastId) => {
      hotToast.dismiss(toastId);
    },
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
        }}
      />
    </ToastContext.Provider>
  );
}

export function Toast({ className, ...props }) {
  return <Toaster className={cn('', className)} {...props} />;
}
