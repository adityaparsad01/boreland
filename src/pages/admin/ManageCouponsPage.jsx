import React, { useState } from 'react';
import { Plus, Edit, Trash2, Copy, Tag, Calendar, DollarSign, Percent } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { DataTable } from '../../components/ui/DataTable';
import { Pagination } from '../../components/ui/Pagination';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '../../components/ui/Dialog';
import { useToast } from '../../components/ui/Toast';
import { formatDate, getStatusColor } from '../../lib/utils';

// Mock data
const mockCoupons = [
  { id: '1', code: 'WELCOME10', description: 'Welcome discount for new customers', discountType: 'percentage', discountValue: 10, usageCount: 156, usageLimit: 1000, minOrderAmount: 50, validFrom: '2024-01-01', validUntil: '2024-12-31', status: 'active', applicableProducts: 'All' },
  { id: '2', code: 'SAVE20', description: 'Summer sale discount', discountType: 'percentage', discountValue: 20, usageCount: 89, usageLimit: 500, minOrderAmount: 100, validFrom: '2024-06-01', validUntil: '2024-08-31', status: 'active', applicableProducts: 'Selected' },
  { id: '3', code: 'FREESHIP', description: 'Free shipping on orders over ₹75', discountType: 'free_shipping', discountValue: 0, usageCount: 234, usageLimit: null, minOrderAmount: 75, validFrom: '2024-01-01', validUntil: '2024-12-31', status: 'active', applicableProducts: 'All' },
  { id: '4', code: 'FLAT15', description: 'Flat ₹15 off on electronics', discountType: 'fixed', discountValue: 15, usageCount: 45, usageLimit: 200, minOrderAmount: 150, validFrom: '2024-01-15', validUntil: '2024-03-31', status: 'active', applicableProducts: 'Electronics' },
  { id: '5', code: 'EXPIRED50', description: 'Black Friday special', discountType: 'percentage', discountValue: 50, usageCount: 500, usageLimit: 500, minOrderAmount: 200, validFrom: '2023-11-20', validUntil: '2023-11-30', status: 'expired', applicableProducts: 'All' },
  { id: '6', code: 'NEWYEAR25', description: 'New Year special discount', discountType: 'percentage', discountValue: 25, usageCount: 0, usageLimit: 1000, minOrderAmount: 100, validFrom: '2024-12-25', validUntil: '2025-01-05', status: 'scheduled', applicableProducts: 'All' },
];

const discountTypeOptions = [
  { value: 'percentage', label: 'Percentage (%)' },
  { value: 'fixed', label: 'Fixed Amount (₹)' },
  { value: 'free_shipping', label: 'Free Shipping' },
];

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'expired', label: 'Expired' },
  { value: 'disabled', label: 'Disabled' },
];

