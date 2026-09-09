'use client';

import { useState, useEffect, useRef } from 'react';

export function useActiveSection(sectionIds: string[], defaultSection: string = 'home') {
  const [activeSection, setActiveSection] = useState<string>(defaultSection);
  const isClickScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const sectionKey = sectionIds.join(',');

  useEffect(() => {
    const ids = sectionKey.split(',');

    const handleScroll = () => {
      if (isClickScrolling.current) return;

      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

      // If near top of page, always home
      if (scrollY < 80) {
        setActiveSection(ids[0] || 'home');
        return;
      }

      // If reached the bottom of page, activate last section
      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 60) {
        setActiveSection(ids[ids.length - 1]);
        return;
      }

      // Trigger line: 35% down viewport (e.g. ~280px on 800px screen)
      const trigger = Math.min(window.innerHeight * 0.35, 300);

      let current = ids[0] || 'home';

      for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= trigger) {
            current = id;
          }
        }
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [sectionKey]);

  const setManualSection = (id: string) => {
    setActiveSection(id);
    isClickScrolling.current = true;
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 850);
  };

  return { activeSection, setManualSection };
}
