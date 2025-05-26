'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface PanelHeaderProps {
  title: string;
  showLogout?: boolean;
}

export default function PanelHeader({ title, showLogout = true }: PanelHeaderProps) {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <div className="flex justify-between items-center mb-4 md:mb-8">
      <h1 className="text-xl md:text-3xl font-bold text-gray-800">{title}</h1>
      {showLogout && (
        <button 
          onClick={handleLogout}
          className="inline-flex items-center justify-center font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 text-sm md:text-base"
        >
          Logout
        </button>
      )}
    </div>
  );
} 