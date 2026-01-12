import React from 'react';
import { useTenant } from '../../hooks/useTenant';
import { SearchBar } from './SearchBar';

export const HeroSection = () => {
  const { tenant } = useTenant();
  
  // Dynamic style for primary color overlay
  const overlayStyle = {
    background: `linear-gradient(to right, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.6))`,
  };

  return (
    <section className="relative">
      <div className="relative bg-slate-900 text-white py-24 md:py-36 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
        {/* Overlay */}
        <div className="absolute inset-0" style={overlayStyle}></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center md:text-left">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium text-white mb-6 border border-white/10">
              Welcome to {tenant?.name || 'FleetLink'}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-[1.1]">
              Rent Your Perfect Ride <br/> in <span className="text-indigo-400">Kathmandu</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-xl leading-relaxed">
              Experience the freedom of the road with our premium fleet. Quality vehicles, transparent pricing, and 24/7 support for your journey.
            </p>
          </div>
        </div>
      </div>
      
      {/* Search Bar Container */}
      <div className="container mx-auto px-4">
        <SearchBar />
      </div>
    </section>
  );
};