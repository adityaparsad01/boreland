import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  MessageSquare,
  FileText,
  Megaphone,
  CreditCard,
  Truck,
  BarChart3,
  Settings,
  Shield,
  Menu,
  X,
  LogOut,
  Moon,
  Sun,
  ChevronDown,
  User,
  Bell,
  Search,
  Home,
  Palette,
  HelpCircle,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar';
import { Badge } from '../ui/Badge';

const navigation = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/admin',
  },
  {
    title: 'Products',
    icon: Package,
    href: '/admin/products',
    children: [
      { title: 'All Products', href: '/admin/products' },
      { title: 'Add Product', href: '/admin/products/new' },
      { title: 'Categories', href: '/admin/categories' },
      { title: 'Reviews', href: '/admin/reviews' },
    ],
  },
  {
    title: 'Orders',
    icon: ShoppingCart,
    href: '/admin/orders',
    badge: '12',
  },
  {
    title: 'Customers',
    icon: Users,
    href: '/admin/customers',
  },
  {
    title: 'Reviews',
    icon: MessageSquare,
    href: '/admin/reviews',
    badge: '5',
  },
  {
    title: 'Content',
    icon: FileText,
    href: '/admin/content',
    children: [
      { title: 'CMS Pages', href: '/admin/cms-pages' },
      { title: 'Blog Posts', href: '/admin/blog' },
      { title: 'Banners', href: '/admin/banners' },
      { title: 'Navigation', href: '/admin/navigation' },
    ],
  },
  {
    title: 'Marketing',
    icon: Megaphone,
    href: '/admin/marketing',
    children: [
      { title: 'Coupons', href: '/admin/coupons' },
      { title: 'Flash Sales', href: '/admin/flash-sales' },
      { title: 'Email Campaigns', href: '/admin/email-campaigns' },
      { title: 'Affiliates', href: '/admin/affiliates' },
    ],
  },
  {
    title: 'Payments',
    icon: CreditCard,
    href: '/admin/payments',
  },
  {
    title: 'Shipping',
    icon: Truck,
    href: '/admin/shipping',
  },
  {
    title: 'Analytics',
    icon: BarChart3,
    href: '/admin/analytics',
  },
  {
    title: 'Admin',
    icon: Shield,
    href: '/admin/admin-users',
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '/admin/settings',
  },
];

const bottomNavigation = [
  { title: 'Back to Site', icon: Home, href: '/' },
  { title: 'Documentation', icon: HelpCircle, href: '#' },
];

export default function AdminLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  const toggleMenu = (title) => {
    setExpandedMenus((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  const isActive = (href) => location.pathname === href;
  const hasActiveChild = (children) => children?.some((child) => isActive(child.href));

  // Admin user mock data (replace with actual auth context)
  const adminUser = {
    name: 'Admin User',
    email: 'admin@boreland.com',
    avatar: null,
    role: 'Super Admin',
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside
        className={cn(
          'admin-sidebar',
          !sidebarOpen && 'admin-sidebar-collapsed'
        )}
      >
        {/* Logo */}
        <div className="admin-sidebar-header">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">B</span>
            </div>
            {sidebarOpen && (
              <span className="font-semibold text-lg text-sidebar-foreground">
                Boreland Admin
              </span>
            )}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="ml-auto text-sidebar-foreground/70 hover:text-sidebar-foreground"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="admin-sidebar-nav">
          {navigation.map((item) => {
            const Icon = item.icon;
            const expanded = expandedMenus.includes(item.title);
            const active = isActive(item.href) || hasActiveChild(item.children);

            return (
              <div key={item.title} className="admin-sidebar-nav-group">
                <button
                  onClick={() => item.children ? toggleMenu(item.title) : navigate(item.href)}
                  className={cn(
                    'admin-sidebar-nav-item w-full justify-between',
                    active && 'admin-sidebar-nav-item-active'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="admin-sidebar-nav-item-icon" />
                    {sidebarOpen && <span>{item.title}</span>}
                  </div>
                  {sidebarOpen && (
                    <div className="flex items-center gap-2">
                      {item.badge && (
                        <Badge variant="destructive" size="sm">{item.badge}</Badge>
                      )}
                      {item.children && (
                        <ChevronDown
                          className={cn(
                            'h-4 w-4 transition-transform',
                            expanded && 'rotate-180'
                          )}
                        />
                      )}
                    </div>
                  )}
                </button>

                {/* Submenu */}
                {sidebarOpen && item.children && expanded && (
                  <div className="mt-1 ml-4 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className={cn(
                          'block px-3 py-2 text-sm rounded-md transition-colors',
                          isActive(child.href)
                            ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                            : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                        )}
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Bottom Navigation */}
          <div className="mt-auto pt-4 border-t border-sidebar-border">
            {bottomNavigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className="admin-sidebar-nav-item"
                >
                  <Icon className="admin-sidebar-nav-item-icon" />
                  {sidebarOpen && <span>{item.title}</span>}
                </Link>
              );
            })}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className={cn('admin-main', !sidebarOpen && 'ml-0')}>
        {/* Header */}
        <header className="admin-header">
          {/* Left side - Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Search */}
          <div className="flex-1 flex items-center max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="input pl-10"
              />
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Dark mode toggle */}
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
            </Button>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-accent transition-colors"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={adminUser.avatar} />
                  <AvatarFallback>
                    {adminUser.name.split(' ').map((n) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">{adminUser.name}</p>
                  <p className="text-xs text-muted-foreground">{adminUser.role}</p>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-md border bg-popover p-1 shadow-lg z-50 animate-in fade-in-0 zoom-in-95">
                  <div className="px-3 py-2 border-b">
                    <p className="text-sm font-medium">{adminUser.name}</p>
                    <p className="text-xs text-muted-foreground">{adminUser.email}</p>
                  </div>
                  <Link
                    to="/admin/profile"
                    className="dropdown-item"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                  <Link
                    to="/admin/settings"
                    className="dropdown-item"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                  <div className="dropdown-separator" />
                  <button
                    onClick={handleLogout}
                    className="dropdown-item text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}
