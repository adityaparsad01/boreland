import React, { useState } from 'react';
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  AlertTriangle,
  Star,
  Eye,
} from 'lucide-react';
import { StatCard } from '../../components/admin/StatCard';
import { SalesChart, RevenueBarChart, CategoryPieChart, TrendLineChart } from '../../components/admin/Charts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { DataTable } from '../../components/ui/DataTable';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/Avatar';
import { formatCurrency, formatDate, getStatusColor, compactNumber } from '../../lib/utils';

// Mock data - Replace with actual API calls
const mockStats = {
  revenue: { value: '₹37,89,231', change: 20.1 },
  orders: { value: '1,234', change: 15.3 },
  customers: { value: '5,678', change: 8.5 },
  products: { value: '892', change: -2.3 },
};

const mockRecentOrders = [
  { id: '1', orderNumber: 'ORD-20240115-001', customer: 'John Doe', email: 'john@example.com', total: 20999.00, status: 'delivered', date: '2024-01-15' },
  { id: '2', orderNumber: 'ORD-20240115-002', customer: 'Jane Smith', email: 'jane@example.com', total: 12599.50, status: 'processing', date: '2024-01-15' },
  { id: '3', orderNumber: 'ORD-20240115-003', customer: 'Bob Johnson', email: 'bob@example.com', total: 29250.00, status: 'pending', date: '2024-01-14' },
  { id: '4', orderNumber: 'ORD-20240115-004', customer: 'Alice Brown', email: 'alice@example.com', total: 10499.75, status: 'shipped', date: '2024-01-14' },
  { id: '5', orderNumber: 'ORD-20240115-005', customer: 'Charlie Wilson', email: 'charlie@example.com', total: 37499.00, status: 'delivered', date: '2024-01-13' },
];

const mockTopProducts = [
  { id: '1', name: 'Wireless Headphones', sales: 234, revenue: 1958600, image: null },
  { id: '2', name: 'Smart Watch', sales: 189, revenue: 1577100, image: null },
  { id: '3', name: 'Laptop Stand', sales: 156, revenue: 650520, image: null },
  { id: '4', name: 'USB-C Hub', sales: 145, revenue: 484550, image: null },
  { id: '5', name: 'Mechanical Keyboard', sales: 132, revenue: 1099476, image: null },
];

const mockLowStockProducts = [
  { id: '1', name: 'iPhone 15 Case', stock: 5, threshold: 10 },
  { id: '2', name: 'MacBook Charger', stock: 3, threshold: 10 },
  { id: '3', name: 'AirPods Pro', stock: 8, threshold: 15 },
  { id: '4', name: 'iPad Stand', stock: 2, threshold: 10 },
];

const mockRecentReviews = [
  { id: '1', product: 'Wireless Headphones', customer: 'John D.', rating: 5, comment: 'Excellent quality!', date: '2024-01-15', status: 'approved' },
  { id: '2', product: 'Smart Watch', customer: 'Jane S.', rating: 4, comment: 'Good value for money', date: '2024-01-14', status: 'pending' },
  { id: '3', product: 'Laptop Stand', customer: 'Bob J.', rating: 3, comment: 'Average build quality', date: '2024-01-14', status: 'approved' },
];

const orderColumns = [
  { header: 'Order', accessor: 'orderNumber' },
  { 
    header: 'Customer', 
    accessor: 'customer',
    cell: ({ value, row }) => (
      <div>
        <div className="font-medium">{value}</div>
        <div className="text-sm text-muted-foreground">{row.email}</div>
      </div>
    ),
  },
  { 
    header: 'Total', 
    accessor: 'total',
    cell: ({ value }) => formatCurrency(value),
  },
  {
    header: 'Status',
    accessor: 'status',
    cell: ({ value }) => (
      <Badge className={getStatusColor(value)}>{value}</Badge>
    ),
  },
  {
    header: 'Date',
    accessor: 'date',
    cell: ({ value }) => formatDate(value),
  },
];

export default function AdminDashboardPage() {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your store today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="select w-auto"
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <Button>Download Report</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={mockStats.revenue.value}
          change={mockStats.revenue.change}
          icon={DollarSign}
          trend="positive"
        />
        <StatCard
          title="Total Orders"
          value={mockStats.orders.value}
          change={mockStats.orders.change}
          icon={ShoppingCart}
          trend="positive"
        />
        <StatCard
          title="Total Customers"
          value={mockStats.customers.value}
          change={mockStats.customers.change}
          icon={Users}
          trend="positive"
        />
        <StatCard
          title="Total Products"
          value={mockStats.products.value}
          change={mockStats.products.change}
          icon={Package}
          trend="negative"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Revenue and orders over time</CardDescription>
          </CardHeader>
          <CardContent>
            <SalesChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue by Day</CardTitle>
            <CardDescription>Weekly revenue breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <RevenueBarChart />
          </CardContent>
        </Card>
      </div>

      {/* Second Row */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Recent Orders */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest orders from your store</CardDescription>
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={orderColumns}
              data={mockRecentOrders}
              searchable={false}
              sortable={false}
              actions={(row) => (
                <Button variant="ghost" size="sm">View</Button>
              )}
            />
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
            <CardDescription>Best performers this period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockTopProducts.map((product, index) => (
                <div key={product.id} className="flex items-center gap-4">
                  <div className="relative h-12 w-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                    ) : (
                      <Package className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {product.sales} sales • {formatCurrency(product.revenue)}
                    </p>
                  </div>
                  <div className="text-sm font-semibold">#{index + 1}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Third Row */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Low Stock Alerts */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <CardTitle>Low Stock Alerts</CardTitle>
            </div>
            <CardDescription>Products running low on inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockLowStockProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{product.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full bg-yellow-500 rounded-full"
                          style={{ width: `₹{(product.stock / product.threshold) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {product.stock}/{product.threshold}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" size="sm">
              View All Low Stock
            </Button>
          </CardContent>
        </Card>

        {/* Recent Reviews */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <CardTitle>Recent Reviews</CardTitle>
            </div>
            <CardDescription>Latest customer reviews</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRecentReviews.map((review) => (
                <div key={review.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{review.customer[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{review.customer}</p>
                        <p className="text-xs text-muted-foreground">{review.product}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(review.status)}>{review.status}</Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ₹{i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{review.comment}</p>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" size="sm">
              View All Reviews
            </Button>
          </CardContent>
        </Card>

        {/* Traffic Analytics */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-500" />
              <CardTitle>Traffic Overview</CardTitle>
            </div>
            <CardDescription>Visitor analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Visitors</p>
                  <p className="text-2xl font-bold">24.5K</p>
                  <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3" /> +12.5%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Page Views</p>
                  <p className="text-2xl font-bold">89.2K</p>
                  <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3" /> +8.3%
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Bounce Rate</span>
                  <span className="font-medium">42.3%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Avg. Session</span>
                  <span className="font-medium">3m 24s</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Pages/Session</span>
                  <span className="font-medium">3.6</span>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4" size="sm">
              View Analytics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
