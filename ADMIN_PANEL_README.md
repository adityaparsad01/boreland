# Boreland Ecommerce Admin Panel

A modern, full-featured ecommerce admin panel built with React, Tailwind CSS, and Supabase. This comprehensive admin panel provides complete control over ecommerce operations from a single, intuitive dashboard.

## 🎯 Features Overview

### Core Modules

#### 1. Dashboard
- **Revenue Overview**: Total revenue with growth tracking
- **Order Analytics**: Real-time order statistics
- **Customer Metrics**: Total customers and growth rate
- **Product Stats**: Inventory overview and low stock alerts
- **Sales Charts**: Interactive revenue and order trends
- **Top Products**: Best-selling products leaderboard
- **Recent Orders**: Live order feed with status
- **Recent Reviews**: Latest customer reviews requiring moderation
- **Traffic Analytics**: Visitor statistics and engagement metrics

#### 2. Product Management
- Add/Edit/Delete products with rich form
- Product categories with hierarchy support
- Product variants (size, color, etc.)
- Multiple image upload with drag-and-drop
- SKU and barcode management
- Pricing and discount configuration
- Bulk CSV import/export
- Inventory tracking with low stock alerts
- Digital and physical product support
- SEO optimization fields

#### 3. Order Management
- Complete order listing with advanced filters
- Order status workflow (Pending → Processing → Shipped → Delivered)
- Invoice generation and download
- Refund management with partial refund support
- Payment status tracking
- Shipping integration with tracking
- Internal order notes
- Advanced search and filtering

#### 4. Customer Management
- Customer directory with search
- Detailed customer profiles
- Order history per customer
- Customer reviews and ratings
- Block/unblock functionality with reasons
- Customer support notes
- Customer groups (Regular, VIP, Wholesale)
- Loyalty points system

#### 5. Review Management
- Review moderation queue
- Approve/reject reviews
- Spam detection with AI scoring
- Admin response system
- Rating analytics
- Abuse report handling
- Verified purchase badges
- Helpful/not helpful voting

#### 6. Content Management
- Website logo and favicon upload
- Homepage banner/slider management
- CMS pages (About, Contact, Privacy, Terms)
- Navigation menu editor
- Footer content editor
- Blog post management with categories
- Media library

#### 7. Marketing Tools
- Coupon code creation and management
- Percentage and fixed discounts
- Free shipping coupons
- Usage limits and restrictions
- Flash sales scheduling
- Email campaign management
- Push notifications
- Abandoned cart recovery
- SEO meta tags editor
- Affiliate program management

#### 8. Payment Settings
- Payment gateway configuration (Stripe, PayPal, etc.)
- Tax class management
- Multi-currency support
- Transaction logs

#### 9. Shipping Management
- Shipping zones configuration
- Flat rate and weight-based shipping
- Free shipping thresholds
- Carrier integration
- Delivery time estimates

#### 10. Analytics & Reports
- Sales reports with date ranges
- Customer acquisition reports
- Product performance analytics
- Revenue trends
- Conversion funnel analysis
- Export to PDF/CSV/Excel
- Real-time dashboard

#### 11. Admin Management
- Multi-admin support
- Role-based access control (RBAC)
- Permission management
- Activity logs
- Login history

#### 12. Security Features
- JWT authentication
- Two-factor authentication (2FA)
- Password encryption
- Session management
- Rate limiting
- Audit logs

#### 13. Settings
- General site settings
- Email SMTP configuration
- SMS gateway settings
- Social media links
- Maintenance mode
- Database backup/restore
- Cache management

#### 14. Modern Features
- Dark/Light mode toggle
- Fully responsive design
- Global search functionality
- Advanced filtering
- Drag-and-drop uploads
- Toast notifications
- Multi-language ready
- Headless API architecture

---

## 🏗️ Architecture

### Technology Stack

**Frontend:**
- React 18
- React Router v6
- Tailwind CSS
- Recharts (for analytics)
- Lucide React (icons)
- React Hot Toast (notifications)

**Backend:**
- Supabase (PostgreSQL + Auth + Storage)
- Node.js ready

**Database:**
- PostgreSQL via Supabase
- Complete schema with 50+ tables
- Row Level Security (RLS)
- Indexes for performance

### Folder Structure

