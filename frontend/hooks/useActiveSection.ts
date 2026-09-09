'use client';

import { useEffect, useRef, useState } from 'react';

export function useActiveSection(sectionIds: string[], defaultSection: string = 'home') {
  const [activeSection, setActiveSection] = useState<string>(defaultSection);
  const animationFrame = useRef<number | null>(null);

  const sectionKey = sectionIds.join(',');

  useEffect(() => {
    const ids = sectionKey.split(',');

    const updateActiveSection = () => {
      animationFrame.current = null;
      const sections = ids
        .map((id) => document.getElementById(id))
        .filter((section): section is HTMLElement => section !== null);

      if (sections.length === 0) {
        return;
      }

      const marker = 96;
      let current = sections[0].id;

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= marker) {
          current = section.id;
        } else {
          break;
        }
      }

      setActiveSection((previous) => previous === current ? previous : current);
    };

    const handleScroll = () => {
      if (animationFrame.current === null) {
        animationFrame.current = window.requestAnimationFrame(updateActiveSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    updateActiveSection();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (animationFrame.current !== null) {
        window.cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [sectionKey]);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;

    setActiveSection(id);
    window.history.replaceState(null, '', `#${id}`);
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return { activeSection, scrollToSection };
}
