'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { festivalConfig } from '../../data/festival';
import { festivalDays } from '../../data/days';
import Link from 'next/link';
import { useRef } from 'react';

export default function Hero() {
  const currentDay = festivalDays.find(d => d.status === 'current') || festivalDays[0];
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const heroBg = festivalConfig.images.heroBackground;
  const idolImg = festivalConfig.images.ganeshIdol;

  return (
    <section ref={ref} className="relative overflow-hidden bg-brown text-ivory min-h-[90vh] flex flex-col justify-center pt-20 pb-16 px-4">
      {/* Background Image Slot */}
      {heroBg && (
        <motion.div 
          style={{ y, backgroundImage: `url(${heroBg})` }}
          className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
        />
      )}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-brown/80 via-brown/60 to-brown/95"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 w-full">
        {/* Idol Image Slot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="mx-auto relative w-48 h-64 md:w-64 md:h-80 rounded-t-[100px] rounded-b-3xl overflow-hidden border-4 border-saffron/40 shadow-[0_0_40px_rgba(234,88,12,0.3)] bg-gradient-to-b from-saffron/20 to-brown flex items-center justify-center"
        >
          {idolImg ? (
             <div 
               className="absolute inset-0 bg-cover bg-center" 
               style={{ backgroundImage: `url(${idolImg})` }} 
             />
          ) : (
            <div className="text-center p-4">
              <span className="text-4xl block mb-2 opacity-50">🛕</span>
              <span className="text-xs uppercase tracking-wider font-bold text-saffron/80">Village Ganesh Idol<br/>Placeholder</span>
            </div>
          )}
          {/* Subtle overlay glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </motion.div>
        
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-saffron font-bold tracking-[0.2em] text-sm uppercase flex items-center justify-center gap-3"
          >
            <span>🕉️</span> <span>శ్రీ వినాయక చవితి మహోత్సవాలు</span> <span>🕉️</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white font-telugu drop-shadow-lg"
          >
            {festivalConfig.festivalName}
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gold font-semibold"
          >
            {festivalConfig.villageName} • {festivalConfig.year}
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl italic text-ivory/80 max-w-2xl mx-auto"
          >
            "{festivalConfig.themeMessage}"
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="pt-4"
        >
          <div className="p-1 rounded-full bg-gradient-to-r from-saffron/0 via-saffron/50 to-saffron/0 max-w-sm mx-auto">
            <div className="bg-brown/90 backdrop-blur-md rounded-full px-6 py-4 border border-saffron/30 shadow-lg">
              <div className="flex items-center justify-center gap-3 text-white font-bold mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]"></span>
                FESTIVAL IS LIVE
              </div>
              <div className="text-sm font-medium text-ivory/90 mb-3">
                DAY {currentDay.dayNumber} / 7 • {currentDay.title}
              </div>
              <div className="w-full bg-black/40 rounded-full h-1.5 mb-1 overflow-hidden">
                <div className="bg-saffron h-1.5 rounded-full" style={{ width: `${(currentDay.dayNumber / 7) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
