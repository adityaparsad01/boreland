import React from 'react';
import { cn } from '../../lib/utils';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from './Button';

/**
 * Pagination Component
 * Navigate through paginated data
 */
export function Pagination({
  currentPage,
  totalPages,
  pageSize = 10,
  totalItems,
  onPageChange,
  onPageSizeChange,
  showSizeChanger = true,
  showQuickJumper = false,
  className,
}) {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('...');
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className={cn('flex items-center justify-between gap-4', className)}>
      {/* Info */}
      <div className="text-sm text-muted-foreground">
        Showing {startItem} to {endItem} of {totalItems} results
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        {/* Size Changer */}
        {showSizeChanger && (
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value={10}>10 / page</option>
            <option value={25}>25 / page</option>
            <option value={50}>50 / page</option>
            <option value={100}>100 / page</option>
          </select>
        )}

        {/* Pagination Buttons */}
        <div className="flex items-center gap-1">
          {/* First Page */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="h-9 w-9"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>

          {/* Previous Page */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-9 w-9"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Page Numbers */}
          {getPageNumbers().map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className="px-2 text-muted-foreground">...</span>
              ) : (
                <Button
                  variant={currentPage === page ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => onPageChange(page)}
                  className={cn(
                    'h-9 w-9',
                    currentPage === page && 'bg-primary text-primary-foreground'
                  )}
                >
                  {page}
                </Button>
              )}
            </React.Fragment>
          ))}

          {/* Next Page */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="h-9 w-9"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Last Page */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="h-9 w-9"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Jumper */}
        {showQuickJumper && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Go to</span>
            <input
              type="number"
              min={1}
              max={totalPages}
              defaultValue={currentPage}
              onBlur={(e) => {
                const page = Math.min(Math.max(1, Number(e.target.value)), totalPages);
                onPageChange(page);
              }}
              className="w-16 h-9 rounded-md border border-input bg-background px-2 text-sm text-center focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export function SimplePagination({ currentPage, totalPages, onPageChange, className }) {
  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <span className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
}
