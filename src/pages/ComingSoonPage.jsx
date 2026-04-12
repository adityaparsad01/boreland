import React from 'react';
import CountdownTimer from '../components/common/CountdownTimer';

const ComingSoonPage = () => {
  const launchDate = '2026-01-01T00:00:00';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center p-4">
      <div className="max-w-3xl">
        <img src="/logo.png" alt="Boreland Logo" className="h-20 w-auto mx-auto mb-4" />
        
        <h2 className="font-serif text-2xl text-primary mb-2">
          Boreland Global Fashions
        </h2>
        <p className="text-lg text-secondary italic mb-12">
          Dress smart. Lead bold.
        </p>

        <h1 className="text-4xl md:text-6xl font-serif text-primary uppercase tracking-wider mb-4">
          Coming Soon
        </h1>
        
        <p className="text-lg md:text-xl text-dark-text mb-12 max-w-2xl mx-auto">
          We are currently crafting a new online experience. Our full website will launch on January 1st, 2026.
        </p>

        <CountdownTimer targetDate={launchDate} />

        <div className="mt-16">
          <p className="text-secondary">Stay connected with us for updates.</p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
