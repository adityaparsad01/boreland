import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

const HeroSection = () => {
  return (
    <section className="relative w-full h-[60vh] md:h-[85vh] overflow-hidden">
      {/* Background Image */}
      <img 
        src="https://placehold.co/1920x1080/121212/333333?text=Boreland+Global+Collection" 
        alt="Hero Banner" 
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
      
      <div className="relative z-10 h-full container-custom flex items-center">
        <div className="max-w-2xl text-white pt-20">
          <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-md">
            New Season Arrival
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-none mb-6 text-white">
            Define Your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">Legacy.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-lg leading-relaxed font-light">
            Impeccable tailoring meeting modern aesthetics. Discover the new standard in executive luxury.
          </p>
          <div className="flex gap-4">
            <Link to="/products">
              <Button className="bg-white text-black hover:bg-gray-200 border-none px-8 py-3.5">
                Shop Collection
              </Button>
            </Link>
            <Link to="/products?category=sale">
              <Button variant="secondary" className="border-white text-white hover:bg-white hover:text-black px-8 py-3.5">
                View Sales
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
