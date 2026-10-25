import React, { useEffect, useState } from 'react';
import HeroSection from '../components/home/HeroSection';
import ProductCard from '../components/products/ProductCard';
import BlogPostCard from '../components/blog/BlogPostCard';
import { useProducts } from '../context/ProductContext';
import { useBlog } from '../context/BlogContext';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { products, loading } = useProducts();
  const { posts, loading: blogLoading } = useBlog();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [collectionProducts, setCollectionProducts] = useState([]);
  const [accessoryProducts, setAccessoryProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      setFeaturedProducts(products.slice(0, 4));

      const collection = products.filter(p =>
        p.category?.toLowerCase() === 'suits' ||
        p.category?.toLowerCase() === 'blazers'
      );
      setCollectionProducts(collection.length > 0 ? collection.slice(0, 4) : products.slice(0, 4));

      const accessories = products.filter(p =>
        p.category?.toLowerCase() === 'accessories'
      );
      setAccessoryProducts(accessories.length > 0 ? accessories.slice(0, 4) : products.slice(4, 8));
    }
  }, [products]);

  const categories = [
    { name: 'Suits', image: '/images/category_suits.png' },
    { name: 'Blazers', image: '/images/category_blazers.png' },
    { name: 'Shirts', image: '/images/category_shirts.png' },
    { name: 'Trousers', image: '/images/category_trousers.png' },
  ];

  const collectionLinks = [
    'Suits', 'Blazers', 'Shirts', 'Trousers', 'Shoes', 'Accessories'
  ];

  const accessoryLinks = [
    'Ties', 'Cufflinks', 'Watches', 'Belts', 'Sunglasses', 'Pocket Squares'
  ];

  return (
    <div className="bg-white">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Most Popular Section */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-serif">
              MOST POPULAR @ BORELAND
            </h2>
            <Link to="/products" className="text-xs font-bold uppercase tracking-widest text-gray-700 hover:text-black border-b border-gray-700 hover:border-black pb-0.5 transition-colors">
              View all
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {loading ? (
              <p className="text-gray-500 col-span-full">Loading...</p>
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

      {/* 3. Category Banner Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                to={`/products?category=${cat.name.toLowerCase()}`}
                className="group relative block overflow-hidden rounded-lg aspect-[4/5]"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="block text-white font-bold text-sm uppercase tracking-wider">{cat.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Mens Collections Links */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-serif mb-8 text-center">
            Mens Collections
          </h2>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
            {collectionLinks.map((link, idx) => (
              <Link
                key={idx}
                to={`/products?category=${link.toLowerCase()}`}
                className="text-sm font-bold uppercase tracking-widest text-gray-700 hover:text-black transition-colors border-b-2 border-transparent hover:border-black pb-1"
              >
                {link === 'Accessories' ? `MEN ${link}` : `MEN ${link}`}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Banner Links */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/products" className="block overflow-hidden rounded-lg">
              <img src="/images/hero/sovereign_suit_hero.png" alt="Premium Suits" className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500" />
            </Link>
            <Link to="/products?category=blazers" className="block overflow-hidden rounded-lg">
              <img src="/images/hero/executive_blazer_hero.png" alt="Luxury Blazers" className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500" />
            </Link>
            <Link to="/products?category=accessories" className="block overflow-hidden rounded-lg">
              <img src="/images/categories/accessories.png" alt="Fine Accessories" className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Premium Collection Section */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-serif mb-2">
              PREMIUM COLLECTION
            </h2>
            <p className="text-gray-500 text-sm mb-4">Curated elegance for the modern gentleman.</p>
            <Link to="/products" className="inline-block text-xs font-bold uppercase tracking-widest text-white bg-black px-8 py-3 hover:bg-gray-800 transition-colors">
              SHOP NOW
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {loading ? (
              <p className="text-gray-500 col-span-full">Loading...</p>
            ) : (
              collectionProducts.map((product) => (
                <div key={product.id} className="h-[450px]">
                  <ProductCard product={product} />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 7. Accessories Section */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Accessories Links */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-serif mb-4 text-center">
              ACCESSORIES
            </h2>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-8">
              {accessoryLinks.map((link, idx) => (
                <Link
                  key={idx}
                  to={`/products?category=${link.toLowerCase()}`}
                  className="text-xs font-bold uppercase tracking-widest text-gray-600 hover:text-black transition-colors"
                >
                  {link.toUpperCase()}
                </Link>
              ))}
            </div>
          </div>

          <div className="text-center mb-10">
            <p className="text-gray-500 text-sm mb-4">Complete your look with the finest accessories.</p>
            <Link to="/products?category=accessories" className="inline-block text-xs font-bold uppercase tracking-widest text-white bg-black px-8 py-3 hover:bg-gray-800 transition-colors">
              SHOP NOW
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {loading ? (
              <p className="text-gray-500 col-span-full">Loading...</p>
            ) : (
              accessoryProducts.map((product) => (
                <div key={product.id} className="h-[450px]">
                  <ProductCard product={product} />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 8. Blog Posts Section */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-serif">
              Blog Posts
            </h2>
            <Link to="/blog" className="text-xs font-bold uppercase tracking-widest text-gray-700 hover:text-black border-b border-gray-700 hover:border-black pb-0.5 transition-colors">
              View all
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogLoading ? (
              <p className="text-gray-500 col-span-full">Loading...</p>
            ) : posts.length > 0 ? (
              posts.slice(0, 3).map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))
            ) : (
              <p className="text-gray-400 col-span-full text-sm">No blog posts yet.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
