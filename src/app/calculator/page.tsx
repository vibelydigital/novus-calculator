'use client';

import { useState } from 'react';
import CalculatorForm, { CalculatorFormData } from '@/components/calculator/CalculatorForm';
import CalculationResults from '@/components/calculator/CalculationResults';
import CalculatorActions from '@/components/calculator/CalculatorActions';

interface SavedCalculation {
  id: string;
  name: string;
  data: CalculatorFormData;
  totalPrice: number;
  timestamp: string;
}

export default function CalculatorPage() {
  const [formData, setFormData] = useState<CalculatorFormData>({
    printingChannel: '',
    width: 0,
    height: 0,
    material: '',
    print: '',
    lamination: '',
    finishing: '',
    quantity: 0,
    calculationName: ''
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const [savedCalculations, setSavedCalculations] = useState<SavedCalculation[]>([]);

  const handleCalculate = (data: CalculatorFormData) => {
    setFormData(data);
    
    // Calculate total price based on area and quantity
    const area = (data.width * data.height) / 1000000; // Convert mm² to m²
    const basePrice = area * 100; // €100 per m² as base price
    const quantityMultiplier = data.quantity > 100 ? 0.8 : data.quantity > 50 ? 0.85 : data.quantity > 20 ? 0.9 : 1;
    
    setTotalPrice(basePrice * data.quantity * quantityMultiplier);
  };

  const handleSaveCalculation = () => {
    if (!formData.calculationName) {
      alert('Please enter a calculation name');
      return;
    }

    const newCalculation: SavedCalculation = {
      id: Date.now().toString(),
      name: formData.calculationName,
      data: { ...formData },
      totalPrice,
      timestamp: new Date().toISOString()
    };

    setSavedCalculations(prev => [...prev, newCalculation]);
    
    // Save to localStorage
    const saved = JSON.parse(localStorage.getItem('savedCalculations') || '[]');
    localStorage.setItem('savedCalculations', JSON.stringify([...saved, newCalculation]));

    alert('Calculation saved successfully!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Price Calculator</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <CalculatorForm onCalculate={handleCalculate} />
          <CalculatorActions 
            formData={formData} 
            totalPrice={totalPrice} 
            onSave={handleSaveCalculation}
          />
        </div>
        <CalculationResults formData={formData} totalPrice={totalPrice} />
      </div>

      {/* Saved Calculations */}
      {savedCalculations.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Saved Calculations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedCalculations.map(calc => (
              <div key={calc.id} className="rounded-lg border bg-card p-4">
                <h3 className="font-medium">{calc.name}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(calc.timestamp).toLocaleDateString()}
                </p>
                <p className="mt-2 font-semibold">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'EUR'
                  }).format(calc.totalPrice)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 