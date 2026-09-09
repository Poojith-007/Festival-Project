'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useActiveSection } from '../../hooks/useActiveSection';
import { Menu, X, Share2, Globe, Info, Users, MapPin, BookOpen, Phone } from 'lucide-react';
import { festivalConfig } from '../../data/festival';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<'te' | 'en'>('te');
  const [copiedToast, setCopiedToast] = useState(false);

  // Track all page sections
  const { activeSection, setManualSection } = useActiveSection([
    'home',
    'days',
    'day-details',
    'updates',
    'gallery',
    'nimajjanam',
    'about',
    'organizers',
    'location',
    'instructions',
    'contact'
  ]);

  // Determine which of the 5 primary tabs is active
  const getActiveTab = () => {
    if (activeSection === 'home') return 'home';
    if (activeSection === 'days' || activeSection === 'day-details') return 'days';
    if (activeSection === 'updates') return 'updates';
    if (activeSection === 'gallery') return 'gallery';
    if (activeSection === 'nimajjanam') return 'nimajjanam';
    return '';
  };

  const currentTab = getActiveTab();

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    setManualSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: festivalConfig.festivalName,
          text: `${festivalConfig.festivalName} - ${festivalConfig.villageName}`,
          url: window.location.href,
        });
      } catch (err) {
        // user cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2000);
    }
  };

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Days', id: 'days' },
    { label: 'Updates', id: 'updates' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Nimajjanam', id: 'nimajjanam' },
  ];

  return (
    <>
      {/* Pinned Global Header with Top Orange Border Accent */}
      <header className="sticky top-0 z-50 w-full border-t-4 border-[#F05A0A] border-b border-[#E8B973]/40 bg-[#FFF9F0] shadow-[0_2px_10px_rgba(240,90,10,0.06)]">
        <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-4">
          
          {/* Left: Menu trigger & Branding */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E8B973]/60 bg-white text-[#2D1B11] font-semibold text-sm hover:border-[#F05A0A] hover:text-[#F05A0A] transition-all shadow-xs cursor-pointer active:scale-95"
              aria-label="Toggle Menu"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
              <span>Menu</span>
            </button>

            <button 
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-2 text-left cursor-pointer group"
            >
              <span className="text-xl">🕉️</span>
              <span className="font-bold text-[#F05A0A] text-sm sm:text-base font-telugu group-hover:opacity-85 transition-opacity">
                {festivalConfig.festivalName}
              </span>
            </button>
          </div>

          {/* Desktop Center Navigation Tabs with Animated Spring Indicator */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-white/60 border border-[#E8B973]/30">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="relative px-4 py-1.5 rounded-full text-sm font-semibold transition-colors cursor-pointer select-none"
                >
                  {/* Animated Active Pill Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-[#F05A0A] rounded-full shadow-md"
                      transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                    />
                  )}
                  {/* Label Text */}
                  <span 
                    className={`relative z-10 transition-colors duration-150 ${
                      isActive ? 'text-white font-bold' : 'text-[#2D1B11]/80 hover:text-[#F05A0A]'
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Right: Language Control */}
          <div className="flex items-center gap-3">
            <div className="flex items-center text-xs font-bold border border-[#F05A0A] rounded-full overflow-hidden bg-white shadow-2xs">
              <button
                onClick={() => setLang('te')}
                className={`px-2.5 py-1 transition-colors cursor-pointer ${
                  lang === 'te' ? 'bg-[#F05A0A] text-white' : 'text-[#F05A0A] hover:bg-[#F05A0A]/10'
                }`}
              >
                తెలుగు
              </button>
              <span className="text-[#E8B973] select-none">|</span>
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 transition-colors cursor-pointer ${
                  lang === 'en' ? 'bg-[#F05A0A] text-white' : 'text-[#F05A0A] hover:bg-[#F05A0A]/10'
                }`}
              >
                EN
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* Menu Overlay / Drawer */}
      {menuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs flex items-start justify-start pt-16"
          onClick={() => setMenuOpen(false)}
        >
          <div 
            className="w-full max-w-sm bg-[#FFF9F0] border-r border-b border-[#E8B973] shadow-xl p-6 space-y-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-left duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E8B973]/30">
              <h3 className="font-bold text-[#F05A0A] text-lg font-telugu">Festival Menu</h3>
              <button 
                onClick={() => setMenuOpen(false)}
                className="text-[#2D1B11]/60 hover:text-[#F05A0A] p-1 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-1">
              {[
                { label: 'About Festival', id: 'about', icon: Info },
                { label: 'Organizers / Committee', id: 'organizers', icon: Users },
                { label: 'Location & Venue', id: 'location', icon: MapPin },
                { label: 'Instructions & Guidelines', id: 'instructions', icon: BookOpen },
                { label: 'Contact Details', id: 'contact', icon: Phone },
              ].map((m) => {
                const Icon = m.icon;
                const isSectionActive = activeSection === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => scrollToSection(m.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left font-medium transition-colors cursor-pointer ${
                      isSectionActive 
                        ? 'bg-[#F05A0A] text-white font-bold' 
                        : 'text-[#2D1B11] hover:bg-[#F05A0A]/10 hover:text-[#F05A0A]'
                    }`}
                  >
                    <Icon size={18} className={isSectionActive ? 'text-white' : 'text-[#F05A0A]'} />
                    <span>{m.label}</span>
                  </button>
                );
              })}

              <button
                onClick={() => scrollToSection('nimajjanam')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left font-bold transition-colors cursor-pointer ${
                  activeSection === 'nimajjanam'
                    ? 'bg-[#0284c7] text-white'
                    : 'text-[#0284c7] hover:bg-[#0284c7]/10'
                }`}
              >
                <span className="text-xl">🌊</span>
                <span>Maha Nimajjanam</span>
              </button>
            </div>

            <div className="pt-3 border-t border-[#E8B973]/30">
              <button
                onClick={handleShare}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-[#F05A0A] text-[#F05A0A] font-bold text-sm hover:bg-[#F05A0A] hover:text-white transition-all shadow-2xs cursor-pointer"
              >
                <Share2 size={16} />
                <span>{copiedToast ? 'Link Copied!' : 'Share Festival Link'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
