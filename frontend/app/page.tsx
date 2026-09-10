'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { festivalConfig } from '../data/festival';
import { galleryItems } from '../data/gallery';
import { useLanguage } from '../context/LanguageContext';
import { defaultFinanceSummary, financeSnapshot, subscribeToFinance } from '../lib/finance';
import { announcementsSnapshot, subscribeToAnnouncements, StoredAnnouncement } from '../lib/announcements';
import { 
  ArrowRight, 
  Bell, 
  MapPin, 
  Play, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  Phone, 
  Mail, 
  Navigation,
  IndianRupee
} from 'lucide-react';

export default function Home() {
  const pathname = usePathname();
  const { lang, t, days, instructions, committee } = useLanguage();
  const announcementsData = useSyncExternalStore(
    subscribeToAnnouncements,
    announcementsSnapshot,
    announcementsSnapshot,
  );
  const liveAnnouncements = JSON.parse(announcementsData) as StoredAnnouncement[];

  // Each primary navigation tab renders only its matching section.
  const showSection = (section: string) => {
    if (pathname === '/') {
      return ['home', 'about', 'organizers', 'location', 'instructions', 'contact'].includes(section);
    }
    if (pathname === '/days') return section === 'days' || section === 'day-details';
    if (pathname === '/updates') return section === 'updates';
    if (pathname === '/gallery') return section === 'gallery';
    if (pathname === '/nimajjanam') return section === 'nimajjanam';
    if (pathname === '/money') return section === 'money';
    return true;
  };

  // Scroll to section by ID with header offset
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 70;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      history.pushState(null, '', `/#${id}`);
    }
  };

  // Handle hash on initial mount or route changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setTimeout(() => {
          scrollToSection(hash);
        }, 150);
      } else if (pathname !== '/') {
        const routeSection = pathname.replace('/', '');
        setTimeout(() => {
          scrollToSection(routeSection);
        }, 150);
      }
    }
  }, [pathname]);

  // 1. Day Selection State (defaults to Day 1 as requested)
  const currentDay = days.find((day) => day.status === 'current') ?? days[0];
  const [selectedDayId, setSelectedDayId] = useState<string>(currentDay?.id || 'day-1');
  const selectedDay = days.find((day) => day.id === selectedDayId) ?? currentDay ?? days[0];

  // 2. Working Push Notification Subscription State
  const [isSubscribed, setIsSubscribed] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('festival_push_subscribed') === 'true'
      && 'Notification' in window
      && Notification.permission === 'granted';
  });
  const [notificationMsg, setNotificationMsg] = useState<string>('');

  const handleSubscribeToggle = async () => {
    if (typeof window === 'undefined') return;

    if (!('Notification' in window)) {
      setNotificationMsg(t.notificationUnsupported);
      setTimeout(() => setNotificationMsg(''), 4000);
      return;
    }

    if (isSubscribed) {
      setIsSubscribed(false);
      localStorage.setItem('festival_push_subscribed', 'false');
      setNotificationMsg(t.notificationUnsubscribed);
      setTimeout(() => setNotificationMsg(''), 3000);
      return;
    }

    let permission = Notification.permission;
    if (permission === 'default') {
      permission = await Notification.requestPermission();
    }

    if (permission === 'granted') {
      setIsSubscribed(true);
      localStorage.setItem('festival_push_subscribed', 'true');
      setNotificationMsg(t.notificationSuccess);
      setTimeout(() => setNotificationMsg(''), 4000);

      try {
        new Notification(lang === 'te' ? t.teluguTitle : festivalConfig.festivalName, {
          body: t.notificationWelcome,
          icon: '/images/festival/ganesh-idol.jpg',
        });
      } catch (err) {
        console.log('Notification trigger note:', err);
      }
    } else if (permission === 'denied') {
      setNotificationMsg(t.notificationBlocked);
      setTimeout(() => setNotificationMsg(''), 5000);
    }
  };

  // 3. Gallery Category Filter & Lightbox State
  const [galleryFilter, setGalleryFilter] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState<boolean>(false);

  // 4. Nimajjanam Live Countdown State (Mock: 02:14:32)
  const countdown = { hrs: 2, min: 14, sec: 32 };

  // 5. Money & Budget Summary Figures
  const financeSummary = useSyncExternalStore(
    subscribeToFinance,
    financeSnapshot,
    () => JSON.stringify(defaultFinanceSummary),
  );
  const { donations: donationTotal, expenses: expenseTotal } = JSON.parse(financeSummary);
  const balanceTotal = donationTotal - expenseTotal;

  const handleSelectDay = (dayId: string) => {
    setSelectedDayId(dayId);
    scrollToSection('day-details');
  };

  const filteredGallery = galleryFilter === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === galleryFilter);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') {
        setLightboxIndex(prev => (prev === null ? null : prev === 0 ? filteredGallery.length - 1 : prev - 1));
      }
      if (e.key === 'ArrowRight') {
        setLightboxIndex(prev => (prev === null ? null : prev === filteredGallery.length - 1 ? 0 : prev + 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredGallery.length]);

  const googleMapsDirectionsUrl = "https://www.google.com/maps/dir/?api=1&destination=64QC%2BV49%2C+Suryaraopet%2C+near%2C+Machilipatnam%2C+Andhra+Pradesh+521366";

  return (
    <div className="flex flex-col min-h-screen bg-[#FFF9F0] text-[#2D1B11]">

      {/* ========================================================= */}
      {/* 1. HERO SECTION (#home) - PPT Slide 3 Split Layout        */}
      {/* ========================================================= */}
      {showSection('home') && (
        <section id="home" className="pt-6 sm:pt-10 pb-12 sm:pb-16 px-4 md:px-8 max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* Left Column: 3 Compact Outlined Cards */}
            <div className="flex flex-col justify-between space-y-6">
              
              {/* Card 1: Hero Header */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8B973]/40 shadow-xs hover:border-[#F05A0A]/40 transition-colors">
                <span className="text-xs font-bold text-[#F05A0A] uppercase tracking-wider block mb-2 font-sans">
                  {t.heroBadge}
                </span>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2D1B11] font-telugu leading-snug">
                  {lang === 'te' ? t.festivalTitle : t.teluguTitle}
                </h1>
                <p className="text-base sm:text-lg font-semibold text-[#2D1B11]/75 mt-2">
                  [ {t.villageName} ]
                </p>
              </div>

              {/* Card 2: Live Progress Bar */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8B973]/40 shadow-xs">
                <span className="text-xs font-bold text-[#F05A0A] uppercase tracking-wider block mb-2 font-sans">
                  {t.liveStatus}
                </span>
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-block w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="font-bold text-sm sm:text-base text-[#2D1B11] tracking-wide">
                    {t.liveStatus} - {t.dayWord} {currentDay.dayNumber} / {days.length}
                  </span>
                </div>
                <div className="w-full bg-[#FFF9F0] rounded-full h-3 overflow-hidden border border-[#E8B973]/30">
                  <div 
                    className="bg-[#F05A0A] h-3 rounded-full transition-all duration-700" 
                    style={{ width: `${(currentDay.dayNumber / days.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Card 3: Today's Quick Schedule */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8B973]/40 shadow-xs">
                <span className="text-xs font-bold text-[#F05A0A] uppercase tracking-wider block mb-4 font-sans">
                  {t.todayQuickSchedule}
                </span>
                <div className="space-y-3 mb-6">
                  {currentDay.events.slice(0, 4).map((event) => (
                    <div key={event.id} className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base">
                      <span className="w-20 sm:w-22 font-bold text-[#F05A0A] shrink-0 font-mono text-xs sm:text-sm">
                        {event.time}
                      </span>
                      <span className="font-medium text-[#2D1B11] flex items-center gap-1.5 truncate">
                        {event.icon && <span>{event.icon}</span>}
                        <span>{event.name}</span>
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/days"
                  className="w-full bg-[#F05A0A] hover:bg-[#D04A08] text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer active:scale-98 text-sm sm:text-base"
                >
                  <span>{t.viewScheduleBtn}</span>
                  <ArrowRight size={18} />
                </Link>
              </div>

            </div>

            {/* Right Column: Large Ganesh Idol Image Container */}
            <div className="flex items-center justify-center">
              <div className="relative w-full h-[380px] sm:h-[480px] lg:h-full min-h-[380px] rounded-3xl overflow-hidden border-2 border-[#E8B973]/60 bg-[#E8B973]/10 shadow-sm flex items-center justify-center">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-103"
                  style={{ backgroundImage: `url('/images/festival/home-ganesh-idol.jpeg')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D1B11]/40 via-transparent to-transparent pointer-events-none"></div>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* 2. 7-DAY JOURNEY SECTION (#days) - PPT Slide 4            */}
      {/* ========================================================= */}
      {showSection('days') && (
        <section id="days" className="py-16 px-4 md:px-8 max-w-6xl mx-auto w-full border-t border-[#E8B973]/30">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F05A0A] font-telugu mb-3">
              {t.journeyTitle}
            </h2>
            <p className="text-sm sm:text-base text-[#2D1B11]/70 max-w-2xl mx-auto">
              {t.journeySubtitle}
            </p>
          </div>

          {/* Horizontal Timeline as per PPT Slide 4 (Day 1 as Today) */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8B973]/40 shadow-xs mb-10 overflow-x-auto">
            <div className="min-w-[650px] flex items-center justify-between relative px-4 py-8">
              
              {/* Background connecting bar */}
              <div className="absolute top-1/2 left-8 right-8 h-1 bg-[#E8B973]/50 -translate-y-1/2 z-0"></div>

              {/* Stage 1: Day 1 (Today) */}
              <div className="relative z-10 flex flex-col items-center text-center w-48">
                <span className="text-xs font-bold text-green-600 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full mb-3 flex items-center gap-1 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  {t.todayStage}
                </span>
                <div className="w-10 h-10 rounded-full bg-[#F05A0A] border-4 border-white flex items-center justify-center mb-2 shadow-md">
                  <span className="w-3 h-3 rounded-full bg-white"></span>
                </div>
                <span className="font-bold text-base text-[#F05A0A]">{t.todayLabel}</span>
              </div>

              {/* Stage 2: Days 2–6 */}
              <div className="relative z-10 flex flex-col items-center text-center w-48">
                <div className="w-9 h-9 rounded-full bg-white border-4 border-[#E8B973] flex items-center justify-center mb-3 shadow-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E8B973]"></span>
                </div>
                <span className="font-bold text-sm text-[#F05A0A]">{t.upcomingStage}</span>
                <span className="text-xs text-[#2D1B11]/60 mt-1 leading-tight">
                  {t.upcomingNote}
                </span>
              </div>

              {/* Stage 3: Day 7 Maha Nimajjanam */}
              <div className="relative z-10 flex flex-col items-center text-center w-44">
                <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full mb-3 flex items-center gap-1 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  {t.mahaNimajjanamStage}
                </span>
                <div className="w-9 h-9 rounded-full bg-white border-4 border-red-500 flex items-center justify-center mb-2 shadow-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                </div>
                <span className="font-bold text-sm text-red-600">{t.finalDayLabel}</span>
              </div>

            </div>
          </div>

          {/* Interactive Day Selection Chips for Instant Updates */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 pt-1 no-scrollbar">
            {days.map((day) => {
              const isSelected = selectedDayId === day.id;
              const isCurrent = day.status === 'current';
              const isFinal = day.dayNumber === days.length;

              return (
                <button
                  key={day.id}
                  type="button"
                  onClick={() => handleSelectDay(day.id)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer border flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#F05A0A] text-white border-[#F05A0A] shadow-sm'
                      : isCurrent
                      ? 'bg-green-50 text-green-800 border-green-300 hover:bg-green-100'
                      : isFinal
                      ? 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                      : 'bg-white text-[#2D1B11]/70 border-[#E8B973]/40 hover:border-[#F05A0A]/50 hover:bg-[#FFF9F0]'
                  }`}
                >
                  <span>{lang === 'te' ? `${day.dayNumber}వ రోజు` : `Day ${day.dayNumber}`}</span>
                  {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>}
                  {isFinal && <span className="text-xs">🌊</span>}
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* 3. DAY DETAILS SECTION (#day-details) - PPT Slide 5        */}
      {/* ========================================================= */}
      {showSection('day-details') && (
        <section id="day-details" className="py-16 px-4 md:px-8 max-w-6xl mx-auto w-full border-t border-[#E8B973]/30">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F05A0A] font-telugu mb-2">
              {t.dayDetailsHeading} ({selectedDay.title})
            </h2>
            <p className="text-sm sm:text-base text-[#2D1B11]/70">
              {lang === 'te'
                ? `${selectedDay.dayNumber}${t.dayNumberSuffix} (${selectedDay.date}) ${t.dayScheduleIntro}`
                : `${t.dayScheduleIntro} ${selectedDay.dayNumber} (${selectedDay.date})`}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Column: Day Theme & Schedule Block */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8B973]/40 shadow-xs">
              <h3 className="text-lg sm:text-xl font-bold text-[#F05A0A] mb-4 pb-2 border-b border-[#E8B973]/20">
                {t.dayThemeBlock}
              </h3>
              
              <div className="mb-6">
                <span className="font-bold text-[#F05A0A] text-base sm:text-lg block">
                  {t.themeLabel}: {selectedDay.title}
                </span>
                <p className="text-xs sm:text-sm text-[#2D1B11]/70 mt-1">
                  {selectedDay.shortDescription}
                </p>
              </div>

              <div className="space-y-4">
                {selectedDay.events.map((evt) => (
                  <div key={evt.id} className="flex items-start gap-3 py-1.5 border-b border-[#E8B973]/10 last:border-0">
                    <span className="text-[#F05A0A] text-base">•</span>
                    <span className="font-bold text-xs sm:text-sm text-[#F05A0A] w-24 shrink-0 font-mono pt-0.5">
                      {evt.time}
                    </span>
                    <span className="font-medium text-sm sm:text-base text-[#2D1B11] flex items-center gap-2">
                      {evt.icon && <span>{evt.icon}</span>}
                      <span>{evt.name}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Day Media & Updates Block */}
            <div className="flex flex-col space-y-6">
              
              {/* Sub-card 1: Announcements */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8B973]/40 shadow-xs">
                <h4 className="text-base sm:text-lg font-bold text-[#F05A0A] mb-2">
                    {lang === 'te' ? `${selectedDay.dayNumber}${t.dayNumberSuffix} ${t.dayAnnouncements}` : `Day ${selectedDay.dayNumber} ${t.dayAnnouncements}`}
                </h4>
                <p className="text-sm sm:text-base text-[#2D1B11]/80 leading-relaxed">
                  {selectedDay.announcement}
                </p>
              </div>

              {/* Sub-card 2: Photo Grid */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8B973]/40 shadow-xs flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-base sm:text-lg font-bold text-[#F05A0A]">
                    {lang === 'te' ? `${selectedDay.dayNumber}${t.dayNumberSuffix} ${t.dayPhotoGrid}` : `Day ${selectedDay.dayNumber} ${t.dayPhotoGrid}`}
                  </h4>
                  <span className="text-xs text-[#2D1B11]/50 font-medium">{t.lightboxHint}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { img: '/images/festival/ganesh-idol.jpg', label: lang === 'te' ? 'అలంకరణ' : 'Alankaram' },
                    { img: '/images/festival/maha_aarti_1788872944567.jpg', label: lang === 'te' ? 'పూజా హారతి' : 'Pooja Thali' },
                    { img: '/images/festival/hero_background_1788872872047.jpg', label: lang === 'te' ? 'మండపం' : 'Mandapam' },
                    { img: '/images/festival/festival_background_1788872889056.jpg', label: lang === 'te' ? 'వేడుక' : 'Celebration' },
                    { img: '/images/festival/procession_1788872924202.jpg', label: lang === 'te' ? 'భక్తులు' : 'Devotees' },
                    { img: '/images/festival/nimajjanam_background_1788872905368.jpg', label: lang === 'te' ? 'ఆరతి దర్శనం' : 'Aarti Darshan' }
                  ].map((thumb, idx) => (
                    <div
                      key={idx}
                      onClick={() => setLightboxIndex(idx % filteredGallery.length)}
                      className="group relative aspect-square rounded-2xl overflow-hidden border border-[#E8B973]/30 bg-[#FFF9F0] cursor-pointer hover:border-[#F05A0A] transition-all shadow-2xs"
                    >
                      <div 
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-108 transition-transform duration-500"
                        style={{ backgroundImage: `url(${thumb.img})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                        <span className="text-[11px] font-bold text-white leading-tight">{thumb.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* 4. LIVE UPDATES & NOTIFICATIONS (#updates) - PPT Slide 6  */}
      {/* ========================================================= */}
      {showSection('updates') && (
        <section id="updates" className="py-16 px-4 md:px-8 max-w-6xl mx-auto w-full border-t border-[#E8B973]/30">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F05A0A] font-telugu mb-2">
              {t.updatesHeading}
            </h2>
            <p className="text-sm sm:text-base text-[#2D1B11]/70">
              {t.updatesSubheading}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* Left Side: Update Cards & Push Button */}
            <div className="space-y-5 flex flex-col justify-between">
              
              {liveAnnouncements.map((announcement, index) => {
                const isEmergency = announcement.type === 'emergency';
                const isImportant = announcement.type === 'important';
                return (
                  <div key={announcement.id} className={`bg-white rounded-2xl p-6 border-l-4 ${isEmergency ? 'border-l-red-500' : 'border-l-[#F05A0A]'} border border-[#E8B973]/40 shadow-xs`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`font-bold ${isEmergency ? 'text-red-600' : 'text-[#F05A0A]'} text-sm tracking-wide flex items-center gap-1.5`}>
                        {isEmergency && <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>}
                        {isEmergency ? t.liveUpdateBadge : isImportant ? t.programChangeBadge : 'Update'}
                      </span>
                      <span className="text-xs text-[#2D1B11]/50 font-medium">{announcement.timestamp}</span>
                    </div>
                    <p className={`${isEmergency || index === 0 ? 'font-bold text-base sm:text-lg' : 'font-semibold text-sm sm:text-base'} text-[#2D1B11]/90 leading-relaxed`}>
                      {announcement.title && <span className="block text-[#F05A0A] mb-1">{announcement.title}</span>}
                      {announcement.message}
                    </p>
                  </div>
                );
              })}

              {/* Real Working Push Notification Button */}
              <div>
                <button
                  type="button"
                  onClick={handleSubscribeToggle}
                  className={`w-full py-3.5 px-6 rounded-2xl border-2 font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-xs cursor-pointer active:scale-98 ${
                    isSubscribed 
                      ? 'bg-green-50 border-green-500 text-green-700 hover:bg-green-100' 
                      : 'bg-white border-[#F05A0A] text-[#F05A0A] hover:bg-[#F05A0A] hover:text-white'
                  }`}
                >
                  {isSubscribed ? <CheckCircle size={20} /> : <Bell size={20} />}
                  <span>{isSubscribed ? t.subscribedBtn : t.subscribeBtn}</span>
                </button>
                {notificationMsg && (
                  <p className="text-xs text-center mt-2 font-semibold text-[#F05A0A] transition-all">
                    {notificationMsg}
                  </p>
                )}
              </div>

            </div>

            {/* Right Side: Liquid Gold Abstract Image Card from PPT Slide 6 */}
            <div className="rounded-3xl overflow-hidden border border-[#E8B973]/50 shadow-sm relative min-h-[260px] lg:min-h-[300px] bg-black">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('/images/festival/hero_background_1788872872047.jpg')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                <span className="text-white text-sm font-semibold tracking-wide">
                  {t.mandapamIllumination}
                </span>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* 5. IMMERSIVE GALLERY & VIDEOS (#gallery) - PPT Slide 7    */}
      {/* ========================================================= */}
      {showSection('gallery') && (
        <section id="gallery" className="py-16 px-4 md:px-8 max-w-6xl mx-auto w-full border-t border-[#E8B973]/30">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F05A0A] font-telugu mb-2">
              {t.galleryHeading}
            </h2>
            <p className="text-sm sm:text-base text-[#2D1B11]/70">
              {t.gallerySubheading}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
            {['All', 'Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 7'].map((filter) => {
              const filterLabel = filter === 'All' 
                ? t.allFilter 
                : lang === 'te' 
                ? `${filter.replace('Day ', '')}వ రోజు` 
                : filter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setGalleryFilter(filter)}
                  className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                    galleryFilter === filter
                      ? 'bg-[#F05A0A] text-white shadow-xs'
                      : 'bg-white border border-[#E8B973]/40 text-[#2D1B11]/70 hover:border-[#F05A0A]/50 hover:bg-[#FFF9F0]'
                  }`}
                >
                  {filterLabel}
                </button>
              );
            })}
          </div>

          {/* 3 Main Highlight Visual Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Day 1: Consecration */}
            <div 
              onClick={() => setLightboxIndex(0)}
              className="group bg-white rounded-3xl overflow-hidden border border-[#E8B973]/40 shadow-xs hover:border-[#F05A0A] transition-all cursor-pointer flex flex-col"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-black/5">
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url('/images/festival/ganesh-idol.jpg')` }}
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-bold text-sm sm:text-base text-[#2D1B11] group-hover:text-[#F05A0A] transition-colors">
                  {lang === 'te' ? '1వ రోజు: మూర్తి స్థాపన & ప్రాణప్రతిష్ఠ' : 'Day 1: Consecration'}
                </h3>
              </div>
            </div>

            {/* Card 2: Day 2: Puja & Aarti */}
            <div 
              onClick={() => setLightboxIndex(1)}
              className="group bg-white rounded-3xl overflow-hidden border border-[#E8B973]/40 shadow-xs hover:border-[#F05A0A] transition-all cursor-pointer flex flex-col"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-black/5">
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url('/images/festival/maha_aarti_1788872944567.jpg')` }}
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-bold text-sm sm:text-base text-[#2D1B11] group-hover:text-[#F05A0A] transition-colors">
                  {lang === 'te' ? '2వ రోజు: పూజ & మహా ఆరతి' : 'Day 2: Puja & Aarti'}
                </h3>
              </div>
            </div>

            {/* Card 3: Nimajjanam Video with Play Icon */}
            <div 
              onClick={() => setVideoModalOpen(true)}
              className="group bg-white rounded-3xl overflow-hidden border border-[#E8B973]/40 shadow-xs hover:border-[#F05A0A] transition-all cursor-pointer flex flex-col"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-black/5">
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url('/images/festival/procession_1788872924202.jpg')` }}
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                  <div className="w-14 h-14 rounded-full bg-white/90 text-[#F05A0A] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play size={26} className="ml-1 fill-[#F05A0A]" />
                  </div>
                </div>
              </div>
              <div className="p-4 text-center">
                <h3 className="font-bold text-sm sm:text-base text-[#2D1B11] group-hover:text-[#F05A0A] transition-colors">
                  {lang === 'te' ? 'నిమజ్జనం వీడియో' : 'Nimajjanam Video'}
                </h3>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* 6. MAHA NIMAJJANAM (#nimajjanam) - PPT Slide 8            */}
      {/* ========================================================= */}
      {showSection('nimajjanam') && (
        <section id="nimajjanam" className="py-16 px-4 md:px-8 max-w-6xl mx-auto w-full border-t border-[#E8B973]/30">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0c4a6e] font-telugu mb-2">
              {t.nimajjanamHeading}
            </h2>
            <p className="text-sm sm:text-base text-[#0c4a6e]/70 font-medium">
              {t.nimajjanamSubheading}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* Left: Large Digital Countdown */}
            <div className="bg-[#e0f2fe]/60 border border-[#bae6fd] rounded-3xl p-8 sm:p-12 text-center shadow-xs flex flex-col items-center justify-center">
              <div className="text-5xl sm:text-6xl md:text-7xl font-bold text-[#F05A0A] font-mono tracking-tight mb-2">
                {String(countdown.hrs).padStart(2, '0')}:{String(countdown.min).padStart(2, '0')}:{String(countdown.sec).padStart(2, '0')}
              </div>
              <div className="text-xs sm:text-sm font-bold tracking-[0.25em] text-[#0c4a6e]/70 uppercase mb-3">
                {t.countdownUnits}
              </div>
              <div className="text-base sm:text-lg font-bold text-[#0c4a6e]">
                {t.untilProcession}
              </div>
            </div>

            {/* Right: Route Map Image & Safety Instructions */}
            <div className="space-y-6">
              
              {/* Card 1: Procession Route Map with Dedicated SVG Graphic */}
              <div className="bg-white rounded-3xl p-6 border border-[#E8B973]/40 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base sm:text-lg font-bold text-[#F05A0A] flex items-center gap-1.5">
                    <span>📍</span> {t.routeMapHeading}
                  </h3>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-50 text-[#F05A0A] border border-orange-200">
                    {t.mapDistance}
                  </span>
                </div>

                <div className="rounded-2xl overflow-hidden border border-[#E8B973]/40 shadow-xs bg-[#FFF9F0]">
                  <img 
                    src="/images/festival/route-map.svg" 
                    alt={t.mapAlt}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <p className="text-xs text-[#2D1B11]/60 mt-3 flex items-center gap-1">
                  <MapPin size={14} className="text-[#0284c7] shrink-0" />
                  <span>{t.routeMapSub}</span>
                </p>
              </div>

              {/* Card 2: Important Safety Instructions */}
              <div className="bg-white rounded-3xl p-6 border border-[#E8B973]/40 shadow-xs">
                <h3 className="text-base sm:text-lg font-bold text-red-600 mb-3 flex items-center gap-1.5">
                  <span>🚨</span> {t.safetyHeading}
                </h3>
                <ul className="space-y-2.5 text-sm sm:text-base text-[#2D1B11]/85">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">•</span>
                    <span>{t.safety1}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">•</span>
                    <span>{t.safety2}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">•</span>
                    <span>{t.safety3}</span>
                  </li>
                </ul>
              </div>

            </div>

          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* 7. ABOUT FESTIVAL (#about)                                */}
      {/* ========================================================= */}
      {showSection('about') && (
        <section id="about" className="py-16 px-4 md:px-8 max-w-6xl mx-auto w-full border-t border-[#E8B973]/30">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8B973]/40 shadow-xs">
            <span className="text-xs font-bold text-[#F05A0A] uppercase tracking-wider block mb-2">
              {t.aboutBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2D1B11] font-telugu mb-4">
              {t.aboutHeading}
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[#2D1B11]/80 leading-relaxed">
              <p>{t.aboutP1}</p>
              <p>{t.aboutP2}</p>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* 8. ORGANIZERS (#organizers)                               */}
      {/* ========================================================= */}
      {showSection('organizers') && (
        <section id="organizers" className="py-16 px-4 md:px-8 max-w-6xl mx-auto w-full border-t border-[#E8B973]/30">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-[#F05A0A] uppercase tracking-wider block mb-2">
              {t.organizersBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2D1B11] font-telugu">
              {t.organizersHeading}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {committee.map((member) => (
              <div key={member.id} className="bg-white rounded-2xl p-5 border border-[#E8B973]/40 shadow-xs text-center">
                <div className="w-16 h-16 rounded-full bg-[#E8B973]/20 text-[#F05A0A] font-bold text-xl flex items-center justify-center mx-auto mb-3 border border-[#E8B973]/40">
                  {member.name.charAt(0) || '🕉️'}
                </div>
                <h3 className="font-bold text-base text-[#2D1B11] mb-1">{member.name}</h3>
                <p className="text-xs font-semibold text-[#F05A0A] uppercase tracking-wider">{member.role}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* 9. LOCATION & VENUE (#location)                           */}
      {/* ========================================================= */}
      {showSection('location') && (
        <section id="location" className="py-16 px-4 md:px-8 max-w-6xl mx-auto w-full border-t border-[#E8B973]/30">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8B973]/40 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-bold text-[#F05A0A] uppercase tracking-wider block mb-2">
                  {t.locationBadge}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#2D1B11] font-telugu mb-4">
                  {t.locationHeading}
                </h2>
                <div className="space-y-3 text-sm sm:text-base text-[#2D1B11]/80 mb-6">
                  <p className="font-bold text-lg text-[#2D1B11]">
                    {t.mandapamName}
                  </p>
                  <p className="font-medium text-[#2D1B11]/85">
                    {festivalConfig.venue}
                  </p>
                  <p className="text-xs text-[#2D1B11]/60">
                    {t.venueLandmark}
                  </p>
                </div>

                <a 
                  href={googleMapsDirectionsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#F05A0A] hover:bg-[#D04A08] text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-xs cursor-pointer active:scale-98"
                >
                  <Navigation size={18} />
                  <span>{t.getDirectionsBtn}</span>
                </a>
              </div>

              <div className="aspect-4/3 rounded-2xl bg-[#E8B973]/15 border border-[#E8B973]/40 flex flex-col items-center justify-center p-6 text-center text-[#2D1B11]/60">
                <MapPin size={48} className="text-[#F05A0A] mb-2" />
                <span className="font-bold text-sm text-[#2D1B11]">64QC+V49 Suryaraopet</span>
                <span className="text-xs text-[#2D1B11]/60 mt-1 max-w-xs">
                  {festivalConfig.venue}
                </span>
                <a 
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 text-xs font-bold text-[#F05A0A] hover:underline"
                >
                  {t.openInMaps}
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* 10. INSTRUCTIONS (#instructions)                          */}
      {/* ========================================================= */}
      {showSection('instructions') && (
        <section id="instructions" className="py-16 px-4 md:px-8 max-w-6xl mx-auto w-full border-t border-[#E8B973]/30">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-[#F05A0A] uppercase tracking-wider block mb-2">
              {t.instructionsBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2D1B11] font-telugu">
              {t.instructionsHeading}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {instructions.map((inst) => (
              <div key={inst.id} className="bg-white rounded-2xl p-5 border border-[#E8B973]/40 shadow-xs flex items-start gap-3.5">
                <CheckCircle size={20} className="text-[#F05A0A] shrink-0 mt-0.5" />
                <p className="text-sm sm:text-base text-[#2D1B11]/85 leading-relaxed font-medium">
                  {inst.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* 11. FESTIVAL FUND & DONATIONS (#money)                    */}
      {/* ========================================================= */}
      {showSection('money') && (
        <section id="money" className="py-16 px-4 md:px-8 max-w-6xl mx-auto w-full border-t border-[#E8B973]/30">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8B973]/40 shadow-xs">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold text-[#F05A0A] uppercase tracking-wider block mb-2">
                {t.moneyBadge}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2D1B11] font-telugu mb-3">
                {t.moneyHeading}
              </h2>
              <p className="text-sm sm:text-base text-[#2D1B11]/70">
                {t.moneySubheading}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
              <div className="bg-[#FFF9F0] border border-[#E8B973]/50 rounded-2xl p-6 text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2D1B11]/60 block mb-2">
                  {t.donationsCollected}
                </span>
                <div className="text-3xl sm:text-4xl font-bold text-emerald-600 font-mono">
                  ₹ {donationTotal.toLocaleString('en-IN')}
                </div>
              </div>

              <div className="bg-[#FFF9F0] border border-[#E8B973]/50 rounded-2xl p-6 text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2D1B11]/60 block mb-2">
                  {t.categorizedExpenses}
                </span>
                <div className="text-3xl sm:text-4xl font-bold text-[#F05A0A] font-mono">
                  ₹ {expenseTotal.toLocaleString('en-IN')}
                </div>
              </div>

              <div className="bg-[#FFF9F0] border border-[#E8B973]/50 rounded-2xl p-6 text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2D1B11]/60 block mb-2">
                  {t.treasuryBalance}
                </span>
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 font-mono">
                  ₹ {balanceTotal.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            {/* Sponsorship Tiers Card */}
            <div className="bg-[#FFF9F0]/60 rounded-2xl p-6 border border-[#E8B973]/40 mb-6">
              <h3 className="font-bold text-base sm:text-lg text-[#F05A0A] mb-4 flex items-center gap-2">
                <IndianRupee size={18} />
                <span>{t.sponsorTitle}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-medium text-[#2D1B11]">
                <div className="p-3 bg-white rounded-xl border border-[#E8B973]/30">{t.sponsor1}</div>
                <div className="p-3 bg-white rounded-xl border border-[#E8B973]/30">{t.sponsor2}</div>
                <div className="p-3 bg-white rounded-xl border border-[#E8B973]/30">{t.sponsor3}</div>
                <div className="p-3 bg-white rounded-xl border border-[#E8B973]/30">{t.sponsor4}</div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-center text-[#2D1B11]/70 font-medium">
              {t.contactTreasurer}
            </p>
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* 12. CONTACT & HELP DESK (#contact)                        */}
      {/* ========================================================= */}
      {showSection('contact') && (
        <section id="contact" className="py-16 px-4 md:px-8 max-w-6xl mx-auto w-full border-t border-[#E8B973]/30">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8B973]/40 shadow-xs">
            <span className="text-xs font-bold text-[#F05A0A] uppercase tracking-wider block mb-2">
              {t.contactBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2D1B11] font-telugu mb-3">
              {t.contactHeading}
            </h2>
            <p className="text-sm sm:text-base text-[#2D1B11]/70 mb-8 max-w-2xl">
              {t.contactSub}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FFF9F0] border border-[#E8B973]/40">
                <Phone className="text-[#F05A0A] shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="font-bold text-sm text-[#2D1B11] mb-1">
                    {t.phoneLabel}
                  </h4>
                  <a href="tel:+919704147837" className="text-sm font-semibold text-[#F05A0A] hover:underline">
                    +91 9704147837
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FFF9F0] border border-[#E8B973]/40">
                <Mail className="text-[#F05A0A] shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="font-bold text-sm text-[#2D1B11] mb-1">
                    {t.emailLabel}
                  </h4>
                  <a href="mailto:gudavallipujith@gmail.com" className="text-sm font-semibold text-[#F05A0A] hover:underline break-all">
                    gudavallipujith@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FFF9F0] border border-[#E8B973]/40">
                <MapPin className="text-[#F05A0A] shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="font-bold text-sm text-[#2D1B11] mb-1">
                    {t.venueTimingsLabel}
                  </h4>
                  <p className="text-xs font-medium text-[#2D1B11]/70">
                    {t.templeTimings}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* LIGHTBOX MODAL                                            */}
      {/* ========================================================= */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-[#1A0F0A] rounded-3xl overflow-hidden border border-[#E8B973]/30 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10 text-white">
              <span className="font-bold text-sm">
                {lightboxIndex + 1} / {filteredGallery.length}
              </span>
              <button 
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="p-1 text-white/70 hover:text-white rounded-full cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            <div className="relative aspect-16/10 sm:aspect-16/9 bg-black flex items-center justify-center">
              <img 
                src={filteredGallery[lightboxIndex].imageUrl} 
                alt={filteredGallery[lightboxIndex].caption}
                className="max-h-full max-w-full object-contain"
              />
              
              <button
                type="button"
                onClick={() => setLightboxIndex(prev => (prev === null ? 0 : prev === 0 ? filteredGallery.length - 1 : prev - 1))}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer"
              >
                <ChevronLeft size={24} />
              </button>
              
              <button
                type="button"
                onClick={() => setLightboxIndex(prev => (prev === null ? 0 : prev === filteredGallery.length - 1 ? 0 : prev + 1))}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <div className="p-4 bg-[#2D1B11] text-white flex items-center justify-between">
              <div>
                <h4 className="font-bold text-base">{filteredGallery[lightboxIndex].caption}</h4>
                <span className="text-xs text-[#E8B973]">{filteredGallery[lightboxIndex].category}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* VIDEO MODAL                                               */}
      {/* ========================================================= */}
      {videoModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setVideoModalOpen(false)}
        >
          <div 
            className="relative max-w-3xl w-full bg-[#1A0F0A] rounded-3xl overflow-hidden border border-[#E8B973]/30 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10 text-white">
              <span className="font-bold text-sm font-telugu">
                {lang === 'te' ? 'నిమజ్జనం వీడియో' : 'Procession & Nimajjanam Video'}
              </span>
              <button 
                type="button"
                onClick={() => setVideoModalOpen(false)}
                className="p-1 text-white/70 hover:text-white rounded-full cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            <div className="aspect-video bg-black flex flex-col items-center justify-center p-8 text-center text-white">
              <Play size={48} className="text-[#F05A0A] mb-3 animate-pulse" />
              <p className="font-bold text-lg mb-1">
                {lang === 'te' ? 'నిమజ్జనం వీడియో త్వరలో అప్‌లోడ్ చేయబడుతుంది' : 'Procession Video Stream Available on Day 7'}
              </p>
              <p className="text-xs text-white/60 max-w-md">
                {lang === 'te' 
                  ? '7వ రోజు మహా నిమజ్జన శోభాయాత్ర ప్రత్యక్ష ప్రసారం ఇక్కడ వీక్షించవచ్చు.' 
                  : 'Live stream of the grand immersion and water rituals will be broadcast here.'}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
