import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge class names with Tailwind CSS
 * Handles class merging properly to avoid conflicts
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency value
 */
export function formatCurrency(amount, currency = 'INR', locale = 'en-US') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Format date to readable string
 */
export function formatDate(date, options = {}) {
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('en-US', { ...defaultOptions, ...options });
}

/**
 * Format date to relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date) {
  const now = new Date();
  const then = new Date(date);
  const diffInSeconds = Math.floor((now - then) / 1000);

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return `₹{count} ₹{interval.label}₹{count > 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
}

/**
 * Generate order number
 */
export function generateOrderNumber() {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `ORD-₹{date}-₹{random}`;
}

/**
 * Generate SKU
 */
export function generateSKU(name, variant = '') {
  const prefix = name.slice(0, 3).toUpperCase().replace(/[^A-Z]/g, '');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${prefix}-${random}${variant ? `-${variant}` : ''}`;
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text, maxLength) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Calculate percentage
 */
export function calculatePercentage(part, total) {
  if (total === 0) return 0;
  return ((part / total) * 100).toFixed(2);
}

/**
 * Calculate growth percentage
 */
export function calculateGrowth(current, previous) {
  if (previous === 0) return current > 0 ? 100 : 0;
  return (((current - previous) / previous) * 100).toFixed(2);
}

/**
 * Get status color classes
 */
export function getStatusColor(status) {
  const colors = {
    // Order status
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    delivered: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    refunded: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
    
    // Payment status
    paid: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    failed: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    partially_refunded: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    
    // Product status
    draft: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    published: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    archived: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    
    // Stock status
    in_stock: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    low_stock: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    out_of_stock: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    
    // Review status
    approved: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    spam: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    
    // Default
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  };

  return colors[status?.toLowerCase()] || colors.default;
}

/**
 * Get status badge variant
 */
export function getStatusBadge(status) {
  const variants = {
    // Order status
    pending: { bg: 'bg-yellow-500', text: 'text-yellow-700' },
    processing: { bg: 'bg-blue-500', text: 'text-blue-700' },
    shipped: { bg: 'bg-purple-500', text: 'text-purple-700' },
    delivered: { bg: 'bg-green-500', text: 'text-green-700' },
    cancelled: { bg: 'bg-red-500', text: 'text-red-700' },
    refunded: { bg: 'bg-orange-500', text: 'text-orange-700' },
    
    // Payment status
    paid: { bg: 'bg-green-500', text: 'text-green-700' },
    failed: { bg: 'bg-red-500', text: 'text-red-700' },
    
    // Product status
    draft: { bg: 'bg-gray-500', text: 'text-gray-700' },
    published: { bg: 'bg-green-500', text: 'text-green-700' },
    archived: { bg: 'bg-gray-500', text: 'text-gray-700' },
    
    // Default
    default: { bg: 'bg-gray-500', text: 'text-gray-700' },
  };

  return variants[status?.toLowerCase()] || variants.default;
}

/**
 * Validate email format
 */
export function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+₹/;
  return regex.test(email);
}

/**
 * Validate phone number (basic)
 */
export function isValidPhone(phone) {
  const regex = /^[\d\s\-\+\(\)]{10,}₹/;
  return regex.test(phone);
}

/**
 * Debounce function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function
 */
export function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Download file from URL
 */
export function downloadFile(url, filename) {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
}

/**
 * Parse CSV data
 */
export function parseCSV(csvText) {
  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data),
      error: (error) => reject(error),
    });
  });
}

/**
 * Convert array to CSV
 */
export function arrayToCSV(array) {
  if (!array || array.length === 0) return '';
  
  const headers = Object.keys(array[0]);
  const csvRows = [
    headers.join(','),
    ...array.map(obj =>
      headers.map(header => {
        const value = obj[header];
        return typeof value === 'string' ? `"₹{value.replace(/"/g, '""')}"` : value;
      }).join(',')
    ),
  ];
  
  return csvRows.join('\n');
}

/**
 * Get initials from name
 */
export function getInitials(name) {
  if (!name) return '';
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

/**
 * Calculate discount percentage
 */
export function calculateDiscountPercent(original, sale) {
  if (!original || !sale || original <= 0) return 0;
  return Math.round(((original - sale) / original) * 100);
}

/**
 * Format number with commas
 */
export function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Compact number format (e.g., 1.2K, 1.5M)
 */
export function compactNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

/**
 * Generate random color
 */
export function getRandomColor() {
  const colors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-amber-500',
    'bg-yellow-500',
    'bg-lime-500',
    'bg-green-500',
    'bg-emerald-500',
    'bg-teal-500',
    'bg-cyan-500',
    'bg-sky-500',
    'bg-blue-500',
    'bg-indigo-500',
    'bg-violet-500',
    'bg-purple-500',
    'bg-fuchsia-500',
    'bg-pink-500',
    'bg-rose-500',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Check if date is within range
 */
export function isDateInRange(date, startDate, endDate) {
  const d = new Date(date);
  const start = new Date(startDate);
  const end = new Date(endDate);
  return d >= start && d <= end;
}

/**
 * Get date range presets
 */
export function getDateRangePreset(preset) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  switch (preset) {
    case 'today':
      return { start: today, end: now };
    case 'yesterday':
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      return { start: yesterday, end: today };
    case 'last7days':
      const last7Days = new Date(today);
      last7Days.setDate(last7Days.getDate() - 7);
      return { start: last7Days, end: now };
    case 'last30days':
      const last30Days = new Date(today);
      last30Days.setDate(last30Days.getDate() - 30);
      return { start: last30Days, end: now };
    case 'thisMonth':
      return { 
        start: new Date(now.getFullYear(), now.getMonth(), 1), 
        end: now 
      };
    case 'lastMonth':
      return { 
        start: new Date(now.getFullYear(), now.getMonth() - 1, 1), 
        end: new Date(now.getFullYear(), now.getMonth(), 0) 
      };
    case 'thisYear':
      return { 
        start: new Date(now.getFullYear(), 0, 1), 
        end: now 
      };
    case 'lastYear':
      return { 
        start: new Date(now.getFullYear() - 1, 0, 1), 
        end: new Date(now.getFullYear(), 0, 0) 
      };
    default:
      return { start: today, end: now };
  }
}

/**
 * Sleep utility for delays
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Check if value is empty
 */
export function isEmpty(value) {
  if (value == null) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

/**
 * Deep clone object
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Get nested object value by path
 */
export function getNestedValue(obj, path, defaultValue = undefined) {
  return path.split('.').reduce((acc, part) => acc?.[part], obj) ?? defaultValue;
}

/**
 * Set nested object value by path
 */
export function setNestedValue(obj, path, value) {
  const keys = path.split('.');
  const lastKey = keys.pop();
  const target = keys.reduce((acc, key) => (acc[key] = acc[key] || {}), obj);
  target[lastKey] = value;
  return obj;
}
