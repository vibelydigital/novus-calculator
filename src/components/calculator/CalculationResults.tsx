'use client';

import { useState } from 'react';
import { CalculatorFormData } from './CalculatorForm';
import CalculatorActions from './CalculatorActions';

interface SavedCalculation {
  id: string;
  name: string;
  data: CalculatorFormData;
  totalPrice: number;
  timestamp: string;
}

interface CalculationResultsProps {
  formData: CalculatorFormData;
  totalPrice: number;
}

export default function CalculationResults({ formData, totalPrice }: CalculationResultsProps) {
  const [calculationName, setCalculationName] = useState('');
  const [savedCalculations, setSavedCalculations] = useState<SavedCalculation[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('savedCalculations');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const calculateArea = () => {
    return (formData.width * formData.height) / 1000000; // Convert mm² to m²
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const handleSave = () => {
    if (!calculationName) {
      alert('Please enter a calculation name');
      return;
    }

    const newCalculation: SavedCalculation = {
      id: Date.now().toString(),
      name: calculationName,
      data: { ...formData },
      totalPrice,
      timestamp: new Date().toISOString()
    };

    setSavedCalculations(prev => [...prev, newCalculation]);
    localStorage.setItem('savedCalculations', JSON.stringify([...savedCalculations, newCalculation]));
    setCalculationName('');
    alert('Calculation saved successfully!');
  };

  const handleDelete = (id: string) => {
    const updated = savedCalculations.filter(calc => calc.id !== id);
    setSavedCalculations(updated);
    localStorage.setItem('savedCalculations', JSON.stringify(updated));
  };

  return (
    <div className="space-y-8">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-4 md:p-6">
          <h3 className="font-semibold tracking-tight text-lg md:text-xl">Calculation Results</h3>
        </div>
        <div className="p-4 md:p-6">
          <div className="space-y-4">
            {/* Area */}
            <div className="flex justify-between items-center">
              <span className="text-sm md:text-base text-gray-600">Area:</span>
              <span className="text-sm md:text-base font-medium">{calculateArea().toFixed(2)} m²</span>
            </div>

            {/* Material Cost */}
            <div className="flex justify-between items-center">
              <span className="text-sm md:text-base text-gray-600">Material Cost:</span>
              <span className="text-sm md:text-base font-medium">{formatPrice(totalPrice * 0.4)}</span>
            </div>

            {/* Print Cost */}
            <div className="flex justify-between items-center">
              <span className="text-sm md:text-base text-gray-600">Print Cost:</span>
              <span className="text-sm md:text-base font-medium">{formatPrice(totalPrice * 0.2)}</span>
            </div>

            {/* Lamination Cost */}
            <div className="flex justify-between items-center">
              <span className="text-sm md:text-base text-gray-600">Lamination Cost:</span>
              <span className="text-sm md:text-base font-medium">{formatPrice(totalPrice * 0.15)}</span>
            </div>

            {/* Finishing Cost */}
            <div className="flex justify-between items-center">
              <span className="text-sm md:text-base text-gray-600">Finishing Cost:</span>
              <span className="text-sm md:text-base font-medium">{formatPrice(totalPrice * 0.15)}</span>
            </div>

            {/* Quantity */}
            <div className="flex justify-between items-center">
              <span className="text-sm md:text-base text-gray-600">Quantity:</span>
              <span className="text-sm md:text-base font-medium">{formData.quantity}</span>
            </div>

            {/* Total Price */}
            <div className="flex justify-between items-center pt-4 border-t">
              <span className="text-base md:text-lg font-semibold">Total Price:</span>
              <span className="text-base md:text-lg font-bold text-blue-600">{formatPrice(totalPrice)}</span>
            </div>

            {/* Save Calculation */}
            <div className="pt-4 border-t">
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={calculationName}
                  onChange={(e) => setCalculationName(e.target.value)}
                  placeholder="Enter calculation name"
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <CalculatorActions 
                formData={formData} 
                totalPrice={totalPrice} 
                onSave={handleSave}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Saved Calculations */}
      {savedCalculations.length > 0 && (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-4 md:p-6">
            <h3 className="font-semibold tracking-tight text-lg md:text-xl">Saved Calculations</h3>
          </div>
          <div className="p-4 md:p-6">
            <div className="space-y-4">
              {savedCalculations.map(calc => (
                <div key={calc.id} className="flex justify-between items-center p-3 rounded-lg border">
                  <div>
                    <h4 className="font-medium">{calc.name}</h4>
                    <p className="text-sm text-gray-500">
                      {new Date(calc.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold">
                      {formatPrice(calc.totalPrice)}
                    </span>
                    <button
                      onClick={() => handleDelete(calc.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 