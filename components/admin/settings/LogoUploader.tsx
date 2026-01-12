import React, { useState } from 'react';
import { UploadCloud, X, Image as ImageIcon } from 'lucide-react';

interface LogoUploaderProps {
  logoUrl: string;
  onChange: (url: string) => void;
}

export const LogoUploader: React.FC<LogoUploaderProps> = ({ logoUrl, onChange }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      onChange(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex items-start gap-6">
      {/* Preview */}
      <div className="shrink-0">
        <p className="text-sm font-medium text-slate-700 mb-2">Current Logo</p>
        <div className="w-32 h-32 rounded-lg border border-slate-200 bg-white flex items-center justify-center overflow-hidden relative group">
          {logoUrl ? (
            <>
                <img src={logoUrl} alt="Logo" className="max-w-full max-h-full object-contain p-2" />
                <button 
                  onClick={() => onChange('')}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove Logo"
                >
                    <X size={12} />
                </button>
            </>
          ) : (
            <span className="text-slate-400 text-xs">No Logo</span>
          )}
        </div>
      </div>

      {/* Upload Area */}
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-700 mb-2">Upload New</p>
        <div 
          className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
            dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300 hover:border-slate-400 bg-slate-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center">
            <UploadCloud className={`mb-3 h-8 w-8 ${dragActive ? 'text-indigo-500' : 'text-slate-400'}`} />
            <p className="text-sm font-medium text-slate-700 mb-1">
              Drag & drop logo here, or <label className="text-indigo-600 hover:text-indigo-700 cursor-pointer">browse<input type="file" className="hidden" onChange={handleFileChange} accept="image/*" /></label>
            </p>
            <p className="text-xs text-slate-500">Recommended size: 512x512px (PNG, SVG)</p>
          </div>
        </div>
      </div>
    </div>
  );
};