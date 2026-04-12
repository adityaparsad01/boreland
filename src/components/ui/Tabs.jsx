import React, { useState, createContext, useContext } from 'react';
import { cn } from '../../lib/utils';

const TabsContext = createContext(null);

export function Tabs({ defaultValue, value, onValueChange, children, className }) {
  const [selectedValue, setSelectedValue] = useState(defaultValue || value);

  const handleValueChange = (newValue) => {
    setSelectedValue(newValue);
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider value={{ selectedValue, handleValueChange }}>
      <div className={cn('w-full', className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className }) {
  return (
    <div
      className={cn(
        'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
        className
      )}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children, className }) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsTrigger must be used within Tabs');

  const { selectedValue, handleValueChange } = context;
  const isActive = selectedValue === value;

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        isActive
          ? 'bg-background text-foreground shadow-sm'
          : 'hover:bg-background/50',
        className
      )}
      onClick={() => handleValueChange(value)}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className }) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsContent must be used within Tabs');

  const { selectedValue } = context;
  if (selectedValue !== value) return null;

  return (
    <div
      className={cn(
        'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className
      )}
    >
      {children}
    </div>
  );
}
