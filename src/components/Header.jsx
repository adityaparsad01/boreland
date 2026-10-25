import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';

const Header = () => {
  const { cartItems } = useCart();
  const { isAuthenticated, currentUser, logout } = useAuth();
  const { settings } = useSettings();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      navigate(`/products?search=${encodeURIComponent(q)}`);
    }
  };

  return (
    <header className="w-full bg-white sticky top-0 z-50">
      {/* Top Announcement Bar */}
      <div className="bg-black text-white text-[11px] tracking-wider text-center py-2 px-4 uppercase font-medium">
        <span>Premium Men's Fashion — </span>
        <Link to="/products" className="underline hover:no-underline">Shop the Latest Collection</Link>
      </div>

      {/* Main Header Row */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 gap-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2">
            <img
              src={settings.logo_url || '/logo.png'}
              alt={settings.site_name || 'Boreland Logo'}
              className="h-8 w-auto object-contain"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-serif text-sm md:text-lg font-bold text-black tracking-tight">
                BORELAND
              </span>
              <span className="text-[8px] md:text-[9px] text-gray-500 tracking-[0.1em] font-medium">
                <span className="font-bold text-[#D4AF37]">D</span>ress <span className="font-bold text-[#D4AF37]">S</span>mart. <span className="font-bold text-[#D4AF37]">L</span>ead <span className="font-bold text-[#D4AF37]">B</span>old.
              </span>
            </div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden sm:block flex-grow max-w-md">
            <div className="relative">
              <input
                type="text"
                id="search-products"
                name="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full text-sm bg-gray-50 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-shadow"
                placeholder="Search..."
              />
              <button type="submit" className="absolute inset-y-0 left-0 pl-3 flex items-center cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>

          {/* Right Icons */}
          <div className="flex items-center gap-5">
            {isAuthenticated ? (
              <div className="relative group hidden md:block">
                <Link to="/account/profile" className="text-gray-600 hover:text-black flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                  <span className="text-xs font-medium hidden lg:block">Account</span>
                </Link>
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto z-50 border border-gray-100">
                  <div className="py-1">
                    <Link to="/account/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">My Profile</Link>
                    <Link to="/orders" className="block px-4 py-2 text-sm hover:bg-gray-100">Orders</Link>
                    {currentUser?.role === 'Admin' && (
                      <Link to="/admin" className="block px-4 py-2 text-sm hover:bg-gray-100 font-bold text-blue-600">Admin Panel</Link>
                    )}
                    <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Sign Out</button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="text-gray-600 hover:text-black hidden md:flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                <span className="text-xs font-medium hidden lg:block">Account</span>
              </Link>
            )}

            <Link to="/cart" className="relative text-gray-600 hover:text-black flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              {totalItemsInCart > 0 && (
                <span className="absolute -top-2 -right-2 flex items-center justify-center w-4 h-4 text-[10px] font-bold bg-black text-white rounded-full">
                  {totalItemsInCart}
                </span>
              )}
              <span className="text-xs font-medium hidden lg:block">Cart</span>
            </Link>

            {/* Mobile Search Toggle */}
            <button className="sm:hidden text-gray-600 hover:text-black">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="hidden md:flex border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-8 h-11 px-4">
          <NavLink to="/products?category=suits" className="text-xs font-bold uppercase tracking-widest text-gray-700 hover:text-black transition-colors">
            Suits
          </NavLink>
          <NavLink to="/products?category=blazers" className="text-xs font-bold uppercase tracking-widest text-gray-700 hover:text-black transition-colors">
            Blazers
          </NavLink>
          <NavLink to="/products?category=shirts" className="text-xs font-bold uppercase tracking-widest text-gray-700 hover:text-black transition-colors">
            Shirts
          </NavLink>
          <NavLink to="/products?category=trousers" className="text-xs font-bold uppercase tracking-widest text-gray-700 hover:text-black transition-colors">
            Trousers
          </NavLink>
          <NavLink to="/products?category=accessories" className="text-xs font-bold uppercase tracking-widest text-gray-700 hover:text-black transition-colors">
            Accessories
          </NavLink>
          <NavLink to="/blog" className="text-xs font-bold uppercase tracking-widest text-gray-700 hover:text-black transition-colors">
            Journal
          </NavLink>
          <NavLink to="/contact" className="text-xs font-bold uppercase tracking-widest text-gray-700 hover:text-black transition-colors">
            Reach Us
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
