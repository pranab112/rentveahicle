import React from 'react';

interface ColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ label, color, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <div className="flex gap-3">
        <div className="relative w-12 h-10 rounded-lg overflow-hidden border border-slate-300 shadow-sm cursor-pointer">
          <input 
            type="color" 
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className="absolute -top-2 -left-2 w-20 h-20 p-0 border-0 cursor-pointer"
          />
        </div>
        <input 
          type="text" 
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="w-28 p-2 text-sm uppercase font-mono border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          maxLength={7}
        />
      </div>
    </div>
  );
};