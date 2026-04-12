import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { cn } from '../../lib/utils';

/**
 * SalesChart Component
 * Display sales trends over time
 */
export function SalesChart({ data, className }) {
  const chartData = data || [
    { date: 'Jan', sales: 4000, orders: 240 },
    { date: 'Feb', sales: 3000, orders: 139 },
    { date: 'Mar', sales: 5000, orders: 380 },
    { date: 'Apr', sales: 4500, orders: 390 },
    { date: 'May', sales: 6000, orders: 480 },
    { date: 'Jun', sales: 5500, orders: 380 },
    { date: 'Jul', sales: 7000, orders: 530 },
  ];

  return (
    <ResponsiveContainer width="100%" height={400} className={cn('chart-container', className)}>
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
        <YAxis stroke="#9ca3af" fontSize={12} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="sales"
          stroke="#3B82F6"
          fillOpacity={1}
          fill="url(#colorSales)"
          name="Revenue"
        />
        <Area
          type="monotone"
          dataKey="orders"
          stroke="#10B981"
          fillOpacity={1}
          fill="url(#colorOrders)"
          name="Orders"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

/**
 * BarChart Component
 * Display comparison data
 */
export function RevenueBarChart({ data, className }) {
  const chartData = data || [
    { name: 'Mon', revenue: 4000 },
    { name: 'Tue', revenue: 3000 },
    { name: 'Wed', revenue: 5000 },
    { name: 'Thu', revenue: 4500 },
    { name: 'Fri', revenue: 6000 },
    { name: 'Sat', revenue: 5500 },
    { name: 'Sun', revenue: 7000 },
  ];

  return (
    <ResponsiveContainer width="100%" height={400} className={cn('chart-container', className)}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
        <YAxis stroke="#9ca3af" fontSize={12} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
        />
        <Legend />
        <Bar dataKey="revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Revenue" />
      </BarChart>
    </ResponsiveContainer>
  );
}

/**
 * PieChart Component
 * Display distribution data
 */
export function CategoryPieChart({ data, className }) {
  const chartData = data || [
    { name: 'Electronics', value: 400 },
    { name: 'Clothing', value: 300 },
    { name: 'Home & Garden', value: 200 },
    { name: 'Sports', value: 150 },
    { name: 'Books', value: 100 },
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <ResponsiveContainer width="100%" height={400} className={cn('chart-container', className)}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

/**
 * LineChart Component
 * Display trends over time
 */
export function TrendLineChart({ data, className }) {
  const chartData = data || [
    { date: 'Week 1', visitors: 4000, pageViews: 2400 },
    { date: 'Week 2', visitors: 3000, pageViews: 1398 },
    { date: 'Week 3', visitors: 5000, pageViews: 3800 },
    { date: 'Week 4', visitors: 4500, pageViews: 3908 },
    { date: 'Week 5', visitors: 6000, pageViews: 4800 },
    { date: 'Week 6', visitors: 5500, pageViews: 3800 },
  ];

  return (
    <ResponsiveContainer width="100%" height={400} className={cn('chart-container', className)}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
        <YAxis stroke="#9ca3af" fontSize={12} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="visitors"
          stroke="#3B82F6"
          strokeWidth={2}
          dot={{ fill: '#3B82F6' }}
          name="Visitors"
        />
        <Line
          type="monotone"
          dataKey="pageViews"
          stroke="#10B981"
          strokeWidth={2}
          dot={{ fill: '#10B981' }}
          name="Page Views"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

/**
 * MiniSparkline Component
 * Small inline chart for stats
 */
export function MiniSparkline({ data, color = '#3B82F6', className }) {
  const chartData = data || [10, 25, 18, 30, 25, 40, 35, 50, 45, 60];
  const max = Math.max(...chartData);
  const min = Math.min(...chartData);
  const range = max - min || 1;

  const points = chartData
    .map((value, index) => {
      const x = (index / (chartData.length - 1)) * 100;
      const y = 100 - ((value - min) / range) * 100;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg viewBox="0 0 100 100" className={cn('h-10 w-full', className)} preserveAspectRatio="none">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        points={points}
      />
    </svg>
  );
}
