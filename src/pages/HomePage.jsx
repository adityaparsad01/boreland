import React, { useEffect, useState } from 'react';
import HeroSection from '../components/home/HeroSection';
import CategoryGrid from '../components/home/CategoryGrid';
import ProductCard from '../components/products/ProductCard';
import { useProducts } from '../context/ProductContext';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { products, loading } = useProducts();
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      setFeaturedProducts(products.slice(0, 4));
    }
  }, [products]);

  return (
    <div className="bg-white">
      <HeroSection />
      
      {/* Category Grid Section */}
      <CategoryGrid />

      {/* Featured Products Carousel/Grid */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="container-custom">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-serif">Exclusives</h2>
              <p className="text-gray-500 mt-2">Curated selections for the discerning gentleman.</p>
            </div>
            <Link to="/products" className="text-sm font-bold uppercase tracking-wider text-gray-900 hover:text-gray-600 flex items-center gap-2">
              See All
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              <p className="text-gray-500">Loading exclusives...</p>
            ) : (
              featuredProducts.map((product) => (
                <div key={product.id} className="h-[450px]">
                  <ProductCard product={product} />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Large Promo Banner */}
      <section className="relative h-[500px] w-full bg-fixed bg-center bg-cover" style={{backgroundImage: "url('https://placehold.co/1920x800/0f0f0f/444444?text=Winter+Collection')"}}>
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-center px-4">
          <div>
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 font-bold">The Winter Edit</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">Sophisticated warmth. Explore our range of premium wool coats and cashmere sweaters.</p>
            <Link to="/products" className="inline-block bg-white text-black px-10 py-4 font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">
              Explore Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
