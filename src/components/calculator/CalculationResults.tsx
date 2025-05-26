'use client';

import { CalculatorFormData } from './CalculatorForm';

interface CalculationResultsProps {
  formData: CalculatorFormData;
  totalPrice: number;
}

export default function CalculationResults({ formData, totalPrice }: CalculationResultsProps) {
  const calculateArea = () => {
    return (formData.width * formData.height) / 1000000; // Convert mm² to m²
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  return (
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
        </div>
      </div>
    </div>
  );
} 