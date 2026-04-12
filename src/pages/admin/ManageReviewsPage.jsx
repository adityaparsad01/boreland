import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, Flag, Check, X, Edit, Reply, ShieldAlert } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { DataTable } from '../../components/ui/DataTable';
import { Pagination } from '../../components/ui/Pagination';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '../../components/ui/Dialog';
import { Avatar, AvatarFallback } from '../../components/ui/Avatar';
import { useToast } from '../../components/ui/Toast';
import { formatDate, getStatusColor, getInitials } from '../../lib/utils';

// Mock data
const mockReviews = [
  { id: '1', product: 'Wireless Headphones', productImage: null, customer: 'John D.', customerEmail: 'john@example.com', rating: 5, title: 'Excellent quality!', comment: 'These headphones are amazing! Great sound quality and comfortable to wear for long periods.', status: 'approved', verified: true, helpful: 24, notHelpful: 2, spamScore: 0.05, date: '2024-01-15', adminResponse: null },
  { id: '2', product: 'Smart Watch', productImage: null, customer: 'Jane S.', customerEmail: 'jane@example.com', rating: 4, title: 'Good value', comment: 'Works well for the price. Battery life could be better but overall satisfied with the purchase.', status: 'pending', verified: true, helpful: 12, notHelpful: 1, spamScore: 0.1, date: '2024-01-14', adminResponse: null },
  { id: '3', product: 'Laptop Stand', productImage: null, customer: 'Bob J.', customerEmail: 'bob@example.com', rating: 3, title: 'Average', comment: 'It does the job but build quality is not as expected. Okay for the price.', status: 'approved', verified: true, helpful: 8, notHelpful: 3, spamScore: 0.08, date: '2024-01-14', adminResponse: 'Thank you for your feedback. We are working on improving our products.' },
  { id: '4', product: 'USB-C Hub', productImage: null, customer: 'Alice B.', customerEmail: 'alice@example.com', rating: 5, title: 'Perfect!', comment: 'Exactly what I needed. All ports work flawlessly with my MacBook Pro.', status: 'approved', verified: true, helpful: 31, notHelpful: 0, spamScore: 0.02, date: '2024-01-13', adminResponse: null },
  { id: '5', product: 'Mechanical Keyboard', productImage: null, customer: 'Charlie W.', customerEmail: 'charlie@example.com', rating: 2, title: 'Not satisfied', comment: 'Keys started sticking after a week. Very disappointed with this purchase.', status: 'pending', verified: false, helpful: 5, notHelpful: 1, spamScore: 0.15, date: '2024-01-13', adminResponse: null },
  { id: '6', product: 'Monitor Arm', productImage: null, customer: 'Diana P.', customerEmail: 'diana@example.com', rating: 5, title: 'Game changer!', comment: 'My desk setup is so much cleaner now. Easy to install and very sturdy.', status: 'approved', verified: true, helpful: 19, notHelpful: 1, spamScore: 0.03, date: '2024-01-12', adminResponse: null },
  { id: '7', product: 'Webcam HD', productImage: null, customer: 'Eve A.', customerEmail: 'eve@example.com', rating: 4, title: 'Good for video calls', comment: 'Clear image and easy setup. Microphone quality is just okay.', status: 'approved', verified: true, helpful: 15, notHelpful: 2, spamScore: 0.06, date: '2024-01-12', adminResponse: null },
  { id: '8', product: 'Desk Lamp', productImage: null, customer: 'Spam Bot', customerEmail: 'spam@spam.com', rating: 5, title: 'BUY NOW!!!', comment: 'Click here for amazing deals!!! www.spam.com', status: 'spam', verified: false, helpful: 0, notHelpful: 10, spamScore: 0.95, date: '2024-01-11', adminResponse: null },
];

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'spam', label: 'Spam' },
];

const ratingOptions = [
  { value: '', label: 'All Ratings' },
  { value: '5', label: '5 Stars' },
  { value: '4', label: '4 Stars' },
  { value: '3', label: '3 Stars' },
  { value: '2', label: '2 Stars' },
  { value: '1', label: '1 Star' },
];

