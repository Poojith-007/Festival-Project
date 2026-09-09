'use client';
import { useState, useEffect } from 'react';
import { galleryItems } from '../../data/gallery';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

export default function GalleryPage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const categories = ['All', 'Day 1', 'Day 2', 'Day 3', 'Day 4', 'Nimajjanam'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = activeCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  const openLightbox = (index: number) => setSelectedImageIndex(index);
  const closeLightbox = () => setSelectedImageIndex(null);
  
  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null && filteredItems.length > 0) {
      setSelectedImageIndex(selectedImageIndex === 0 ? filteredItems.length - 1 : selectedImageIndex - 1);
    }
  };
  
  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null && filteredItems.length > 0) {
      setSelectedImageIndex(selectedImageIndex === filteredItems.length - 1 ? 0 : selectedImageIndex + 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') {
        setSelectedImageIndex(prev => (prev === null ? null : prev === 0 ? filteredItems.length - 1 : prev - 1));
      }
      if (e.key === 'ArrowRight') {
        setSelectedImageIndex(prev => (prev === null ? null : prev === filteredItems.length - 1 ? 0 : prev + 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, filteredItems.length]);

  return (
    <div className="py-8 px-4 bg-[#FFF9F0] min-h-screen pb-24 md:pb-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#2D1B11] mb-6 text-center font-telugu">Festival Gallery</h1>
        
        {/* Categories */}
        <div className="flex overflow-x-auto pb-4 mb-6 gap-2 justify-start md:justify-center no-scrollbar">
          {categories.map((cat, i) => (
            <button 
              key={i}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
                activeCategory === cat 
                  ? 'bg-[#F05A0A] text-white' 
                  : 'bg-white text-[#2D1B11]/60 hover:bg-[#E8B973]/20 border border-[#E8B973]/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {filteredItems.map((item, index) => (
            <div 
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative aspect-square rounded-xl overflow-hidden bg-[#E8B973]/10 border border-[#E8B973]/30 cursor-pointer flex flex-col items-center justify-center text-[#2D1B11]/40 hover:bg-[#E8B973]/20 transition-colors"
            >
              {item.imageUrl && item.imageUrl !== '/images/festival/ganesh_idol_1788872848419.jpg' ? (
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.imageUrl})` }}
                />
              ) : (
                <ImageIcon size={32} className="mb-2" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImageIndex !== null && filteredItems[selectedImageIndex] && (
        <div 
          className="fixed inset-0 z-[100] bg-[#2D1B11]/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2"
            onClick={closeLightbox}
          >
            <X size={32} />
          </button>
          
          <button 
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 hidden md:block"
            onClick={showPrev}
          >
            <ChevronLeft size={48} />
          </button>
          
          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 hidden md:block"
            onClick={showNext}
          >
            <ChevronRight size={48} />
          </button>

          <div 
            className="relative max-w-5xl w-full max-h-[80vh] flex flex-col items-center"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-full h-full max-h-[70vh] rounded-xl overflow-hidden flex items-center justify-center bg-[#2D1B11]">
               {filteredItems[selectedImageIndex].imageUrl ? (
                 <img 
                   src={filteredItems[selectedImageIndex].imageUrl} 
                   alt={filteredItems[selectedImageIndex].caption || 'Festival Photo'}
                   className="w-auto h-full max-h-[70vh] object-contain"
                 />
               ) : (
                 <ImageIcon size={64} className="text-white/20" />
               )}
            </div>
            
            <div className="mt-4 text-center">
              <h3 className="text-white text-lg font-bold mb-1">
                {filteredItems[selectedImageIndex].caption || `Photo ${selectedImageIndex + 1}`}
              </h3>
              <span className="text-[#F05A0A] text-sm font-bold uppercase tracking-wider">
                {filteredItems[selectedImageIndex].category}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
