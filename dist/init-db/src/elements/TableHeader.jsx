"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TableHeader;
const outline_1 = require("@heroicons/react/24/outline");
const link_1 = __importDefault(require("next/link"));
function TableHeader({ icon, title, searchTerm, onSearchChange, itemsPerPage, onItemsPerPageChange, totalItems, selectedCount = 0, onDelete, actionButton }) {
    return (<div id="nt-table-top" className="nt-table-top p-6 border-b">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          {icon}
          <h1 className="text-2xl font-bolds">{title}</h1>
        </div>
        <div className="flex items-center gap-4">
          {selectedCount > 0 && (<div className="flex items-center gap-2">
              {onDelete && (<button onClick={onDelete} className="p-2 rounded-md" title="Delete">
                  <outline_1.TrashIcon className="h-5 w-5"/>
                </button>)}
            </div>)}
          <select value={itemsPerPage} onChange={(e) => {
            onItemsPerPageChange(Number(e.target.value));
        }} className="rounded-md border shadow-sm focus:ring-2 focus:ring-offset-2 sm:text-sm">
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={50}>50 per page</option>
            <option value={100}>100 per page</option>
            <option value={totalItems}>All</option>
          </select>
          <div className="relative">
            <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => onSearchChange(e.target.value)} className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm"/>
            <outline_1.MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2"/>
          </div>
          {actionButton && (<link_1.default href={actionButton.href} onClick={actionButton.onClick} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium">
              {actionButton.label}
            </link_1.default>)}
        </div>
      </div>
    </div>);
}
