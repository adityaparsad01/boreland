import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

const CTASection = () => {
  return (
    <section className="bg-surface">
      <div className="max-w-6xl mx-auto px-8 py-16 text-center">
        <h2 className="text-3xl font-serif font-bold text-primary mb-4">
          Experience the Art of Tailoring
        </h2>
        <p className="text-dark-text opacity-90 mb-8 max-w-2xl mx-auto">
          Schedule a private consultation with one of our expert stylists to discover the perfect fit and style for you.
        </p>
        <Link to="/contact">
          <Button>Book a Consultation</Button>
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
