import React from 'react';
import { Link } from 'react-router-dom';

const CategoryItem = ({ title, image, discount }) => (
  <Link to="/products" className="group relative block overflow-hidden rounded-lg aspect-[4/5] md:aspect-[3/4]">
    <img 
      src={image} 
      alt={title} 
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
    
    {/* Discount Bubble Top Left */}
    <div className="absolute -top-12 -left-12 w-24 h-24 bg-red-600 rounded-full flex items-end justify-center pb-4 pr-4 transition-transform group-hover:scale-110">
        <span className="text-white font-bold text-xs pl-6 pt-6 block rotate-[-45deg]">{discount}</span>
    </div>

    <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
      <span className="block font-bold text-gray-900 text-sm uppercase tracking-wider">{title}</span>
    </div>
  </Link>
);

const CategoryGrid = () => {
  const categories = [
    { title: "Formal Suits", image: "https://placehold.co/600x800/1a1a1a/eaeaea?text=Suits", discount: "40% OFF" },
    { title: "Luxury Blazers", image: "https://placehold.co/600x800/2a2a2a/eaeaea?text=Blazers", discount: "30% OFF" },
    { title: "Premium Shirts", image: "https://placehold.co/600x800/151515/eaeaea?text=Shirts", discount: "50% OFF" },
    { title: "Trousers", image: "https://placehold.co/600x800/202020/eaeaea?text=Trousers", discount: "25% OFF" },
    { title: "Leather Shoes", image: "https://placehold.co/600x800/000000/eaeaea?text=Shoes", discount: "20% OFF" },
    { title: "Accessories", image: "https://placehold.co/600x800/333333/eaeaea?text=Accessories", discount: "15% OFF" },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container-custom">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center uppercase tracking-tight font-serif">
          Shop By Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((cat, idx) => (
            <CategoryItem key={idx} {...cat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
