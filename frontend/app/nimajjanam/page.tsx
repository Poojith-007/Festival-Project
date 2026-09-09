'use client';
import { useState, useEffect } from 'react';
import { Info, MapPin } from 'lucide-react';
import { festivalConfig } from '../../data/festival';

export default function NimajjanamPage() {
  const [timeLeft, setTimeLeft] = useState({ hrs: '02', min: '14', sec: '32' });

  // Mock countdown effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        let h = parseInt(prev.hrs);
        let m = parseInt(prev.min);
        let s = parseInt(prev.sec);
        
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { return { hrs: '00', min: '00', sec: '00' }; }
        
        return {
          hrs: h.toString().padStart(2, '0'),
          min: m.toString().padStart(2, '0'),
          sec: s.toString().padStart(2, '0')
        };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#FFF9F0] min-h-screen pb-24 md:pb-12 pt-8">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold text-[#0c4a6e] mb-2 font-telugu">Maha Nimajjanam</h1>
        <p className="text-[#0c4a6e]/70 mb-8 font-medium">The Grand Final Day Immersion</p>

        {/* Countdown */}
        <div className="bg-[#e0f2fe] border border-[#bae6fd] rounded-2xl p-6 mb-8 shadow-[0_4px_20px_rgba(2,132,199,0.1)]">
          <p className="text-[#0369a1] font-bold text-sm uppercase tracking-wider mb-4">Until Procession Starts</p>
          <div className="flex justify-center gap-4 text-[#0c4a6e]">
            <div className="flex flex-col items-center">
              <span className="text-5xl font-bold font-mono">{timeLeft.hrs}</span>
              <span className="text-xs font-bold mt-1">HRS</span>
            </div>
            <span className="text-5xl font-bold font-mono opacity-50">:</span>
            <div className="flex flex-col items-center">
              <span className="text-5xl font-bold font-mono">{timeLeft.min}</span>
              <span className="text-xs font-bold mt-1">MIN</span>
            </div>
            <span className="text-5xl font-bold font-mono opacity-50">:</span>
            <div className="flex flex-col items-center">
              <span className="text-5xl font-bold font-mono">{timeLeft.sec}</span>
              <span className="text-xs font-bold mt-1">SEC</span>
            </div>
          </div>
        </div>

        {/* Route Map Placeholder */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#0c4a6e] mb-4 flex items-center justify-center gap-2">
            <MapPin /> Procession Route Map
          </h2>
          <div className="aspect-video bg-[#0c4a6e]/5 border-2 border-dashed border-[#0c4a6e]/20 rounded-2xl flex flex-col items-center justify-center text-[#0c4a6e]/40">
             <MapPin size={48} className="mb-2" />
             <span className="font-bold uppercase tracking-widest text-sm">Map Placeholder</span>
          </div>
        </div>

        {/* Safety Instructions */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-left shadow-sm">
          <h2 className="text-lg font-bold text-red-700 flex items-center gap-2 mb-4">
            <Info /> Important Instructions
          </h2>
          <ul className="space-y-3 text-red-900/80 font-medium">
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">•</span>
              Keep children with guardians.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">•</span>
              Use designated parking areas.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">•</span>
              Follow safety instructions near water.
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
