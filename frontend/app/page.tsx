'use client';

import { useState, useEffect } from 'react';
import { festivalConfig } from '../data/festival';
import { festivalDays } from '../data/days';
import { announcements } from '../data/announcements';
import { galleryItems } from '../data/gallery';
import { committeeMembers } from '../data/committee';
import { instructions } from '../data/instructions';
import { 
  ArrowRight, 
  Bell, 
  Clock, 
  Calendar, 
  MapPin, 
  Info, 
  Play, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Image as ImageIcon,
  CheckCircle,
  Phone,
  Mail,
  ShieldAlert,
  Navigation
} from 'lucide-react';

export default function Home() {
  // 1. Day Selection State (default to Day 4 as per PPT)
  const [selectedDayId, setSelectedDayId] = useState<string>('day-4');
  const selectedDay = festivalDays.find(d => d.id === selectedDayId) || festivalDays[3];

  // 2. Push Notification Subscription State
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  // 3. Gallery Category Filter & Lightbox State
  const [galleryFilter, setGalleryFilter] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState<boolean>(false);

  // 4. Nimajjanam Live Countdown State (Mock: 02:14:32)
  const [countdown, setCountdown] = useState({ hrs: 2, min: 14, sec: 32 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.sec > 0) return { ...prev, sec: prev.sec - 1 };
        if (prev.min > 0) return { ...prev, min: prev.min - 1, sec: 59 };
        if (prev.hrs > 0) return { hrs: prev.hrs - 1, min: 59, sec: 59 };
        return { hrs: 0, min: 0, sec: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter gallery items
  const filteredGallery = galleryFilter === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === galleryFilter);

  // Keyboard navigation for lightbox
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

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectDay = (dayId: string) => {
    setSelectedDayId(dayId);
    scrollToSection('day-details');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FFF9F0] text-[#2D1B11]">

      {/* ========================================================= */}
      {/* 1. HERO SECTION (#home) - PPT Slide 3 Split Layout        */}
      {/* ========================================================= */}
      <section id="home" className="pt-8 pb-16 px-4 md:px-8 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Left Column: 3 Compact Outlined Cards */}
          <div className="flex flex-col justify-between space-y-6">
            
            {/* Card 1: Hero Header */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E8B973]/40 shadow-xs hover:border-[#F05A0A]/40 transition-colors">
              <span className="text-xs font-bold text-[#F05A0A] uppercase tracking-wider block mb-2 font-sans">
                Hero Header
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2D1B11] font-telugu leading-snug">
                శ్రీ వినాయక చవితి మహోత్సవాలు 2026
              </h1>
              <p className="text-base sm:text-lg font-semibold text-[#2D1B11]/75 mt-2">
                [ {festivalConfig.villageName} ]
              </p>
            </div>

            {/* Card 2: Live Progress Bar */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E8B973]/40 shadow-xs">
              <span className="text-xs font-bold text-[#F05A0A] uppercase tracking-wider block mb-2 font-sans">
                Live Progress Bar
              </span>
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-block w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                <span className="font-bold text-sm sm:text-base text-[#2D1B11] tracking-wide">
                  FESTIVAL IS LIVE - DAY 4 / 9
                </span>
              </div>
              <div className="w-full bg-[#FFF9F0] rounded-full h-3 overflow-hidden border border-[#E8B973]/30">
                <div 
                  className="bg-[#F05A0A] h-3 rounded-full transition-all duration-700" 
                  style={{ width: `${(4 / 9) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Card 3: Today's Quick Schedule */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E8B973]/40 shadow-xs">
              <span className="text-xs font-bold text-[#F05A0A] uppercase tracking-wider block mb-4 font-sans">
                Today's Quick Schedule
              </span>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-4 text-sm sm:text-base">
                  <span className="w-20 font-bold text-[#F05A0A] shrink-0">6:00 AM</span>
                  <span className="font-medium text-[#2D1B11]">Ganesh Puja</span>
                </div>
                <div className="flex items-center gap-4 text-sm sm:text-base">
                  <span className="w-20 font-bold text-[#F05A0A] shrink-0">7:00 PM</span>
                  <span className="font-medium text-[#2D1B11]">Bhajans</span>
                </div>
                <div className="flex items-center gap-4 text-sm sm:text-base">
                  <span className="w-20 font-bold text-[#F05A0A] shrink-0">8:00 PM</span>
                  <span className="font-medium text-[#2D1B11]">Maha Aarti</span>
                </div>
              </div>

              <button
                onClick={() => handleSelectDay('day-4')}
                className="w-full bg-[#F05A0A] hover:bg-[#D04A08] text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer active:scale-98 text-sm sm:text-base"
              >
                <span>View Today's Schedule</span>
                <ArrowRight size={18} />
              </button>
            </div>

          </div>

          {/* Right Column: Large Ganesh Idol Image Container */}
          <div className="flex items-center justify-center">
            <div className="relative w-full h-[400px] sm:h-[500px] lg:h-full min-h-[420px] rounded-3xl overflow-hidden border-2 border-[#E8B973]/60 bg-[#E8B973]/10 shadow-sm flex items-center justify-center">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-103"
                style={{ backgroundImage: `url('/images/festival/ganesh-idol.jpg')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D1B11]/40 via-transparent to-transparent pointer-events-none"></div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. 9-DAY JOURNEY SECTION (#days) - PPT Slide 4            */}
      {/* ========================================================= */}
      <section id="days" className="py-16 px-4 md:px-8 max-w-6xl mx-auto w-full border-t border-[#E8B973]/30">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F05A0A] font-telugu mb-3">
            The 7-Day Journey (List View)
          </h2>
          <p className="text-sm sm:text-base text-[#2D1B11]/70 max-w-2xl mx-auto">
            This page acts as a vertical or horizontal timeline linking to individual day pages.
          </p>
        </div>

        {/* Horizontal Timeline as per PPT Slide 4 */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8B973]/40 shadow-xs mb-10 overflow-x-auto">
          <div className="min-w-[650px] flex items-center justify-between relative px-4 py-8">
            
            {/* Background connecting bar */}
            <div className="absolute top-1/2 left-8 right-8 h-1 bg-[#E8B973]/50 -translate-y-1/2 z-0"></div>

            {/* Stage 1: Days 1-3 */}
            <div className="relative z-10 flex flex-col items-center text-center w-36">
              <div className="w-9 h-9 rounded-full bg-white border-4 border-[#E8B973] flex items-center justify-center mb-3 shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E8B973]"></span>
              </div>
              <span className="font-bold text-sm text-[#2D1B11]/70">Day 1–3</span>
              <span className="text-xs text-[#2D1B11]/50 mt-1 leading-tight">
                Completed events. Greyed out slightly.
              </span>
            </div>

            {/* Stage 2: Day 4 (Today) */}
            <div className="relative z-10 flex flex-col items-center text-center w-48">
              <span className="text-xs font-bold text-green-600 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full mb-3 flex items-center gap-1 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                TODAY: Ganapathi Puja
              </span>
              <div className="w-10 h-10 rounded-full bg-[#F05A0A] border-4 border-white flex items-center justify-center mb-2 shadow-md">
                <span className="w-3 h-3 rounded-full bg-white"></span>
              </div>
              <span className="font-bold text-base text-[#F05A0A]">Day 4 (Today)</span>
            </div>

            {/* Stage 3: Days 5-8 */}
            <div className="relative z-10 flex flex-col items-center text-center w-36">
              <div className="w-9 h-9 rounded-full bg-white border-4 border-[#E8B973] flex items-center justify-center mb-3 shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E8B973]"></span>
              </div>
              <span className="font-bold text-sm text-[#F05A0A]">Day 5–8</span>
              <span className="text-xs text-[#2D1B11]/60 mt-1 leading-tight">
                Upcoming events. Normal opacity.
              </span>
            </div>

            {/* Stage 4: Day 9 Maha Nimajjanam */}
            <div className="relative z-10 flex flex-col items-center text-center w-44">
              <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full mb-3 flex items-center gap-1 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                MAHA NIMAJJANAM
              </span>
              <div className="w-9 h-9 rounded-full bg-white border-4 border-red-500 flex items-center justify-center mb-2 shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              </div>
              <span className="font-bold text-sm text-red-600">Day 9</span>
            </div>

          </div>
        </div>

        {/* Interactive Day Selection Chips for Instant Updates */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 pt-1 no-scrollbar">
          {festivalDays.map((day) => {
            const isSelected = selectedDayId === day.id;
            const isCurrent = day.status === 'current';
            const isFinal = day.dayNumber === 9;

            return (
              <button
                key={day.id}
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
                <span>Day {day.dayNumber}</span>
                {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>}
                {isFinal && <span className="text-xs">🌊</span>}
              </button>
            );
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. DAY DETAILS SECTION (#day-details) - PPT Slide 5        */}
      {/* ========================================================= */}
      <section id="day-details" className="py-16 px-4 md:px-8 max-w-6xl mx-auto w-full border-t border-[#E8B973]/30">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F05A0A] font-telugu mb-2">
            Specific Day Details ({selectedDay.title})
          </h2>
          <p className="text-sm sm:text-base text-[#2D1B11]/70">
            Showing schedule, updates, and photos for <span className="font-bold text-[#F05A0A]">Day {selectedDay.dayNumber} ({selectedDay.date})</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: Day Theme & Schedule Block */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8B973]/40 shadow-xs">
            <h3 className="text-lg sm:text-xl font-bold text-[#F05A0A] mb-4 pb-2 border-b border-[#E8B973]/20">
              Day Theme & Schedule Block
            </h3>
            
            <div className="mb-6">
              <span className="font-bold text-[#F05A0A] text-base sm:text-lg block">
                Theme: {selectedDay.title}
              </span>
              <p className="text-xs sm:text-sm text-[#2D1B11]/70 mt-1">
                {selectedDay.shortDescription}
              </p>
            </div>

            <div className="space-y-4">
              {selectedDay.events.map((evt) => (
                <div key={evt.id} className="flex items-start gap-3 py-1.5 border-b border-[#E8B973]/10 last:border-0">
                  <span className="text-[#F05A0A] text-base">•</span>
                  <span className="font-bold text-sm sm:text-base text-[#F05A0A] w-24 shrink-0 font-mono">
                    {evt.time}
                  </span>
                  <span className="font-medium text-sm sm:text-base text-[#2D1B11] flex items-center gap-2">
                    {evt.icon && <span>{evt.icon}</span>}
                    {evt.name}
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
                Day {selectedDay.dayNumber} Announcements
              </h4>
              <p className="text-sm sm:text-base text-[#2D1B11]/80 leading-relaxed">
                {selectedDay.dayNumber === 4 
                  ? "No special instructions for today." 
                  : `Please follow temple queues and arrive 15 minutes before scheduled pooja timings for Day ${selectedDay.dayNumber}.`}
              </p>
            </div>

            {/* Sub-card 2: Photo Grid (4-6 thumbnails) */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8B973]/40 shadow-xs flex-1">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-base sm:text-lg font-bold text-[#F05A0A]">
                  Day {selectedDay.dayNumber} Photo Grid
                </h4>
                <span className="text-xs text-[#2D1B11]/50 font-medium">Click to open lightbox</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { img: '/images/festival/ganesh-idol.jpg', label: 'Alankaram' },
                  { img: '/images/festival/maha_aarti_1788872944567.jpg', label: 'Pooja Thali' },
                  { img: '/images/festival/hero_background_1788872872047.jpg', label: 'Mandapam' },
                  { img: '/images/festival/festival_background_1788872889056.jpg', label: 'Celebration' },
                  { img: '/images/festival/procession_1788872924202.jpg', label: 'Devotees' },
                  { img: '/images/festival/nimajjanam_background_1788872905368.jpg', label: 'Aarti Darshan' }
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

      {/* ========================================================= */}
      {/* 4. LIVE UPDATES & NOTIFICATIONS (#updates) - PPT Slide 6  */}
      {/* ========================================================= */}
      <section id="updates" className="py-16 px-4 md:px-8 max-w-6xl mx-auto w-full border-t border-[#E8B973]/30">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F05A0A] font-telugu mb-2">
            Live Updates & Notifications
          </h2>
          <p className="text-sm sm:text-base text-[#2D1B11]/70">
            Real-time announcements and event updates from the organizing committee.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Left Side: Update Cards & Push Button */}
          <div className="space-y-5 flex flex-col justify-between">
            
            {/* Card 1: Live Update (High Priority) */}
            <div className="bg-white rounded-2xl p-6 border-l-4 border-l-red-500 border border-[#E8B973]/40 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-red-600 text-sm tracking-wide flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                  LIVE UPDATE (High Priority)
                </span>
                <span className="text-xs text-[#2D1B11]/50 font-medium">10 minutes ago</span>
              </div>
              <p className="font-bold text-base sm:text-lg text-[#2D1B11]">
                Today's Maha Aarti will begin at 7:30 PM.
              </p>
            </div>

            {/* Card 2: Program Change */}
            <div className="bg-white rounded-2xl p-6 border-l-4 border-l-[#F05A0A] border border-[#E8B973]/40 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-[#F05A0A] text-sm tracking-wide flex items-center gap-1.5">
                  <span>📢</span> Program Change
                </span>
                <span className="text-xs text-[#2D1B11]/50 font-medium">2 hours ago</span>
              </div>
              <p className="font-semibold text-sm sm:text-base text-[#2D1B11]/85 leading-relaxed">
                Important: Today's cultural program has been rescheduled to 8:00 PM.
              </p>
            </div>

            {/* Subscribe to Push Notifications Button */}
            <button
              onClick={() => setIsSubscribed(!isSubscribed)}
              className={`w-full py-3.5 px-6 rounded-2xl border-2 font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-xs cursor-pointer active:scale-98 ${
                isSubscribed 
                  ? 'bg-green-50 border-green-500 text-green-700' 
                  : 'bg-white border-[#F05A0A] text-[#F05A0A] hover:bg-[#F05A0A] hover:text-white'
              }`}
            >
              {isSubscribed ? <CheckCircle size={20} /> : <Bell size={20} />}
              <span>{isSubscribed ? '✓ Subscribed to Push Notifications' : '🔔 Subscribe to Push Notifications'}</span>
            </button>

          </div>

          {/* Right Side: Liquid Gold Abstract Image Card from PPT Slide 6 */}
          <div className="rounded-3xl overflow-hidden border border-[#E8B973]/50 shadow-sm relative min-h-[260px] lg:min-h-[300px] bg-black">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('/images/festival/hero_background_1788872872047.jpg')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
              <span className="text-white text-sm font-semibold tracking-wide">
                Pooja Mandapam & Golden Illumination
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. IMMERSIVE GALLERY & VIDEOS (#gallery) - PPT Slide 7    */}
      {/* ========================================================= */}
      <section id="gallery" className="py-16 px-4 md:px-8 max-w-6xl mx-auto w-full border-t border-[#E8B973]/30">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F05A0A] font-telugu mb-2">
            Immersive Gallery & Videos
          </h2>
          <p className="text-sm sm:text-base text-[#2D1B11]/70">
            Explore festival photographs, devotional aartis, and procession videos.
          </p>
        </div>

        {/* Filter Pills matching PPT */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {['All', 'Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 7'].map((filter) => (
            <button
              key={filter}
              onClick={() => setGalleryFilter(filter)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                galleryFilter === filter
                  ? 'bg-[#F05A0A] text-white shadow-xs'
                  : 'bg-white text-[#2D1B11]/70 border border-[#E8B973]/40 hover:bg-[#E8B973]/15'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* 3 Prominent Media Cards Side by Side as per PPT Slide 7 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Day 1: Celebration */}
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
                Day 1: Celebration
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
                Day 2: Puja & Aarti
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
                Nimajjanam Video
              </h3>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. MAHA NIMAJJANAM (#nimajjanam) - PPT Slide 8            */}
      {/* ========================================================= */}
      <section id="nimajjanam" className="py-16 px-4 md:px-8 max-w-6xl mx-auto w-full border-t border-[#E8B973]/30">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0c4a6e] font-telugu mb-2">
            Maha Nimajjanam (Overrides Home on Day 7)
          </h2>
          <p className="text-sm sm:text-base text-[#0c4a6e]/70 font-medium">
            Grand Visarjan, Procession Route, and Water Safety Instructions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Left: Large Digital Countdown */}
          <div className="bg-[#e0f2fe]/60 border border-[#bae6fd] rounded-3xl p-8 sm:p-12 text-center shadow-xs flex flex-col items-center justify-center">
            <div className="text-5xl sm:text-6xl md:text-7xl font-bold text-[#F05A0A] font-mono tracking-tight mb-2">
              {String(countdown.hrs).padStart(2, '0')}:{String(countdown.min).padStart(2, '0')}:{String(countdown.sec).padStart(2, '0')}
            </div>
            <div className="text-xs sm:text-sm font-bold tracking-[0.25em] text-[#0c4a6e]/70 uppercase mb-3">
              HRS : MIN : SEC
            </div>
            <div className="text-base sm:text-lg font-bold text-[#0c4a6e]">
              Until Procession Starts
            </div>
          </div>

          {/* Right: Route Map Placeholder & Important Instructions */}
          <div className="space-y-6">
            
            {/* Card 1: Procession Route Map */}
            <div className="bg-white rounded-3xl p-6 border border-[#E8B973]/40 shadow-xs">
              <h3 className="text-base sm:text-lg font-bold text-[#F05A0A] mb-3 flex items-center gap-1.5">
                <span>📍</span> Procession Route Map
              </h3>
              <div className="aspect-16/9 bg-[#0c4a6e]/5 rounded-2xl border-2 border-dashed border-[#0c4a6e]/20 flex flex-col items-center justify-center text-[#0c4a6e]/60 p-4 text-center">
                <MapPin size={36} className="mb-2 text-[#0284c7]" />
                <span className="text-xs sm:text-sm font-semibold">
                  [ Render embedded map or static route image here ]
                </span>
                <span className="text-xs text-[#0c4a6e]/50 mt-1">
                  Main Temple Grounds → Gandhi Chowk → Lake Immersion Ghat
                </span>
              </div>
            </div>

            {/* Card 2: Important Safety Instructions */}
            <div className="bg-white rounded-3xl p-6 border border-[#E8B973]/40 shadow-xs">
              <h3 className="text-base sm:text-lg font-bold text-red-600 mb-3 flex items-center gap-1.5">
                <span>🚨</span> Important Instructions
              </h3>
              <ul className="space-y-2.5 text-sm sm:text-base text-[#2D1B11]/85">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Keep children with guardians.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Use designated parking areas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Follow safety instructions near water.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. ABOUT FESTIVAL (#about)                                */}
      {/* ========================================================= */}
      <section id="about" className="py-16 px-4 md:px-8 max-w-6xl mx-auto w-full border-t border-[#E8B973]/30">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8B973]/40 shadow-xs">
          <span className="text-xs font-bold text-[#F05A0A] uppercase tracking-wider block mb-2">
            Tradition & Devotion
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2D1B11] font-telugu mb-4">
            About {festivalConfig.festivalName}
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-[#2D1B11]/80 leading-relaxed">
            <p>
              Sri Vinayaka Chavithi Mahotsavam is the premier devotional and cultural celebration of {festivalConfig.villageName}. For over decades, our community gathers in unity to welcome Lord Ganesha with Vedic rituals, cultural renditions, and selfless service.
            </p>
            <p>
              The 7 days symbolize prayer, community togetherness, and cultural vibrancy. From morning Suprabhatam to late-night bhajans and delicious prasadam distribution, the festival welcomes devotees from across surrounding villages.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. ORGANIZERS (#organizers)                               */}
      {/* ========================================================= */}
      <section id="organizers" className="py-16 px-4 md:px-8 max-w-6xl mx-auto w-full border-t border-[#E8B973]/30">
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-[#F05A0A] uppercase tracking-wider block mb-2">
            Organizing Committee
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2D1B11] font-telugu">
            Festival Organizers
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {committeeMembers.map((member) => (
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

      {/* ========================================================= */}
      {/* 9. LOCATION & VENUE (#location)                           */}
      {/* ========================================================= */}
      <section id="location" className="py-16 px-4 md:px-8 max-w-6xl mx-auto w-full border-t border-[#E8B973]/30">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8B973]/40 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-bold text-[#F05A0A] uppercase tracking-wider block mb-2">
                Venue Details
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2D1B11] font-telugu mb-4">
                Festival Location
              </h2>
              <div className="space-y-3 text-sm sm:text-base text-[#2D1B11]/80 mb-6">
                <p className="font-semibold text-lg text-[#2D1B11]">{festivalConfig.venue}</p>
                <p>{festivalConfig.villageName}, Andhra Pradesh / Telangana, India</p>
                <p className="text-xs text-[#2D1B11]/60">Near Central Bus Station & Community Hall</p>
              </div>

              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#F05A0A] hover:bg-[#D04A08] text-white font-bold py-3 px-6 rounded-xl transition-all shadow-xs"
              >
                <Navigation size={18} />
                <span>Get Directions on Google Maps</span>
              </a>
            </div>

            <div className="aspect-4/3 rounded-2xl bg-[#E8B973]/15 border border-[#E8B973]/40 flex flex-col items-center justify-center p-6 text-center text-[#2D1B11]/60">
              <MapPin size={48} className="text-[#F05A0A] mb-2" />
              <span className="font-bold text-sm text-[#2D1B11]">Main Temple Grounds Mandapam</span>
              <span className="text-xs text-[#2D1B11]/50 mt-1">Interactive Map Integration Slot</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 10. INSTRUCTIONS (#instructions)                          */}
      {/* ========================================================= */}
      <section id="instructions" className="py-16 px-4 md:px-8 max-w-6xl mx-auto w-full border-t border-[#E8B973]/30">
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-[#F05A0A] uppercase tracking-wider block mb-2">
            Devotee Guidelines
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2D1B11] font-telugu">
            Important Instructions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {instructions.map((inst) => (
            <div key={inst.id} className="bg-white rounded-2xl p-5 border border-[#E8B973]/40 shadow-xs flex items-start gap-3.5">
              <span className="text-[#F05A0A] font-bold text-lg mt-0.5">🪔</span>
              <p className="text-sm sm:text-base font-medium text-[#2D1B11]/85">{inst.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 11. CONTACT (#contact)                                    */}
      {/* ========================================================= */}
      <section id="contact" className="py-16 px-4 md:px-8 max-w-6xl mx-auto w-full border-t border-[#E8B973]/30 mb-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8B973]/40 shadow-xs text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-[#F05A0A] uppercase tracking-wider block mb-2">
            Reach Out
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2D1B11] font-telugu mb-4">
            Contact & Help Desk
          </h2>
          <p className="text-sm text-[#2D1B11]/70 mb-6">
            For pooja sponsorships, volunteer registration, or emergencies, please contact the festival committee.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm font-semibold text-[#2D1B11]">
            <div className="flex items-center gap-2 p-3 bg-[#FFF9F0] rounded-xl border border-[#E8B973]/40 w-full sm:w-auto justify-center">
              <Phone size={18} className="text-[#F05A0A]" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-[#FFF9F0] rounded-xl border border-[#E8B973]/40 w-full sm:w-auto justify-center">
              <Mail size={18} className="text-[#F05A0A]" />
              <span>festival.committee@example.com</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* LIGHTBOX MODAL                                            */}
      {/* ========================================================= */}
      {lightboxIndex !== null && filteredGallery[lightboxIndex] && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setLightboxIndex(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-[#F05A0A] p-2 cursor-pointer z-20"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close Lightbox"
          >
            <X size={32} />
          </button>
          
          <button 
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 hidden sm:block cursor-pointer z-20"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(prev => (prev === null ? null : prev === 0 ? filteredGallery.length - 1 : prev - 1));
            }}
            aria-label="Previous"
          >
            <ChevronLeft size={44} />
          </button>
          
          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 hidden sm:block cursor-pointer z-20"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(prev => (prev === null ? null : prev === filteredGallery.length - 1 ? 0 : prev + 1));
            }}
            aria-label="Next"
          >
            <ChevronRight size={44} />
          </button>

          <div 
            className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center"
            onClick={e => e.stopPropagation()}
          >
            <img 
              src={filteredGallery[lightboxIndex].imageUrl} 
              alt={filteredGallery[lightboxIndex].caption || 'Festival Photo'}
              className="max-h-[72vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-white/10"
            />
            <div className="mt-4 text-center">
              <h4 className="text-white text-base sm:text-lg font-bold">
                {filteredGallery[lightboxIndex].caption}
              </h4>
              <span className="text-[#F05A0A] text-xs font-bold uppercase tracking-widest mt-1 inline-block">
                {filteredGallery[lightboxIndex].category}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* VIDEO MODAL                                               */}
      {/* ========================================================= */}
      {videoModalOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setVideoModalOpen(false)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-[#F05A0A] p-2 cursor-pointer z-20"
            onClick={() => setVideoModalOpen(false)}
            aria-label="Close Video"
          >
            <X size={32} />
          </button>
          
          <div 
            className="relative max-w-3xl w-full aspect-video bg-black rounded-2xl overflow-hidden border border-white/20 shadow-2xl flex items-center justify-center"
            onClick={e => e.stopPropagation()}
          >
            <div className="text-center p-6">
              <Play size={48} className="text-[#F05A0A] mx-auto mb-3" />
              <h3 className="text-white text-xl font-bold mb-2">Maha Nimajjanam Video Player</h3>
              <p className="text-white/60 text-sm">
                Video player placeholder for the Grand Immersion and Procession.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
