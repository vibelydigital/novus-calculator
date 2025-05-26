'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface PriceItem {
  id: string;
  name: string;
  price: number;
}

interface CalculatorData {
  print: PriceItem[];
  lamination: PriceItem[];
  finishing: PriceItem[];
  packing: PriceItem[];
  installation: PriceItem[];
}

export default function CalculatorForm() {
  const [loading, setLoading] = useState(true);
  const [calculatorData, setCalculatorData] = useState<CalculatorData>({
    print: [],
    lamination: [],
    finishing: [],
    packing: [],
    installation: []
  });
  const [formData, setFormData] = useState({
    width: '',
    height: '',
    quantity: '',
    print: '',
    lamination: '',
    finishing: '',
    packing: '',
    installation: ''
  });
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch calculator data
  useEffect(() => {
    const fetchCalculatorData = async () => {
      try {
        const response = await fetch('/api/calculator');
        if (!response.ok) throw new Error('Failed to fetch calculator data');
        const data = await response.json();
        setCalculatorData(data);
      } catch (error) {
        toast.error('Failed to load calculator data');
        console.error('Error fetching calculator data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCalculatorData();
  }, []);

  // Calculate total price
  const calculatePrice = () => {
    const width = parseFloat(formData.width);
    const height = parseFloat(formData.height);
    const quantity = parseInt(formData.quantity);

    if (isNaN(width) || isNaN(height) || isNaN(quantity)) {
      setTotalPrice(0);
      return;
    }

    const area = width * height;
    let total = 0;

    // Calculate print cost
    if (formData.print) {
      const printItem = calculatorData.print.find(item => item.id === formData.print);
      if (printItem) {
        total += printItem.price * area * quantity;
      }
    }

    // Calculate lamination cost
    if (formData.lamination) {
      const laminationItem = calculatorData.lamination.find(item => item.id === formData.lamination);
      if (laminationItem) {
        total += laminationItem.price * area * quantity;
      }
    }

    // Calculate finishing cost
    if (formData.finishing) {
      const finishingItem = calculatorData.finishing.find(item => item.id === formData.finishing);
      if (finishingItem) {
        total += finishingItem.price * quantity;
      }
    }

    // Calculate packing cost
    if (formData.packing) {
      const packingItem = calculatorData.packing.find(item => item.id === formData.packing);
      if (packingItem) {
        total += packingItem.price * quantity;
      }
    }

    // Calculate installation cost
    if (formData.installation) {
      const installationItem = calculatorData.installation.find(item => item.id === formData.installation);
      if (installationItem) {
        total += installationItem.price * quantity;
      }
    }

    setTotalPrice(total);
  };

  // Update form data and recalculate
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Recalculate when form data changes
  useEffect(() => {
    calculatePrice();
  }, [formData]);

  if (loading) {
    return <div>Loading calculator data...</div>;
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Price Calculator</h2>
      
      <form className="space-y-4">
        {/* Dimensions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Width (mm)</label>
            <input
              type="number"
              name="width"
              value={formData.width}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              min="0"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Height (mm)</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              min="0"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              min="1"
            />
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Print Type</label>
            <select
              name="print"
              value={formData.print}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select Print Type</option>
              {calculatorData.print.map(item => (
                <option key={item.id} value={item.id}>
                  {item.name} (${item.price.toFixed(2)}/m²)
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Lamination</label>
            <select
              name="lamination"
              value={formData.lamination}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select Lamination</option>
              {calculatorData.lamination.map(item => (
                <option key={item.id} value={item.id}>
                  {item.name} (${item.price.toFixed(2)}/m²)
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Finishing</label>
            <select
              name="finishing"
              value={formData.finishing}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select Finishing</option>
              {calculatorData.finishing.map(item => (
                <option key={item.id} value={item.id}>
                  {item.name} (${item.price.toFixed(2)}/piece)
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Packing</label>
            <select
              name="packing"
              value={formData.packing}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select Packing</option>
              {calculatorData.packing.map(item => (
                <option key={item.id} value={item.id}>
                  {item.name} (${item.price.toFixed(2)}/piece)
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Installation</label>
            <select
              name="installation"
              value={formData.installation}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select Installation</option>
              {calculatorData.installation.map(item => (
                <option key={item.id} value={item.id}>
                  {item.name} (${item.price.toFixed(2)}/piece)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Total Price */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900">Total Price</h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">
            ${totalPrice.toFixed(2)}
          </p>
        </div>
      </form>
    </div>
  );
} 