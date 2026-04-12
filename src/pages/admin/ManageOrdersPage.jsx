import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Download, MessageSquare, MoreVertical, RefreshCw, Truck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { DataTable } from '../../components/ui/DataTable';
import { Pagination } from '../../components/ui/Pagination';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '../../components/ui/Dialog';
import { useToast } from '../../components/ui/Toast';
import { formatCurrency, getStatusColor, formatDate } from '../../lib/utils';

// Mock data
const mockOrders = [
  { id: '1', orderNumber: 'ORD-20240115-001', customer: 'John Doe', email: 'john@example.com', items: 3, total: 20999.00, status: 'delivered', paymentStatus: 'paid', date: '2024-01-15T10:30:00' },
  { id: '2', orderNumber: 'ORD-20240115-002', customer: 'Jane Smith', email: 'jane@example.com', items: 2, total: 12599.50, status: 'processing', paymentStatus: 'paid', date: '2024-01-15T09:15:00' },
  { id: '3', orderNumber: 'ORD-20240115-003', customer: 'Bob Johnson', email: 'bob@example.com', items: 1, total: 29250.00, status: 'pending', paymentStatus: 'pending', date: '2024-01-14T16:45:00' },
  { id: '4', orderNumber: 'ORD-20240115-004', customer: 'Alice Brown', email: 'alice@example.com', items: 4, total: 10499.75, status: 'shipped', paymentStatus: 'paid', date: '2024-01-14T14:20:00' },
  { id: '5', orderNumber: 'ORD-20240115-005', customer: 'Charlie Wilson', email: 'charlie@example.com', items: 2, total: 37499.00, status: 'delivered', paymentStatus: 'paid', date: '2024-01-13T11:00:00' },
  { id: '6', orderNumber: 'ORD-20240115-006', customer: 'Diana Prince', email: 'diana@example.com', items: 1, total: 7499.99, status: 'cancelled', paymentStatus: 'refunded', date: '2024-01-13T08:30:00' },
  { id: '7', orderNumber: 'ORD-20240115-007', customer: 'Eve Adams', email: 'eve@example.com', items: 5, total: 56250.00, status: 'processing', paymentStatus: 'paid', date: '2024-01-12T15:45:00' },
  { id: '8', orderNumber: 'ORD-20240115-008', customer: 'Frank Miller', email: 'frank@example.com', items: 2, total: 16699.99, status: 'pending', paymentStatus: 'failed', date: '2024-01-12T10:15:00' },
];

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'pending', label: 'Pending' },
  { value: 'processing', label: 'Processing' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
];

const paymentStatusOptions = [
  { value: '', label: 'All Payment Status' },
  { value: 'pending', label: 'Pending' },
  { value: 'paid', label: 'Paid' },
  { value: 'failed', label: 'Failed' },
  { value: 'refunded', label: 'Refunded' },
];

