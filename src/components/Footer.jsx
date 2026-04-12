import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-surface border-t border-gray-800 mt-auto py-10 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
        <p className="text-sm text-dark-text">
          &copy; {new Date().getFullYear()} Boreland. All rights reserved.
        </p>
        <div className="flex gap-6">
          <Link to="#" className="text-sm text-secondary hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link to="#" className="text-sm text-secondary hover:text-primary transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
