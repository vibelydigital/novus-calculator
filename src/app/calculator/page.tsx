'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CalculatorForm, { CalculatorFormData } from '@/components/calculator/CalculatorForm';
import CalculationResults from '@/components/calculator/CalculationResults';
import CalculatorHeader from '@/components/calculator/CalculatorHeader';

export default function CalculatorPage() {
  const router = useRouter();
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

  const handleCalculate = (data: CalculatorFormData) => {
    setFormData(data);
    
    // Calculate total price based on area and quantity
    const area = (data.width * data.height) / 1000000; // Convert mm² to m²
    const basePrice = area * 100; // €100 per m² as base price
    const quantityMultiplier = data.quantity > 100 ? 0.8 : data.quantity > 50 ? 0.85 : data.quantity > 20 ? 0.9 : 1;
    
    setTotalPrice(basePrice * data.quantity * quantityMultiplier);
  };

  const handleLogout = () => {
    // Clear any stored data
    localStorage.removeItem('savedCalculations');
    // Redirect to login page
    router.push('/login');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <CalculatorHeader onLogout={handleLogout} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CalculatorForm onCalculate={handleCalculate} />
        <CalculationResults formData={formData} totalPrice={totalPrice} />
      </div>
    </div>
  );
} 