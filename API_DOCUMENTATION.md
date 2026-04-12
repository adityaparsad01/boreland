# Boreland Ecommerce Admin Panel - API Documentation

## Base URL
```
/api/v1
```

## Authentication
All admin API endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## AUTHENTICATION ENDPOINTS

### POST /auth/admin/login
Login as admin user
```json
Request:
{
  "email": "admin@example.com",
  "password": "password123"
}

Response:
{
  "token": "jwt_token_here",
  "admin": {
    "id": "uuid",
    "email": "admin@example.com",
    "name": "Admin Name",
    "role": "admin"
  }
}
```

### POST /auth/admin/logout
Logout admin user

### POST /auth/admin/refresh
Refresh JWT token

### POST /auth/admin/forgot-password
Request password reset
```json
Request:
{
  "email": "admin@example.com"
}
```

### POST /auth/admin/reset-password
Reset password with token
```json
Request:
{
  "token": "reset_token",
  "password": "newpassword123"
}
```

### POST /auth/admin/2fa/enable
Enable two-factor authentication

### POST /auth/admin/2fa/verify
Verify 2FA code

---

## ADMIN USERS ENDPOINTS

### GET /admin/users
Get all admin users
```
Query Parameters:
- page (number): Page number
- limit (number): Items per page
- search (string): Search query
- role (string): Filter by role
- sort (string): Sort field
- order (string): Sort order (asc/desc)
```

### GET /admin/users/:id
Get admin user by ID

### POST /admin/users
Create new admin user
```json
Request:
{
  "email": "newadmin@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "admin",
  "permissions": {}
}
```

### PUT /admin/users/:id
Update admin user

### DELETE /admin/users/:id
Delete admin user

### GET /admin/roles
Get all roles

### POST /admin/roles
Create new role

### PUT /admin/roles/:id
Update role

---

## PRODUCTS ENDPOINTS

### GET /admin/products
Get all products
```
Query Parameters:
- page (number)
- limit (number)
- search (string)
- category (string)
- status (string): draft, published, archived
- minPrice (number)
- maxPrice (number)
- inStock (boolean)
- sort (string)
- order (string)
```

### GET /admin/products/:id
Get product by ID

### POST /admin/products
Create new product
```json
Request:
{
  "name": "Product Name",
  "slug": "product-name",
  "description": "Product description",
  "shortDescription": "Short description",
  "basePrice": 99.99,
  "salePrice": 79.99,
  "sku": "PROD-001",
  "stockQuantity": 100,
  "categories": ["category-id-1", "category-id-2"],
  "tags": ["tag1", "tag2"],
  "images": ["image-url-1", "image-url-2"],
  "metaTitle": "SEO Title",
  "metaDescription": "SEO Description"
}
```

### PUT /admin/products/:id
Update product

### DELETE /admin/products/:id
Delete product

### POST /admin/products/bulk-upload
Bulk upload products via CSV
```
Content-Type: multipart/form-data
File: products.csv
```

### POST /admin/products/bulk-delete
Bulk delete products
```json
Request:
{
  "productIds": ["id1", "id2", "id3"]
}
```

---

## CATEGORIES ENDPOINTS

### GET /admin/categories
Get all categories

### GET /admin/categories/:id
Get category by ID

### POST /admin/categories
Create category
```json
Request:
{
  "name": "Category Name",
  "slug": "category-name",
  "description": "Category description",
  "parentId": "parent-category-id",
  "image": "image-url"
}
```

### PUT /admin/categories/:id
Update category

### DELETE /admin/categories/:id
Delete category

---

## ORDERS ENDPOINTS

### GET /admin/orders
Get all orders
```
Query Parameters:
- page (number)
- limit (number)
- search (string)
- status (string): pending, processing, shipped, delivered, cancelled
- paymentStatus (string): pending, paid, failed, refunded
- fromDate (string): YYYY-MM-DD
- toDate (string): YYYY-MM-DD
- customer (string): customer ID
```

### GET /admin/orders/:id
Get order by ID

### PUT /admin/orders/:id/status
Update order status
```json
Request:
{
  "status": "shipped",
  "notes": "Order shipped via FedEx"
}
```

### PUT /admin/orders/:id
Update order

### DELETE /admin/orders/:id
Delete order

### POST /admin/orders/:id/refund
Process refund
```json
Request:
{
  "amount": 50.00,
  "reason": "Customer request",
  "items": [
    {
      "itemId": "item-id",
      "quantity": 1,
      "reason": "Damaged"
    }
  ]
}
```

### GET /admin/orders/:id/invoice
Generate invoice PDF

### POST /admin/orders/:id/shipment
Create shipment
```json
Request:
{
  "carrier": "FedEx",
  "trackingNumber": "1234567890",
  "trackingUrl": "https://fedex.com/track/1234567890"
}
```

