import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/products/ProductCard';

const ProductsPage = () => {
  const { products, loading, error } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (loading) {
    return <div className="text-center text-xl">Loading collection...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-500">Error: {error}</div>;
  }

  const categories = ['All', ...new Set(products.map((p) => p.category))];

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold mb-2">Our Collection</h1>
        <p className="text-lg text-dark-text">
          Crafted with precision, designed for distinction.
        </p>
      </div>

      <div className="flex justify-center flex-wrap gap-4 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`py-2 px-6 uppercase tracking-wider text-sm font-semibold transition-colors duration-300 ${
              selectedCategory === category
                ? 'bg-primary text-background'
                : 'bg-surface text-secondary hover:bg-gray-800/50 hover:text-primary'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
