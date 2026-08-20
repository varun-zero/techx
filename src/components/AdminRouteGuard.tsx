'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/context/AdminContext';

interface AdminRouteGuardProps {
  children: React.ReactNode;
}

export default function AdminRouteGuard({ children }: AdminRouteGuardProps) {
  const { isAdmin, isLoading } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if we're not loading and not admin
    if (!isLoading && !isAdmin) {
      router.push('/admin/login');
    }
  }, [isAdmin, isLoading, router]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen font-courier text-uc-cream bg-uc-navy">
        <div className="text-center">
          <p className="text-lg mb-4 text-uc-gold font-bold">Verifying expedition clearance...</p>
          <div className="w-10 h-10 border-4 border-stone-800 border-t-uc-gold rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  // If not admin, show redirecting message
  if (!isAdmin) {
    return (
      <div className="flex justify-center items-center min-h-screen font-courier text-uc-cream bg-uc-navy">
        <p className="text-stone-300">Redirecting to administrator checkpoint...</p>
      </div>
    );
  }

  return <>{children}</>;
}
