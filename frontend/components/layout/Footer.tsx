'use client';

import { festivalConfig } from '../../data/festival';
import { useLanguage } from '../../context/LanguageContext';

export default function Footer() {
  const { lang, t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const targetId = sectionId === 'money' ? 'wallet' : sectionId;
    const el = document.getElementById(targetId);
    if (el) {
      const headerOffset = 70;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      history.pushState(null, '', `/#${sectionId}`);
    }
  };

  return (
    <footer className="bg-[#2D1B11] text-[#FFF9F0]/80 py-12 px-4 mt-auto mb-16 md:mb-0 border-t-2 border-[#E8B973]/30">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-[#F05A0A] font-bold text-xl mb-3 flex items-center gap-2 font-telugu">
            <span>🕉️</span> {lang === 'te' ? t.teluguTitle : festivalConfig.festivalName}
          </h3>
          <p className="text-sm mb-1">{lang === 'te' ? t.villageName : festivalConfig.villageName}, {festivalConfig.year}</p>
          <p className="text-xs text-[#E8B973] font-medium">
            {lang === 'te' ? '7 రోజుల పవిత్ర ఉత్సవాలు • భక్తి • వేడుక • ఐక్యత' : festivalConfig.themeMessage}
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">
            {t.quickNav}
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <button 
                type="button"
                onClick={() => scrollToSection('days')}
                className="hover:text-[#F05A0A] transition-colors cursor-pointer text-left"
              >
                {t.footerJourney}
              </button>
            </li>
            <li>
              <button 
                type="button"
                onClick={() => scrollToSection('updates')}
                className="hover:text-[#F05A0A] transition-colors cursor-pointer text-left"
              >
                {t.footerUpdates}
              </button>
            </li>
            <li>
              <button 
                type="button"
                onClick={() => scrollToSection('gallery')}
                className="hover:text-[#F05A0A] transition-colors cursor-pointer text-left"
              >
                {t.footerGallery}
              </button>
            </li>
            <li>
              <button 
                type="button"
                onClick={() => scrollToSection('nimajjanam')}
                className="hover:text-[#F05A0A] transition-colors cursor-pointer text-left"
              >
                {t.footerNimajjanam}
              </button>
            </li>
            <li>
              <button 
                type="button"
                onClick={() => scrollToSection('instructions')}
                className="hover:text-[#F05A0A] transition-colors cursor-pointer text-left"
              >
                {t.footerInstructions}
              </button>
            </li>
            <li>
              <button 
                type="button"
                onClick={() => scrollToSection('money')}
                className="hover:text-[#F05A0A] transition-colors cursor-pointer text-left"
              >
                {t.footerMoney}
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">
            {t.footerVenue}
          </h4>
          <p className="text-sm mb-2 font-medium">
            {lang === 'te' ? t.mandapamName : 'Ramalayam Temple Mandapam'}
          </p>
          <p className="text-xs text-[#FFF9F0]/70 mb-3">
            {festivalConfig.venue}
          </p>
          <button 
            type="button"
            onClick={() => scrollToSection('location')}
            className="text-[#F05A0A] text-sm font-semibold hover:underline cursor-pointer flex items-center gap-1"
          >
            {t.viewDirections}
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-10 pt-6 border-t border-white/10 text-center text-xs text-[#FFF9F0]/50">
        <p>{t.footerCopyright}</p>
      </div>
    </footer>
  );
}
