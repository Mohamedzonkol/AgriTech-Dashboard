// app/equipment/page.tsx
import type { Metadata } from 'next';
import EquipmentPage from '@/pages/EquipmentPage';

export const metadata: Metadata = {
  title: 'Equipment Dashboard',
  description: 'View and manage your equipment status',
};

export default async function EquipmentRoute() {
  
  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <EquipmentPage  />
      </div>
    </main>
  );
}