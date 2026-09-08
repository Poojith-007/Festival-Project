'use client';
import { motion } from 'framer-motion';
import { announcements } from '../../data/announcements';
import { Bell, AlertTriangle, Info } from 'lucide-react';

export default function UpdatesPage() {
  return (
    <div className="py-12 px-4 bg-ivory min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-brown mb-4 drop-shadow-sm text-center">Live Updates</h1>
        <p className="text-brown/70 mb-12 text-center max-w-xl mx-auto text-lg">Latest announcements and information from the organizing committee.</p>
        
        <div className="space-y-6">
          {announcements.map((update, index) => {
            const isImportant = update.type === 'important' || update.type === 'emergency';
            
            return (
              <motion.div 
                key={update.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 md:p-8 rounded-3xl border transition-all hover:shadow-lg ${
                  isImportant 
                    ? 'bg-gradient-to-r from-red-50 to-white border-red-200 shadow-sm relative overflow-hidden' 
                    : 'bg-white border-black/5 shadow-sm'
                }`}
              >
                {isImportant && <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500"></div>}
                <div className="flex flex-col sm:flex-row items-start gap-5">
                  <div className={`p-4 rounded-2xl ${isImportant ? 'bg-red-100 text-red-600' : 'bg-saffron/10 text-saffron'}`}>
                    {isImportant ? <AlertTriangle size={28} /> : <Info size={28} />}
                  </div>
                  <div className="flex-1 w-full">
                    <div className="flex justify-between items-start mb-3 border-b border-black/5 pb-3">
                      <span className={`text-xs font-bold uppercase tracking-widest ${isImportant ? 'text-red-600' : 'text-saffron'}`}>
                        {isImportant ? 'Important Notice' : 'Update'}
                      </span>
                      <span className="text-sm font-medium text-brown/40 whitespace-nowrap bg-brown/5 px-3 py-1 rounded-full">{update.timestamp}</span>
                    </div>
                    <p className="text-brown text-lg font-medium leading-relaxed">{update.message}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
          
          {announcements.length === 0 && (
            <div className="text-center p-16 bg-white rounded-3xl border-2 border-dashed border-brown/10 shadow-sm">
              <div className="w-20 h-20 bg-brown/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bell className="text-brown/30" size={40} />
              </div>
              <h3 className="text-xl font-bold text-brown mb-2">No new updates</h3>
              <p className="text-brown/60 text-lg">Check back later for announcements.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
