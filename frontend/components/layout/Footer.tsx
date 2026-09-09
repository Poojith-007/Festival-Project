'use client';

import { festivalConfig } from '../../data/festival';

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2D1B11] text-[#FFF9F0]/80 py-12 px-4 mt-auto mb-16 md:mb-0 border-t-2 border-[#E8B973]/30">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-[#F05A0A] font-bold text-xl mb-3 flex items-center gap-2 font-telugu">
            <span>🕉️</span> {festivalConfig.festivalName}
          </h3>
          <p className="text-sm mb-1">{festivalConfig.villageName}, {festivalConfig.year}</p>
          <p className="text-xs text-[#E8B973] font-medium">{festivalConfig.themeMessage}</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Quick Navigation</h4>
          <ul className="space-y-2 text-sm">
            <li><button onClick={() => scrollTo('days')} className="hover:text-[#F05A0A] transition-colors cursor-pointer">9-Day Journey Schedule</button></li>
            <li><button onClick={() => scrollTo('updates')} className="hover:text-[#F05A0A] transition-colors cursor-pointer">Live Updates & Alerts</button></li>
            <li><button onClick={() => scrollTo('gallery')} className="hover:text-[#F05A0A] transition-colors cursor-pointer">Photo & Video Gallery</button></li>
            <li><button onClick={() => scrollTo('nimajjanam')} className="hover:text-[#F05A0A] transition-colors cursor-pointer">Maha Nimajjanam</button></li>
            <li><button onClick={() => scrollTo('instructions')} className="hover:text-[#F05A0A] transition-colors cursor-pointer">Instructions & Safety</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Festival Venue</h4>
          <p className="text-sm mb-2">{festivalConfig.venue}</p>
          <button 
            onClick={() => scrollTo('location')} 
            className="text-[#F05A0A] text-sm font-semibold hover:underline cursor-pointer flex items-center gap-1"
          >
            View Map & Directions →
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-10 pt-6 border-t border-white/10 text-center text-xs text-[#FFF9F0]/50">
        <p>© {festivalConfig.year} {festivalConfig.festivalName}, {festivalConfig.villageName}. Devotion • Celebration • Unity.</p>
      </div>
    </footer>
  );
}
