-- ============================================
-- BORELAND ECOMMERCE ADMIN PANEL
-- Complete Database Schema for Supabase
-- ============================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- 1. ADMIN & AUTHENTICATION TABLES
-- ============================================

-- Admin users table
CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    avatar_url TEXT,
    role VARCHAR(50) DEFAULT 'admin',
    permissions JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
    two_factor_enabled BOOLEAN DEFAULT false,
    two_factor_secret VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin roles table
CREATE TABLE admin_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    permissions JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin activity logs
CREATE TABLE admin_activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID REFERENCES admin_users(id) ON DELETE SET NULL,
    action VARCHAR(255) NOT NULL,
    entity_type VARCHAR(100),
    entity_id UUID,
    details JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin login history
CREATE TABLE admin_login_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID REFERENCES admin_users(id) ON DELETE CASCADE,
    login_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ip_address INET,
    user_agent TEXT,
    success BOOLEAN DEFAULT true,
    failure_reason VARCHAR(255)
);

-- ============================================
-- 2. CUSTOMER TABLES
-- ============================================

-- Customer users table
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(50),
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT true,
    is_blocked BOOLEAN DEFAULT false,
    block_reason TEXT,
    email_verified BOOLEAN DEFAULT false,
    loyalty_points INTEGER DEFAULT 0,
    customer_group_id UUID,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Customer addresses
CREATE TABLE customer_addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    address_type VARCHAR(50) DEFAULT 'shipping',
    is_default BOOLEAN DEFAULT false,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    company VARCHAR(255),
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100),
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Customer groups
CREATE TABLE customer_groups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    discount_percentage DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add foreign key for customer groups
ALTER TABLE customers ADD CONSTRAINT fk_customer_group
    FOREIGN KEY (customer_group_id) REFERENCES customer_groups(id) ON DELETE SET NULL;

-- ============================================
-- 3. PRODUCT MANAGEMENT TABLES
-- ============================================

-- Product categories
CREATE TABLE product_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    parent_id UUID REFERENCES product_categories(id) ON DELETE CASCADE,
    image_url TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    meta_title VARCHAR(255),
    meta_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    short_description VARCHAR(500),
    sku VARCHAR(100) UNIQUE,
    barcode VARCHAR(100),
    product_type VARCHAR(50) DEFAULT 'physical',
    status VARCHAR(50) DEFAULT 'draft',
    visibility VARCHAR(50) DEFAULT 'public',
    
    -- Pricing
    base_price DECIMAL(12,2) NOT NULL,
    sale_price DECIMAL(12,2),
    cost_price DECIMAL(12,2),
    tax_class VARCHAR(50) DEFAULT 'standard',
    
    -- Inventory
    stock_quantity INTEGER DEFAULT 0,
    low_stock_threshold INTEGER DEFAULT 10,
    track_inventory BOOLEAN DEFAULT true,
    allow_backorder BOOLEAN DEFAULT false,
    
    -- Media
    featured_image_url TEXT,
    gallery_images TEXT[],
    
    -- SEO
    meta_title VARCHAR(255),
    meta_description TEXT,
    
    -- Timestamps
    created_by UUID REFERENCES admin_users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    published_at TIMESTAMP WITH TIME ZONE
);

-- Product-Category relationship (many-to-many)
CREATE TABLE product_category_relation (
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    category_id UUID REFERENCES product_categories(id) ON DELETE CASCADE,
    is_primary BOOLEAN DEFAULT false,
    PRIMARY KEY (product_id, category_id)
);

-- Product variants
CREATE TABLE product_variants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    sku VARCHAR(100) UNIQUE,
    barcode VARCHAR(100),
    
    -- Variant options stored as JSON
    options JSONB NOT NULL, -- e.g., {"size": "M", "color": "Red"}
    
    -- Pricing
    price DECIMAL(12,2),
    sale_price DECIMAL(12,2),
    cost_price DECIMAL(12,2),
    
    -- Inventory
    stock_quantity INTEGER DEFAULT 0,
    low_stock_threshold INTEGER DEFAULT 10,
    
    -- Media
    image_url TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product attributes/options (like Size, Color)
