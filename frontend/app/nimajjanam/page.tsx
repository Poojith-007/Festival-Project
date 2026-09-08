'use client';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { festivalConfig } from '../../data/festival';

export default function NimajjanamPage() {
  const bgImg = festivalConfig.images.nimajjanamBackground;

  return (
    <div className="bg-[#f0f9ff] min-h-screen relative">
      {/* Background Slot */}
      {bgImg && (
        <div 
          className="absolute inset-0 z-0 bg-cover bg-fixed bg-center opacity-10 pointer-events-none"
          style={{ backgroundImage: `url(${bgImg})` }}
        />
      )}

      <div className="relative pt-24 pb-20 px-4 overflow-hidden text-center bg-gradient-to-b from-[#0284c7]/10 via-[#e0f2fe]/80 to-[#f0f9ff] border-b border-[#bae6fd]">
        <div className="absolute inset-0 z-0 opacity-5 flex justify-center items-center pointer-events-none">
          <span className="text-[400px] text-[#0284c7]">🌊</span>
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl mb-4 drop-shadow-md"
          >
            🌊
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-block bg-[#0284c7] text-white font-bold tracking-widest text-xs px-4 py-1.5 rounded-full uppercase shadow-sm"
          >
            Day 7
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-[#0c4a6e] tracking-tight"
          >
            Maha Nimajjanam
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-2xl text-[#0369a1] italic max-w-xl mx-auto font-medium"
          >
            &quot;The Grand Final Day&quot;
          </motion.p>
        </div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto py-12 px-4">
        {/* Timeline Flow */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-xl shadow-[#0ea5e9]/5 border border-[#bae6fd] mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#0c4a6e] mb-12 text-center flex items-center justify-center gap-3">
            Procession Flow
          </h2>
          
          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-[#38bdf8] before:to-[#0284c7] before:rounded-full">
            
            {/* Step 1 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-gradient-to-br from-[#38bdf8] to-[#0284c7] text-white shadow-lg shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-xl transform group-hover:scale-110 transition-transform">
                1
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] rounded-2xl border border-[#e0f2fe] bg-white shadow-sm hover:shadow-md transition-all overflow-hidden group-hover:border-[#7dd3fc]">
                <div className="h-32 bg-cover bg-center" style={{backgroundImage: "url('/images/festival/hero_background_1788872872047.jpg')"}}></div>
                <div className="p-5">
                  <h3 className="font-bold text-[#0369a1] text-xl">Temple Final Puja</h3>
                  <p className="text-sm text-[#0c4a6e]/70 mt-2 leading-relaxed">Starting at 8:00 AM at the main festival venue. Last chance for darshan before the journey begins.</p>
                </div>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-gradient-to-br from-[#38bdf8] to-[#0284c7] text-white shadow-lg shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-xl transform group-hover:scale-110 transition-transform">
                2
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] rounded-2xl border border-[#e0f2fe] bg-white shadow-sm hover:shadow-md transition-all overflow-hidden group-hover:border-[#7dd3fc]">
                <div className="h-32 bg-cover bg-center" style={{backgroundImage: "url('/images/festival/procession_1788872924202.jpg')"}}></div>
                <div className="p-5">
                  <h3 className="font-bold text-[#0369a1] text-xl">Grand Procession</h3>
                  <p className="text-sm text-[#0c4a6e]/70 mt-2 leading-relaxed">Starting at 10:00 AM through the main streets with traditional dappu and bhajans.</p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-gradient-to-br from-[#38bdf8] to-[#0284c7] text-white shadow-lg shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-xl transform group-hover:scale-110 transition-transform">
                3
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] rounded-2xl border border-[#e0f2fe] bg-white shadow-sm hover:shadow-md transition-all overflow-hidden group-hover:border-[#7dd3fc]">
                <div className="h-32 bg-cover bg-center" style={{backgroundImage: "url('/images/festival/maha_aarti_1788872944567.jpg')"}}></div>
                <div className="p-5">
                  <h3 className="font-bold text-[#0369a1] text-xl">Maha Aarti</h3>
                  <p className="text-sm text-[#0c4a6e]/70 mt-2 leading-relaxed">Final prayers and camphor aarti at the immersion spot.</p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-gradient-to-br from-[#0284c7] to-[#0c4a6e] text-white shadow-lg shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-xl transform group-hover:scale-110 transition-transform">
                4
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] rounded-2xl border border-[#0ea5e9] bg-gradient-to-br from-[#0284c7] to-[#0369a1] text-white shadow-md transform group-hover:scale-105 transition-transform overflow-hidden">
                <div className="h-40 bg-cover bg-center" style={{backgroundImage: "url('/images/festival/nimajjanam_background_1788872905368.jpg')"}}></div>
                <div className="p-6">
                  <h3 className="font-bold text-white text-xl">Nimajjanam</h3>
                  <p className="text-sm text-white/80 mt-2 leading-relaxed">Grand immersion into the waters, praying &quot;Ganpati Bappa Morya, Pudhchya Varshi Lavkar Ya&quot;.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Important Info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-red-50 rounded-3xl p-6 md:p-8 border border-red-100 shadow-sm relative overflow-hidden"
        >
          <div className="absolute -right-8 -top-8 text-red-500/5 rotate-12 pointer-events-none">
            <Info size={120} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 text-red-700 font-bold mb-4 text-xl">
              <Info size={24} className="animate-pulse" />
              Safety Guidelines
            </div>
            <ul className="list-disc pl-5 space-y-3 text-red-900/80 font-medium">
              <li>Follow the designated procession route and do not break the line.</li>
              <li>Maintain safe distance from heavy vehicles and the chariot.</li>
              <li>Do not enter deep waters during immersion; let designated volunteers handle it.</li>
              <li>Keep a close watch on children in the crowd.</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
