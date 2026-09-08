import Hero from '../components/home/Hero';
import TodaySchedule from '../components/home/TodaySchedule';
import NextEventCountdown from '../components/home/NextEventCountdown';
import FestivalTimeline from '../components/home/FestivalTimeline';
import Link from 'next/link';
import { announcements } from '../data/announcements';
import { festivalConfig } from '../data/festival';
import { Image as ImageIcon } from 'lucide-react';

export default function Home() {
  const latestAnnouncement = announcements[0];
  const bgImg = festivalConfig.images.festivalBackground;

  return (
    <div className="flex flex-col min-h-screen relative">
      <Hero />
      
      {latestAnnouncement && (
        <section className="bg-saffron text-white py-3 px-4 shadow-md sticky top-16 z-40">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-3 justify-center text-center sm:text-left">
            <span className="animate-pulse flex-shrink-0 bg-white/20 px-2 py-1 rounded text-xs font-bold uppercase tracking-widest border border-white/30">Live Update</span>
            <p className="text-sm md:text-base font-medium">{latestAnnouncement.message}</p>
          </div>
        </section>
      )}

      {/* Main Content Area with optional Festival Background */}
      <div className="relative">
        {bgImg && (
          <div 
            className="absolute inset-0 z-0 bg-cover bg-fixed bg-center opacity-5 pointer-events-none"
            style={{ backgroundImage: `url(${bgImg})` }}
          />
        )}
        <div className="relative z-10">
          <TodaySchedule />
          <NextEventCountdown />
          <FestivalTimeline />
          
          <section className="py-16 px-4">
            <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Link href="/gallery" className="group block relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white border border-black/5">
                <div className="h-48 bg-gradient-to-br from-ivory to-saffron/20 flex items-center justify-center">
                  <ImageIcon size={48} className="text-saffron/40 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-xl font-bold text-brown mb-2 group-hover:text-saffron transition">Festival Gallery</h3>
                  <p className="text-sm text-brown/70">View stunning photos and memories from the celebrations.</p>
                </div>
              </Link>
              <Link href="/nimajjanam" className="group block relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white border border-[#7dd3fc]">
                <div className="h-48 bg-gradient-to-br from-[#e0f2fe] to-[#bae6fd] flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform duration-500 drop-shadow-md">🌊</span>
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-xl font-bold text-[#0369a1] mb-2 group-hover:text-[#0284c7] transition">Maha Nimajjanam</h3>
                  <p className="text-sm text-[#0c4a6e]/70">The Grand Final Day immersion details and procession route.</p>
                </div>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
