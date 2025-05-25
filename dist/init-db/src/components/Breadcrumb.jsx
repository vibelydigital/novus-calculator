"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Breadcrumb;
const navigation_1 = require("next/navigation");
const link_1 = __importDefault(require("next/link"));
const outline_1 = require("@heroicons/react/24/outline");
const providers_1 = require("@/app/providers");
function Breadcrumb() {
    const pathname = (0, navigation_1.usePathname)();
    const { theme } = (0, providers_1.useTheme)();
    const generateBreadcrumbs = () => {
        const paths = pathname.split('/').filter(Boolean);
        const breadcrumbs = paths.map((path, index) => {
            const href = `/${paths.slice(0, index + 1).join('/')}`;
            const label = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
            return { href, label };
        });
        return breadcrumbs;
    };
    const breadcrumbs = generateBreadcrumbs();
    return (<nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <link_1.default href="/dashboard" className={`${theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}>
            <outline_1.HomeIcon className="h-5 w-5"/>
          </link_1.default>
        </li>
        {breadcrumbs.map((breadcrumb, index) => (<li key={breadcrumb.href} className="flex items-center">
            <outline_1.ChevronRightIcon className={`h-4 w-4 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}/>
            <link_1.default href={breadcrumb.href} className={`ml-2 text-sm font-medium ${index === breadcrumbs.length - 1
                ? theme === 'dark' ? 'text-white' : 'text-gray-900'
                : theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}>
              {breadcrumb.label}
            </link_1.default>
          </li>))}
      </ol>
    </nav>);
}
