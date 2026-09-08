'use client';
import { motion } from 'framer-motion';
import { festivalDays } from '../../data/days';
import Link from 'next/link';

export default function FestivalTimeline() {
  return (
    <section className="py-12 px-4 bg-ivory">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-brown">7-Day Festival Journey</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {festivalDays.map((day, index) => {
            const isCurrent = day.status === 'current';
            const isCompleted = day.status === 'completed';
            
            return (
              <motion.div 
                key={day.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`p-5 rounded-2xl border ${
                  isCurrent ? 'bg-saffron/10 border-saffron/40 ring-1 ring-saffron/50' : 
                  isCompleted ? 'bg-white border-black/5 opacity-80' : 'bg-white border-black/5'
                }`}
              >
                <div className="text-sm font-bold mb-1 flex justify-between items-center">
                  <span className={isCurrent ? 'text-saffron' : 'text-brown/50'}>DAY {day.dayNumber}</span>
                  {isCurrent && <span className="text-[10px] bg-saffron text-white px-2 py-0.5 rounded-full uppercase tracking-wider">Today</span>}
                  {isCompleted && <span className="text-[10px] bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full uppercase tracking-wider">Done</span>}
                </div>
                <h3 className="font-semibold text-lg text-brown mb-1">{day.title}</h3>
                <p className="text-xs text-brown/60 mb-3">{day.shortDescription}</p>
                
                <Link href={`/days/${day.id}`} className="text-xs font-medium text-saffron hover:underline mt-auto inline-block">
                  View Details →
                </Link>
              </motion.div>
            )
          })}
        </div>
        
        <div className="mt-8 text-center">
          <Link href="/days" className="inline-block bg-white text-brown border border-black/10 px-6 py-3 rounded-full hover:bg-ivory transition shadow-sm font-medium">
            Explore All 7 Days
          </Link>
        </div>
      </div>
    </section>
  );
}
