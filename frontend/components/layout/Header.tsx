import Link from 'next/link';
import { festivalConfig } from '../../data/festival';


export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-saffron/20 bg-ivory/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🕉️</span>
          <span className="font-bold text-saffron hidden sm:inline-block">
            {festivalConfig.festivalName}
          </span>
          <span className="font-bold text-saffron sm:hidden">
            Festival
          </span>
        </Link>
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-saffron transition-colors">Home</Link>
          <Link href="/days" className="hover:text-saffron transition-colors">7 Days</Link>
          <Link href="/updates" className="hover:text-saffron transition-colors">Updates</Link>
          <Link href="/gallery" className="hover:text-saffron transition-colors">Gallery</Link>
          <Link href="/nimajjanam" className="hover:text-saffron transition-colors">Nimajjanam</Link>
        </nav>
      </div>
    </header>
  );
}
