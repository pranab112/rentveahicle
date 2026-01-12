import React from 'react';
import { useTenant } from '../../hooks/useTenant';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { Button } from '../ui/button';

export const ContactSection = () => {
  const { tenant } = useTenant();

  return (
    <section className="py-20 bg-white border-t border-slate-100" id="contact">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div>
            <span className="text-primary font-semibold tracking-wider text-sm uppercase mb-2 block">Get in Touch</span>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Contact {tenant?.name || 'Us'}</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Have questions about booking or need assistance? Our team is here to help you. Reach out to us via phone, email, or visit our office.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0 text-primary">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Phone Number</h4>
                  <a href="tel:+9779800000000" className="text-slate-600 hover:text-primary transition-colors">+977 980-000-0000</a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0 text-primary">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Email Address</h4>
                  <a href={`mailto:contact@${tenant?.domain || 'fleetlink.com'}`} className="text-slate-600 hover:text-primary transition-colors">
                    contact@{tenant?.domain || 'fleetlink.com'}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0 text-primary">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Location</h4>
                  <p className="text-slate-600">Lazimpat, Kathmandu, Nepal</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0 text-primary">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Business Hours</h4>
                  <p className="text-slate-600">Sun - Fri: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button className="gap-2 bg-green-600 hover:bg-green-700">
                <MessageCircle size={18} /> WhatsApp
              </Button>
              <Button variant="outline" className="gap-2">
                <Mail size={18} /> Send Email
              </Button>
            </div>
          </div>

          <div className="h-[400px] bg-slate-100 rounded-2xl overflow-hidden relative">
            {/* Map Placeholder */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.067343274716!2d85.3197678754743!3d27.72029707617522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb191873138b39%3A0x6b47372d61741512!2sLazimpat%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1716382900000!5m2!1sen!2snp" 
              width="100%" 
              height="100%" 
              style={{border: 0}} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale opacity-80 hover:grayscale-0 transition-all duration-500"
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
};