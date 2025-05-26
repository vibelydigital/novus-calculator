'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface Material {
  _id: string;
  name: string;
  price: number;
}

export default function Material() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMaterial, setNewMaterial] = useState({
    name: '',
    price: 0
  });

  // Fetch materials
  const fetchMaterials = async () => {
    try {
      const response = await fetch('/api/materials');
      if (!response.ok) throw new Error('Failed to fetch materials');
      const data = await response.json();
      setMaterials(data);
    } catch (error) {
      toast.error('Failed to load materials');
      console.error('Error fetching materials:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  // Add new material
  const handleAddMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/materials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMaterial),
      });

      if (!response.ok) throw new Error('Failed to add material');

      const addedMaterial = await response.json();
      setMaterials([addedMaterial, ...materials]);
      setNewMaterial({ name: '', price: 0 });
      toast.success('Material added successfully');
    } catch (error) {
      toast.error('Failed to add material');
      console.error('Error adding material:', error);
    }
  };

  // Delete material
  const handleDeleteMaterial = async (id: string) => {
    try {
      const response = await fetch(`/api/materials/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete material');

      setMaterials(materials.filter(material => material._id !== id));
      toast.success('Material deleted successfully');
    } catch (error) {
      toast.error('Failed to delete material');
      console.error('Error deleting material:', error);
    }
  };

  if (loading) {
    return <div>Loading materials...</div>;
  }

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Materials</h2>
      
      {/* Add Material Form */}
      <form onSubmit={handleAddMaterial} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Material Name"
            value={newMaterial.name}
            onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
            className="border rounded p-2"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={newMaterial.price}
            onChange={(e) => setNewMaterial({ ...newMaterial, price: Number(e.target.value) })}
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
          Add Material
        </button>
      </form>

      {/* Materials List */}
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
            {materials.map((material) => (
              <tr key={material._id}>
                <td className="px-6 py-4 whitespace-nowrap">{material.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">€{material.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDeleteMaterial(material._id)}
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