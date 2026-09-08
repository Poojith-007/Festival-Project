'use client';
import { motion } from 'framer-motion';
import { festivalDays } from '../../data/days';
import { Clock } from 'lucide-react';
import Link from 'next/link';

export default function TodaySchedule() {
  const currentDay = festivalDays.find(d => d.status === 'current') || festivalDays[0];

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-3xl">🪔</span>
          <h2 className="text-2xl md:text-3xl font-bold text-brown">Today&apos;s Celebration</h2>
        </div>
        
        <div className="space-y-4">
          {currentDay.events.map((event, index) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 p-4 rounded-xl border border-saffron/10 bg-ivory/30"
            >
              <div className="flex flex-col items-center justify-center min-w-[80px] text-saffron font-bold text-sm bg-saffron/10 p-2 rounded-lg">
                <Clock size={16} className="mb-1" />
                {event.time}
              </div>
              <div>
                <h3 className="font-semibold text-brown text-lg">{event.name}</h3>
                {event.description && <p className="text-sm text-brown/70 mt-1">{event.description}</p>}
              </div>
            </motion.div>
          ))}
          {currentDay.events.length === 0 && (
            <p className="text-brown/70 italic p-4">Schedule to be announced.</p>
          )}
        </div>

        <div className="mt-8 text-center">
          <Link href={`/days/${currentDay.id}`} className="text-saffron font-medium hover:underline inline-flex items-center gap-1">
            View Full Schedule →
          </Link>
        </div>
      </div>
    </section>
  );
}
