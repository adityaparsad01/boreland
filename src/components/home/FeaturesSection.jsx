import React from 'react';

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-surface p-8 text-center border border-gray-800">
    <div className="mb-4 text-primary inline-block">{icon}</div>
    <h3 className="text-xl font-serif font-bold text-primary mb-2">{title}</h3>
    <p className="text-dark-text">{description}</p>
  </div>
);

const FeaturesSection = () => {
  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.998 15.998 0 011.622-3.385m5.043.025a15.998 15.998 0 001.622-3.385m3.388 1.62a15.998 15.998 0 00-1.622 3.385m-5.043-.025a15.998 15.998 0 01-3.388 1.622m5.043.025a15.998 15.998 0 013.388 1.622m-1.623-8.475a3 3 0 00-4.242-4.242" />
        </svg>
      ),
      title: 'Timeless Design',
      description: 'Our collections are crafted with enduring style, transcending fleeting trends for a lifetime of elegance.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 1.5v21m-8.25-6.75h16.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 1.5C7.58172 1.5 4.5 4.58172 4.5 9c0 4.4183 3.08172 7.5 7.5 7.5s7.5-3.0817 7.5-7.5c0-4.41828-3.08172-7.5-7.5-7.5z" />
        </svg>
      ),
      title: 'Premium Materials',
      description: 'We source only the finest fabrics and leathers from renowned mills and tanneries across the globe.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.73-.626 1.196-.626h.178c.47 0 .897.242 1.196.626l2.496 3.03M11.42 15.17L9.25 12.5a2.652 2.652 0 00-3.75 0L3 17.25A2.652 2.652 0 006.75 21l2.5-2.5m0 0l2.17-2.17" />
        </svg>
      ),
      title: 'Expert Craftsmanship',
      description: 'Each garment is meticulously constructed by master tailors with decades of experience in their craft.',
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-primary">The Boreland Difference</h2>
          <p className="text-dark-text mt-2 max-w-2xl mx-auto">
            We are defined by an unwavering commitment to quality, heritage, and the pursuit of sartorial excellence.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
