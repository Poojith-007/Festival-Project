import Link from 'next/link';
import { Home, Calendar, Bell, Image as ImageIcon } from 'lucide-react';
import AdminAuthBoundary from '../../components/admin/AdminAuthBoundary';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthBoundary>
      <div className="min-h-screen bg-[#FFF9F0] flex flex-col md:flex-row">
        <div className="w-full md:w-64 bg-white border-r border-[#E8B973] p-4 flex flex-col gap-2">
          <h2 className="font-bold text-[#F05A0A] text-xl mb-4 px-2">Admin Panel</h2>
          <Link href="/admin" className="flex items-center gap-2 p-2 hover:bg-[#E8B973]/10 rounded-lg text-[#2D1B11]"><Home size={18}/> Dashboard</Link>
          <Link href="/admin/days" className="flex items-center gap-2 p-2 hover:bg-[#E8B973]/10 rounded-lg text-[#2D1B11]"><Calendar size={18}/> Manage Days</Link>
          <Link href="/admin/announcements" className="flex items-center gap-2 p-2 hover:bg-[#E8B973]/10 rounded-lg text-[#2D1B11]"><Bell size={18}/> Announcements</Link>
          <Link href="/admin/gallery" className="flex items-center gap-2 p-2 hover:bg-[#E8B973]/10 rounded-lg text-[#2D1B11]"><ImageIcon size={18}/> Gallery Upload</Link>
        </div>
        <div className="flex-1 p-6">
          {children}
        </div>
      </div>
    </AdminAuthBoundary>
  );
}
