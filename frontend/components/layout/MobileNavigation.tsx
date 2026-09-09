'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useActiveSection } from '../../hooks/useActiveSection';
import { Home, Calendar, Bell, Image as ImageIcon, Menu, X, Info, Users, MapPin, BookOpen, Phone, Share2 } from 'lucide-react';
import { festivalConfig } from '../../data/festival';

export default function MobileNavigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

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
        // cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2000);
    }
  };

  const navButtons = [
    { label: 'Home', id: 'home', icon: Home },
    { label: 'Days', id: 'days', icon: Calendar },
    { label: 'Updates', id: 'updates', icon: Bell, badge: '1' },
    { label: 'Gallery', id: 'gallery', icon: ImageIcon },
  ];

  return (
    <>
      {/* Fixed Mobile Bottom App Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#FFF9F0] border-t border-[#E8B973]/60 shadow-[0_-4px_16px_rgba(45,27,17,0.06)] pb-safe">
        <div className="flex justify-around items-center h-16 px-1 max-w-md mx-auto">
          {/* Menu Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="flex flex-col items-center justify-center w-full h-full space-y-1 text-[#2D1B11]/70 hover:text-[#F05A0A] active:scale-95 transition-all cursor-pointer"
            aria-label="Open Menu"
          >
            <Menu size={20} className={menuOpen ? "text-[#F05A0A]" : ""} />
            <span className={`text-[10px] font-semibold ${menuOpen ? "text-[#F05A0A]" : ""}`}>Menu</span>
          </button>

          {/* Dynamic App Bar Buttons with animated indicator */}
          {navButtons.map((btn) => {
            const Icon = btn.icon;
            const isActive = currentTab === btn.id;

            return (
              <button
                key={btn.id}
                onClick={() => scrollToSection(btn.id)}
                className={`relative flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors active:scale-95 cursor-pointer ${
                  isActive ? "text-[#F05A0A] font-bold" : "text-[#2D1B11]/70 hover:text-[#F05A0A]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="mobileActiveIndicator"
                    className="absolute -top-[1px] w-8 h-1 bg-[#F05A0A] rounded-b-md z-20"
                    transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                  />
                )}
                <div className="relative z-10">
                  <Icon size={20} />
                  {btn.badge && (
                    <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 bg-red-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-xs">
                      {btn.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] tracking-tight relative z-10">{btn.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Full Screen / Drawer Menu for Mobile */}
      {menuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-[60] bg-black/40 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-200"
          onClick={() => setMenuOpen(false)}
        >
          <div 
            className="bg-[#FFF9F0] rounded-t-3xl border-t border-[#E8B973] p-6 max-h-[80vh] overflow-y-auto space-y-3 animate-in slide-in-from-bottom duration-300 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-3 border-b border-[#E8B973]/40">
              <span className="font-bold text-[#F05A0A] text-lg font-telugu">Festival Menu</span>
              <button 
                onClick={() => setMenuOpen(false)} 
                className="text-[#2D1B11]/70 hover:text-[#F05A0A] p-1.5 cursor-pointer"
              >
                <X size={22} />
              </button>
            </div>

            <div className="space-y-1 pt-1">
              {[
                { label: 'About Festival', id: 'about', icon: Info },
                { label: 'Organizers & Committee', id: 'organizers', icon: Users },
                { label: 'Location & Directions', id: 'location', icon: MapPin },
                { label: 'Instructions & Guidelines', id: 'instructions', icon: BookOpen },
                { label: 'Contact Details', id: 'contact', icon: Phone },
              ].map(m => {
                const Icon = m.icon;
                const isSectionActive = activeSection === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => scrollToSection(m.id)}
                    className={`w-full flex items-center gap-3.5 p-3 rounded-xl text-left text-[15px] font-medium transition-colors cursor-pointer ${
                      isSectionActive 
                        ? 'bg-[#F05A0A] text-white font-bold' 
                        : 'text-[#2D1B11] hover:bg-[#F05A0A]/10 active:bg-[#F05A0A]/15'
                    }`}
                  >
                    <Icon size={20} className={isSectionActive ? 'text-white' : 'text-[#F05A0A]'} />
                    <span>{m.label}</span>
                  </button>
                );
              })}

              <button
                onClick={() => scrollToSection('nimajjanam')}
                className={`w-full flex items-center gap-3.5 p-3 rounded-xl text-left text-[15px] font-bold transition-colors cursor-pointer ${
                  activeSection === 'nimajjanam'
                    ? 'bg-[#0284c7] text-white'
                    : 'text-[#0284c7] bg-[#e0f2fe]/60 hover:bg-[#e0f2fe]'
                }`}
              >
                <span className="text-xl">🌊</span>
                <span>Maha Nimajjanam</span>
              </button>
            </div>

            <div className="pt-3">
              <button
                onClick={handleShare}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-[#F05A0A] text-[#F05A0A] font-bold text-sm bg-white shadow-xs cursor-pointer hover:bg-[#F05A0A] hover:text-white transition-colors"
              >
                <Share2 size={18} />
                <span>{copiedToast ? 'Link Copied!' : 'Share Festival Link'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
