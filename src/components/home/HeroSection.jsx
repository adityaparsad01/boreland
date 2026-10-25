import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    image: '/images/hero/sovereign_suit_hero.png',
    url: '/products/1',
    label: 'The Sovereign Suit',
  },
  {
    id: 2,
    image: '/images/hero/executive_blazer_hero.png',
    url: '/products/2',
    label: 'Executive Blazer',
  },
  {
    id: 3,
    image: '/images/hero/premium_shirts_hero.png',
    url: '/products?category=shirts',
    label: 'Premium Shirts',
  },
  {
    id: 4,
    image: '/images/hero/winter_collection_hero.png',
    url: '/products?category=sale',
    label: 'Winter Collection',
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const goTo = (index) => {
    setCurrent(index);
  };

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative w-full overflow-hidden bg-black">
      <div className="relative h-[40vh] md:h-[55vh]">
        {slides.map((slide, index) => (
          <Link
            key={slide.id}
            to={slide.url}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === current ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.label}
              className="w-full h-full object-cover"
            />
          </Link>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === current
                ? 'bg-white w-6'
                : 'bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
