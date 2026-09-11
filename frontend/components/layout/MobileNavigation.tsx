'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Home, Calendar, Bell, Image as ImageIcon, Menu, X, Info, Users, MapPin, BookOpen, Phone, Share2, IndianRupee, Globe } from 'lucide-react';
import { festivalConfig } from '../../data/festival';
import { useLanguage } from '../../context/LanguageContext';

export default function MobileNavigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);
  const router = useRouter();
  const { lang, setLang, t } = useLanguage();

  const navigateToSection = (sectionId: string) => {
    setMenuOpen(false);
    const routes: Record<string, string> = {
      home: '/',
      days: '/days',
      updates: '/updates',
      gallery: '/gallery',
      nimajjanam: '/nimajjanam',
      wallet: '/money',
      money: '/money',
      about: '/#about',
      organizers: '/#organizers',
      location: '/#location',
      instructions: '/#instructions',
      contact: '/#contact',
    };
    if (routes[sectionId]) {
      if (['about', 'organizers', 'location', 'instructions', 'contact'].includes(sectionId) && typeof window !== 'undefined' && window.location.pathname === '/') {
        const el = document.getElementById(sectionId);
        if (el) {
          const headerOffset = 70;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          return;
        }
      }
      router.push(routes[sectionId]);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: lang === 'te' ? t.teluguTitle : festivalConfig.festivalName,
          text: `${lang === 'te' ? t.teluguTitle : festivalConfig.festivalName} - ${festivalConfig.villageName}`,
          url: window.location.href,
        });
      } catch {
        // cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2000);
    }
  };

  const navButtons = [
    { label: t.home, id: 'home', icon: Home },
    { label: t.days, id: 'days', icon: Calendar },
    { label: t.updates, id: 'updates', icon: Bell, badge: '1' },
    { label: t.gallery, id: 'gallery', icon: ImageIcon },
  ];

  return (
    <>
      {/* Fixed Mobile Bottom App Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#FFF9F0] border-t border-[#E8B973]/60 shadow-[0_-4px_16px_rgba(45,27,17,0.06)] pb-safe">
        <div className="flex justify-around items-center h-16 px-1 max-w-md mx-auto">
          {/* Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="flex flex-col items-center justify-center w-full h-full space-y-1 text-[#2D1B11]/70 hover:text-[#F05A0A] active:scale-95 transition-all cursor-pointer"
            aria-label="Open Menu"
          >
            <Menu size={20} className={menuOpen ? "text-[#F05A0A]" : ""} />
            <span className={`text-[10px] font-semibold ${menuOpen ? "text-[#F05A0A]" : ""}`}>{t.menu}</span>
          </button>

          {/* Dynamic App Bar Buttons with smooth scroll navigation */}
          {navButtons.map((btn) => {
            const Icon = btn.icon;

            return (
              <Link
                key={btn.id}
                href={btn.id === 'home' ? '/' : `/${btn.id}`}
                className="relative flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors active:scale-95 cursor-pointer text-[#2D1B11]/70 hover:text-[#F05A0A]"
              >
                <div className="relative z-10">
                  <Icon size={20} />
                  {btn.badge && (
                    <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 bg-red-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-xs">
                      {btn.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] tracking-tight relative z-10 font-medium">{btn.label}</span>
              </Link>
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
            className="bg-[#FFF9F0] rounded-t-3xl border-t border-[#E8B973] p-6 max-h-[85vh] overflow-y-auto space-y-4 animate-in slide-in-from-bottom duration-300 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-3 border-b border-[#E8B973]/40">
              <span className="font-bold text-[#F05A0A] text-lg font-telugu">{t.menuTitle}</span>
              <button 
                type="button"
                onClick={() => setMenuOpen(false)} 
                className="text-[#2D1B11]/70 hover:text-[#F05A0A] p-1.5 cursor-pointer"
              >
                <X size={22} />
              </button>
            </div>

            {/* Language Selector in Mobile Drawer */}
            <div className="p-3 bg-white rounded-xl border border-[#E8B973]/50 flex items-center justify-between shadow-2xs">
              <span className="text-xs font-bold text-[#2D1B11] flex items-center gap-1.5">
                <Globe size={15} className="text-[#F05A0A]" />
                <span>{t.selectLanguage}:</span>
              </span>
              <div className="flex items-center text-xs font-bold border border-[#F05A0A] rounded-full overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className={`px-3 py-1 transition-all cursor-pointer ${
                    lang === 'en' ? 'bg-[#F05A0A] text-white' : 'text-[#F05A0A] hover:bg-[#F05A0A]/10'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLang('te')}
                  className={`px-3 py-1 transition-all cursor-pointer ${
                    lang === 'te' ? 'bg-[#F05A0A] text-white' : 'text-[#F05A0A] hover:bg-[#F05A0A]/10'
                  }`}
                >
                  తెలుగు
                </button>
              </div>
            </div>

            {/* Drawer Menu Items */}
            <div className="space-y-1">
              {[
                { label: t.aboutMenu, id: 'about', icon: Info },
                { label: t.organizersMenu, id: 'organizers', icon: Users },
                { label: t.locationMenu, id: 'location', icon: MapPin },
                { label: t.instructionsMenu, id: 'instructions', icon: BookOpen },
                { label: t.contactMenu, id: 'contact', icon: Phone },
                { label: t.moneyMenu, id: 'money', icon: IndianRupee },
              ].map(m => {
                const Icon = m.icon;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => navigateToSection(m.id)}
                    className="w-full flex items-center gap-3.5 p-3 rounded-xl text-left text-sm font-semibold transition-colors cursor-pointer text-[#2D1B11] hover:bg-[#F05A0A]/10 hover:text-[#F05A0A] active:bg-[#F05A0A]/15"
                  >
                    <Icon size={19} className="text-[#F05A0A] shrink-0" />
                    <span>{m.label}</span>
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => navigateToSection('nimajjanam')}
                className="w-full flex items-center gap-3.5 p-3 rounded-xl text-left text-sm font-bold text-[#0284c7] hover:bg-[#0284c7]/10 active:bg-[#0284c7]/15 cursor-pointer"
              >
                <span className="text-lg">🌊</span>
                <span>{t.nimajjanam}</span>
              </button>
            </div>

            <div className="pt-2 border-t border-[#E8B973]/40">
              <button
                type="button"
                onClick={handleShare}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-[#F05A0A] text-[#F05A0A] font-bold text-sm hover:bg-[#F05A0A] hover:text-white transition-all shadow-2xs cursor-pointer"
              >
                <Share2 size={16} />
                <span>{copiedToast ? t.linkCopied : t.shareLink}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
