import React, { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { Search, X } from 'lucide-react';
import { Input } from './Input';
import { Button } from './Button';

/**
 * DataTable Component
 * Advanced table with search, sorting, and selection
 */
export function DataTable({
  columns,
  data,
  isLoading = false,
  emptyMessage = 'No data available',
  searchable = true,
  searchableColumns = [],
  sortable = true,
  selectable = false,
  onSelectionChange,
  actions,
  className,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedRows, setSelectedRows] = useState(new Set());

  // Filter data based on search query
  const filteredData = React.useMemo(() => {
    if (!searchQuery) return data;
    
    return data.filter((row) =>
      searchableColumns.some((column) => {
        const value = row[column.accessor];
        return value?.toString().toLowerCase().includes(searchQuery.toLowerCase());
      })
    );
  }, [data, searchQuery, searchableColumns]);

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue === bValue) return 0;
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      if (sortConfig.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });
  }, [filteredData, sortConfig]);

  // Handle sort
  const handleSort = (key) => {
    if (!sortable) return;
    
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  // Handle row selection
  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRows(new Set(sortedData.map((_, index) => index)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (index) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedRows(newSelected);
  };

  // Notify parent of selection changes
  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(Array.from(selectedRows).map((i) => sortedData[i]));
    }
  }, [selectedRows, sortedData, onSelectionChange]);

  if (isLoading) {
    return (
      <div className="rounded-md border">
        <div className="p-8 text-center">
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-10 bg-muted rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Search Bar */}
      {searchable && searchableColumns.length > 0 && (
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={`Search ${searchableColumns.map((c) => c.header).join(' or ')}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                onClick={() => setSearchQuery('')}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}

      {/* Table */}
      <div className="rounded-md border">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              {selectable && (
                <th className="w-12 p-4">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === sortedData.length && sortedData.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.accessor}
                  className={cn(
                    'h-12 px-4 text-left align-middle font-medium text-muted-foreground',
                    sortable && column.sortable !== false && 'cursor-pointer hover:text-foreground'
                  )}
                  onClick={() => handleSort(column.accessor)}
                >
                  <div className="flex items-center gap-2">
                    {column.header}
                    {sortable && column.sortable !== false && sortConfig.key === column.accessor && (
                      <span className="text-xs">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              {actions && <th className="w-20 p-4 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0) + (actions ? 1 : 0)}
                  className="p-8 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              sortedData.map((row, index) => (
                <tr
                  key={row.id || index}
                  className={cn(
                    'border-b transition-colors hover:bg-muted/50',
                    selectedRows.has(index) && 'bg-muted'
                  )}
                >
                  {selectable && (
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedRows.has(index)}
                        onChange={() => handleSelectRow(index)}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td key={column.accessor} className="p-4 align-middle">
                      {column.cell
                        ? column.cell({ value: row[column.accessor], row, index })
                        : row[column.accessor]}
                    </td>
                  ))}
                  {actions && (
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {actions(row, index)}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Selection Info */}
      {selectable && selectedRows.size > 0 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{selectedRows.size} row(s) selected</span>
          {onSelectionChange && (
            <Button variant="ghost" size="sm" onClick={() => setSelectedRows(new Set())}>
              Clear selection
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
