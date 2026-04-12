import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import MobileBottomNav from './MobileBottomNav';

const Layout = () => {
  return (
    <>
      <Header />
      {/* Add padding bottom on mobile to account for the fixed nav */}
      <main className="pb-20 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
};

export default Layout;
