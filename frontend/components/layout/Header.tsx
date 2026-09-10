'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { festivalConfig } from '../../data/festival';
import { useLanguage } from '../../context/LanguageContext';

export default function Header() {
  const pathname = usePathname();
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
          
          {/* Left: Branding */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-left cursor-pointer group"
            >
              <span className="text-lg sm:text-xl">🕉️</span>
              <span className="font-bold text-[#F05A0A] text-xs sm:text-base font-telugu group-hover:opacity-85 transition-opacity truncate max-w-[160px] sm:max-w-none">
                {lang === 'te' ? t.teluguTitle : festivalConfig.festivalName}
              </span>
            </Link>
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

    </>
  );
}
