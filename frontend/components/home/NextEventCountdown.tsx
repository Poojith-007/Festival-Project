'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function NextEventCountdown() {
  const [timeLeft, setTimeLeft] = useState({ hours: 1, minutes: 24, seconds: 36 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const isNow = timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  return (
    <section className="py-12 px-4 bg-ivory">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-brown rounded-3xl p-8 text-center text-ivory relative overflow-hidden"
        >
          {/* Subtle bg glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-saffron/10 blur-[50px] rounded-full pointer-events-none"></div>
          
          <div className="relative z-10">
            <h3 className="text-saffron font-bold tracking-wider text-sm uppercase mb-4">Next Event</h3>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 flex items-center justify-center gap-3">
              <span className="text-gold">🪔</span> Maha Aarti
            </h2>

            {isNow ? (
              <div className="inline-flex items-center gap-2 text-red-500 bg-red-500/10 px-6 py-3 rounded-full font-bold text-xl border border-red-500/20">
                <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>
                HAPPENING NOW
              </div>
            ) : (
              <div className="flex justify-center gap-4 md:gap-8">
                <div className="flex flex-col items-center">
                  <div className="text-4xl md:text-5xl font-bold tabular-nums text-white bg-black/20 p-4 rounded-xl border border-white/10 min-w-[72px] shadow-inner">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <div className="text-xs text-white/50 uppercase tracking-widest mt-2 font-medium">Hours</div>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white/20 pt-4">:</div>
                <div className="flex flex-col items-center">
                  <div className="text-4xl md:text-5xl font-bold tabular-nums text-white bg-black/20 p-4 rounded-xl border border-white/10 min-w-[72px] shadow-inner">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <div className="text-xs text-white/50 uppercase tracking-widest mt-2 font-medium">Minutes</div>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white/20 pt-4">:</div>
                <div className="flex flex-col items-center">
                  <div className="text-4xl md:text-5xl font-bold tabular-nums text-white bg-black/20 p-4 rounded-xl border border-white/10 min-w-[72px] shadow-inner">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <div className="text-xs text-white/50 uppercase tracking-widest mt-2 font-medium">Seconds</div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
