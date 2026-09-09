'use client';
import { festivalDays } from '../../data/days';
import Link from 'next/link';

export default function DaysPage() {
  return (
    <div className="py-8 px-4 bg-[#FFF9F0] min-h-screen pb-24 md:pb-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-[#2D1B11] mb-2 font-telugu">9-Day Journey</h1>
          <p className="text-[#2D1B11]/60">Follow the schedule from Pranapratishta to Nimajjanam.</p>
        </div>
        
        <div className="relative border-l-2 border-[#E8B973]/50 ml-4 md:ml-8 space-y-8 pb-12">
          {festivalDays.map((day) => {
            const isCompleted = day.status === 'completed';
            const isCurrent = day.status === 'current';
            const isFinal = day.dayNumber === 9;

            return (
              <Link 
                href={`/days/${day.id}`}
                key={day.id}
                className="block relative pl-8 group"
              >
                {/* Timeline Dot */}
                <span className={`absolute left-[-9px] top-1 w-4 h-4 rounded-full border-2 border-[#FFF9F0] ${
                  isCurrent ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 
                  isFinal ? 'bg-red-500' :
                  isCompleted ? 'bg-[#E8B973]/50' : 'bg-[#E8B973]'
                }`}></span>

                <div className={`transition-all duration-200 ${
                  isCompleted ? 'opacity-50 grayscale' : 'opacity-100'
                }`}>
                  <div className="flex flex-col mb-1">
                    {isCurrent && (
                      <span className="text-green-600 font-bold text-xs uppercase tracking-wider mb-1 flex items-center gap-1">
                        🟢 TODAY
                      </span>
                    )}
                    {isFinal && !isCurrent && (
                      <span className="text-red-500 font-bold text-xs uppercase tracking-wider mb-1 flex items-center gap-1">
                        🔴 MAHA NIMAJJANAM
                      </span>
                    )}
                    
                    <span className="text-sm font-semibold text-[#F05A0A] uppercase tracking-wider">
                      Day {day.dayNumber} • {day.date}
                    </span>
                  </div>
                  
                  <div className={`p-4 rounded-xl border transition-all duration-300 shadow-sm ${
                    isCurrent ? 'bg-white border-[#F05A0A] ring-1 ring-[#F05A0A]/20' : 
                    isFinal ? 'bg-[#FFF5F5] border-red-200' :
                    'bg-white border-[#E8B973]/30 hover:border-[#F05A0A]/50'
                  }`}>
                    <h3 className={`font-bold text-xl mb-1 ${
                      isFinal ? 'text-red-600' : 'text-[#2D1B11]'
                    }`}>
                      {day.title}
                    </h3>
                    <p className="text-[#2D1B11]/70 text-sm">{day.shortDescription}</p>
                    <div className="mt-3 text-sm font-medium text-[#F05A0A] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      View Schedule →
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  );
}
