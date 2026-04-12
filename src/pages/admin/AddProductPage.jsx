import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, X, Save, Globe, Tag, Image as ImageIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Badge } from '../../components/ui/Badge';
import { ImageUpload } from '../../components/ui/FileUpload';
import { useToast } from '../../components/ui/Toast';
import { cn } from '../../lib/utils';

const categories = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'home', label: 'Home & Garden' },
  { value: 'sports', label: 'Sports & Outdoors' },
  { value: 'books', label: 'Books' },
  { value: 'toys', label: 'Toys & Games' },
  { value: 'beauty', label: 'Beauty & Personal Care' },
  { value: 'automotive', label: 'Automotive' },
];

const taxClasses = [
  { value: 'standard', label: 'Standard Tax' },
  { value: 'reduced', label: 'Reduced Tax' },
  { value: 'zero', label: 'Zero Tax' },
  { value: 'digital', label: 'Digital Products' },
];

export default function AddProductPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  // Product form state
  const [product, setProduct] = useState({
    // General
    name: '',
    slug: '',
    description: '',
    shortDescription: '',
    categories: [],
    tags: [],
    
    // Pricing
    basePrice: '',
    salePrice: '',
    costPrice: '',
    taxClass: 'standard',
    
    // Inventory
    sku: '',
    barcode: '',
    stockQuantity: '',
    lowStockThreshold: '10',
    trackInventory: true,
    allowBackorder: false,
    
    // Product type
    productType: 'physical', // physical, digital
    status: 'draft', // draft, published, archived
    visibility: 'public', // public, hidden
    
    // Media
    featuredImage: null,
    galleryImages: [],
    
    // SEO
    metaTitle: '',
    metaDescription: '',
  });

  const [tagInput, setTagInput] = useState('');

  const handleInputChange = (field, value) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
    
    // Auto-generate slug from name
    if (field === 'name' && !product.slug) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setProduct((prev) => ({ ...prev, slug }));
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !product.tags.includes(tagInput.trim())) {
      setProduct((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setProduct((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleCategoryToggle = (categoryValue) => {
    setProduct((prev) => ({
      ...prev,
      categories: prev.categories.includes(categoryValue)
        ? prev.categories.filter((c) => c !== categoryValue)
        : [...prev.categories, categoryValue],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success('Product created successfully!');
    setSaving(false);
    navigate('/admin/products');
  };

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'inventory', label: 'Inventory' },
    { id: 'media', label: 'Media' },
    { id: 'seo', label: 'SEO' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/admin/products')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
            <p className="text-muted-foreground">Create a new product in your catalog</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setProduct({ ...product, status: 'draft' })}>
            Save as Draft
          </Button>
          <Button onClick={handleSubmit} loading={saving} leftIcon={<Save />}>
            Publish Product
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <div className="flex gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <form onSubmit={handleSubmit}>
        {/* General Tab */}
        {activeTab === 'general' && (
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Information</CardTitle>
                  <CardDescription>Basic details about your product</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    label="Product Name"
                    placeholder="Enter product name"
                    value={product.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />

                  <Input
                    label="Slug"
                    placeholder="product-url-slug"
                    value={product.slug}
                    onChange={(e) => handleInputChange('slug', e.target.value)}
                    helperText="URL-friendly name for this product"
                  />

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Short Description
                    </label>
                    <textarea
                      className="textarea"
                      rows={3}
                      placeholder="Brief description for product listings"
                      value={product.shortDescription}
                      onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Description
                    </label>
                    <textarea
                      className="textarea min-h-[200px]"
                      placeholder="Full product description"
                      value={product.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Organization</CardTitle>
                  <CardDescription>Categorize and tag your product</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Categories
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((category) => (
                        <label
                          key={category.value}
                          className="flex items-center gap-2 p-3 rounded-md border cursor-pointer hover:bg-accent"
                        >
                          <input
                            type="checkbox"
                            checked={product.categories.includes(category.value)}
                            onChange={() => handleCategoryToggle(category.value)}
                            className="h-4 w-4 rounded"
                          />
                          <span className="text-sm">{category.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Tags
                    </label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a tag"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                        rightIcon={
                          <Button type="button" variant="ghost" size="sm" onClick={handleAddTag}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        }
                      />
                    </div>
                    {product.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {product.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(tag)}
                              className="ml-1 hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select
                    label="Status"
                    value={product.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    options={[
                      { value: 'draft', label: 'Draft' },
                      { value: 'published', label: 'Published' },
                      { value: 'archived', label: 'Archived' },
                    ]}
                  />

                  <Select
                    label="Visibility"
                    value={product.visibility}
                    onChange={(e) => handleInputChange('visibility', e.target.value)}
                    options={[
                      { value: 'public', label: 'Public' },
                      { value: 'hidden', label: 'Hidden' },
                    ]}
                  />

                  <Select
                    label="Product Type"
                    value={product.productType}
                    onChange={(e) => handleInputChange('productType', e.target.value)}
                    options={[
                      { value: 'physical', label: 'Physical Product' },
                      { value: 'digital', label: 'Digital Product' },
                    ]}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Featured Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <ImageUpload
                    value={product.featuredImage ? [product.featuredImage] : []}
                    onChange={(images) => handleInputChange('featuredImage', images[0] || null)}
                    multiple={false}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Pricing Tab */}
        {activeTab === 'pricing' && (
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
                <CardDescription>Set your product pricing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Base Price"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={product.basePrice}
                  onChange={(e) => handleInputChange('basePrice', e.target.value)}
                  required
                />

                <Input
                  label="Sale Price"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={product.salePrice}
                  onChange={(e) => handleInputChange('salePrice', e.target.value)}
                  helperText="Leave empty if not on sale"
                />

                <Input
                  label="Cost Price"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={product.costPrice}
                  onChange={(e) => handleInputChange('costPrice', e.target.value)}
                  helperText="Your cost for profit calculation"
                />

                <Select
                  label="Tax Class"
                  value={product.taxClass}
                  onChange={(e) => handleInputChange('taxClass', e.target.value)}
                  options={taxClasses}
                />

                {product.basePrice && product.salePrice && (
                  <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950">
                    <p className="text-sm font-medium text-green-800 dark:text-green-200">
                      Discount: {Math.round((1 - product.salePrice / product.basePrice) * 100)}% off
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Inventory Tab */}
        {activeTab === 'inventory' && (
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Inventory</CardTitle>
                <CardDescription>Manage stock levels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="SKU"
                  placeholder="SKU-001"
                  value={product.sku}
                  onChange={(e) => handleInputChange('sku', e.target.value)}
                />

                <Input
                  label="Barcode"
                  placeholder="ISBN, UPC, etc."
                  value={product.barcode}
                  onChange={(e) => handleInputChange('barcode', e.target.value)}
                />

                <Input
                  label="Stock Quantity"
                  type="number"
                  placeholder="0"
                  value={product.stockQuantity}
                  onChange={(e) => handleInputChange('stockQuantity', e.target.value)}
                />

                <Input
                  label="Low Stock Threshold"
                  type="number"
                  value={product.lowStockThreshold}
                  onChange={(e) => handleInputChange('lowStockThreshold', e.target.value)}
                  helperText="Get notified when stock falls below this level"
                />

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="trackInventory"
                    checked={product.trackInventory}
                    onChange={(e) => handleInputChange('trackInventory', e.target.checked)}
                    className="h-4 w-4 rounded"
                  />
                  <label htmlFor="trackInventory" className="text-sm font-medium">
                    Track inventory
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="allowBackorder"
                    checked={product.allowBackorder}
                    onChange={(e) => handleInputChange('allowBackorder', e.target.checked)}
                    className="h-4 w-4 rounded"
                  />
                  <label htmlFor="allowBackorder" className="text-sm font-medium">
                    Allow backorders
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Media Tab */}
        {activeTab === 'media' && (
          <Card>
            <CardHeader>
              <CardTitle>Product Gallery</CardTitle>
              <CardDescription>Add multiple images to showcase your product</CardDescription>
            </CardHeader>
            <CardContent>
              <ImageUpload
                value={product.galleryImages}
                onChange={(images) => handleInputChange('galleryImages', images)}
                multiple
                maxImages={10}
              />
            </CardContent>
          </Card>
        )}

        {/* SEO Tab */}
        {activeTab === 'seo' && (
          <Card>
            <CardHeader>
              <CardTitle>Search Engine Optimization</CardTitle>
              <CardDescription>Optimize for search engines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Meta Title"
                placeholder="SEO title for search results"
                value={product.metaTitle}
                onChange={(e) => handleInputChange('metaTitle', e.target.value)}
                helperText={`${product.metaTitle.length}/60 characters`}
              />

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Meta Description
                </label>
                <textarea
                  className="textarea"
                  rows={4}
                  placeholder="Description for search results"
                  value={product.metaDescription}
                  onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                />
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {product.metaDescription.length}/160 characters
                </p>
              </div>

              <div className="p-4 rounded-lg border bg-muted">
                <h4 className="text-sm font-medium mb-2">Preview</h4>
                <div className="space-y-1">
                  <p className="text-blue-600 text-sm hover:underline cursor-pointer">
                    {product.metaTitle || product.name || 'Product Title'}
                  </p>
                  <p className="text-green-600 text-xs">
                    https://yoursite.com/products/{product.slug || 'product-slug'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {product.metaDescription || product.shortDescription || 'Product description will appear here...'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </form>
    </div>
  );
}
