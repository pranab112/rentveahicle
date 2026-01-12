import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../ui/card';
import { Button } from '../../ui/button';
import { Check, Save } from 'lucide-react';

interface SettingsSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
  onSave: () => Promise<void> | void;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({ title, description, children, onSave }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await Promise.resolve(onSave()); // Handle both sync and async
    
    // Simulate API delay if instantaneous
    setTimeout(() => {
        setIsSaving(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-slate-50 border-b border-slate-100">
        <CardTitle className="text-lg text-slate-900">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {children}
      </CardContent>
      <CardFooter className="bg-slate-50 border-t border-slate-100 p-4 flex justify-end">
        <Button 
          onClick={handleSave} 
          disabled={isSaving || showSuccess}
          className={`min-w-[100px] transition-all duration-300 ${showSuccess ? 'bg-green-600 hover:bg-green-700' : ''}`}
        >
          {isSaving ? (
            'Saving...'
          ) : showSuccess ? (
            <span className="flex items-center gap-2"><Check size={16} /> Saved</span>
          ) : (
            <span className="flex items-center gap-2"><Save size={16} /> Save Changes</span>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};