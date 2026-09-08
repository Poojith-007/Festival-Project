import { festivalDays } from '../../../data/days';
import { notFound } from 'next/navigation';
import { Clock, Image as ImageIcon } from 'lucide-react';
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
    <div className="bg-ivory min-h-screen">
      <div className="bg-brown text-white pt-12 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-saffron/10 opacity-30 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-saffron via-brown to-brown pointer-events-none"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <Link href="/days" className="text-sm text-saffron hover:text-white transition-colors mb-8 inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
            ← Back to 7 Days
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-saffron text-white font-bold px-3 py-1 rounded-md text-sm tracking-wider uppercase shadow-sm">Day {dayData.dayNumber}</span>
            <span className="text-ivory/70 font-medium">{dayData.date}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">{dayData.title}</h1>
          <p className="text-lg md:text-xl text-ivory/80 max-w-2xl">{dayData.shortDescription}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto py-12 px-4 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl shadow-brown/5 border border-black/5 mb-12">
          <h2 className="text-2xl font-bold text-brown mb-8 flex items-center gap-3 border-b border-black/5 pb-4">
            <span className="text-3xl drop-shadow-sm">🪔</span> Schedule
          </h2>
          
          <div className="space-y-6">
            {dayData.events.length > 0 ? (
              dayData.events.map((event) => (
                <div 
                  key={event.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 rounded-2xl hover:bg-ivory/50 transition-colors border border-transparent hover:border-saffron/20 group"
                >
                  <div className="flex items-center justify-center min-w-[100px] text-saffron font-bold bg-saffron/10 px-4 py-3 rounded-xl group-hover:bg-saffron group-hover:text-white transition-colors shadow-sm">
                    <Clock size={18} className="mr-2 opacity-70" />
                    {event.time}
                  </div>
                  <div>
                    <h3 className="font-bold text-brown text-xl mb-1">{event.name}</h3>
                    {event.description && <p className="text-brown/70 leading-relaxed">{event.description}</p>}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center border-2 border-dashed border-brown/10 rounded-3xl bg-ivory/30">
                <span className="text-5xl mb-4 block opacity-20">🕒</span>
                <p className="text-brown/60 font-medium text-lg">Detailed schedule for this day is yet to be announced.</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Photos Section Placeholder */}
        <div className="pt-8">
          <h2 className="text-2xl font-bold text-brown mb-6 flex items-center gap-2">
            Photos & Memories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-square bg-white rounded-2xl border border-black/5 flex flex-col items-center justify-center text-brown/30 shadow-sm hover:shadow-md transition-shadow group">
                <ImageIcon size={32} className="mb-2 group-hover:text-saffron/50 transition-colors" />
                <span className="text-xs uppercase tracking-widest font-bold">Image Slot</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