export default function ManageOrdersPage() {
  const toast = useToast();
  const [orders, setOrders] = useState(mockOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetailOpen, setOrderDetailOpen] = useState(false);
  const [statusUpdateOpen, setStatusUpdateOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  const handleStatusUpdate = () => {
    setOrders(orders.map((order) =>
      order.id === selectedOrder?.id ? { ...order, status: newStatus } : order
    ));
    setStatusUpdateOpen(false);
    setOrderDetailOpen(false);
    toast.success('Order status updated successfully');
  };

  const columns = [
    {
      header: 'Order',
      accessor: 'orderNumber',
      cell: ({ value, row }) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-muted-foreground">{formatDate(row.date, { timeStyle: 'short' })}</div>
        </div>
      ),
    },
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
      header: 'Items',
      accessor: 'items',
      cell: ({ value }) => `₹{value} items`,
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
      header: 'Payment',
      accessor: 'paymentStatus',
      cell: ({ value }) => (
        <Badge className={getStatusColor(value)}>{value}</Badge>
      ),
    },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !selectedStatus || order.status === selectedStatus;
    const matchesPaymentStatus = !selectedPaymentStatus || order.paymentStatus === selectedPaymentStatus;
    return matchesSearch && matchesStatus && matchesPaymentStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / pageSize);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    processing: orders.filter((o) => o.status === 'processing').length,
    shipped: orders.filter((o) => o.status === 'shipped').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">Manage and track customer orders</p>
        </div>
        <Button variant="outline" leftIcon={<Download />}>
          Export Orders
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-sm text-muted-foreground">Total Orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.pending}</div>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.processing}</div>
            <p className="text-sm text-muted-foreground">Processing</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.shipped}</div>
            <p className="text-sm text-muted-foreground">Shipped</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="md:col-span-2">
              <Input
                placeholder="Search by order number, customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              options={statusOptions}
              placeholder="Filter by status"
            />
            <Select
              value={selectedPaymentStatus}
              onChange={(e) => setSelectedPaymentStatus(e.target.value)}
              options={paymentStatusOptions}
              placeholder="Filter by payment"
            />
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Orders ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={paginatedOrders}
            searchable={false}
            actions={(row) => (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSelectedOrder(row);
                    setOrderDetailOpen(true);
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSelectedOrder(row);
                    setNewStatus(row.status);
                    setStatusUpdateOpen(true);
                  }}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            )}
          />

          {/* Pagination */}
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages || 1}
              pageSize={pageSize}
              totalItems={filteredOrders.length}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
            />
          </div>
        </CardContent>
      </Card>

      {/* Order Detail Dialog */}
      <Dialog open={orderDetailOpen} onOpenChange={setOrderDetailOpen}>
        <DialogHeader>
          <DialogTitle>Order Details - {selectedOrder?.orderNumber}</DialogTitle>
          <DialogDescription>
            Order placed on {selectedOrder && formatDate(selectedOrder.date)}
          </DialogDescription>
        </DialogHeader>
        <DialogContent className="max-w-3xl">
          {selectedOrder && (
            <div className="space-y-6">
              {/* Order Info Grid */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="text-sm font-medium mb-2">Customer Information</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-muted-foreground">Name:</span> {selectedOrder.customer}</p>
                    <p><span className="text-muted-foreground">Email:</span> {selectedOrder.email}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Order Summary</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-muted-foreground">Status:</span> <Badge className={getStatusColor(selectedOrder.status)}>{selectedOrder.status}</Badge></p>
                    <p><span className="text-muted-foreground">Payment:</span> <Badge className={getStatusColor(selectedOrder.paymentStatus)}>{selectedOrder.paymentStatus}</Badge></p>
                    <p><span className="text-muted-foreground">Total:</span> {formatCurrency(selectedOrder.total)}</p>
                  </div>
                </div>
              </div>

              {/* Order Items (mock) */}
              <div>
                <h4 className="text-sm font-medium mb-2">Order Items</h4>
                <div className="rounded-lg border">
                  <table className="w-full text-sm">
                    <thead className="bg-muted">
                      <tr>
                        <th className="p-3 text-left font-medium">Product</th>
                        <th className="p-3 text-right font-medium">Qty</th>
                        <th className="p-3 text-right font-medium">Price</th>
                        <th className="p-3 text-right font-medium">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3].slice(0, selectedOrder.items).map((item, i) => (
                        <tr key={i} className="border-t">
                          <td className="p-3">Product Item {i + 1}</td>
                          <td className="p-3 text-right">1</td>
                          <td className="p-3 text-right">₹{(selectedOrder.total / selectedOrder.items).toFixed(2)}</td>
                          <td className="p-3 text-right">₹{(selectedOrder.total / selectedOrder.items).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Actions */}
              <DialogFooter>
                <Button variant="outline" onClick={() => setOrderDetailOpen(false)}>
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setOrderDetailOpen(false);
                    setStatusUpdateOpen(true);
                  }}
                  leftIcon={<RefreshCw className="h-4 w-4" />}
                >
                  Update Status
                </Button>
                <Button leftIcon={<Truck className="h-4 w-4" />}>
                  Create Shipment
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Status Update Dialog */}
      <Dialog open={statusUpdateOpen} onOpenChange={setStatusUpdateOpen}>
        <DialogHeader>
          <DialogTitle>Update Order Status</DialogTitle>
          <DialogDescription>
            Change the status for order {selectedOrder?.orderNumber}
          </DialogDescription>
        </DialogHeader>
        <DialogContent>
          <Select
            label="New Status"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            options={statusOptions.filter((s) => s.value !== '')}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setStatusUpdateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleStatusUpdate}>
              Update Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
