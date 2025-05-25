"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProductionEditor;
const react_1 = __importDefault(require("react"));
const navigation_1 = require("next/navigation");
const outline_1 = require("@heroicons/react/24/outline");
const ImageUpload_1 = __importDefault(require("./ImageUpload"));
function ProductionEditor({ title, icon, item, loading, error, saving, onSave, additionalFields = [], }) {
    var _a;
    const router = (0, navigation_1.useRouter)();
    const [formData, setFormData] = react_1.default.useState({});
    react_1.default.useEffect(() => {
        if (item) {
            setFormData(item);
        }
    }, [item]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'dependencies') {
            setFormData(prev => (Object.assign(Object.assign({}, prev), { dependencies: value.split(',').map(d => d.trim()) })));
        }
        else {
            setFormData(prev => (Object.assign(Object.assign({}, prev), { [name]: value })));
        }
    };
    const handleImageChange = (imageUrl) => {
        setFormData(prev => (Object.assign(Object.assign({}, prev), { image: imageUrl })));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSave(formData);
    };
    if (loading) {
        return (<div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>);
    }
    if (error) {
        return (<div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>);
    }
    return (<div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {icon}
                <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
              </div>
              <button type="button" onClick={() => router.back()} className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                <outline_1.ArrowLeftIcon className="w-4 h-4 mr-2"/>
                Back
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left Column - Form Fields */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input type="text" name="name" id="name" value={formData.name || ''} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" required/>
                </div>

                {/* Additional Fields */}
                {additionalFields.map((field) => {
            var _a;
            return (<div key={field.name}>
                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                      {field.label}
                    </label>
                    {field.type === 'select' ? (<select name={field.name} id={field.name} value={formData[field.name] || ''} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" required={field.required}>
                        <option value="">Select {field.label}</option>
                        {(_a = field.options) === null || _a === void 0 ? void 0 : _a.map((option) => (<option key={option.value} value={option.value}>
                            {option.label}
                          </option>))}
                      </select>) : field.type === 'textarea' ? (<textarea name={field.name} id={field.name} rows={4} value={formData[field.name] || ''} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" required={field.required} placeholder={field.placeholder}/>) : (<input type={field.type} name={field.name} id={field.name} value={formData[field.name] || ''} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" required={field.required} placeholder={field.placeholder}/>)}
                  </div>);
        })}

                <div>
                  <label htmlFor="size" className="block text-sm font-medium text-gray-700">
                    Size
                  </label>
                  <input type="text" name="size" id="size" value={formData.size || ''} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" required/>
                </div>

                <div>
                  <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                    Color
                  </label>
                  <input type="text" name="color" id="color" value={formData.color || ''} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"/>
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <input type="number" name="price" id="price" value={formData.price || ''} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" required/>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea name="description" id="description" rows={4} value={formData.description || ''} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"/>
                </div>

                <div>
                  <label htmlFor="dependencies" className="block text-sm font-medium text-gray-700">
                    Dependencies (comma-separated)
                  </label>
                  <input type="text" name="dependencies" id="dependencies" value={((_a = formData.dependencies) === null || _a === void 0 ? void 0 : _a.join(', ')) || ''} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" placeholder="e.g. sheet, roll"/>
                </div>
              </div>

              {/* Right Column - Image Upload */}
              <div className="md:col-span-1">
                <div className="sticky top-6">
                  <ImageUpload_1.default value={formData.image} onChange={handleImageChange} onError={(error) => console.error(error)} label={`${title} Image`} maxSize={5} accept={["image/*"]}/>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => router.back()} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                Cancel
              </button>
              <button type="submit" disabled={saving} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed">
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>);
}
