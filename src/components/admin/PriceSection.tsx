'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface PriceItem {
  _id: string;
  name: string;
  price: number;
  type: string;
  createdAt: string;
}

interface PriceSectionProps {
  title: string;
  itemName: string;
}

export default function PriceSection({ title, itemName }: PriceSectionProps) {
  const [items, setItems] = useState<PriceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState({
    name: '',
    price: ''
  });

  // Fetch items from database
  const fetchItems = async () => {
    try {
      console.log('Fetching items for type:', itemName);
      const response = await fetch(`/api/price-items?type=${itemName}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch items');
      }
      const data = await response.json();
      console.log('Fetched items:', data);
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to load items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [itemName]);

  // Add new item to database
  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Adding new item:', { ...newItem, type: itemName });
      const response = await fetch('/api/price-items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newItem,
          type: itemName
        }),
      });

      const data = await response.json();
      console.log('Add item response:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add item');
      }

      setItems([data, ...items]);
      setNewItem({ name: '', price: '' });
      toast.success('Item added successfully');
    } catch (error) {
      console.error('Error adding item:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to add item';
      toast.error(errorMessage);
    }
  };

  // Delete item from database
  const handleDeleteItem = async (id: string) => {
    try {
      console.log('Deleting item:', id);
      const response = await fetch(`/api/price-items/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete item');
      }

      setItems(items.filter(item => item._id !== id));
      toast.success('Item deleted successfully');
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to delete item');
    }
  };

  if (loading) {
    return <div>Loading {title.toLowerCase()}...</div>;
  }

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">{title} Management</h2>
      
      {/* Add Item Form */}
      <form onSubmit={handleAddItem} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder={`${title} Name`}
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="border rounded p-2"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            className="border rounded p-2"
            required
            min="0"
            step="0.01"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add {title}
        </button>
      </form>

      {/* Items List */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">${item.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDeleteItem(item._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 