"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProductForm;
const react_1 = __importStar(require("react"));
const ImageUpload_1 = __importDefault(require("@/components/ImageUpload"));
function ProductForm({ initialData = {}, onSubmit, onCancel, submitLabel = 'Create Product' }) {
    const [materials, setMaterials] = (0, react_1.useState)([]);
    const [sizeInput, setSizeInput] = (0, react_1.useState)('');
    const [formData, setFormData] = (0, react_1.useState)(() => ({
        name: initialData.name || '',
        size: Array.isArray(initialData.size) ? initialData.size : [],
        material: Array.isArray(initialData.material) ? initialData.material : [],
        printing: Array.isArray(initialData.printing) ? initialData.printing : [],
        storeType: Array.isArray(initialData.storeType) ? initialData.storeType : ['Null'],
        surface: initialData.surface || '',
        lamination: initialData.lamination || '',
        finishing: initialData.finishing || '',
        quantity: initialData.quantity || 0,
        pricing: initialData.pricing || 0,
        description: initialData.description || '',
        image: initialData.image || ''
    }));
    (0, react_1.useEffect)(() => {
        const fetchMaterials = async () => {
            try {
                const response = await fetch('/data/materials.json');
                const data = await response.json();
                setMaterials(data.materials || []);
            }
            catch (error) {
                console.error('Error fetching materials:', error);
            }
        };
        fetchMaterials();
    }, []);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => (Object.assign(Object.assign({}, prev), { [name]: name === 'pricing' ? parseFloat(value) || 0 : value })));
    };
    const handleMultiSelect = (name, value) => {
        setFormData(prev => (Object.assign(Object.assign({}, prev), { [name]: prev[name].includes(value)
                ? prev[name].filter(item => item !== value)
                : [...prev[name], value] })));
    };
    const removeSelectedItem = (name, value) => {
        setFormData(prev => (Object.assign(Object.assign({}, prev), { [name]: prev[name].filter(item => item !== value) })));
    };
    const handleSizeKeyDown = (e) => {
        if (e.key === 'Enter' && sizeInput.trim()) {
            e.preventDefault();
            setFormData(prev => (Object.assign(Object.assign({}, prev), { size: [...prev.size, sizeInput.trim()] })));
            setSizeInput('');
        }
    };
    const removeSize = (index) => {
        setFormData(prev => (Object.assign(Object.assign({}, prev), { size: prev.size.filter((_, i) => i !== index) })));
    };
    const handleStoreTypeSelect = (value) => {
        if (value === 'All') {
            setFormData(prev => (Object.assign(Object.assign({}, prev), { storeType: ['Null', 'A', 'B', 'C'] })));
        }
        else {
            setFormData(prev => (Object.assign(Object.assign({}, prev), { storeType: prev.storeType.includes(value)
                    ? prev.storeType.filter(type => type !== value)
                    : [...prev.storeType, value] })));
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };
    return (<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Form Section */}
      <div className="lg:col-span-2">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name
              </label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" required/>
            </div>

            <div>
              <div className='flex gap-2'>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Size
                  </label>
                  <div className="space-y-2">
                    <input type="text" value={sizeInput} onChange={(e) => setSizeInput(e.target.value)} onKeyDown={handleSizeKeyDown} placeholder="Enter size and press Enter" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"/>
                    {formData.size.length > 0 && (<div className="flex flex-wrap gap-2 mt-2">
                        {formData.size.map((size, index) => (<div key={index} className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                            <span>{size}</span>
                            <button type="button" onClick={() => removeSize(index)} className="text-gray-500 hover:text-gray-700">
                              ×
                            </button>
                          </div>))}
                      </div>)}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} min="0" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" required/>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Materials
              </label>
              <div className="space-y-2">
                <select name="material" value="" onChange={(e) => handleMultiSelect('material', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option value="">Select Material</option>
                  {materials
            .filter(material => material.materialSegment === 'roll' || material.materialSegment === 'sheet')
            .map(material => (<option key={material.id} value={material.id} disabled={formData.material.includes(material.id)}>
                        {material.name}
                      </option>))}
                </select>
                {formData.material.length > 0 && (<div className="mt-2 space-y-2">
                    {formData.material.map(materialId => {
                const material = materials.find(m => m.id === materialId);
                return material ? (<div key={materialId} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md">
                          <span className="text-sm">{material.name}</span>
                          <button type="button" onClick={() => removeSelectedItem('material', materialId)} className="text-red-500 hover:text-red-700">
                            ×
                          </button>
                        </div>) : null;
            })}
                  </div>)}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Printers
              </label>
              <div className="space-y-2">
                <select name="printer" value="" onChange={(e) => handleMultiSelect('printing', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option value="">Select Printer</option>
                  {materials
            .filter(material => material.materialSegment === 'printer')
            .map(material => (<option key={material.id} value={material.id} disabled={formData.printing.includes(material.id)}>
                        {material.name}
                      </option>))}
                </select>
                {formData.printing.length > 0 && (<div className="mt-2 space-y-2">
                    {formData.printing.map(printerId => {
                const printer = materials.find(m => m.id === printerId);
                return printer ? (<div key={printerId} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md">
                          <span className="text-sm">{printer.name}</span>
                          <button type="button" onClick={() => removeSelectedItem('printing', printerId)} className="text-red-500 hover:text-red-700">
                            ×
                          </button>
                        </div>) : null;
            })}
                  </div>)}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Store Type
              </label>
              <div className="space-y-2">
                <select name="storeType" value="" onChange={(e) => handleStoreTypeSelect(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option value="">Select Store Type</option>
                  {['Null', 'A', 'B', 'C', 'All'].map((type) => (<option key={type} value={type} disabled={formData.storeType.includes(type)}>
                      {type}
                    </option>))}
                </select>
                {formData.storeType.length > 0 && (<div className="mt-2 space-y-2">
                    {formData.storeType.map((type) => (<div key={type} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md">
                        <span className="text-sm">{type}</span>
                        <button type="button" onClick={() => handleStoreTypeSelect(type)} className="text-red-500 hover:text-red-700">
                          ×
                        </button>
                      </div>))}
                  </div>)}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Surface
              </label>
              <input type="text" name="surface" value={formData.surface} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" required/>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lamination
              </label>
              <input type="text" name="lamination" value={formData.lamination} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" required/>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Finisher
              </label>
              <div className="space-y-2">
                <select name="finisher" value="" onChange={(e) => handleMultiSelect('printing', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option value="">Select Finisher</option>
                  {materials
            .filter(material => material.materialSegment === 'finisher')
            .map(material => (<option key={material.id} value={material.id} disabled={formData.printing.includes(material.id)}>
                        {material.name}
                      </option>))}
                </select>
                {formData.printing.length > 0 && (<div className="mt-2 space-y-2">
                    {formData.printing.map(printerId => {
                const printer = materials.find(m => m.id === printerId);
                return printer ? (<div key={printerId} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md">
                          <span className="text-sm">{printer.name}</span>
                          <button type="button" onClick={() => removeSelectedItem('printing', printerId)} className="text-red-500 hover:text-red-700">
                            ×
                          </button>
                        </div>) : null;
            })}
                  </div>)}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pricing
              </label>
              <input type="number" name="pricing" value={formData.pricing} onChange={handleInputChange} step="0.01" min="0" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" required/>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea name="description" value={formData.description} onChange={handleInputChange} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" required/>
          </div>

          <div className="flex justify-end gap-4">
            <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
              {submitLabel}
            </button>
          </div>
        </form>
      </div>

      {/* Image Upload Section */}
      <div className="lg:col-span-1">
        <div className="sticky top-6">
          <ImageUpload_1.default value={formData.image} onChange={(value) => setFormData(prev => (Object.assign(Object.assign({}, prev), { image: value })))} onError={(error) => console.error(error)} label="Product Image" maxSize={2 * 1024 * 1024} // 2MB
     accept={['image/jpeg', 'image/png', 'image/webp']}/>
        </div>
      </div>
    </div>);
}
