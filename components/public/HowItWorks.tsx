import React from 'react';
import { Search, MousePointerClick, CarFront } from 'lucide-react';

export const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Choose Your Car",
      desc: "Browse our fleet and find the vehicle that fits your needs."
    },
    {
      icon: MousePointerClick,
      title: "Book Online",
      desc: "Select your dates and book instantly with our secure platform."
    },
    {
      icon: CarFront,
      title: "Pick Up & Drive",
      desc: "Pick up your car from the designated location and enjoy the ride."
    }
  ];

  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-slate-400">Rent your favorite car in 3 easy steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector Line (Desktop only) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-slate-700 -z-0"></div>

          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center border-4 border-slate-900 mb-6 shadow-lg">
                <step.icon size={32} className="text-indigo-400" />
              </div>
              <div className="bg-indigo-600 text-xs font-bold px-2.5 py-1 rounded-full mb-4">STEP {idx + 1}</div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-slate-400 max-w-xs">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};