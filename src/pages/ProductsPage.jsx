import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/products/ProductCard';

const ProductsPage = () => {
  const { products, loading, error } = useProducts();
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'All';
  const [selectedCategory, setSelectedCategory] = useState(
    initialCategory !== 'All' ? initialCategory : 'All'
  );
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  if (loading) {
    return <div className="text-center text-xl py-20">Loading collection...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-500 py-20">Error: {error}</div>;
  }

  const categories = ['All', ...new Set(products.map((p) => p.category))];

  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    return result;
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-serif font-bold mb-2">
          {searchQuery ? `Results for "${searchQuery}"` : 'Our Collection'}
        </h1>
        <p className="text-lg text-gray-500">
          Crafted with precision, designed for distinction.
        </p>
      </div>

      {searchQuery && (
        <div className="text-center mb-6">
          <input
            type="text"
            id="search-products-page"
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="max-w-md w-full px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
          />
        </div>
      )}

      <div className="flex justify-center flex-wrap gap-4 mb-10">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setSearchQuery('');
            }}
            className={`py-2 px-6 uppercase tracking-wider text-sm font-semibold transition-colors duration-300 ${
              selectedCategory === category && !searchQuery
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-400 py-16">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
