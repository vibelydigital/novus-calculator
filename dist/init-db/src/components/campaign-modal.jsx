"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CampaignModal;
const outline_1 = require("@heroicons/react/24/outline");
function CampaignModal({ show, onClose, onSubmit, formData, setFormData, isEditing }) {
    if (!show)
        return null;
    return (<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            {isEditing ? 'Edit Campaign' : 'Add New Campaign'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <outline_1.XMarkIcon className="h-6 w-6"/>
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Campaign Name</label>
            <input type="text" value={formData.campaignName} onChange={(e) => setFormData(Object.assign(Object.assign({}, formData), { campaignName: e.target.value }))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm" required/>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Country</label>
            <input type="text" value={formData.country} onChange={(e) => setFormData(Object.assign(Object.assign({}, formData), { country: e.target.value }))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm" required/>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Assigned To</label>
            <input type="text" value={formData.assigned} onChange={(e) => setFormData(Object.assign(Object.assign({}, formData), { assigned: e.target.value }))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm" required/>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">User Type</label>
            <input type="text" value={formData.userType} onChange={(e) => setFormData(Object.assign(Object.assign({}, formData), { userType: e.target.value }))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm" required/>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Creating Date</label>
            <input type="date" value={formData.creatingDate} onChange={(e) => setFormData(Object.assign(Object.assign({}, formData), { creatingDate: e.target.value }))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm" required/>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input type="date" value={formData.startDate} onChange={(e) => setFormData(Object.assign(Object.assign({}, formData), { startDate: e.target.value }))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm" required/>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input type="date" value={formData.endDate} onChange={(e) => setFormData(Object.assign(Object.assign({}, formData), { endDate: e.target.value }))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm" required/>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select value={formData.status} onChange={(e) => setFormData(Object.assign(Object.assign({}, formData), { status: e.target.value }))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm" required>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Total Cost</label>
            <input type="number" value={formData.totalCost} onChange={(e) => setFormData(Object.assign(Object.assign({}, formData), { totalCost: e.target.value }))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm" required/>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Invoice Status</label>
            <select value={formData.invoiceStatus} onChange={(e) => setFormData(Object.assign(Object.assign({}, formData), { invoiceStatus: e.target.value }))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm" required>
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-md">
              {isEditing ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>);
}
