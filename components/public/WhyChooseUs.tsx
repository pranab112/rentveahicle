import React from 'react';
import { ShieldCheck, Clock, Banknote, MapPin } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: "Well Maintained Cars",
    description: "Every vehicle undergoes strict safety checks before every trip to ensure your safety."
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Our dedicated support team is available round the clock to assist you with any issues."
  },
  {
    icon: Banknote,
    title: "Affordable Rates",
    description: "Competitive daily and weekly rates with no hidden charges or surprise fees."
  },
  {
    icon: MapPin,
    title: "Flexible Pickup",
    description: "Choose to pick up from our office or get the car delivered to your doorstep."
  }
];

export const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose Us</h2>
          <p className="text-slate-600">
            We strive to provide the best rental experience in the city. Here is what sets us apart from the competition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-slate-50 rounded-xl p-8 text-center hover:-translate-y-1 transition-transform duration-300">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-primary">
                <feature.icon size={28} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};