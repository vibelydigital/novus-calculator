'use client';

import { CalculatorFormData } from './CalculatorForm';
import jsPDF from 'jspdf';

interface CalculatorActionsProps {
  formData: CalculatorFormData;
  totalPrice: number;
  onSave: () => void;
}

export default function CalculatorActions({ formData, totalPrice, onSave }: CalculatorActionsProps) {
  const handleDownloadPDF = async () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let y = 20;

    // Title
    doc.setFontSize(20);
    doc.text('Price Calculation', pageWidth / 2, y, { align: 'center' });
    y += 20;

    // Calculation Name
    doc.setFontSize(14);
    doc.text(`Calculation Name: ${formData.calculationName || 'Untitled'}`, margin, y);
    y += 10;

    // Dimensions
    doc.setFontSize(12);
    doc.text(`Dimensions: ${formData.width}mm x ${formData.height}mm`, margin, y);
    y += 10;

    // Area
    const area = (formData.width * formData.height) / 1000000;
    doc.text(`Area: ${area.toFixed(2)} m²`, margin, y);
    y += 10;

    // Materials and Services
    doc.text('Selected Options:', margin, y);
    y += 10;
    doc.text(`Material: ${formData.material || 'Not selected'}`, margin, y);
    y += 7;
    doc.text(`Print: ${formData.print || 'Not selected'}`, margin, y);
    y += 7;
    doc.text(`Lamination: ${formData.lamination || 'Not selected'}`, margin, y);
    y += 7;
    doc.text(`Finishing: ${formData.finishing || 'Not selected'}`, margin, y);
    y += 7;
    doc.text(`Quantity: ${formData.quantity}`, margin, y);
    y += 15;

    // Cost Breakdown
    doc.setFontSize(14);
    doc.text('Cost Breakdown:', margin, y);
    y += 10;

    doc.setFontSize(12);
    const materialCost = totalPrice * 0.4;
    const printCost = totalPrice * 0.2;
    const laminationCost = totalPrice * 0.15;
    const finishingCost = totalPrice * 0.15;

    doc.text(`Material Cost: ${formatPrice(materialCost)}`, margin, y);
    y += 7;
    doc.text(`Print Cost: ${formatPrice(printCost)}`, margin, y);
    y += 7;
    doc.text(`Lamination Cost: ${formatPrice(laminationCost)}`, margin, y);
    y += 7;
    doc.text(`Finishing Cost: ${formatPrice(finishingCost)}`, margin, y);
    y += 15;

    // Total
    doc.setFontSize(16);
    doc.text(`Total Price: ${formatPrice(totalPrice)}`, margin, y);

    // Save the PDF
    doc.save(`calculation-${formData.calculationName || 'untitled'}.pdf`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-8">
      <button
        onClick={onSave}
        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 flex-1"
      >
        Save Calculation
      </button>
      <button
        onClick={handleDownloadPDF}
        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 flex-1"
      >
        Download PDF
      </button>
    </div>
  );
} 