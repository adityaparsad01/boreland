import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  // Calculate a fake original price for the "Sale" look (randomly 20-40% higher)
  const originalPrice = product.price * 1.3;
  const discountPercent = Math.round(((originalPrice - product.price) / originalPrice) * 100);

  return (
    <div className="group relative bg-white rounded-lg overflow-hidden border border-gray-800/50 hover:border-gray-600 transition-all duration-300 hover:shadow-xl flex flex-col h-full">
      <Link to={`/products/${product.id}`} className="block relative overflow-hidden aspect-[4/5]">
        {/* Top Label */}
        <div className="absolute inset-x-0 top-0 z-10 h-6 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-900 font-bold text-[10px] uppercase tracking-widest">
            {product.id % 2 === 0 ? 'EXCLUSIVE' : 'BESTSELLER'}
          </span>
        </div>

        {/* Image */}
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300" />

        {/* Floating Icons/Badges */}
        <div className="absolute top-8 left-0 right-0 p-3 flex justify-between items-start">
          <span className="bg-green-700 text-white text-[10px] font-bold px-2 py-1 rounded-full">
            {discountPercent}% OFF
          </span>
          
          <button 
            className="w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-gray-900 transition-colors shadow-sm"
            onClick={(e) => {
              e.preventDefault();
              // Add wishlist logic here
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </button>
        </div>

        {/* Quick Add Overlay (Mobile style or Desktop hover) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden md:block">
          <button 
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="w-full bg-white text-black font-bold uppercase text-xs py-3 hover:bg-gray-200 transition-colors"
          >
            Quick Add
          </button>
        </div>
      </Link>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-grow bg-white">
        <div className="mb-1 flex gap-1">
           {/* Color Swatches Mockup */}
           <div className="w-3 h-3 rounded-full border border-gray-300 bg-gray-800"></div>
           <div className="w-3 h-3 rounded-full border border-gray-300 bg-blue-900"></div>
        </div>
        
        <Link to={`/products/${product.id}`} className="hover:text-gray-600 transition-colors">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-1 mb-1 font-sans">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-xs text-gray-500 mb-2 line-clamp-1">{product.category}</p>

        <div className="mt-auto flex items-center gap-2">
          <span className="text-sm font-bold text-gray-900">
            ₹{product.price.toFixed(2)}
          </span>
          <span className="text-xs text-gray-400 line-through">
            ₹{originalPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