---

## CUSTOMERS ENDPOINTS

### GET /admin/customers
Get all customers
```
Query Parameters:
- page (number)
- limit (number)
- search (string)
- status (string): active, vip, blocked
- minOrders (number)
- maxOrders (number)
- sortBy (string): orders, spent, joined
```

### GET /admin/customers/:id
Get customer by ID

### PUT /admin/customers/:id
Update customer

### DELETE /admin/customers/:id
Delete customer

### PUT /admin/customers/:id/block
Block customer
```json
Request:
{
  "reason": "Violation of terms"
}
```

### PUT /admin/customers/:id/unblock
Unblock customer

### GET /admin/customers/:id/orders
Get customer orders

### GET /admin/customers/:id/reviews
Get customer reviews

---

## REVIEWS ENDPOINTS

### GET /admin/reviews
Get all reviews
```
Query Parameters:
- page (number)
- limit (number)
- search (string)
- status (string): pending, approved, rejected, spam
- rating (number): 1-5
- productId (string)
- sortBy (string): rating, date, helpful
```

### GET /admin/reviews/:id
Get review by ID

### PUT /admin/reviews/:id/status
Update review status
```json
Request:
{
  "status": "approved"
}
```

### POST /admin/reviews/:id/response
Add admin response
```json
Request:
{
  "response": "Thank you for your feedback!"
}
```

### DELETE /admin/reviews/:id
Delete review

### POST /admin/reviews/bulk-action
Bulk action on reviews
```json
Request:
{
  "reviewIds": ["id1", "id2"],
  "action": "approve" // or "reject", "delete", "mark-spam"
}
```

---

## COUPONS ENDPOINTS

### GET /admin/coupons
Get all coupons

### GET /admin/coupons/:id
Get coupon by ID

### POST /admin/coupons
Create coupon
```json
Request:
{
  "code": "SUMMER20",
  "description": "Summer sale",
  "discountType": "percentage", // or "fixed", "free_shipping"
  "discountValue": 20,
  "minOrderAmount": 50,
  "usageLimit": 1000,
  "validFrom": "2024-06-01",
  "validUntil": "2024-08-31",
  "applicableProducts": ["product-id-1"],
  "applicableCategories": ["category-id-1"]
}
```

### PUT /admin/coupons/:id
Update coupon

### DELETE /admin/coupons/:id
Delete coupon

### GET /admin/coupons/:id/usage
Get coupon usage statistics

---

## CONTENT MANAGEMENT ENDPOINTS

### CMS Pages

#### GET /admin/cms-pages
Get all CMS pages

#### GET /admin/cms-pages/:id
Get CMS page by ID

#### POST /admin/cms-pages
Create CMS page
```json
Request:
{
  "title": "About Us",
  "slug": "about-us",
  "content": "<html>Content here</html>",
  "metaTitle": "About Boreland",
  "metaDescription": "Learn about Boreland",
  "status": "published"
}
```

#### PUT /admin/cms-pages/:id
Update CMS page

#### DELETE /admin/cms-pages/:id
Delete CMS page

### Banners

#### GET /admin/banners
Get all banners

#### POST /admin/banners
Create banner
```json
Request:
{
  "title": "Summer Sale",
  "imageUrl": "banner.jpg",
  "linkUrl": "/products/summer-sale",
  "displayOrder": 1,
  "validFrom": "2024-06-01",
  "validUntil": "2024-08-31"
}
```

#### PUT /admin/banners/:id
Update banner

#### DELETE /admin/banners/:id
Delete banner

### Blog Posts

#### GET /admin/blog
Get all blog posts

#### POST /admin/blog
Create blog post

#### PUT /admin/blog/:id
Update blog post

#### DELETE /admin/blog/:id
Delete blog post

---

## ANALYTICS ENDPOINTS

### GET /admin/analytics/overview
Get dashboard overview
```
Query Parameters:
- from (string): YYYY-MM-DD
- to (string): YYYY-MM-DD

Response:
{
  "revenue": {
    "total": 45231.89,
    "growth": 20.1
  },
  "orders": {
    "total": 1234,
    "growth": 15.3
  },
  "customers": {
    "total": 5678,
    "growth": 8.5
  },
  "products": {
    "total": 892,
    "growth": -2.3
  }
}
```

### GET /admin/analytics/sales
Get sales data for charts

### GET /admin/analytics/products
Get product performance

### GET /admin/analytics/customers
Get customer analytics

### GET /admin/analytics/traffic
Get traffic analytics

### GET /admin/analytics/conversion
Get conversion funnel data

