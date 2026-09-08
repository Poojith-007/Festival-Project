'use client';
import { motion } from 'framer-motion';
import { videoItems } from '../../data/videos';
import { Play } from 'lucide-react';

export default function VideosPage() {
  return (
    <div className="py-8 px-4 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-brown mb-2 text-center">Festival Videos</h1>
        <p className="text-brown/70 mb-12 text-center">Watch the highlights and live events.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {videoItems.map((video, index) => (
            <motion.div 
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-ivory border border-black/5 mb-3">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-ivory to-saffron/10 group-hover:scale-105 transition-transform duration-500">
                  <div className="w-14 h-14 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-saffron shadow-lg group-hover:bg-saffron group-hover:text-white transition-colors">
                    <Play fill="currentColor" size={24} className="ml-1" />
                  </div>
                </div>
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-2 py-1 rounded-md font-medium">
                  {video.day}
                </div>
              </div>
              <h3 className="font-bold text-brown text-lg group-hover:text-saffron transition-colors">{video.title}</h3>
              <p className="text-sm text-brown/70 mt-1">{video.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
