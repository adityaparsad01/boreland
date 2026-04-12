import React from 'react';
import { cn } from '../../lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

/**
 * StatCard Component
 * Display key metrics with trend indicators
 */
export function StatCard({
  title,
  value,
  change,
  changeType = 'percentage',
  icon: Icon,
  trend = 'neutral',
  className,
}) {
  const isPositive = change >= 0;
  const isNeutral = change === 0;

  return (
    <Card className={cn('stat-card', className)}>
      <CardHeader className="stat-card-header">
        <div className="flex items-center justify-between w-full">
          <span className="text-sm font-medium text-muted-foreground">{title}</span>
          {Icon && (
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon className="h-4 w-4 text-primary" />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-2xl font-bold">{value}</div>
          {change !== undefined && (
            <div className="flex items-center gap-1 text-xs">
              {isPositive ? (
                <ArrowUpRight className="h-4 w-4 text-green-500" />
              ) : isNeutral ? (
                <span className="h-4 w-4" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-500" />
              )}
              <span
                className={cn(
                  isPositive && 'text-green-500',
                  !isPositive && !isNeutral && 'text-red-500'
                )}
              >
                {isPositive ? '+' : ''}{change}%
              </span>
              <span className="text-muted-foreground">vs last period</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
