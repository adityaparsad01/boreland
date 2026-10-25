import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative h-[50vh] bg-black flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90" />
        <img
          src="/images/about/about_hero.png"
          alt="Boreland craftsmanship"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 text-center px-4">
          <span className="inline-block text-white/60 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            Established 2024
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-4">
            About Boreland
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Where heritage tailoring meets contemporary design.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mt-3 mb-6">
                Defining Modern Luxury
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Boreland was born from a simple belief: every gentleman deserves access to impeccable tailoring
                  that doesn't compromise on modern aesthetics. Founded in 2024, we set out to bridge the gap
                  between traditional craftsmanship and contemporary design.
                </p>
                <p>
                  Our collections are meticulously curated, sourcing the finest fabrics from around the world
                  and working with master tailors who share our obsession with detail. From the cut of a lapel
                  to the drape of a trouser, every element is considered.
                </p>
                <p>
                  We don't just make clothes — we create statements of personal style for men who
                  understand that what they wear speaks before they do.
                </p>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg">
              <img
                src="/images/about/about_tailoring.jpg"
                alt="Tailoring excellence"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Our Values</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mt-3">
              What We Stand For
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Craftsmanship',
                desc: 'Every stitch matters. We partner with master tailors who bring decades of experience to each garment.',
              },
              {
                title: 'Quality',
                desc: 'Only the finest fabrics and materials make the cut. We refuse to compromise on what goes into our collections.',
              },
              {
                title: 'Design',
                desc: 'Clean lines. Modern silhouettes. Timeless appeal. Our designs are built to transcend seasonal trends.',
              },
              {
                title: 'Fit',
                desc: 'A perfect fit transforms how a garment feels and how you feel in it. We obsess over proportions and tailoring.',
              },
              {
                title: 'Sustainability',
                desc: 'We believe in slow fashion — creating pieces that last, reducing waste, and sourcing responsibly.',
              },
              {
                title: 'Service',
                desc: 'From personal styling advice to aftercare, we are committed to an exceptional experience at every touchpoint.',
              },
            ].map((value, idx) => (
              <div key={idx} className="bg-white p-8 rounded-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Us */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Visit Us</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mt-3 mb-6">
            Our Corporate Office
          </h2>
          <p className="text-gray-600 mb-2">CB 206A GF Naraina Ring Road</p>
          <p className="text-gray-600 mb-8">New Delhi 110028</p>
          <a
            href="https://maps.app.goo.gl/wPrPYHNZKzfc41rTA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white bg-black px-8 py-4 hover:bg-gray-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            View on Google Maps
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-black text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Experience Boreland
          </h2>
          <p className="text-gray-400 mb-8">
            Explore our collections and discover the difference that true craftsmanship makes.
          </p>
          <Link
            to="/products"
            className="inline-block bg-white text-black px-10 py-4 font-bold uppercase tracking-widest text-sm hover:bg-gray-200 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
