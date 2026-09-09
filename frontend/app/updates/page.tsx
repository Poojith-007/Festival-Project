'use client';
import { announcements } from '../../data/announcements';
import { Bell } from 'lucide-react';
import { useState } from 'react';

export default function UpdatesPage() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="bg-[#FFF9F0] min-h-screen pb-24 md:pb-12 pt-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-[#2D1B11] mb-6 font-telugu">Live Updates</h1>
        
        <div className="mb-8">
          <button 
            onClick={() => setSubscribed(!subscribed)}
            className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors ${
              subscribed ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-[#F05A0A] text-white hover:bg-[#D04A08]'
            }`}
          >
            <Bell size={20} />
            {subscribed ? 'Subscribed to Push Notifications' : 'Subscribe to Push Notifications'}
          </button>
        </div>

        <div className="space-y-4">
          {announcements.map((update, index) => {
            const isLive = update.type === 'emergency' && index === 0;
            const isChange = update.message.includes('Important');

            return (
              <div 
                key={update.id}
                className={`p-4 rounded-xl border ${
                  isLive 
                    ? 'bg-red-50 border-red-200' 
                    : 'bg-white border-[#E8B973]/30'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${
                    isLive ? 'text-red-600' : isChange ? 'text-[#F05A0A]' : 'text-[#2D1B11]/60'
                  }`}>
                    {isLive && '🔴 LIVE UPDATE'}
                    {isChange && !isLive && '📢 Program Change'}
                    {!isLive && !isChange && 'Update'}
                  </span>
                  <span className="text-xs text-[#2D1B11]/50">{update.timestamp}</span>
                </div>
                <p className={`text-[15px] leading-relaxed ${isLive ? 'font-bold text-[#2D1B11]' : 'text-[#2D1B11]/80'}`}>
                  {update.message}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
