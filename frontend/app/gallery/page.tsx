'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryItems } from '../../data/gallery';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function GalleryPage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const categories = ['All', ...Array.from(new Set(galleryItems.map(item => item.category)))];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = activeCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  const openLightbox = (index: number) => setSelectedImageIndex(index);
  const closeLightbox = () => setSelectedImageIndex(null);
  
  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex === 0 ? filteredItems.length - 1 : selectedImageIndex - 1);
    }
  };
  
  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex === filteredItems.length - 1 ? 0 : selectedImageIndex + 1);
    }
  };

  return (
    <div className="py-8 px-4 bg-ivory min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-brown mb-2 text-center">Festival Gallery</h1>
        <p className="text-brown/70 mb-8 text-center max-w-2xl mx-auto">Memories and moments from the celebrations.</p>
        
        {/* Categories */}
        <div className="flex overflow-x-auto pb-4 mb-6 gap-2 justify-start md:justify-center no-scrollbar">
          {categories.map((cat, i) => (
            <button 
              key={i}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat 
                  ? 'bg-saffron text-white shadow-md transform scale-105' 
                  : 'bg-white text-brown/70 hover:bg-saffron/10 hover:text-saffron border border-black/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div 
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                onClick={() => openLightbox(index)}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-white border border-black/5 cursor-pointer shadow-sm hover:shadow-lg transition-shadow"
              >
                {/* Image Placeholder or Actual Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${item.imageUrl})` }}
                >
                  {/* Fallback if placeholder doesn't load visually */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-brown/30 bg-gradient-to-br from-ivory to-saffron/5 -z-10">
                    <span className="text-3xl mb-2 opacity-50">📸</span>
                    <span className="text-xs uppercase tracking-widest font-medium px-2 text-center text-saffron/50">Image Slot</span>
                  </div>
                </div>
                
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.caption && <p className="text-white text-sm font-medium truncate mb-1">{item.caption}</p>}
                  <p className="text-white/70 text-xs font-bold uppercase tracking-wider">{item.category}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredItems.length === 0 && (
           <div className="text-center py-20">
             <span className="text-6xl mb-4 block opacity-30">📭</span>
             <h3 className="text-xl font-bold text-brown mb-2">No photos yet</h3>
             <p className="text-brown/60">Photos for this category will be added soon.</p>
           </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button 
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2 bg-white/10 rounded-full transition-colors"
              onClick={closeLightbox}
            >
              <X size={24} />
            </button>
            
            <button 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 bg-white/10 rounded-full transition-colors hidden md:block"
              onClick={showPrev}
            >
              <ChevronLeft size={32} />
            </button>
            
            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 bg-white/10 rounded-full transition-colors hidden md:block"
              onClick={showNext}
            >
              <ChevronRight size={32} />
            </button>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative max-w-5xl w-full max-h-[80vh] aspect-auto flex flex-col items-center"
              onClick={e => e.stopPropagation()}
            >
              <div className="w-full h-full max-h-[70vh] rounded-xl overflow-hidden shadow-2xl relative bg-brown/20 flex items-center justify-center">
                 {/* Lightbox Image */}
                 <img 
                   src={filteredItems[selectedImageIndex].imageUrl} 
                   alt={filteredItems[selectedImageIndex].caption || 'Festival Photo'}
                   className="w-auto h-full max-h-[70vh] object-contain"
                 />
              </div>
              
              <div className="mt-6 text-center">
                {filteredItems[selectedImageIndex].caption && (
                  <h3 className="text-white text-xl font-medium mb-2">{filteredItems[selectedImageIndex].caption}</h3>
                )}
                <span className="px-3 py-1 bg-white/10 rounded-full text-white/70 text-xs font-bold uppercase tracking-widest">
                  {filteredItems[selectedImageIndex].category}
                </span>
                <div className="text-white/40 text-sm mt-4 md:hidden">
                  Swipe or tap sides to navigate (Mock implementation)
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
