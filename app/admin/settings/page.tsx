import React, { useState, useEffect } from 'react';
import { SettingsSection } from '../../../components/admin/settings/SettingsSection';
import { LogoUploader } from '../../../components/admin/settings/LogoUploader';
import { ColorPicker } from '../../../components/admin/settings/ColorPicker';
import { PasswordChangeForm } from '../../../components/admin/settings/PasswordChangeForm';
import { useTenant } from '../../../hooks/useTenant';
import { hexToHsl } from '../../../lib/tenant';

export default function AdminSettingsPage() {
  const { tenant } = useTenant();

  // State for form fields
  const [businessName, setBusinessName] = useState('FleetLink Operator');
  const [aboutText, setAboutText] = useState('We are a premium vehicle rental service providing quality cars for your journey.');
  const [address, setAddress] = useState('Lazimpat, Kathmandu, Nepal');
  const [mapsUrl, setMapsUrl] = useState('');
  
  const [phone, setPhone] = useState('+977 980-000-0000');
  const [whatsapp, setWhatsapp] = useState('+977 980-000-0000');
  const [email, setEmail] = useState('contact@fleetlink.com');
  const [accountEmail, setAccountEmail] = useState('admin@fleetlink.com');

  const [facebook, setFacebook] = useState('https://facebook.com/fleetlink');
  const [instagram, setInstagram] = useState('https://instagram.com/fleetlink');
  const [tiktok, setTikTok] = useState('');

  const [logo, setLogo] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#4f46e5'); // Indigo 600
  const [secondaryColor, setSecondaryColor] = useState('#0f172a'); // Slate 900

  // Initialize from Tenant Context if available (Simulated)
  useEffect(() => {
    if (tenant) {
        setBusinessName(tenant.name);
        // setPrimaryColor(tenant.primaryColor || '#4f46e5');
    }
  }, [tenant]);

  // Live Preview Logic for Color
  useEffect(() => {
    const hsl = hexToHsl(primaryColor);
    document.documentElement.style.setProperty('--primary', hsl);
    document.documentElement.style.setProperty('--ring', hsl);
  }, [primaryColor]);

  const handleSaveBusiness = () => {
    console.log('Saved business info:', { businessName, aboutText, address, mapsUrl });
  };

  const handleSaveContact = () => {
    console.log('Saved contact info:', { phone, whatsapp, email });
  };

  const handleSaveSocial = () => {
    console.log('Saved social info:', { facebook, instagram, tiktok });
  };

  const handleSaveBranding = () => {
    console.log('Saved branding:', { logo, primaryColor, secondaryColor });
    // In a real app, this would persist the theme to the backend
    // For now, the useEffect above handles the "Live Preview"
  };

  const handleSaveAccount = () => {
    console.log('Saved account info');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-20">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Settings</h2>
        <p className="text-slate-500">Manage your website content, branding, and account preferences.</p>
      </div>

      <SettingsSection 
        title="Business Information" 
        description="General details about your company visible on the website."
        onSave={handleSaveBusiness}
      >
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Business Name</label>
            <input 
              type="text" 
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">About Text</label>
            <textarea 
              value={aboutText}
              onChange={(e) => setAboutText(e.target.value)}
              rows={4}
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-y" 
            />
            <p className="text-xs text-slate-500">Displayed in the footer and About page.</p>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Address</label>
            <input 
              type="text" 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
            />
          </div>
           <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Google Maps Embed URL (Optional)</label>
            <input 
              type="text" 
              value={mapsUrl}
              onChange={(e) => setMapsUrl(e.target.value)}
              placeholder="<iframe src=...>"
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-xs" 
            />
          </div>
        </div>
      </SettingsSection>

      <SettingsSection 
        title="Contact Details" 
        description="How customers can reach you."
        onSave={handleSaveContact}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Phone Number</label>
            <input 
              type="tel" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">WhatsApp Number</label>
            <input 
              type="tel" 
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
            />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Public Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
            />
          </div>
        </div>
      </SettingsSection>

      <SettingsSection 
        title="Social Media" 
        description="Links to your social profiles."
        onSave={handleSaveSocial}
      >
        <div className="grid grid-cols-1 gap-4">
           <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Facebook URL</label>
            <input 
              type="url" 
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              placeholder="https://facebook.com/..."
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Instagram URL</label>
            <input 
              type="url" 
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="https://instagram.com/..."
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">TikTok URL (Optional)</label>
            <input 
              type="url" 
              value={tiktok}
              onChange={(e) => setTikTok(e.target.value)}
              placeholder="https://tiktok.com/..."
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
            />
          </div>
        </div>
      </SettingsSection>

      <SettingsSection 
        title="Branding" 
        description="Customize the look and feel of your website."
        onSave={handleSaveBranding}
      >
        <div className="space-y-6">
          <LogoUploader logoUrl={logo} onChange={setLogo} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
             <ColorPicker label="Primary Color" color={primaryColor} onChange={setPrimaryColor} />
             <ColorPicker label="Secondary Color" color={secondaryColor} onChange={setSecondaryColor} />
          </div>
          <p className="text-xs text-slate-500">Tip: The primary color updates immediately on this page for preview.</p>
        </div>
      </SettingsSection>

      <SettingsSection 
        title="Website Settings" 
        description="Domain and technical configurations."
        onSave={() => {}} // Read-only mostly
      >
        <div className="grid grid-cols-1 gap-4">
           <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Custom Domain</label>
             <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  value={tenant?.domain || 'Not Configured'}
                  disabled
                  className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-500" 
                />
                <button className="text-xs text-indigo-600 hover:underline whitespace-nowrap px-2">Contact Support</button>
             </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Subdomain</label>
            <input 
              type="text" 
              value={`${tenant?.id.replace('t_', '') || 'demo'}.fleetlink.com`}
              disabled
              className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-500" 
            />
          </div>
        </div>
      </SettingsSection>

      <SettingsSection 
        title="Account" 
        description="Manage your login credentials."
        onSave={handleSaveAccount}
      >
         <div className="space-y-6">
            <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Admin Email</label>
                <input 
                  type="email" 
                  value={accountEmail}
                  onChange={(e) => setAccountEmail(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                />
            </div>
            
            <div className="pt-4 border-t border-slate-100">
               <h4 className="text-sm font-bold text-slate-800 mb-4">Change Password</h4>
               <PasswordChangeForm />
            </div>
         </div>
      </SettingsSection>

    </div>
  );
}