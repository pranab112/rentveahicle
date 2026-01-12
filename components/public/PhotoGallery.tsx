import React, { useState } from 'react';

interface PhotoGalleryProps {
  images: string[];
  alt: string;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ images, alt }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  // Ensure we have at least one image
  const displayImages = images.length > 0 ? images : ['https://picsum.photos/800/600?blur'];

  return (
    <div className="space-y-4">
      <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border border-slate-200 shadow-sm relative group">
        <img 
          src={displayImages[selectedImage]} 
          alt={alt} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      {displayImages.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {displayImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === idx ? 'border-indigo-600 ring-2 ring-indigo-100' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};