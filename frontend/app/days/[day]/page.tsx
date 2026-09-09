import { festivalDays } from '../../../data/days';
import { notFound } from 'next/navigation';
import { Image as ImageIcon, Info } from 'lucide-react';
import Link from 'next/link';

export function generateStaticParams() {
  return festivalDays.map((day) => ({
    day: day.id,
  }));
}

export default function DayDetailsPage({ params }: { params: { day: string } }) {
  const dayData = festivalDays.find((d) => d.id === params.day);

  if (!dayData) {
    notFound();
  }

  return (
    <div className="bg-[#FFF9F0] min-h-screen pb-24 md:pb-12">
      <div className="px-4 py-6 max-w-2xl mx-auto">
        <Link href="/days" className="text-sm text-[#F05A0A] font-bold mb-6 inline-flex items-center hover:opacity-80 transition-opacity">
          ← Back
        </Link>
        
        {/* Header Block */}
        <div className="mb-8">
          <span className="text-sm font-bold text-[#F05A0A] uppercase tracking-wider block mb-1">
            Day {dayData.dayNumber} • {dayData.date}
          </span>
          <h1 className="text-3xl font-bold text-[#2D1B11] mb-2">{dayData.title}</h1>
        </div>

        {/* Announcements Block (Mock) */}
        {dayData.dayNumber === 4 && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-8 flex items-start gap-3 text-orange-900">
            <Info className="text-orange-600 mt-0.5 shrink-0" size={20} />
            <div>
              <p className="font-bold text-sm">Day 4 Announcements</p>
              <p className="text-sm mt-1">No special instructions for today.</p>
            </div>
          </div>
        )}

        {/* Schedule Block */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8B973]/30 mb-8">
          <h2 className="text-xl font-bold text-[#2D1B11] mb-4 pb-2 border-b border-[#E8B973]/30">Schedule</h2>
          
          <div className="space-y-4">
            {dayData.events.map((event) => (
              <div key={event.id} className="flex items-start gap-4">
                <span className="w-20 text-sm font-bold text-[#F05A0A] shrink-0 pt-0.5">{event.time}</span>
                <span className="text-[#2D1B11] font-medium flex items-center gap-2">
                  {/* @ts-ignore - Assuming icon might be present as per our updated days.ts */}
                  {event.icon && <span className="text-lg">{event.icon}</span>}
                  {event.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Photos Grid Block */}
        <div>
          <h2 className="text-xl font-bold text-[#2D1B11] mb-4">Day {dayData.dayNumber} Photos</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <Link 
                href={`/gallery?day=${dayData.dayNumber}`}
                key={i} 
                className="aspect-square bg-[#E8B973]/10 rounded-xl border border-[#E8B973]/30 flex flex-col items-center justify-center text-[#2D1B11]/40 hover:bg-[#E8B973]/20 transition-colors"
              >
                <ImageIcon size={28} className="mb-2" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
