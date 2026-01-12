import React from 'react';
import { HeroSection } from '../components/public/HeroSection';
import { FeaturedVehicles } from '../components/public/FeaturedVehicles';
import { WhyChooseUs } from '../components/public/WhyChooseUs';
import { HowItWorks } from '../components/public/HowItWorks';
import { ContactSection } from '../components/public/ContactSection';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturedVehicles />
      <WhyChooseUs />
      <HowItWorks />
      <ContactSection />
    </div>
  );
}