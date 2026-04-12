import React, { useState } from 'react';
import { Mail, Phone, MapPin, MoreVertical, Ban, Check, UserX, Edit, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { DataTable } from '../../components/ui/DataTable';
import { Pagination } from '../../components/ui/Pagination';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '../../components/ui/Dialog';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/Avatar';
import { useToast } from '../../components/ui/Toast';
import { formatDate, getInitials, getStatusColor } from '../../lib/utils';

// Mock data
const mockCustomers = [
  { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', phone: '+91-9876543210', orders: 12, spent: 104250.50, status: 'active', joined: '2023-06-15', location: 'Mumbai, India' },
  { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', phone: '+91-9876543211', orders: 8, spent: 74166.00, status: 'active', joined: '2023-07-20', location: 'Delhi, India' },
  { id: '3', firstName: 'Bob', lastName: 'Johnson', email: 'bob@example.com', phone: '+91-9876543212', orders: 5, spent: 37562.75, status: 'active', joined: '2023-08-10', location: 'Bangalore, India' },
  { id: '4', firstName: 'Alice', lastName: 'Brown', email: 'alice@example.com', phone: '+91-9876543213', orders: 15, spent: 174999.00, status: 'vip', joined: '2023-05-01', location: 'Hyderabad, India' },
  { id: '5', firstName: 'Charlie', lastName: 'Wilson', email: 'charlie@example.com', phone: '+91-9876543214', orders: 3, spent: 22937.25, status: 'active', joined: '2023-09-05', location: 'Chennai, India' },
  { id: '6', firstName: 'Diana', lastName: 'Prince', email: 'diana@example.com', phone: '+91-9876543215', orders: 0, spent: 0, status: 'blocked', joined: '2023-10-12', location: 'Kolkata, India' },
  { id: '7', firstName: 'Eve', lastName: 'Adams', email: 'eve@example.com', phone: '+91-9876543216', orders: 20, spent: 291665.00, status: 'vip', joined: '2023-04-18', location: 'Pune, India' },
  { id: '8', firstName: 'Frank', lastName: 'Miller', email: 'frank@example.com', phone: '+91-9876543217', orders: 6, spent: 43375.50, status: 'active', joined: '2023-08-25', location: 'Ahmedabad, India' },
];

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'vip', label: 'VIP' },
  { value: 'blocked', label: 'Blocked' },
];

export default function ManageCustomersPage() {
  const toast = useToast();
  const [customers, setCustomers] = useState(mockCustomers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [blockDialogOpen, setBlockDialogOpen] = useState(false);
  const [blockReason, setBlockReason] = useState('');

  const handleBlockCustomer = () => {
    setCustomers(customers.map((c) =>
      c.id === selectedCustomer.id ? { ...c, status: 'blocked', blockReason } : c
    ));
    setBlockDialogOpen(false);
    setDetailOpen(false);
    toast.success('Customer blocked successfully');
  };

  const handleUnblockCustomer = () => {
    setCustomers(customers.map((c) =>
      c.id === selectedCustomer.id ? { ...c, status: 'active', blockReason: null } : c
    ));
    toast.success('Customer unblocked successfully');
  };

  const columns = [
    {
      header: 'Customer',
      accessor: 'firstName',
      cell: ({ value, row }) => (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>{getInitials(`₹{row.firstName} ₹{row.lastName}`)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{value} {row.lastName}</div>
            <div className="text-sm text-muted-foreground">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Contact',
      accessor: 'phone',
      cell: ({ value }) => (
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span>{value}</span>
        </div>
      ),
    },
    {
      header: 'Location',
      accessor: 'location',
      cell: ({ value }) => (
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>{value}</span>
        </div>
      ),
    },
    {
      header: 'Orders',
      accessor: 'orders',
      cell: ({ value, row }) => (
        <div>
          <div className="font-medium">{value} orders</div>
          <div className="text-sm text-muted-foreground">{formatCurrency(row.spent)} total</div>
        </div>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: ({ value }) => (
        <Badge className={value === 'vip' ? 'badge-primary' : value === 'blocked' ? 'badge-destructive' : 'badge-success'}>
          {value}
        </Badge>
      ),
    },
    {
      header: 'Joined',
      accessor: 'joined',
      cell: ({ value }) => formatDate(value),
    },
  ];

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = 
      customer.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !selectedStatus || customer.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredCustomers.length / pageSize);
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const stats = {
    total: customers.length,
    active: customers.filter((c) => c.status === 'active').length,
    vip: customers.filter((c) => c.status === 'vip').length,
    blocked: customers.filter((c) => c.status === 'blocked').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">Manage your customer base</p>
        </div>
        <Button>Add Customer</Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-sm text-muted-foreground">Total Customers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-sm text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.vip}</div>
            <p className="text-sm text-muted-foreground">VIP Customers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.blocked}</div>
            <p className="text-sm text-muted-foreground">Blocked</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <Input
                placeholder="Search by name or email..."
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
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Customers ({filteredCustomers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={paginatedCustomers}
            searchable={false}
            actions={(row) => (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSelectedCustomer(row);
                    setDetailOpen(true);
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
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
              totalItems={filteredCustomers.length}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
            />
          </div>
        </CardContent>
      </Card>

      {/* Customer Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogHeader>
          <DialogTitle>Customer Details</DialogTitle>
        </DialogHeader>
        <DialogContent className="max-w-3xl">
          {selectedCustomer && (
            <div className="space-y-6">
              {/* Profile Section */}
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-2xl">
                    {getInitials(`₹{selectedCustomer.firstName} ₹{selectedCustomer.lastName}`)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">
                    {selectedCustomer.firstName} {selectedCustomer.lastName}
                  </h3>
                  <Badge className={selectedCustomer.status === 'vip' ? 'badge-primary' : selectedCustomer.status === 'blocked' ? 'badge-destructive' : 'badge-success'}>
                    {selectedCustomer.status}
                  </Badge>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Contact Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedCustomer.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedCustomer.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedCustomer.location}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Order Statistics</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-muted-foreground">Total Orders:</span> {selectedCustomer.orders}</p>
                    <p><span className="text-muted-foreground">Total Spent:</span> {formatCurrency(selectedCustomer.spent)}</p>
                    <p><span className="text-muted-foreground">Customer Since:</span> {formatDate(selectedCustomer.joined)}</p>
                    <p><span className="text-muted-foreground">Loyalty Points:</span> {Math.floor(selectedCustomer.spent * 0.1)}</p>
                  </div>
                </div>
              </div>

              {/* Block Reason (if blocked) */}
              {selectedCustomer.status === 'blocked' && selectedCustomer.blockReason && (
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                  <h4 className="text-sm font-medium text-destructive mb-1">Block Reason</h4>
                  <p className="text-sm text-destructive/80">{selectedCustomer.blockReason}</p>
                </div>
              )}

              {/* Actions */}
              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setDetailOpen(false)}>
                  Close
                </Button>
                {selectedCustomer.status === 'blocked' ? (
                  <Button variant="success" onClick={handleUnblockCustomer} leftIcon={<Check className="h-4 w-4" />}>
                    Unblock Customer
                  </Button>
                ) : (
                  <Button
                    variant="destructive"
                    onClick={() => setBlockDialogOpen(true)}
                    leftIcon={<Ban className="h-4 w-4" />}
                  >
                    Block Customer
                  </Button>
                )}
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Block Customer Dialog */}
      <Dialog open={blockDialogOpen} onOpenChange={setBlockDialogOpen}>
        <DialogHeader>
          <DialogTitle>Block Customer</DialogTitle>
          <DialogDescription>
            This will prevent the customer from accessing their account and placing orders.
          </DialogDescription>
        </DialogHeader>
        <DialogContent>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Block Reason
            </label>
            <textarea
              className="textarea"
              rows={4}
              placeholder="Enter the reason for blocking this customer..."
              value={blockReason}
              onChange={(e) => setBlockReason(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBlockDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleBlockCustomer}>
              Block Customer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
  }).format(value);
}