export default function ManageReviewsPage() {
  const toast = useToast();
  const [reviews, setReviews] = useState(mockReviews);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedReview, setSelectedReview] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [responseDialogOpen, setResponseDialogOpen] = useState(false);
  const [adminResponse, setAdminResponse] = useState('');

  const handleApprove = (reviewId) => {
    setReviews(reviews.map((r) =>
      r.id === reviewId ? { ...r, status: 'approved' } : r
    ));
    toast.success('Review approved');
  };

  const handleReject = (reviewId) => {
    setReviews(reviews.map((r) =>
      r.id === reviewId ? { ...r, status: 'rejected' } : r
    ));
    toast.success('Review rejected');
  };

  const handleMarkSpam = (reviewId) => {
    setReviews(reviews.map((r) =>
      r.id === reviewId ? { ...r, status: 'spam' } : r
    ));
    toast.success('Review marked as spam');
  };

  const handleSubmitResponse = () => {
    setReviews(reviews.map((r) =>
      r.id === selectedReview?.id ? { ...r, adminResponse, adminResponseAt: new Date().toISOString() } : r
    ));
    setResponseDialogOpen(false);
    setDetailOpen(false);
    toast.success('Response posted');
  };

  const columns = [
    {
      header: 'Review',
      accessor: 'title',
      cell: ({ value, row }) => (
        <div>
          <div className="flex items-center gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${i < row.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
              />
            ))}
            {row.verified && (
              <Badge variant="outline" size="sm" className="ml-2">Verified</Badge>
            )}
          </div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-muted-foreground line-clamp-1">{row.comment}</div>
        </div>
      ),
    },
    {
      header: 'Product',
      accessor: 'product',
      cell: ({ value, row }) => (
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-muted flex items-center justify-center">
            {row.productImage ? (
              <img src={row.productImage} alt={value} className="h-full w-full object-cover rounded" />
            ) : (
              <span className="text-xs font-semibold text-muted-foreground">{value.charAt(0)}</span>
            )}
          </div>
          <span className="text-sm">{value}</span>
        </div>
      ),
    },
    {
      header: 'Customer',
      accessor: 'customer',
      cell: ({ value, row }) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-muted-foreground">{row.customerEmail}</div>
        </div>
      ),
    },
    {
      header: 'Helpful',
      accessor: 'helpful',
      cell: ({ value, row }) => (
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-sm">
            <ThumbsUp className="h-3 w-3" /> {value}
          </span>
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <ThumbsDown className="h-3 w-3" /> {row.notHelpful}
          </span>
        </div>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: ({ value, row }) => (
        <div className="flex items-center gap-2">
          <Badge className={getStatusColor(value)}>{value}</Badge>
          {row.spamScore > 0.7 && (
            <Badge variant="destructive" size="sm">
              <ShieldAlert className="h-3 w-3 mr-1" />
              Spam
            </Badge>
          )}
        </div>
      ),
    },
    {
      header: 'Date',
      accessor: 'date',
      cell: ({ value }) => formatDate(value),
    },
  ];

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch = 
      review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !selectedStatus || review.status === selectedStatus;
    const matchesRating = !selectedRating || review.rating === parseInt(selectedRating);
    return matchesSearch && matchesStatus && matchesRating;
  });

  const totalPages = Math.ceil(filteredReviews.length / pageSize);
  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const stats = {
    total: reviews.length,
    pending: reviews.filter((r) => r.status === 'pending').length,
    approved: reviews.filter((r) => r.status === 'approved').length,
    spam: reviews.filter((r) => r.status === 'spam').length,
    avgRating: (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Product Reviews</h1>
          <p className="text-muted-foreground">Moderate and manage customer reviews</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-sm text-muted-foreground">Total Reviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            <p className="text-sm text-muted-foreground">Approved</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">{stats.spam}</div>
            <p className="text-sm text-muted-foreground">Spam</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold flex items-center gap-1">
              {stats.avgRating} <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            </div>
            <p className="text-sm text-muted-foreground">Avg Rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="md:col-span-2">
              <Input
                placeholder="Search reviews..."
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
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              options={ratingOptions}
              placeholder="Filter by rating"
            />
          </div>
        </CardContent>
      </Card>

      {/* Reviews Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Reviews ({filteredReviews.length})</CardTitle>
          <CardDescription>Manage customer reviews and responses</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={paginatedReviews}
            searchable={false}
            actions={(row) => (
              <div className="flex items-center gap-2">
                {row.status === 'pending' && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleApprove(row.id)}
                      title="Approve"
                    >
                      <Check className="h-4 w-4 text-green-600" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleReject(row.id)}
                      title="Reject"
                    >
                      <X className="h-4 w-4 text-red-600" />
                    </Button>
                  </>
                )}
                {row.spamScore > 0.7 && row.status !== 'spam' && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleMarkSpam(row.id)}
                    title="Mark as Spam"
                  >
                    <Flag className="h-4 w-4 text-orange-600" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSelectedReview(row);
                    setDetailOpen(true);
                  }}
                  title="View Details"
                >
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
              totalItems={filteredReviews.length}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
            />
          </div>
        </CardContent>
      </Card>

      {/* Review Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogHeader>
          <DialogTitle>Review Details</DialogTitle>
        </DialogHeader>
        <DialogContent className="max-w-3xl">
          {selectedReview && (
            <div className="space-y-6">
              {/* Rating and Title */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < selectedReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
                      />
                    ))}
                  </div>
                  <Badge className={getStatusColor(selectedReview.status)}>{selectedReview.status}</Badge>
                  {selectedReview.verified && (
                    <Badge variant="outline">Verified Purchase</Badge>
                  )}
                </div>
                <h3 className="text-lg font-semibold">{selectedReview.title}</h3>
              </div>

              {/* Review Content */}
              <p className="text-foreground">{selectedReview.comment}</p>

              {/* Product and Customer Info */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="text-sm font-medium mb-2">Product</h4>
                  <p className="text-sm">{selectedReview.product}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Customer</h4>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{getInitials(selectedReview.customer)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{selectedReview.customer}</p>
                      <p className="text-xs text-muted-foreground">{selectedReview.customerEmail}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Spam Score */}
              {selectedReview.spamScore > 0.3 && (
                <div className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Spam Score</span>
                    <span className={`text-sm font-semibold ${selectedReview.spamScore > 0.7 ? 'text-red-600' : 'text-yellow-600'}`}>
                      {(selectedReview.spamScore * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full ${selectedReview.spamScore > 0.7 ? 'bg-red-500' : 'bg-yellow-500'}`}
                      style={{ width: `${selectedReview.spamScore * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Helpful Votes */}
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" /> {selectedReview.helpful} found helpful
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <ThumbsDown className="h-4 w-4" /> {selectedReview.notHelpful} not helpful
                </span>
              </div>

              {/* Admin Response */}
              {selectedReview.adminResponse && (
                <div className="p-4 rounded-lg bg-muted">
                  <h4 className="text-sm font-medium mb-2">Admin Response</h4>
                  <p className="text-sm">{selectedReview.adminResponse}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Posted {formatDate(selectedReview.adminResponseAt)}
                  </p>
                </div>
              )}

              {/* Actions */}
              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setDetailOpen(false)}>
                  Close
                </Button>
                {selectedReview.status === 'pending' && (
                  <>
                    <Button variant="destructive" onClick={() => handleReject(selectedReview.id)}>
                      Reject
                    </Button>
                    <Button onClick={() => handleApprove(selectedReview.id)}>
                      Approve
                    </Button>
                  </>
                )}
                <Button
                  variant="outline"
                  onClick={() => {
                    setResponseDialogOpen(true);
                    setAdminResponse(selectedReview.adminResponse || '');
                  }}
                  leftIcon={<Reply className="h-4 w-4" />}
                >
                  {selectedReview.adminResponse ? 'Edit Response' : 'Respond'}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Response Dialog */}
      <Dialog open={responseDialogOpen} onOpenChange={setResponseDialogOpen}>
        <DialogHeader>
          <DialogTitle>Respond to Review</DialogTitle>
          <DialogDescription>
            Your response will be visible to all customers
          </DialogDescription>
        </DialogHeader>
        <DialogContent>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Your Response
            </label>
            <textarea
              className="textarea min-h-[120px]"
              placeholder="Write your response..."
              value={adminResponse}
              onChange={(e) => setAdminResponse(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setResponseDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitResponse}>
              Post Response
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