```
src/
├── components/
│   ├── admin/           # Admin-specific components
│   │   ├── AdminLayout.jsx
│   │   ├── StatCard.jsx
│   │   ├── Charts.jsx
│   │   └── ...
│   ├── ui/              # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Card.jsx
│   │   ├── Table.jsx
│   │   ├── Dialog.jsx
│   │   ├── Badge.jsx
│   │   ├── Avatar.jsx
│   │   ├── Loading.jsx
│   │   ├── Pagination.jsx
│   │   ├── DataTable.jsx
│   │   ├── FileUpload.jsx
│   │   ├── Tabs.jsx
│   │   └── Toast.jsx
│   └── ...
├── pages/
│   ├── admin/           # Admin pages
│   │   ├── AdminDashboardPage.jsx
│   │   ├── ManageProductsPage.jsx
│   │   ├── ManageOrdersPage.jsx
│   │   ├── ManageCustomersPage.jsx
│   │   ├── ManageReviewsPage.jsx
│   │   ├── ManageCouponsPage.jsx
│   │   ├── AdminSettingsPage.jsx
│   │   └── ...
│   └── ...
├── context/             # React context providers
├── lib/                 # Utilities
│   ├── utils.js         # Helper functions
│   └── supabase.js      # Supabase client
└── api/                 # API functions
```

---

## 📊 Database Schema

The database schema includes:

- **Admin & Auth**: admin_users, admin_roles, activity_logs, login_history
- **Customers**: customers, addresses, groups
- **Products**: products, categories, variants, attributes, reviews, images
- **Orders**: orders, order_items, status_history, refunds, invoices
- **Marketing**: coupons, flash_sales, email_campaigns, push_notifications
- **Content**: cms_pages, banners, navigation, blog_posts, media
- **Shipping**: zones, rates, carriers
- **Analytics**: daily_summary, product_performance, traffic_analytics
- **System**: settings, logs, feature_flags, backups

See `database-schema.sql` for the complete schema.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd boreland
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create `.env` file:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Set up database**
Run the SQL migrations in Supabase SQL Editor:
```bash
# Copy contents of database-schema.sql and run in Supabase
```

5. **Start development server**
```bash
npm run dev
```

6. **Build for production**
```bash
npm run build
```

---

## 📱 Admin Routes

| Route | Description |
|-------|-------------|
| `/admin` | Dashboard |
| `/admin/products` | Product management |
| `/admin/products/new` | Add product |
| `/admin/products/edit/:id` | Edit product |
| `/admin/orders` | Order management |
| `/admin/customers` | Customer management |
| `/admin/reviews` | Review moderation |
| `/admin/coupons` | Coupon management |
| `/admin/blog` | Blog management |
| `/admin/cms-pages` | CMS pages |
| `/admin/banners` | Homepage banners |
| `/admin/settings` | Store settings |
| `/admin/analytics` | Analytics & reports |
| `/admin/users` | Admin users |
| `/admin/login` | Admin login |

---

## 🎨 UI Components

### Button
```jsx
import { Button } from './components/ui/Button';

<Button variant="primary">Save</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline" leftIcon={<Plus />}>Add New</Button>
```

### DataTable
```jsx
import { DataTable } from './components/ui/DataTable';

<DataTable
  columns={columns}
  data={data}
  searchable
  sortable
  actions={(row) => <Button>Edit</Button>}
/>
```

### Dialog
```jsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './components/ui/Dialog';

<Dialog open={isOpen} onOpenChange={setOpen}>
  <DialogHeader>
    <DialogTitle>Title</DialogTitle>
  </DialogHeader>
  <DialogContent>
    {/* Content */}
  </DialogContent>
</Dialog>
```

---

## 🔐 Authentication

Admin authentication is handled through Supabase Auth with:
- Email/password login
- JWT token management
- Role-based access control
- Protected routes
- Session persistence

---

## 📈 API Documentation

See `API_DOCUMENTATION.md` for complete API reference including:
- Authentication endpoints
- CRUD operations for all resources
- Analytics endpoints
- Webhook configuration
- Rate limiting details

---

## 🎯 Key Features Implementation

### Dark Mode
Toggle between light and dark themes via the header toggle. Uses CSS variables for theming.

### Responsive Design
- Desktop: Full sidebar navigation
- Tablet: Collapsible sidebar
- Mobile: Hamburger menu with slide-out navigation

### Search
Global search in header with keyboard shortcut support (Ctrl+K).

### Notifications
Toast notifications for all actions using react-hot-toast.

### Data Tables
Advanced tables with:
- Sorting
- Filtering
- Pagination
- Bulk selection
- Export functionality

---

## 🔒 Security Best Practices

1. **Authentication**: JWT tokens with expiration
2. **Authorization**: Role-based access control
3. **Input Validation**: Client and server-side validation
4. **SQL Injection**: Parameterized queries via Supabase
5. **XSS Protection**: React's built-in escaping
6. **CSRF Protection**: Token-based protection
7. **Rate Limiting**: API rate limiting configured
8. **Audit Logging**: All admin actions logged

---

## 📦 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel deploy
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

---

## 🧪 Testing

```bash
npm test
```

---

## 📝 License

MIT License

---

## 🤝 Support

For issues and questions:
- GitHub Issues
- Documentation: See `/docs`
- API Docs: See `API_DOCUMENTATION.md`

---

## 🎉 Credits

Built with:
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/)
- [Recharts](https://recharts.org/)
- [Lucide Icons](https://lucide.dev/)
