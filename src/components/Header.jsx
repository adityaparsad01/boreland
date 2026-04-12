import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';

const Header = () => {
  const { cartItems } = useCart();
  const { isAuthenticated, currentUser, logout } = useAuth();
  const { settings } = useSettings();
  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

  const navLinkClasses = ({ isActive }) =>
    `text-sm font-medium uppercase tracking-wider transition-colors duration-200 ${
      isActive ? 'text-black font-bold' : 'text-gray-500 hover:text-black'
    }`;

  return (
    <header className="w-full bg-white sticky top-0 z-50 border-b border-gray-200 shadow-sm">
      <div className="container-custom flex items-center justify-between h-16 gap-4">
        
        {/* Logo */}
        <Link to="/" className="flex-shrink-0 flex items-center gap-2">
          {settings.logo_url ? (
            <img
              src={settings.logo_url}
              alt={settings.site_name || 'Boreland Logo'}
              className="h-8 w-auto object-contain"
            />
          ) : (
            <>
              {/* Logo Icon */}
              <div className="bg-black text-white w-8 h-8 flex items-center justify-center font-serif font-bold text-lg rounded-sm">
                B
              </div>
              {/* Logo Text (Hidden on very small screens if needed, but keeping for brand) */}
              <span className="font-serif text-lg md:text-xl font-bold text-black tracking-tighter hidden xs:block">
                BORELAND
              </span>
            </>
          )}
        </Link>

        {/* Search Bar (Matches Reference) */}
        <div className="flex-grow max-w-2xl">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black sm:text-sm transition-shadow"
              placeholder="Search products..."
            />
          </div>
        </div>
        
        {/* Desktop Navigation (Hidden on Mobile) */}
        <nav className="hidden md:flex gap-6 items-center">
          <NavLink to="/" className={navLinkClasses}>Home</NavLink>
          <NavLink to="/products" className={navLinkClasses}>Shop</NavLink>
          <NavLink to="/blog" className={navLinkClasses}>Journal</NavLink>
        </nav>
        
        {/* Desktop Icons (Hidden on Mobile - handled by Bottom Nav) */}
        <div className="hidden md:flex items-center gap-5 pl-4 border-l border-gray-200">
          {isAuthenticated ? (
            <div className="relative group">
              <Link to="/account/profile" className="text-gray-600 hover:text-black flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </Link>
              {/* Dropdown */}
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
            <Link to="/login" className="text-gray-600 hover:text-black">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </Link>
          )}
          
          <Link to="/cart" className="relative text-gray-600 hover:text-black">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            {totalItemsInCart > 0 && (
              <span className="absolute -top-2 -right-2 flex items-center justify-center w-4 h-4 text-[10px] font-bold bg-red-600 text-white rounded-full">
                {totalItemsInCart}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
