import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { BlogProvider } from './context/BlogContext';
import { UserProvider } from './context/UserContext';
import { OrderProvider } from './context/OrderContext';
import { SettingsProvider } from './context/SettingsContext';
import { ToastProvider } from './components/ui/Toast';

// Layouts
import Layout from './components/Layout';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Core Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/cart/CartPage';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import UpdatePasswordPage from './pages/auth/UpdatePasswordPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';

// Account Pages
import ProfilePage from './pages/account/ProfilePage';
import OrdersPage from './pages/account/OrdersPage';

// Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import ManageProductsPage from './pages/admin/ManageProductsPage';
import ManageOrdersPage from './pages/admin/ManageOrdersPage';
import ManageUsersPage from './pages/admin/ManageUsersPage';
import ManageCouponsPage from './pages/admin/ManageCouponsPage';
import AddProductPage from './pages/admin/AddProductPage';
import EditProductPage from './pages/admin/EditProductPage';
import ManageBlogPostsPage from './pages/admin/ManageBlogPostsPage';
import AddBlogPostPage from './pages/admin/AddBlogPostPage';
import EditBlogPostPage from './pages/admin/EditBlogPostPage';
import AddUserPage from './pages/admin/AddUserPage';
import EditUserPage from './pages/admin/EditUserPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import ManageCustomersPage from './pages/admin/ManageCustomersPage';
import ManageReviewsPage from './pages/admin/ManageReviewsPage';

const AppProviders = ({ children }) => (
  <AuthProvider>
    <UserProvider>
      <ProductProvider>
        <BlogProvider>
          <OrderProvider>
            <CartProvider>
              <SettingsProvider>
                <ToastProvider>{children}</ToastProvider>
              </SettingsProvider>
            </CartProvider>
          </OrderProvider>
        </BlogProvider>
      </ProductProvider>
    </UserProvider>
  </AuthProvider>
);

function App() {
  return (
    <AppProviders>
      <Routes>
        {/* Public Website Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:productId" element={<ProductDetailPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="about" element={<AboutPage />} />

          {/* Customer Auth */}
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="cart" element={<CartPage />} />

          {/* Customer Protected Routes */}
          <Route
            path="account/profile"
            element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}
          />
          <Route
            path="account/update-password"
            element={<ProtectedRoute><UpdatePasswordPage /></ProtectedRoute>}
          />
          <Route
            path="orders"
            element={<ProtectedRoute><OrdersPage /></ProtectedRoute>}
          />
        </Route>

        {/* Admin Login (Standalone) */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Admin Panel Layout (Protected & Role Restricted) */}
        <Route
          path="/admin"
          element={<ProtectedRoute requiredRole="Admin"><AdminLayout /></ProtectedRoute>}
        >
          {/* Dashboard */}
          <Route index element={<AdminDashboardPage />} />
          
          {/* Products */}
          <Route path="products" element={<ManageProductsPage />} />
          <Route path="products/new" element={<AddProductPage />} />
          <Route path="products/edit/:productId" element={<EditProductPage />} />
          
          {/* Orders */}
          <Route path="orders" element={<ManageOrdersPage />} />
          
          {/* Customers */}
          <Route path="customers" element={<ManageCustomersPage />} />
          
          {/* Reviews */}
          <Route path="reviews" element={<ManageReviewsPage />} />
          
          {/* Blog */}
          <Route path="blog" element={<ManageBlogPostsPage />} />
          <Route path="blog/new" element={<AddBlogPostPage />} />
          <Route path="blog/edit/:postId" element={<EditBlogPostPage />} />
          
          {/* Users */}
          <Route path="users" element={<ManageUsersPage />} />
          <Route path="users/new" element={<AddUserPage />} />
          <Route path="users/edit/:userId" element={<EditUserPage />} />
          
          {/* Marketing */}
          <Route path="coupons" element={<ManageCouponsPage />} />
          
          {/* Settings */}
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
      </Routes>
    </AppProviders>
  );
}

export default App;
