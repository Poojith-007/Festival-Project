'use client';
import { motion } from 'framer-motion';
import { festivalDays } from '../../data/days';
import Link from 'next/link';

export default function DaysPage() {
  return (
    <div className="py-12 px-4 bg-ivory min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-brown mb-4 font-telugu drop-shadow-sm">7 Days of Celebration</h1>
          <p className="text-brown/70 max-w-xl mx-auto text-lg">Follow the complete journey of our village&apos;s Ganesh festival, day by day.</p>
        </div>
        
        <div className="space-y-6">
          {festivalDays.map((day, index) => {
            const isCurrent = day.status === 'current';
            const isCompleted = day.status === 'completed';
            
            return (
              <motion.div 
                key={day.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  href={`/days/${day.id}`}
                  className={`group block p-6 sm:p-8 rounded-3xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                    isCurrent ? 'bg-gradient-to-br from-white to-saffron/10 border-saffron/40 ring-2 ring-saffron/30 shadow-md' : 
                    isCompleted ? 'bg-white/60 border-black/5 opacity-80 hover:opacity-100 grayscale-[0.2]' : 'bg-white border-black/5 shadow-sm'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div>
                      <div className="text-sm font-bold mb-2 flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full ${isCurrent ? 'bg-saffron text-white' : 'bg-brown/10 text-brown/70'}`}>
                          DAY {day.dayNumber}
                        </span>
                        <span className="text-brown/50 font-medium">{day.date}</span>
                        {isCurrent && <span className="flex items-center gap-1 text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wider ml-1 shadow-sm"><span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>Today</span>}
                      </div>
                      <h3 className={`font-bold text-2xl mb-2 transition-colors ${isCurrent ? 'text-saffron' : 'text-brown group-hover:text-saffron'}`}>
                        {day.title}
                      </h3>
                      <p className="text-brown/70 leading-relaxed max-w-2xl">{day.shortDescription}</p>
                    </div>
                    
                    <div className={`whitespace-nowrap font-bold flex items-center justify-center p-3 rounded-xl transition-all ${
                      isCurrent ? 'bg-saffron text-white' : 'bg-saffron/10 text-saffron group-hover:bg-saffron group-hover:text-white'
                    }`}>
                      View Details →
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
