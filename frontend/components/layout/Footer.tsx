import Link from 'next/link';
import { festivalConfig } from '../../data/festival';

export default function Footer() {
  return (
    <footer className="bg-brown text-ivory/80 py-12 px-4 mt-auto mb-16 md:mb-0">
      <div className="container mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-saffron font-bold text-xl mb-4 flex items-center gap-2">
            <span>🕉️</span> {festivalConfig.festivalName}
          </h3>
          <p className="text-sm mb-2">{festivalConfig.villageName}, {festivalConfig.year}</p>
          <p className="text-xs italic text-gold">{festivalConfig.themeMessage}</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/days" className="hover:text-saffron">7 Days Schedule</Link></li>
            <li><Link href="/nimajjanam" className="hover:text-saffron">Maha Nimajjanam</Link></li>
            <li><Link href="/gallery" className="hover:text-saffron">Gallery</Link></li>
            <li><Link href="/instructions" className="hover:text-saffron">Instructions</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4">Location</h4>
          <p className="text-sm mb-2">{festivalConfig.venue}</p>
          <Link href="/location" className="text-saffron text-sm hover:underline">
            View on Map →
          </Link>
        </div>
      </div>
      <div className="container mx-auto max-w-4xl mt-12 pt-8 border-t border-white/10 text-center text-xs">
        <p>© {festivalConfig.year} {festivalConfig.festivalName}. All rights reserved.</p>
      </div>
    </footer>
  );
}