### GET /admin/analytics/export
Export analytics report
```
Query Parameters:
- format (string): pdf, csv, xlsx
- type (string): sales, products, customers
- from (string): YYYY-MM-DD
- to (string): YYYY-MM-DD
```

---

## SETTINGS ENDPOINTS

### GET /admin/settings
Get all settings

### PUT /admin/settings
Update settings
```json
Request:
{
  "siteName": "Boreland",
  "contactEmail": "contact@boreland.com",
  "currency": "USD",
  "timezone": "UTC",
  // ... other settings
}
```

### GET /admin/settings/:category
Get settings by category (general, email, seo, etc.)

### PUT /admin/settings/:category
Update settings by category

---

## PAYMENT ENDPOINTS

### GET /admin/payments/gateways
Get available payment gateways

### PUT /admin/payments/gateways/:id
Configure payment gateway
```json
Request:
{
  "enabled": true,
  "credentials": {
    "apiKey": "sk_test_...",
    "webhookSecret": "whsec_..."
  }
}
```

### GET /admin/payments/transactions
Get payment transactions

### GET /admin/payments/transactions/:id
Get transaction details

---

## SHIPPING ENDPOINTS

### GET /admin/shipping/zones
Get shipping zones

### POST /admin/shipping/zones
Create shipping zone
```json
Request:
{
  "name": "Domestic",
  "countries": ["US"],
  "rates": [
    {
      "name": "Standard Shipping",
      "rateType": "flat",
      "baseRate": 5.99,
      "estimatedDaysMin": 3,
      "estimatedDaysMax": 5
    }
  ]
}
```

### PUT /admin/shipping/zones/:id
Update shipping zone

### DELETE /admin/shipping/zones/:id
Delete shipping zone

### GET /admin/shipping/carriers
Get shipping carriers

### POST /admin/shipping/carriers
Add shipping carrier

---

## MARKETING ENDPOINTS

### Email Campaigns

#### GET /admin/marketing/campaigns
Get email campaigns

#### POST /admin/marketing/campaigns
Create campaign
```json
Request:
{
  "name": "Summer Newsletter",
  "subject": "Check out our summer deals!",
  "recipientType": "all", // or "segment", "specific"
  "content": "<html>Email content</html>",
  "scheduledAt": "2024-06-01T10:00:00Z"
}
```

#### POST /admin/marketing/campaigns/:id/send
Send campaign

#### GET /admin/marketing/campaigns/:id/stats
Get campaign statistics

### Flash Sales

#### GET /admin/marketing/flash-sales
Get flash sales

#### POST /admin/marketing/flash-sales
Create flash sale

#### PUT /admin/marketing/flash-sales/:id
Update flash sale

### Push Notifications

#### POST /admin/marketing/push
Send push notification
```json
Request:
{
  "title": "New Arrival!",
  "body": "Check out our latest products",
  "imageUrl": "notification.jpg",
  "actionUrl": "/products/new"
}
```

---

## MEDIA ENDPOINTS

### POST /admin/media/upload
Upload file
```
Content-Type: multipart/form-data
File: image.jpg

Response:
{
  "url": "https://cdn.example.com/image.jpg",
  "filename": "image.jpg",
  "size": 102400,
  "mimeType": "image/jpeg"
}
```

### GET /admin/media
Get all media files

### DELETE /admin/media/:id
Delete media file

### POST /admin/media/folder
Create folder

---

## SYSTEM ENDPOINTS

### GET /admin/system/logs
Get system logs

### POST /admin/system/cache/clear
Clear cache

### POST /admin/system/backup
Create backup

### POST /admin/system/backup/restore
Restore backup

### GET /admin/system/health
System health check

---

## ERROR RESPONSES

All endpoints may return the following error formats:

### 400 Bad Request
```json
{
  "error": "Validation Error",
  "message": "Invalid input data",
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```

---

## RATE LIMITING

API requests are limited to:
- 100 requests per minute for general endpoints
- 10 requests per minute for authentication endpoints
- 1000 requests per minute for analytics endpoints

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640000000
```

---

## WEBHOOKS

Configure webhooks for real-time notifications:

### POST /admin/webhooks
Create webhook
```json
Request:
{
  "url": "https://your-server.com/webhook",
  "events": ["order.created", "order.updated", "product.low_stock"],
  "secret": "webhook_secret"
}
```

### Available Events:
- `order.created`
- `order.updated`
- `order.cancelled`
- `order.refunded`
- `product.created`
- `product.updated`
- `product.low_stock`
- `product.out_of_stock`
- `review.created`
- `review.approved`
- `customer.created`

---

## API VERSIONING

Current API version: v1

Version is specified in the URL path: `/api/v1/...`

Deprecated versions will be supported for 6 months after deprecation notice.