CREATE TABLE product_attributes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) DEFAULT 'select', -- select, color, image
    values TEXT[] NOT NULL, -- e.g., ['S', 'M', 'L'] or ['Red', 'Blue']
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product-Attribute relationship
CREATE TABLE product_attribute_relation (
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    attribute_id UUID REFERENCES product_attributes(id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, attribute_id)
);

-- Product tags
CREATE TABLE product_tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product-Tag relationship
CREATE TABLE product_tag_relation (
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES product_tags(id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, tag_id)
);

-- Product reviews
CREATE TABLE product_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
    
    -- Review content
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    comment TEXT,
    
    -- Moderation
    status VARCHAR(50) DEFAULT 'pending', -- pending, approved, rejected, spam
    is_verified_purchase BOOLEAN DEFAULT false,
    admin_response TEXT,
    admin_response_at TIMESTAMP WITH TIME ZONE,
    
    -- Spam detection
    spam_score DECIMAL(3,2) DEFAULT 0,
    is_spam BOOLEAN DEFAULT false,
    
    -- Abuse reports
    abuse_report_count INTEGER DEFAULT 0,
    
    -- Helpful votes
    helpful_count INTEGER DEFAULT 0,
    not_helpful_count INTEGER DEFAULT 0,
    
    -- AI Analysis
    sentiment_score DECIMAL(3,2),
    sentiment_label VARCHAR(50),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Review helpful votes
CREATE TABLE review_helpful_votes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    review_id UUID REFERENCES product_reviews(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    is_helpful BOOLEAN NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(review_id, customer_id)
);

-- Product images
CREATE TABLE product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text VARCHAR(255),
    display_order INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 4. ORDER MANAGEMENT TABLES
-- ============================================

-- Orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    
    -- Customer
    customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
    customer_email VARCHAR(255) NOT NULL,
    
    -- Status
    status VARCHAR(50) DEFAULT 'pending', -- pending, processing, shipped, delivered, cancelled, refunded
    payment_status VARCHAR(50) DEFAULT 'pending', -- pending, paid, failed, refunded, partially_refunded
    fulfillment_status VARCHAR(50) DEFAULT 'unfulfilled',
    
    -- Pricing
    subtotal DECIMAL(12,2) NOT NULL,
    shipping_cost DECIMAL(12,2) DEFAULT 0,
    tax_amount DECIMAL(12,2) DEFAULT 0,
    discount_amount DECIMAL(12,2) DEFAULT 0,
    total_amount DECIMAL(12,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    
    -- Shipping address snapshot
    shipping_address JSONB NOT NULL,
    billing_address JSONB NOT NULL,
    
    -- Payment
    payment_method VARCHAR(100),
    payment_gateway VARCHAR(100),
    transaction_id VARCHAR(255),
    
    -- Shipping
    shipping_method VARCHAR(255),
    shipping_zone_id UUID,
    tracking_number VARCHAR(255),
    tracking_url TEXT,
    carrier VARCHAR(100),
    estimated_delivery_date DATE,
    shipped_at TIMESTAMP WITH TIME ZONE,
    delivered_at TIMESTAMP WITH TIME ZONE,
    
    -- Notes
    customer_notes TEXT,
    internal_notes TEXT,
    
    -- Fraud detection
    fraud_score DECIMAL(3,2) DEFAULT 0,
    is_fraudulent BOOLEAN DEFAULT false,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    variant_id UUID REFERENCES product_variants(id) ON DELETE SET NULL,
    
    product_name VARCHAR(255) NOT NULL,
    product_sku VARCHAR(100),
    variant_options JSONB,
    
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(12,2) NOT NULL,
    discount_amount DECIMAL(12,2) DEFAULT 0,
    tax_amount DECIMAL(12,2) DEFAULT 0,
    total_price DECIMAL(12,2) NOT NULL,
    
    -- Image snapshot
    product_image_url TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order status history
CREATE TABLE order_status_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL,
    previous_status VARCHAR(50),
    changed_by UUID REFERENCES admin_users(id),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order notes (internal)
CREATE TABLE order_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    admin_id UUID REFERENCES admin_users(id) ON DELETE SET NULL,
    note TEXT NOT NULL,
    is_private BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Refunds
CREATE TABLE refunds (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    refund_amount DECIMAL(12,2) NOT NULL,
    reason TEXT,
    status VARCHAR(50) DEFAULT 'pending', -- pending, approved, rejected, processed
    refund_method VARCHAR(50) DEFAULT 'original',
    transaction_id VARCHAR(255),
    processed_by UUID REFERENCES admin_users(id),
    processed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Refund items
CREATE TABLE refund_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    refund_id UUID REFERENCES refunds(id) ON DELETE CASCADE,
    order_item_id UUID REFERENCES order_items(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    refund_amount DECIMAL(12,2) NOT NULL,
    reason TEXT
);

-- Invoices
CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    invoice_number VARCHAR(100) UNIQUE NOT NULL,
    invoice_url TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    sent_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 5. COUPON & DISCOUNT TABLES
-- ============================================

-- Coupons
CREATE TABLE coupons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    
    -- Type
    discount_type VARCHAR(50) NOT NULL, -- percentage, fixed, free_shipping
    discount_value DECIMAL(12,2) NOT NULL,
    
    -- Usage limits
    usage_limit INTEGER,
    usage_count INTEGER DEFAULT 0,
    usage_limit_per_customer INTEGER,
    
    -- Validity
    valid_from TIMESTAMP WITH TIME ZONE,
    valid_until TIMESTAMP WITH TIME ZONE,
    
    -- Conditions
    minimum_order_amount DECIMAL(12,2),
    maximum_discount_amount DECIMAL(12,2),
    
    -- Applicability
    applicable_products UUID[], -- Product IDs
    applicable_categories UUID[], -- Category IDs
    applicable_customer_groups UUID[], -- Customer group IDs
    
    -- Status
    is_active BOOLEAN DEFAULT true,
    is_public BOOLEAN DEFAULT true,
    
    created_by UUID REFERENCES admin_users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Coupon usage tracking
CREATE TABLE coupon_usages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    coupon_id UUID REFERENCES coupons(id) ON DELETE CASCADE,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
    discount_amount DECIMAL(12,2) NOT NULL,
    used_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Flash sales
CREATE TABLE flash_sales (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    banner_image_url TEXT,
    
    -- Timing
    starts_at TIMESTAMP WITH TIME ZONE NOT NULL,
    ends_at TIMESTAMP WITH TIME ZONE NOT NULL,
    
    -- Status
    status VARCHAR(50) DEFAULT 'scheduled', -- scheduled, active, ended
    
    -- Products
    product_ids UUID[],
    
    -- Discount
    discount_type VARCHAR(50) DEFAULT 'percentage',
    discount_value DECIMAL(5,2) DEFAULT 0,
    
    created_by UUID REFERENCES admin_users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 6. SHIPPING & TAX TABLES
-- ============================================

-- Shipping zones
CREATE TABLE shipping_zones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Shipping zone countries
CREATE TABLE shipping_zone_countries (
    zone_id UUID REFERENCES shipping_zones(id) ON DELETE CASCADE,
    country_code VARCHAR(2) NOT NULL,
    country_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (zone_id, country_code)
);

-- Shipping rates
CREATE TABLE shipping_rates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    zone_id UUID REFERENCES shipping_zones(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    
    -- Rate type
    rate_type VARCHAR(50) DEFAULT 'flat', -- flat, weight_based, price_based
    
    -- Pricing
    base_rate DECIMAL(12,2) NOT NULL,
    per_kg_rate DECIMAL(12,2) DEFAULT 0,
    per_item_rate DECIMAL(12,2) DEFAULT 0,
    free_shipping_threshold DECIMAL(12,2),
    
    -- Conditions
    min_weight DECIMAL(10,3),
    max_weight DECIMAL(10,3),
    min_order_amount DECIMAL(12,2),
    max_order_amount DECIMAL(12,2),
    
    -- Delivery
    estimated_days_min INTEGER,
    estimated_days_max INTEGER,
    
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Shipping carriers/partners
CREATE TABLE shipping_carriers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    tracking_url_template VARCHAR(255),
    api_endpoint TEXT,
    api_key_encrypted TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tax classes
CREATE TABLE tax_classes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tax rates
CREATE TABLE tax_rates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tax_class_id UUID REFERENCES tax_classes(id) ON DELETE CASCADE,
    
    -- Location
    country_code VARCHAR(2) NOT NULL,
    state_code VARCHAR(50),
    postal_code VARCHAR(20),
    
    -- Rate
    rate DECIMAL(5,2) NOT NULL,
    name VARCHAR(100) NOT NULL,
    is_compound BOOLEAN DEFAULT false,
    priority INTEGER DEFAULT 0,
    
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 7. WEBSITE CONTENT MANAGEMENT TABLES
-- ============================================

-- Site settings
CREATE TABLE site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value JSONB NOT NULL,
    setting_type VARCHAR(50) DEFAULT 'string',
    description TEXT,
    updated_by UUID REFERENCES admin_users(id),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CMS pages
CREATE TABLE cms_pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    
    -- SEO
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords TEXT[],
    
    -- Status
    status VARCHAR(50) DEFAULT 'draft',
    is_active BOOLEAN DEFAULT true,
    
    -- Template
    template VARCHAR(100) DEFAULT 'default',
    
    created_by UUID REFERENCES admin_users(id),
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Homepage banners/sliders
CREATE TABLE homepage_banners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    description TEXT,
    
    -- Media
    image_url TEXT NOT NULL,
    mobile_image_url TEXT,
    
    -- Link
    link_url TEXT,
    link_text VARCHAR(100),
    
    -- Display
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    
    -- Timing
    valid_from TIMESTAMP WITH TIME ZONE,
    valid_until TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Navigation menus
CREATE TABLE navigation_menus (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    location VARCHAR(50) NOT NULL, -- header, footer, sidebar
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Navigation menu items
CREATE TABLE navigation_menu_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    menu_id UUID REFERENCES navigation_menus(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES navigation_menu_items(id) ON DELETE CASCADE,
    
    label VARCHAR(100) NOT NULL,
    url TEXT,
    target VARCHAR(50) DEFAULT '_self',
    icon VARCHAR(100),
    
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog posts
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    featured_image_url TEXT,
    
    -- SEO
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords TEXT[],
    
    -- Status
    status VARCHAR(50) DEFAULT 'draft',
    is_featured BOOLEAN DEFAULT false,
    
    -- Author
    author_id UUID REFERENCES admin_users(id),
    
    -- Engagement
    view_count INTEGER DEFAULT 0,
    
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog categories
CREATE TABLE blog_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    parent_id UUID REFERENCES blog_categories(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog post categories
CREATE TABLE blog_post_categories (
    post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
    category_id UUID REFERENCES blog_categories(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, category_id)
);

-- Blog comments
CREATE TABLE blog_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
    
    author_name VARCHAR(100),
    author_email VARCHAR(255),
    content TEXT NOT NULL,
    
    -- Moderation
    status VARCHAR(50) DEFAULT 'pending',
    is_spam BOOLEAN DEFAULT false,
    
    parent_id UUID REFERENCES blog_comments(id) ON DELETE CASCADE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Media library
CREATE TABLE media_files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255),
    file_url TEXT NOT NULL,
    file_type VARCHAR(50) NOT NULL,
    file_size INTEGER,
    mime_type VARCHAR(100),
    
    -- Metadata
    alt_text VARCHAR(255),
    title VARCHAR(255),
    caption TEXT,
    tags TEXT[],
    
    -- Usage
    uploaded_by UUID REFERENCES admin_users(id),
    used_in_tables TEXT[], -- e.g., ['products', 'banners']
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 8. MARKETING & ANALYTICS TABLES
-- ============================================

-- Email campaigns
CREATE TABLE email_campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    content TEXT,
    template_id VARCHAR(100),
    
    -- Audience
    recipient_type VARCHAR(50) DEFAULT 'all', -- all, segment, specific
    customer_segment_ids UUID[],
    recipient_count INTEGER DEFAULT 0,
    
    -- Status
    status VARCHAR(50) DEFAULT 'draft', -- draft, scheduled, sending, sent, cancelled
    
    -- Scheduling
    scheduled_at TIMESTAMP WITH TIME ZONE,
    sent_at TIMESTAMP WITH TIME ZONE,
    
    -- Stats
    sent_count INTEGER DEFAULT 0,
    delivered_count INTEGER DEFAULT 0,
    opened_count INTEGER DEFAULT 0,
    clicked_count INTEGER DEFAULT 0,
    bounced_count INTEGER DEFAULT 0,
    unsubscribed_count INTEGER DEFAULT 0,
    
    created_by UUID REFERENCES admin_users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Push notifications
CREATE TABLE push_notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    image_url TEXT,
    action_url TEXT,
    
    -- Audience
    target_type VARCHAR(50) DEFAULT 'all',
    customer_ids UUID[],
    
    -- Status
    status VARCHAR(50) DEFAULT 'draft',
    scheduled_at TIMESTAMP WITH TIME ZONE,
    sent_at TIMESTAMP WITH TIME ZONE,
    
    -- Stats
    sent_count INTEGER DEFAULT 0,
    delivered_count INTEGER DEFAULT 0,
    clicked_count INTEGER DEFAULT 0,
    
    created_by UUID REFERENCES admin_users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Abandoned carts
CREATE TABLE abandoned_carts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
    session_id VARCHAR(255),
    customer_email VARCHAR(255),
    
    -- Cart data
    cart_items JSONB NOT NULL,
    cart_total DECIMAL(12,2) NOT NULL,
    
    -- Recovery
    recovery_email_sent BOOLEAN DEFAULT false,
    recovery_email_sent_at TIMESTAMP WITH TIME ZONE,
    recovery_coupon_id UUID REFERENCES coupons(id),
    recovered_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SEO settings
CREATE TABLE seo_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_type VARCHAR(100) NOT NULL, -- home, products, category, etc.
    page_identifier VARCHAR(255), -- For specific pages
    
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords TEXT[],
    og_image_url TEXT,
    canonical_url TEXT,
    
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Affiliate program
CREATE TABLE affiliates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    
    -- Affiliate info
    affiliate_code VARCHAR(50) UNIQUE NOT NULL,
    commission_rate DECIMAL(5,2) DEFAULT 10,
    
    -- Payment
    payment_method VARCHAR(50) DEFAULT 'bank_transfer',
    payment_details JSONB,
    total_earnings DECIMAL(12,2) DEFAULT 0,
    paid_earnings DECIMAL(12,2) DEFAULT 0,
    
    -- Status
    status VARCHAR(50) DEFAULT 'pending', -- pending, approved, rejected, suspended
    
    approved_by UUID REFERENCES admin_users(id),
    approved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Affiliate links
CREATE TABLE affiliate_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    affiliate_id UUID REFERENCES affiliates(id) ON DELETE CASCADE,
    
    -- Link
    url TEXT NOT NULL,
    target_type VARCHAR(50) DEFAULT 'homepage', -- homepage, product, category
    target_id UUID,
    
    -- Stats
    click_count INTEGER DEFAULT 0,
    conversion_count INTEGER DEFAULT 0,
    total_sales DECIMAL(12,2) DEFAULT 0,
    
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Affiliate commissions
CREATE TABLE affiliate_commissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    affiliate_id UUID REFERENCES affiliates(id) ON DELETE CASCADE,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    
    commission_amount DECIMAL(12,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending', -- pending, approved, paid, cancelled
    
    paid_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 9. ANALYTICS & REPORTING TABLES
-- ============================================

-- Daily sales summary
CREATE TABLE daily_sales_summary (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE NOT NULL UNIQUE,
    
    -- Orders
    total_orders INTEGER DEFAULT 0,
    completed_orders INTEGER DEFAULT 0,
    cancelled_orders INTEGER DEFAULT 0,
    
    -- Revenue
    gross_revenue DECIMAL(12,2) DEFAULT 0,
    net_revenue DECIMAL(12,2) DEFAULT 0,
    total_discounts DECIMAL(12,2) DEFAULT 0,
    total_tax DECIMAL(12,2) DEFAULT 0,
    total_shipping DECIMAL(12,2) DEFAULT 0,
    
    -- Products
    total_items_sold INTEGER DEFAULT 0,
    unique_products_sold INTEGER DEFAULT 0,
    
    -- Customers
    new_customers INTEGER DEFAULT 0,
    returning_customers INTEGER DEFAULT 0,
    
    -- Average
    average_order_value DECIMAL(12,2) DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product performance
CREATE TABLE product_performance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    
    views INTEGER DEFAULT 0,
    add_to_cart_count INTEGER DEFAULT 0,
    purchases INTEGER DEFAULT 0,
    revenue DECIMAL(12,2) DEFAULT 0,
    returns INTEGER DEFAULT 0,
    
    UNIQUE(product_id, date)
);

-- Traffic analytics
CREATE TABLE traffic_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE NOT NULL,
    
    -- Sessions
    total_sessions INTEGER DEFAULT 0,
    unique_visitors INTEGER DEFAULT 0,
    
    -- Page views
    total_pageviews INTEGER DEFAULT 0,
    
    -- Sources
    organic_search INTEGER DEFAULT 0,
    direct_traffic INTEGER DEFAULT 0,
    social_media INTEGER DEFAULT 0,
    referral_traffic INTEGER DEFAULT 0,
    paid_ads INTEGER DEFAULT 0,
    
    -- Engagement
    bounce_rate DECIMAL(5,2) DEFAULT 0,
    avg_session_duration INTEGER DEFAULT 0, -- seconds
    pages_per_session DECIMAL(3,2) DEFAULT 0,
    
    -- Devices
    desktop_sessions INTEGER DEFAULT 0,
    mobile_sessions INTEGER DEFAULT 0,
    tablet_sessions INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Conversion funnel
CREATE TABLE conversion_funnel (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE NOT NULL UNIQUE,
    
    -- Funnel stages
    homepage_visits INTEGER DEFAULT 0,
    product_page_visits INTEGER DEFAULT 0,
    add_to_cart_actions INTEGER DEFAULT 0,
    checkout_starts INTEGER DEFAULT 0,
    checkout_completed INTEGER DEFAULT 0,
    
    -- Conversion rates
    visit_to_product_rate DECIMAL(5,2) DEFAULT 0,
    product_to_cart_rate DECIMAL(5,2) DEFAULT 0,
    cart_to_checkout_rate DECIMAL(5,2) DEFAULT 0,
    checkout_to_purchase_rate DECIMAL(5,2) DEFAULT 0,
    overall_conversion_rate DECIMAL(5,2) DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 10. NOTIFICATION & SUPPORT TABLES
-- ============================================

-- Admin notifications
CREATE TABLE admin_notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID REFERENCES admin_users(id) ON DELETE CASCADE,
    
    type VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    
    -- Related entity
    entity_type VARCHAR(100),
    entity_id UUID,
    action_url TEXT,
    
    -- Status
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMP WITH TIME ZONE,
    
    priority VARCHAR(50) DEFAULT 'normal', -- low, normal, high, urgent
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Customer support tickets
CREATE TABLE support_tickets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
    
    -- Ticket info
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    priority VARCHAR(50) DEFAULT 'normal',
    category VARCHAR(100),
    
    -- Status
    status VARCHAR(50) DEFAULT 'open', -- open, in_progress, waiting_customer, resolved, closed
    
    -- Assignment
    assigned_to UUID REFERENCES admin_users(id),
    
    -- Timestamps
    resolved_at TIMESTAMP WITH TIME ZONE,
    closed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Support ticket messages
CREATE TABLE support_ticket_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ticket_id UUID REFERENCES support_tickets(id) ON DELETE CASCADE,
    
    -- Sender
    sender_type VARCHAR(50) NOT NULL, -- customer, admin
    sender_id UUID,
    
    message TEXT NOT NULL,
    attachments TEXT[],
    
    is_internal BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 11. SYSTEM & MAINTENANCE TABLES
-- ============================================

-- System logs
CREATE TABLE system_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    log_level VARCHAR(50) NOT NULL, -- info, warning, error, critical
    category VARCHAR(100),
    
    message TEXT NOT NULL,
    details JSONB,
    
    source VARCHAR(255),
    stack_trace TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- API rate limits
CREATE TABLE api_rate_limits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    identifier VARCHAR(255) NOT NULL, -- IP or API key
    endpoint VARCHAR(255) NOT NULL,
    
    request_count INTEGER DEFAULT 1,
    window_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(identifier, endpoint, window_start)
);

-- Feature flags
CREATE TABLE feature_flags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    
    is_enabled BOOLEAN DEFAULT false,
    rollout_percentage INTEGER DEFAULT 100,
    
    -- Targeting
    enabled_for_roles VARCHAR(50)[],
    enabled_for_customer_groups UUID[],
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- A/B tests
CREATE TABLE ab_tests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    
    -- Variants
    variants JSONB NOT NULL, -- [{name: 'A', config: {}}, {name: 'B', config: {}}]
    
    -- Targeting
    target_url_pattern VARCHAR(255),
    traffic_percentage INTEGER DEFAULT 100,
    
    -- Goal
    goal_type VARCHAR(100), -- conversion, revenue, engagement
    goal_metric VARCHAR(100),
    
    -- Status
    status VARCHAR(50) DEFAULT 'draft', -- draft, running, paused, completed
    
    -- Results
    winner_variant VARCHAR(50),
    
    started_at TIMESTAMP WITH TIME ZONE,
    ended_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- A/B test participants
CREATE TABLE ab_test_participants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    test_id UUID REFERENCES ab_tests(id) ON DELETE CASCADE,
    session_id VARCHAR(255) NOT NULL,
    customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
    
    variant_name VARCHAR(50) NOT NULL,
    converted BOOLEAN DEFAULT false,
    conversion_value DECIMAL(12,2) DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Backup logs
CREATE TABLE backup_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    backup_type VARCHAR(50) NOT NULL, -- full, incremental, database_only
    backup_url TEXT,
    file_size INTEGER,
    
    status VARCHAR(50) DEFAULT 'pending', -- pending, in_progress, completed, failed
    error_message TEXT,
    
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    created_by UUID REFERENCES admin_users(id)
);

-- Cache management
CREATE TABLE cache_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cache_key VARCHAR(255) UNIQUE NOT NULL,
    cache_value JSONB NOT NULL,
    
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

-- Admin users
CREATE INDEX idx_admin_users_email ON admin_users(email);
CREATE INDEX idx_admin_users_role ON admin_users(role);
CREATE INDEX idx_admin_activity_logs_admin_id ON admin_activity_logs(admin_id);
CREATE INDEX idx_admin_activity_logs_created_at ON admin_activity_logs(created_at);

-- Customers
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_group ON customers(customer_group_id);
CREATE INDEX idx_customers_loyalty_points ON customers(loyalty_points);

-- Products
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_category ON product_category_relation(category_id);
CREATE INDEX idx_products_price ON products(base_price);
CREATE INDEX idx_products_created_at ON products(created_at);

-- Orders
CREATE INDEX idx_orders_number ON orders(order_number);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

-- Reviews
CREATE INDEX idx_reviews_product ON product_reviews(product_id);
CREATE INDEX idx_reviews_customer ON product_reviews(customer_id);
CREATE INDEX idx_reviews_rating ON product_reviews(rating);
CREATE INDEX idx_reviews_status ON product_reviews(status);

-- Analytics
CREATE INDEX idx_daily_sales_date ON daily_sales_summary(date);
CREATE INDEX idx_product_performance_date ON product_performance(date);
CREATE INDEX idx_traffic_analytics_date ON traffic_analytics(date);

-- ============================================
-- VIEWS FOR COMMON QUERIES
-- ============================================

-- Product inventory view
CREATE VIEW product_inventory_view AS
SELECT 
    p.id,
    p.name,
    p.sku,
    p.stock_quantity,
    p.low_stock_threshold,
    CASE 
        WHEN p.stock_quantity = 0 THEN 'out_of_stock'
        WHEN p.stock_quantity <= p.low_stock_threshold THEN 'low_stock'
        ELSE 'in_stock'
    END as stock_status,
    p.base_price,
    p.sale_price,
    p.status
FROM products p;

-- Order summary view
CREATE VIEW order_summary_view AS
SELECT 
    o.id,
    o.order_number,
    o.customer_email,
    o.status,
    o.payment_status,
    o.total_amount,
    o.created_at,
    c.first_name,
    c.last_name,
    COUNT(oi.id) as item_count
FROM orders o
LEFT JOIN customers c ON o.customer_id = c.id
LEFT JOIN order_items oi ON o.id = oi.order_id
GROUP BY o.id, c.first_name, c.last_name;

-- Product sales view
CREATE VIEW product_sales_view AS
SELECT 
    p.id,
    p.name,
    p.sku,
    COUNT(oi.id) as total_sold,
    SUM(oi.quantity) as total_quantity_sold,
    SUM(oi.total_price) as total_revenue
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
LEFT JOIN orders o ON oi.order_id = o.id AND o.status != 'cancelled'
GROUP BY p.id;

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at trigger to common tables
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_product_categories_updated_at BEFORE UPDATE ON product_categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to generate order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
    NEW.order_number := 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER before_order_insert
    BEFORE INSERT ON orders
    FOR EACH ROW
    EXECUTE FUNCTION generate_order_number();

-- Function to update product stock after order
CREATE OR REPLACE FUNCTION update_product_stock_after_order()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE products 
        SET stock_quantity = stock_quantity - NEW.quantity
        WHERE id = NEW.product_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE products 
        SET stock_quantity = stock_quantity + OLD.quantity
        WHERE id = OLD.product_id;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

CREATE TRIGGER after_order_item_insert
    AFTER INSERT ON order_items
    FOR EACH ROW
    EXECUTE FUNCTION update_product_stock_after_order();

-- Function to update coupon usage
CREATE OR REPLACE FUNCTION update_coupon_usage()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE coupons 
    SET usage_count = usage_count + 1
    WHERE id = NEW.coupon_id;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER after_coupon_usage
    AFTER INSERT ON coupon_usages
    FOR EACH ROW
    EXECUTE FUNCTION update_coupon_usage();

-- ============================================
-- SEED DATA
-- ============================================

-- Insert default admin role
INSERT INTO admin_roles (name, description, permissions) VALUES
('Super Admin', 'Full access to all features', '{"all": true}'),
('Admin', 'Standard admin with most permissions', '{"dashboard": true, "products": true, "orders": true, "customers": true, "reviews": true, "content": true, "marketing": true, "settings": false, "admin_management": false}'),
('Manager', 'Limited access for managers', '{"dashboard": true, "products": true, "orders": true, "customers": true, "reviews": true}'),
('Support', 'Customer support access', '{"dashboard": true, "orders": true, "customers": true, "reviews": true, "support": true}');

-- Insert default customer groups
INSERT INTO customer_groups (name, description, discount_percentage) VALUES
('Regular', 'Default customer group', 0),
('VIP', 'VIP customers with special discounts', 10),
('Wholesale', 'Wholesale buyers with bulk discounts', 20);

-- Insert default tax classes
INSERT INTO tax_classes (name, description) VALUES
('Standard', 'Standard tax rate for most products'),
('Reduced', 'Reduced tax rate for essential items'),
('Zero', 'Zero tax rate'),
('Digital', 'Tax class for digital products');

-- Insert default site settings
INSERT INTO site_settings (setting_key, setting_value, description) VALUES
('site_name', '{"value": "Boreland"}', 'Website name'),
('site_logo', '{"value": "/logo.png"}', 'Site logo URL'),
('site_favicon', '{"value": "/favicon.ico"}', 'Site favicon URL'),
('contact_email', '{"value": "contact@boreland.com"}', 'Contact email address'),
('contact_phone', '{"value": "+91-9876543210"}', 'Contact phone number'),
('currency', '{"value": "INR", "symbol": "₹"}', 'Default currency'),
('timezone', '{"value": "Asia/Kolkata"}', 'Default timezone'),
('maintenance_mode', '{"value": false}', 'Enable/disable maintenance mode'),
('allow_guest_checkout', '{"value": true}', 'Allow checkout without account'),
('default_language', '{"value": "en"}', 'Default site language');

-- Insert default shipping zone
INSERT INTO shipping_zones (name, description) VALUES
('Domestic', 'Shipping within the country'),
('International', 'International shipping');

-- Insert default navigation menus
INSERT INTO navigation_menus (name, location) VALUES
('Main Menu', 'header'),
('Footer Menu', 'footer'),
('Mobile Menu', 'mobile');

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on sensitive tables
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Admin users can view all admin users
CREATE POLICY admin_users_select ON admin_users
    FOR SELECT
    USING (true);

-- Customers can view their own data
CREATE POLICY customers_select_own ON customers
    FOR SELECT
    USING (auth.uid() = id);

-- ============================================
-- END OF SCHEMA
-- ============================================
