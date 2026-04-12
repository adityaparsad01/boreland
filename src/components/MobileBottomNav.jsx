import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const MobileBottomNav = () => {
  const { cartItems } = useCart();
  const location = useLocation();
  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Helper to determine active state styling
  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `flex flex-col items-center justify-center w-full h-full gap-1 pt-2 pb-3 transition-colors duration-200 ${
      isActive ? 'text-black' : 'text-gray-500 hover:text-gray-900'
    }`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-end h-16 px-2">
        
        {/* 1. Category */}
        <NavLink to="/products" className={getLinkClass('/products')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="7" height="7" x="3" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="14" rx="1" />
            <rect width="7" height="7" x="3" y="14" rx="1" />
          </svg>
          <span className="text-[10px] font-medium">Category</span>
        </NavLink>

        {/* 2. Wishlist (Links to Profile for now as wishlist placeholder) */}
        <NavLink to="/account/profile" className={getLinkClass('/wishlist')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          <span className="text-[10px] font-medium">Wishlist</span>
        </NavLink>

        {/* 3. Home (Center Circle) */}
        <div className="relative -top-5 w-full flex justify-center pointer-events-none">
          <NavLink to="/" className="pointer-events-auto">
            <div className="w-14 h-14 bg-[#1A1A1A] rounded-full flex flex-col items-center justify-center shadow-lg border-4 border-white transform transition-transform active:scale-95">
              {/* Using a Tree/Brand Icon similar to reference but fitting Boreland theme */}
              <span className="text-white font-serif text-xl font-bold">B</span>
            </div>
            <span className="text-[10px] font-medium text-black block text-center mt-1">Home</span>
          </NavLink>
        </div>

        {/* 4. Cart */}
        <NavLink to="/cart" className={getLinkClass('/cart')}>
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {totalItemsInCart > 0 && (
              <span className="absolute -top-2 -right-2 flex items-center justify-center w-4 h-4 text-[9px] font-bold bg-red-600 text-white rounded-full border border-white">
                {totalItemsInCart}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium">Cart</span>
        </NavLink>

        {/* 5. Orders */}
        <NavLink to="/orders" className={getLinkClass('/orders')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" />
            <path d="M12 22V12" />
            <polyline points="3.29 7 12 12 20.71 7" />
            <path d="m7.5 4.27 9 5.15" />
          </svg>
          <span className="text-[10px] font-medium">Orders</span>
        </NavLink>

      </div>
    </div>
  );
};

export default MobileBottomNav;
