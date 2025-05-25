"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Sidebar;
const react_1 = require("react");
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
const providers_1 = require("@/app/providers");
const outline_1 = require("@heroicons/react/24/outline");
const menuItems = [
    {
        name: 'Dashboard',
        href: '/dashboard',
        icon: outline_1.HomeIcon,
        submenu: []
    },
    {
        name: 'Messages',
        // href: '/messages', 
        icon: outline_1.EnvelopeIcon,
        submenu: [
            { name: 'All', href: '/messages', icon: outline_1.ShoppingBagIcon },
            { name: 'Inbox', href: '/messages/inbox', icon: outline_1.ViewColumnsIcon },
            { name: 'Sent', href: '/messages/sent', icon: outline_1.ClipboardDocumentCheckIcon },
        ]
    },
    {
        name: 'Products',
        href: '/products',
        icon: outline_1.ShoppingBagIcon,
        submenu: []
    },
    {
        name: 'Countries',
        href: '/countries',
        icon: outline_1.FlagIcon,
        submenu: []
    },
    {
        name: 'Stores',
        href: '/stores',
        icon: outline_1.BuildingStorefrontIcon,
        submenu: []
    },
    {
        name: 'Productions',
        href: '/productions',
        icon: outline_1.BuildingOffice2Icon,
        submenu: [
            { name: 'Materials', href: '/productions/materials', icon: outline_1.DocumentIcon },
            { name: 'Printers', href: '/productions/printers', icon: outline_1.PrinterIcon },
            { name: 'Finishers', href: '/productions/finishers', icon: outline_1.RectangleGroupIcon },
            { name: 'Others', href: '/productions/others', icon: outline_1.PuzzlePieceIcon },
        ]
    },
    {
        name: 'Templates',
        href: '/templates',
        icon: outline_1.ViewColumnsIcon,
        submenu: []
    },
    {
        name: 'Campaign',
        href: '/campaigns',
        icon: outline_1.ClipboardDocumentCheckIcon,
        submenu: []
    },
    {
        name: 'Currencies',
        href: '/currencies',
        icon: outline_1.CurrencyEuroIcon,
        submenu: []
    },
    {
        name: 'Users',
        href: '/users',
        icon: outline_1.UserIcon,
        submenu: []
    },
    {
        name: 'Invoice',
        href: '/invoice',
        icon: outline_1.PaperAirplaneIcon,
        submenu: []
    },
];
function Sidebar() {
    const pathname = (0, navigation_1.usePathname)();
    const [mounted, setMounted] = (0, react_1.useState)(false);
    const [expandedMenus, setExpandedMenus] = (0, react_1.useState)({});
    const { theme } = (0, providers_1.useTheme)();
    (0, react_1.useEffect)(() => {
        setMounted(true);
        // Initialize expanded state for menus with submenus
        const initialExpandedState = {};
        menuItems.forEach(item => {
            if (item.submenu.length > 0) {
                initialExpandedState[item.name] = pathname.startsWith(item.href);
            }
        });
        setExpandedMenus(initialExpandedState);
    }, [pathname]);
    const isActive = (href) => {
        if (!mounted)
            return false;
        return pathname === href || pathname.startsWith(href + '/');
    };
    const toggleSubmenu = (menuName) => {
        setExpandedMenus(prev => (Object.assign(Object.assign({}, prev), { [menuName]: !prev[menuName] })));
    };
    return (<aside className={`w-64 ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-r flex flex-col h-full`}>
      <div className={`flex items-center justify-center h-16 ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'} border-b`}>
        <h1 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>NovasAdmin</h1>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {menuItems.map(item => (<div key={item.name}>
            <div className={`flex items-center justify-between px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${isActive(item.href)
                ? theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
                : theme === 'dark' ? 'text-gray-300 hover:bg-gray-800 hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`} onClick={() => item.submenu.length > 0 ? toggleSubmenu(item.name) : null}>
              <div className="flex items-center">
                <item.icon className={`w-5 h-5 mr-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}/>
                {item.submenu.length > 0 ? (<span>{item.name}</span>) : (<link_1.default href={item.href} className="flex items-center">
                    <span>{item.name}</span>
                  </link_1.default>)}
              </div>
              {item.submenu.length > 0 && (expandedMenus[item.name] ?
                <outline_1.ChevronDownIcon className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}/> :
                <outline_1.ChevronRightIcon className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}/>)}
            </div>
            {item.submenu.length > 0 && expandedMenus[item.name] && (<div className="ml-8 mt-1 space-y-1">
                {item.submenu.map(subItem => (<link_1.default key={subItem.name} href={subItem.href} className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${isActive(subItem.href)
                        ? theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
                        : theme === 'dark' ? 'text-gray-300 hover:bg-gray-800 hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>
                    <subItem.icon className={`w-4 h-4 mr-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}/>
                    {subItem.name}
                  </link_1.default>))}
              </div>)}
          </div>))}
      </nav>
      <div className={`p-4 ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'} border-t`}>
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} flex items-center justify-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            U
          </div>
          <div className="ml-3">
            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>User Name</p>
            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>user@example.com</p>
          </div>
        </div>
      </div>
    </aside>);
}
