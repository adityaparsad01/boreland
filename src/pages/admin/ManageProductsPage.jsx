import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, MoreVertical, Upload, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { DataTable } from '../../components/ui/DataTable';
import { Pagination } from '../../components/ui/Pagination';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/Dialog';
import { useToast } from '../../components/ui/Toast';
import { formatCurrency, getStatusColor, formatDate } from '../../lib/utils';

// Mock data
const mockProducts = [
  { id: '1', name: 'Wireless Headphones', sku: 'WH-001', category: 'Electronics', price: 7999.99, salePrice: 6499.99, stock: 150, status: 'published', image: null, createdAt: '2024-01-10' },
  { id: '2', name: 'Smart Watch', sku: 'SW-002', category: 'Electronics', price: 15999.99, salePrice: null, stock: 75, status: 'published', image: null, createdAt: '2024-01-09' },
  { id: '3', name: 'Laptop Stand', sku: 'LS-003', category: 'Accessories', price: 3999.99, salePrice: 3299.99, stock: 5, status: 'published', image: null, createdAt: '2024-01-08' },
  { id: '4', name: 'USB-C Hub', sku: 'UH-004', category: 'Accessories', price: 3199.99, salePrice: null, stock: 0, status: 'draft', image: null, createdAt: '2024-01-07' },
  { id: '5', name: 'Mechanical Keyboard', sku: 'MK-005', category: 'Electronics', price: 10499.99, salePrice: null, stock: 50, status: 'published', image: null, createdAt: '2024-01-06' },
  { id: '6', name: 'Monitor Arm', sku: 'MA-006', category: 'Accessories', price: 7299.99, salePrice: 5699.99, stock: 25, status: 'published', image: null, createdAt: '2024-01-05' },
  { id: '7', name: 'Webcam HD', sku: 'WC-007', category: 'Electronics', price: 6499.99, salePrice: null, stock: 8, status: 'published', image: null, createdAt: '2024-01-04' },
  { id: '8', name: 'Desk Lamp', sku: 'DL-008', category: 'Home', price: 2799.99, salePrice: null, stock: 100, status: 'draft', image: null, createdAt: '2024-01-03' },
];

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'Electronics', label: 'Electronics' },
  { value: 'Accessories', label: 'Accessories' },
  { value: 'Home', label: 'Home' },
  { value: 'Clothing', label: 'Clothing' },
];

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
  { value: 'archived', label: 'Archived' },
];

export default function ManageProductsPage() {
  const toast = useToast();
  const [products, setProducts] = useState(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleDelete = () => {
    setProducts(products.filter((p) => p.id !== selectedProduct.id));
    setDeleteDialogOpen(false);
    setSelectedProduct(null);
    toast.success('Product deleted successfully');
  };

  const columns = [
    {
      header: 'Product',
      accessor: 'name',
      cell: ({ value, row }) => (
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
            {row.image ? (
              <img src={row.image} alt={value} className="h-full w-full object-cover" />
            ) : (
              <span className="text-lg font-semibold text-muted-foreground">
                {value.charAt(0)}
              </span>
            )}
          </div>
          <div>
            <div className="font-medium">{value}</div>
            <div className="text-sm text-muted-foreground">SKU: {row.sku}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Category',
      accessor: 'category',
      cell: ({ value }) => (
        <Badge variant="outline">{value}</Badge>
      ),
    },
    {
      header: 'Price',
      accessor: 'price',
      cell: ({ value, row }) => (
        <div>
          {row.salePrice ? (
            <div>
              <span className="text-green-600 font-medium">{formatCurrency(row.salePrice)}</span>
              <span className="ml-2 text-sm text-muted-foreground line-through">
                {formatCurrency(value)}
              </span>
            </div>
          ) : (
            <span className="font-medium">{formatCurrency(value)}</span>
          )}
        </div>
      ),
    },
    {
      header: 'Stock',
      accessor: 'stock',
      cell: ({ value }) => (
        <Badge className={value === 0 ? 'badge-destructive' : value < 10 ? 'badge-warning' : 'badge-success'}>
          {value === 0 ? 'Out of Stock' : value < 10 ? `Low: ₹{value}` : `₹{value} in stock`}
        </Badge>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: ({ value }) => (
        <Badge className={getStatusColor(value)}>{value}</Badge>
      ),
    },
    {
      header: 'Created',
      accessor: 'createdAt',
      cell: ({ value }) => formatDate(value),
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesStatus = !selectedStatus || product.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Manage your product catalog</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" leftIcon={<Download />}>
            Export CSV
          </Button>
          <Button variant="outline" leftIcon={<Upload />}>
            Import CSV
          </Button>
          <Link to="/admin/products/new">
            <Button leftIcon={<Plus />}>Add Product</Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="md:col-span-2">
              <Input
                placeholder="Search products by name or SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              options={categories}
              placeholder="Filter by category"
            />
            <Select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              options={statusOptions}
              placeholder="Filter by status"
            />
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Products ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={paginatedProducts}
            searchable={false}
            actions={(row) => (
              <div className="flex items-center gap-2">
                <Link to={`/admin/products/edit/₹{row.id}`}>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSelectedProduct(row);
                    setDeleteDialogOpen(true);
                  }}
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
              totalItems={filteredProducts.length}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
            />
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <p>
            Are you sure you want to delete <strong>{selectedProduct?.name}</strong>?
            This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
