'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, Bell, Image as ImageIcon, Menu } from 'lucide-react';
import { clsx } from 'clsx';
import { useState } from 'react';

export default function MobileNavigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/days', icon: Calendar, label: '7 Days' },
    { href: '/updates', icon: Bell, label: 'Updates' },
    { href: '/gallery', icon: ImageIcon, label: 'Gallery' },
  ];

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-ivory border-t border-saffron/20 pb-safe">
        <div className="flex justify-around items-center h-16 px-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
                  isActive ? "text-saffron" : "text-brown/70 hover:text-saffron"
                )}
              >
                <Icon size={20} />
                <span className="text-[10px] font-medium">{link.label}</span>
              </Link>
            );
          })}
          <button 
            onClick={() => setIsOpen(true)}
            className="flex flex-col items-center justify-center w-full h-full space-y-1 text-brown/70 hover:text-saffron"
          >
            <Menu size={20} />
            <span className="text-[10px] font-medium">More</span>
          </button>
        </div>
      </nav>

      {/* Basic Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] bg-ivory flex flex-col pt-safe">
          <div className="flex justify-between items-center p-4 border-b border-saffron/20">
            <span className="font-bold text-saffron text-lg">Menu</span>
            <button onClick={() => setIsOpen(false)} className="text-brown">Close</button>
          </div>
          <div className="flex flex-col p-4 gap-4 overflow-y-auto">
            <Link href="/videos" onClick={() => setIsOpen(false)} className="text-lg py-2 border-b border-saffron/10">Videos</Link>
            <Link href="/location" onClick={() => setIsOpen(false)} className="text-lg py-2 border-b border-saffron/10">Location</Link>
            <Link href="/instructions" onClick={() => setIsOpen(false)} className="text-lg py-2 border-b border-saffron/10">Instructions</Link>
            <Link href="/nimajjanam" onClick={() => setIsOpen(false)} className="text-lg py-2 border-b border-saffron/10 text-saffron font-bold">🌊 Maha Nimajjanam</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="text-lg py-2 border-b border-saffron/10">About Festival</Link>
            <Link href="/committee" onClick={() => setIsOpen(false)} className="text-lg py-2 border-b border-saffron/10">Committee</Link>
          </div>
        </div>
      )}
    </>
  );
}
