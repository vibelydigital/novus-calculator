'use client';

import { useState } from 'react';

interface CalculatorFormProps {
  onCalculate: (data: CalculatorFormData) => void;
}

export interface CalculatorFormData {
  printingChannel: string;
  width: number;
  height: number;
  material: string;
  print: string;
  lamination: string;
  finishing: string;
  quantity: number;
  calculationName: string;
}

export default function CalculatorForm({ onCalculate }: CalculatorFormProps) {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'width' || name === 'height' || name === 'quantity' ? Number(value) : value
    }));
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col space-y-1.5 p-4 md:p-6">
        <h3 className="font-semibold tracking-tight text-lg md:text-xl">Calculate Price</h3>
      </div>
      <div className="p-4 md:p-6">
        <div className="space-y-4 md:space-y-6">
          {/* Printing Channel */}
          <div className="space-y-1 md:space-y-2">
            <label className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm md:text-base" htmlFor="printing-channel">
              Printing Channel
            </label>
            <button
              type="button"
              role="combobox"
              aria-controls="radix-:r1:"
              aria-expanded="false"
              aria-autocomplete="none"
              dir="ltr"
              data-state="closed"
              data-placeholder=""
              className="flex items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full h-8 md:h-10 text-sm md:text-base"
              id="printing-channel"
            >
              <span style={{ pointerEvents: 'none' }}>Select printing channel</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 opacity-50" aria-hidden="true">
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </button>
          </div>

          {/* Size */}
          <div className="space-y-1 md:space-y-2">
            <label className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm md:text-base">Size</label>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <input
                  type="number"
                  name="width"
                  value={formData.width}
                  onChange={handleChange}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1 text-sm md:text-base h-8 md:h-10"
                  min="0"
                  placeholder="Width (mm)"
                />
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1 text-sm md:text-base h-8 md:h-10"
                  min="0"
                  placeholder="Height (mm)"
                />
              </div>
            </div>
          </div>

          {/* Material */}
          <div className="space-y-1 md:space-y-2">
            <label className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm md:text-base" htmlFor="material">Material</label>
            <select
              id="material"
              name="material"
              value={formData.material}
              onChange={handleChange}
              className="w-full px-2 py-1.5 md:px-3 md:py-2 bg-white border border-gray-200 rounded-md text-sm md:text-base text-gray-900 transition-all duration-200 hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value="">Select material</option>
              <option value="1748160549802">Demo material name - $12</option>
            </select>
          </div>

          {/* Print */}
          <div className="space-y-1 md:space-y-2">
            <label className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm md:text-base" htmlFor="print">Print</label>
            <select
              id="print"
              name="print"
              value={formData.print}
              onChange={handleChange}
              className="w-full px-2 py-1.5 md:px-3 md:py-2 bg-white border border-gray-200 rounded-md text-sm md:text-base text-gray-900 transition-all duration-200 hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value="">Select print</option>
            </select>
          </div>

          {/* Lamination */}
          <div className="space-y-1 md:space-y-2">
            <label className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm md:text-base" htmlFor="lamination">Lamination</label>
            <select
              id="lamination"
              name="lamination"
              value={formData.lamination}
              onChange={handleChange}
              className="w-full px-2 py-1.5 md:px-3 md:py-2 bg-white border border-gray-200 rounded-md text-sm md:text-base text-gray-900 transition-all duration-200 hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value="">Select lamination</option>
            </select>
          </div>

          {/* Finishing */}
          <div className="space-y-1 md:space-y-2">
            <label className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm md:text-base" htmlFor="finishing">Finishing</label>
            <select
              id="finishing"
              name="finishing"
              value={formData.finishing}
              onChange={handleChange}
              className="w-full px-2 py-1.5 md:px-3 md:py-2 bg-white border border-gray-200 rounded-md text-sm md:text-base text-gray-900 transition-all duration-200 hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value="">Select finishing</option>
            </select>
          </div>

          {/* Quantity */}
          <div className="space-y-1 md:space-y-2">
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-sm md:text-base h-8 md:h-10 transition-all duration-200 focus:scale-[1.01]"
              min="0"
              placeholder="Enter quantity"
            />
          </div>

          {/* Calculation Name */}
          <div className="space-y-1 md:space-y-2">
            <input
              type="text"
              id="calculationName"
              name="calculationName"
              value={formData.calculationName}
              onChange={handleChange}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-sm md:text-base h-8 md:h-10 transition-all duration-200 focus:scale-[1.01]"
              placeholder="Enter calculation name"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 