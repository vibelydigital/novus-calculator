"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CampaignTable;
const link_1 = __importDefault(require("next/link"));
const outline_1 = require("@heroicons/react/24/outline");
const providers_1 = require("@/app/providers");
function CampaignTable({ campaigns, onEdit, onDelete }) {
    const { theme } = (0, providers_1.useTheme)();
    return (<div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow`}>
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Header */}
          <div className={`flex ${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'} border-b`}>
            <div className={`w-32 flex-shrink-0 px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>ID</div>
            <div className={`w-48 flex-shrink-0 px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>Campaign Name</div>
            <div className={`w-32 flex-shrink-0 px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>Country</div>
            <div className={`w-32 flex-shrink-0 px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>Assigned</div>
            <div className={`w-32 flex-shrink-0 px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>User Type</div>
            <div className={`w-32 flex-shrink-0 px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>Creating Date</div>
            <div className={`w-32 flex-shrink-0 px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>Start Date</div>
            <div className={`w-32 flex-shrink-0 px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>End Date</div>
            <div className={`w-32 flex-shrink-0 px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>Status</div>
            <div className={`w-32 flex-shrink-0 px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>Total Cost</div>
            <div className={`w-32 flex-shrink-0 px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>Invoice Status</div>
            <div className={`w-32 flex-shrink-0 px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>Actions</div>
          </div>

          {/* Rows */}
          <div className={`divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {campaigns.map((campaign) => (<div key={campaign.campaignId} className="flex">
                <div className={`w-32 flex-shrink-0 px-6 py-3 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>{campaign.campaignId}</div>
                <div className={`w-48 flex-shrink-0 px-6 py-3 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>
                  <link_1.default href={`/campaigns/campaign-summary?id=${campaign.campaignId}`} className={`${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-900'}`}>
                    {campaign.campaignName}
                  </link_1.default>
                </div>
                <div className={`w-32 flex-shrink-0 px-6 py-3 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>{campaign.country}</div>
                <div className={`w-32 flex-shrink-0 px-6 py-3 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>{campaign.assigned}</div>
                <div className={`w-32 flex-shrink-0 px-6 py-3 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>{campaign.userType}</div>
                <div className={`w-32 flex-shrink-0 px-6 py-3 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>{campaign.creatingDate}</div>
                <div className={`w-32 flex-shrink-0 px-6 py-3 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>{campaign.startDate}</div>
                <div className={`w-32 flex-shrink-0 px-6 py-3 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>{campaign.endDate}</div>
                <div className="w-32 flex-shrink-0 px-6 py-3 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${campaign.status === 'Active'
                ? theme === 'dark' ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
                : theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'}`}>
                    {campaign.status}
                  </span>
                </div>
                <div className={`w-32 flex-shrink-0 px-6 py-3 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>
                  ${campaign.totalCost.toLocaleString()}
                </div>
                <div className="w-32 flex-shrink-0 px-6 py-3 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${campaign.invoiceStatus === 'Paid'
                ? theme === 'dark' ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
                : campaign.invoiceStatus === 'Pending'
                    ? theme === 'dark' ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800'
                    : theme === 'dark' ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800'}`}>
                    {campaign.invoiceStatus}
                  </span>
                </div>
                <div className={`w-32 flex-shrink-0 px-6 py-3 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>
                  <div className="flex space-x-2">
                    <button onClick={() => onEdit(campaign)} className={`${theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'}`}>
                      <outline_1.PencilIcon className="h-5 w-5"/>
                    </button>
                    <button onClick={() => onDelete(campaign.campaignId)} className={`${theme === 'dark' ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-900'}`}>
                      <outline_1.TrashIcon className="h-5 w-5"/>
                    </button>
                  </div>
                </div>
              </div>))}
          </div>
        </div>
      </div>
    </div>);
}