export default function ManageCouponsPage() {
  const toast = useToast();
  const [coupons, setCoupons] = useState(mockCoupons);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [couponDialogOpen, setCouponDialogOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [editing, setEditing] = useState(false);

  const [couponForm, setCouponForm] = useState({
    code: '',
    description: '',
    discountType: 'percentage',
    discountValue: '',
    usageLimit: '',
    minOrderAmount: '',
    validFrom: '',
    validUntil: '',
    status: 'active',
  });

  const handleSaveCoupon = () => {
    if (editing && selectedCoupon) {
      setCoupons(coupons.map((c) =>
        c.id === selectedCoupon.id ? { ...c, ...couponForm } : c
      ));
      toast.success('Coupon updated successfully');
    } else {
      const newCoupon = {
        id: Date.now().toString(),
        ...couponForm,
        usageCount: 0,
        applicableProducts: 'All',
      };
      setCoupons([...coupons, newCoupon]);
      toast.success('Coupon created successfully');
    }
    setCouponDialogOpen(false);
    resetForm();
  };

  const handleDeleteCoupon = (couponId) => {
    setCoupons(coupons.filter((c) => c.id !== couponId));
    toast.success('Coupon deleted successfully');
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    toast.success('Coupon code copied to clipboard');
  };

  const resetForm = () => {
    setCouponForm({
      code: '',
      description: '',
      discountType: 'percentage',
      discountValue: '',
      usageLimit: '',
      minOrderAmount: '',
      validFrom: '',
      validUntil: '',
      status: 'active',
    });
    setEditing(false);
    setSelectedCoupon(null);
  };

  const openEditDialog = (coupon) => {
    setSelectedCoupon(coupon);
    setCouponForm({
      code: coupon.code,
      description: coupon.description,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue.toString(),
      usageLimit: coupon.usageLimit?.toString() || '',
      minOrderAmount: coupon.minOrderAmount?.toString() || '',
      validFrom: coupon.validFrom,
      validUntil: coupon.validUntil,
      status: coupon.status,
    });
    setEditing(true);
    setCouponDialogOpen(true);
  };

  const columns = [
    {
      header: 'Coupon Code',
      accessor: 'code',
      cell: ({ value }) => (
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4 text-muted-foreground" />
          <span className="font-mono font-medium">{value}</span>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleCopyCode(value)}>
            <Copy className="h-3 w-3" />
          </Button>
        </div>
      ),
    },
    {
      header: 'Description',
      accessor: 'description',
      cell: ({ value }) => (
        <span className="text-sm text-muted-foreground">{value}</span>
      ),
    },
    {
      header: 'Discount',
      accessor: 'discountType',
      cell: ({ value, row }) => (
        <div className="flex items-center gap-2">
          {value === 'percentage' && <Percent className="h-4 w-4 text-muted-foreground" />}
          {value === 'fixed' && <DollarSign className="h-4 w-4 text-muted-foreground" />}
          {value === 'free_shipping' && <span className="text-sm">🚚</span>}
          <span className="font-medium">
            {value === 'percentage' && `₹{row.discountValue}%`}
            {value === 'fixed' && `₹₹{row.discountValue}`}
            {value === 'free_shipping' && 'Free Shipping'}
          </span>
        </div>
      ),
    },
    {
      header: 'Usage',
      accessor: 'usageCount',
      cell: ({ value, row }) => (
        <div>
          <span className="font-medium">{value}</span>
          {row.usageLimit && (
            <span className="text-sm text-muted-foreground"> / {row.usageLimit}</span>
          )}
        </div>
      ),
    },
    {
      header: 'Valid Until',
      accessor: 'validUntil',
      cell: ({ value, row }) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{formatDate(value)}</span>
          {new Date(value) < new Date() && row.status !== 'expired' && (
            <Badge variant="destructive" size="sm">Expired</Badge>
          )}
        </div>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: ({ value }) => (
        <Badge className={getStatusColor(value)}>{value}</Badge>
      ),
    },
  ];

  const filteredCoupons = coupons.filter((coupon) => {
    const matchesSearch = 
      coupon.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coupon.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !selectedStatus || coupon.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredCoupons.length / pageSize);
  const paginatedCoupons = filteredCoupons.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const stats = {
    total: coupons.length,
    active: coupons.filter((c) => c.status === 'active').length,
    scheduled: coupons.filter((c) => c.status === 'scheduled').length,
    expired: coupons.filter((c) => c.status === 'expired').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Coupons & Discounts</h1>
          <p className="text-muted-foreground">Create and manage promotional codes</p>
        </div>
        <Button onClick={() => { resetForm(); setCouponDialogOpen(true); }} leftIcon={<Plus />}>
          Create Coupon
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-sm text-muted-foreground">Total Coupons</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <p className="text-sm text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">{stats.scheduled}</div>
            <p className="text-sm text-muted-foreground">Scheduled</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">{stats.expired}</div>
            <p className="text-sm text-muted-foreground">Expired</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <Input
                placeholder="Search coupons..."
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

      {/* Coupons Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Coupons ({filteredCoupons.length})</CardTitle>
          <CardDescription>Manage your promotional codes and discounts</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={paginatedCoupons}
            searchable={false}
            actions={(row) => (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => openEditDialog(row)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteCoupon(row.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
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
              totalItems={filteredCoupons.length}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
            />
          </div>
        </CardContent>
      </Card>

      {/* Create/Edit Coupon Dialog */}
      <Dialog open={couponDialogOpen} onOpenChange={setCouponDialogOpen}>
        <DialogHeader>
          <DialogTitle>{editing ? 'Edit Coupon' : 'Create New Coupon'}</DialogTitle>
          <DialogDescription>
            {editing ? 'Update coupon details' : 'Create a new promotional code'}
          </DialogDescription>
        </DialogHeader>
        <DialogContent className="max-w-2xl">
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Coupon Code"
              placeholder="e.g., SUMMER20"
              value={couponForm.code}
              onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value.toUpperCase() })}
              required
            />
            <Select
              label="Discount Type"
              value={couponForm.discountType}
              onChange={(e) => setCouponForm({ ...couponForm, discountType: e.target.value })}
              options={discountTypeOptions}
            />
            <Input
              label="Discount Value"
              type="number"
              placeholder={couponForm.discountType === 'percentage' ? '10' : '50'}
              value={couponForm.discountValue}
              onChange={(e) => setCouponForm({ ...couponForm, discountValue: e.target.value })}
              disabled={couponForm.discountType === 'free_shipping'}
            />
            <Input
              label="Minimum Order Amount"
              type="number"
              placeholder="0"
              value={couponForm.minOrderAmount}
              onChange={(e) => setCouponForm({ ...couponForm, minOrderAmount: e.target.value })}
            />
            <Input
              label="Usage Limit"
              type="number"
              placeholder="Unlimited"
              value={couponForm.usageLimit}
              onChange={(e) => setCouponForm({ ...couponForm, usageLimit: e.target.value })}
            />
            <Select
              label="Status"
              value={couponForm.status}
              onChange={(e) => setCouponForm({ ...couponForm, status: e.target.value })}
              options={[
                { value: 'active', label: 'Active' },
                { value: 'scheduled', label: 'Scheduled' },
                { value: 'disabled', label: 'Disabled' },
              ]}
            />
            <Input
              label="Valid From"
              type="date"
              value={couponForm.validFrom}
              onChange={(e) => setCouponForm({ ...couponForm, validFrom: e.target.value })}
            />
            <Input
              label="Valid Until"
              type="date"
              value={couponForm.validUntil}
              onChange={(e) => setCouponForm({ ...couponForm, validUntil: e.target.value })}
            />
          </div>
          <div className="md:col-span-2">
            <Input
              label="Description"
              placeholder="Describe what this coupon is for..."
              value={couponForm.description}
              onChange={(e) => setCouponForm({ ...couponForm, description: e.target.value })}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCouponDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveCoupon}>
              {editing ? 'Update Coupon' : 'Create Coupon'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
