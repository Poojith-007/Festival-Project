'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAdminAuth } from '../../context/AdminAuthContext';

export default function AdminAuthBoundary({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAdmin, loading, configured, error } = useAdminAuth();

  useEffect(() => {
    if (!loading && configured && pathname !== '/admin/login' && (!user || !isAdmin)) {
      router.replace('/admin/login');
    }
  }, [configured, isAdmin, loading, pathname, router, user]);

  if (pathname === '/admin/login') return children;

  if (!configured) {
    return (
      <div className="min-h-screen bg-[#FFF9F0] p-6 flex items-center justify-center">
        <div className="max-w-lg rounded-2xl border border-[#E8B973]/50 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-[#F05A0A] mb-3">Admin setup required</h1>
          <p className="text-sm text-[#2D1B11]/75">{error}</p>
        </div>
      </div>
    );
  }

  if (loading || !user || !isAdmin) {
    return <div className="min-h-screen bg-[#FFF9F0] flex items-center justify-center text-sm font-semibold text-[#F05A0A]">Checking admin access...</div>;
  }

  return children;
}
