'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X, Share2, Info, Users, MapPin, BookOpen, Phone, IndianRupee, Globe } from 'lucide-react';
import { festivalConfig } from '../../data/festival';
import { useLanguage } from '../../context/LanguageContext';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { lang, setLang, t } = useLanguage();

  const [activeTab, setActiveTab] = useState<string>('home');

  // Determine current active route tab if not on '/'
  const getRouteTab = () => {
    if (pathname.startsWith('/days')) return 'days';
    if (pathname.startsWith('/updates')) return 'updates';
    if (pathname.startsWith('/gallery')) return 'gallery';
    if (pathname.startsWith('/nimajjanam')) return 'nimajjanam';
    if (pathname.startsWith('/money')) return 'wallet';
    return 'home';
  };

  const routeTab = getRouteTab();
  const currentTab = pathname === '/' ? activeTab : routeTab;

  // Scroll spy to detect current visible section on the single page
  useEffect(() => {
    if (pathname !== '/') return;

    const sections = ['home', 'days', 'updates', 'gallery', 'nimajjanam'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveTab(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

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
    };
    if (routes[sectionId]) router.push(routes[sectionId]);
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
        // user cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2000);
    }
  };

  const navItems = [
    { label: t.home, id: 'home' },
    { label: t.days, id: 'days' },
    { label: t.updates, id: 'updates' },
    { label: t.gallery, id: 'gallery' },
    { label: t.nimajjanam, id: 'nimajjanam' },
    { label: t.wallet, id: 'wallet' },
  ];

  return (
    <>
      {/* Pinned Global Header with Top Orange Border Accent */}
      <header className="sticky top-0 z-50 w-full border-t-4 border-[#F05A0A] border-b border-[#E8B973]/40 bg-[#FFF9F0] shadow-[0_2px_10px_rgba(240,90,10,0.06)]">
        <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-3 sm:px-4">
          
          {/* Left: Menu trigger & Branding */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              type="button"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-[#E8B973]/60 bg-white text-[#2D1B11] font-semibold text-xs sm:text-sm hover:border-[#F05A0A] hover:text-[#F05A0A] transition-all shadow-xs cursor-pointer active:scale-95"
              aria-label="Toggle Menu"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
              <span>{t.menu}</span>
            </button>

            <button 
              onClick={() => navigateToSection('home')}
              type="button"
              className="flex items-center gap-1.5 text-left cursor-pointer group"
            >
              <span className="text-lg sm:text-xl">🕉️</span>
              <span className="font-bold text-[#F05A0A] text-xs sm:text-base font-telugu group-hover:opacity-85 transition-opacity truncate max-w-[160px] sm:max-w-none">
                {lang === 'te' ? t.teluguTitle : festivalConfig.festivalName}
              </span>
            </button>
          </div>

          {/* Desktop Center Navigation Tabs with Animated Spring Indicator */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-white/60 border border-[#E8B973]/30">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;

              return (
                <Link
                  key={item.id}
                  href={item.id === 'home' ? '/' : item.id === 'wallet' ? '/money' : `/${item.id}`}
                  className="relative px-4 py-1.5 rounded-full text-sm font-semibold transition-colors cursor-pointer select-none"
                  aria-current={isActive ? 'page' : undefined}
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
                </Link>
              );
            })}
          </nav>

          {/* Right: Language Control (English Default) */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center text-xs font-bold border-2 border-[#F05A0A] rounded-full overflow-hidden bg-white shadow-2xs">
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 transition-all cursor-pointer select-none ${
                  lang === 'en' 
                    ? 'bg-[#F05A0A] text-white font-black' 
                    : 'text-[#F05A0A] hover:bg-[#F05A0A]/10 font-bold'
                }`}
                aria-label="Switch to English"
              >
                EN
              </button>
              <span className="text-[#E8B973] select-none">|</span>
              <button
                type="button"
                onClick={() => setLang('te')}
                className={`px-2.5 py-1 transition-all cursor-pointer select-none ${
                  lang === 'te' 
                    ? 'bg-[#F05A0A] text-white font-black' 
                    : 'text-[#F05A0A] hover:bg-[#F05A0A]/10 font-bold'
                }`}
                aria-label="Switch to Telugu"
              >
                తెలుగు
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* Menu Overlay / Drawer */}
      {menuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs flex items-start justify-start pt-16 animate-in fade-in duration-200"
          onClick={() => setMenuOpen(false)}
        >
          <div 
            className="w-full max-w-sm bg-[#FFF9F0] border-r border-b border-[#E8B973] shadow-2xl p-6 space-y-4 max-h-[88vh] overflow-y-auto animate-in slide-in-from-left duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E8B973]/30">
              <h3 className="font-bold text-[#F05A0A] text-lg font-telugu">{t.menuTitle}</h3>
              <button 
                type="button"
                onClick={() => setMenuOpen(false)}
                className="text-[#2D1B11]/60 hover:text-[#F05A0A] p-1 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Language Selection inside Drawer */}
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

            {/* Navigation Options with Instant Smooth Scrolling */}
            <div className="space-y-1">
              {[
                { label: t.aboutMenu, id: 'about', icon: Info },
                { label: t.organizersMenu, id: 'organizers', icon: Users },
                { label: t.locationMenu, id: 'location', icon: MapPin },
                { label: t.instructionsMenu, id: 'instructions', icon: BookOpen },
                { label: t.contactMenu, id: 'contact', icon: Phone },
                { label: t.moneyMenu, id: 'money', icon: IndianRupee },
              ].map((m) => {
                const Icon = m.icon;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => navigateToSection(m.id)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left font-medium transition-colors cursor-pointer text-[#2D1B11] hover:bg-[#F05A0A]/10 hover:text-[#F05A0A] active:bg-[#F05A0A]/15"
                  >
                    <Icon size={18} className="text-[#F05A0A] shrink-0" />
                    <span className="font-semibold text-sm">{m.label}</span>
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => navigateToSection('nimajjanam')}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left font-bold transition-colors cursor-pointer text-[#0284c7] hover:bg-[#0284c7]/10 active:bg-[#0284c7]/15"
              >
                <span className="text-xl">🌊</span>
                <span>{t.nimajjanam}</span>
              </button>
            </div>

            <div className="pt-3 border-t border-[#E8B973]/30">
              <button
                type="button"
                onClick={handleShare}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-[#F05A0A] text-[#F05A0A] font-bold text-sm hover:bg-[#F05A0A] hover:text-white transition-all shadow-2xs cursor-pointer"
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
