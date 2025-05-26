'use client';

interface CalculatorHeaderProps {
  onLogout?: () => void;
}

export default function CalculatorHeader({ onLogout }: CalculatorHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-4 md:mb-8">
      <h1 className="text-xl md:text-3xl font-bold text-gray-900">Novus Calculator</h1>
      <button
        onClick={onLogout}
        className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 md:text-base"
      >
        Logout
      </button>
    </div>
  );
} 