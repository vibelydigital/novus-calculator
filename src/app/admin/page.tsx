'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import UserManagement from '@/components/admin/UserManagement';
import Material from '@/components/admin/Material';
import PriceSection from '@/components/admin/PriceSection';
import PanelHeader from '@/components/PanelHeader';

export default function AdminPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="container mx-auto max-w-4xl">
      <PanelHeader title="Admin Panel" />

      {/* User Management */}
      <UserManagement />

      {/* Material */}
      <Material />
      {/* <PriceSection title="Materials" itemName="materials" /> */}

      {/* Print */}
      <PriceSection title="Print" itemName="print" />

      {/* Lamination */}
      <PriceSection title="Lamination" itemName="lamination" />

      {/* Finishing */}
      <PriceSection title="Finishing" itemName="finishing" />

      {/* Packing */}
      <PriceSection title="Packing" itemName="packing" />

      {/* Installation */}
      <PriceSection title="Installation" itemName="installation" />
    </div>
  );
}