"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AdminCards;
const link_1 = __importDefault(require("next/link"));
const outline_1 = require("@heroicons/react/24/outline");
function AdminCards({ stats }) {
    return (<div className="nt-component nt-admin-cards">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.orders}</p>
              </div>
              <outline_1.ShoppingCartIcon className="h-8 w-8 text-gray-400"/>
            </div>
            <link_1.default href="/orders/add" className="mt-4 text-sm text-gray-600 hover:text-gray-900">
              Add New Order →
            </link_1.default>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.products}</p>
              </div>
              <outline_1.CubeIcon className="h-8 w-8 text-gray-400"/>
            </div>
            <link_1.default href="/products/add" className="mt-4 text-sm text-gray-600 hover:text-gray-900">
              Add New Product →
            </link_1.default>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Stores</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.stores}</p>
              </div>
              <outline_1.BuildingStorefrontIcon className="h-8 w-8 text-gray-400"/>
            </div>
            <link_1.default href="/stores/add" className="mt-4 text-sm text-gray-600 hover:text-gray-900">
              Add New Store →
            </link_1.default>
          </div>
        </div>
    </div>);
}
