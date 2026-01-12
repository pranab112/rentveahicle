import React, { useState } from 'react';
import { UploadCloud, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '../../ui/button';

interface PhotoUploaderProps {
  photos: string[];
  onChange: (photos: string[]) => void;
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({ photos, onChange }) => {
  const [dragActive, setDragActive] = useState(false);
  const [urlInput, setUrlInput] = useState('');

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
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    // In a real app, upload to server here.
    // For now, convert to base64 for preview
    const newPhotos = [...photos];
    
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPhotos.push(reader.result as string);
        onChange(newPhotos);
      };
      reader.readAsDataURL(file);
    });
  };

  const addUrl = () => {
    if (!urlInput) return;
    onChange([...photos, urlInput]);
    setUrlInput('');
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    onChange(newPhotos);
  };

  return (
    <div className="space-y-4">
      <div 
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300 hover:border-slate-400 bg-slate-50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center">
          <UploadCloud className={`mb-4 h-10 w-10 ${dragActive ? 'text-indigo-500' : 'text-slate-400'}`} />
          <p className="text-sm font-medium text-slate-700 mb-1">
            Drag & drop photos here, or <label className="text-indigo-600 hover:text-indigo-700 cursor-pointer">browse<input type="file" multiple className="hidden" onChange={handleChange} accept="image/*" /></label>
          </p>
          <p className="text-xs text-slate-500">Supports JPG, PNG (Max 5MB)</p>
        </div>
      </div>

      <div className="flex gap-2">
        <input 
          type="text" 
          placeholder="Or paste image URL..." 
          className="flex-1 p-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />
        <Button type="button" onClick={addUrl} size="sm" variant="secondary">Add URL</Button>
      </div>

      {photos.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {photos.map((photo, index) => (
            <div key={index} className="group relative aspect-[4/3] rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
              <img src={photo} alt={`Vehicle ${index + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removePhoto(index)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={14} />
              </button>
              {index === 0 && (
                <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 text-white text-[10px] rounded font-medium backdrop-blur-sm">
                  Cover
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};