'use client';

import UserManagement from '@/components/admin/UserManagement';
import Material from '@/components/admin/Material';
import PriceSection from '@/components/admin/PriceSection';
import PanelHeader from '@/components/PanelHeader';

export default function AdminPage() {
  return (
    <div className="container mx-auto max-w-4xl">
      <PanelHeader title="Admin Panel" />

      {/* User Management */}
      <UserManagement />

      {/* Material */}
      <Material />

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