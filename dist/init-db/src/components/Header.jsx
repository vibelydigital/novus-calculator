"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Header;
const react_1 = require("react");
const image_1 = __importDefault(require("next/image"));
const outline_1 = require("@heroicons/react/24/outline");
const Breadcrumb_1 = __importDefault(require("@/components/Breadcrumb"));
const providers_1 = require("@/app/providers");
function Header() {
    const [open, setOpen] = (0, react_1.useState)(false);
    const [mounted, setMounted] = (0, react_1.useState)(false);
    const { theme, toggleTheme } = (0, providers_1.useTheme)();
    (0, react_1.useEffect)(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return null;
    }
    return (<header className={`border-b border-gray-200 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <div className={`flex items-center justify-between px-6 py-3 h-[63px] ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="flex items-center">
          <Breadcrumb_1.default />
        </div>
        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className={`relative w-12 h-7 flex items-center rounded-full p-1 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-300'}`} aria-label="Toggle dark mode">
            <span className={`absolute left-1 top-1 transition-transform duration-300 ${theme === 'dark' ? 'translate-x-5' : 'translate-x-0'}`} style={{ pointerEvents: 'none' }}>
              {theme === 'dark' ? (<outline_1.MoonIcon className="h-5 w-5 text-white"/>) : (<outline_1.SunIcon className="h-5 w-5 text-yellow-500"/>)}
            </span>
            <span className={`inline-block w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 ${theme === 'dark' ? 'translate-x-5' : 'translate-x-0'}`}></span>
          </button>
          <button className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`} aria-label="Notifications">
            <outline_1.BellIcon className={theme === 'dark' ? "h-6 w-6 text-gray-100" : "h-6 w-6 text-gray-700"}/>
          </button>
          <div className="relative inline-block text-left">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setOpen(!open)}>
              <div className="relative">
                <image_1.default src="/images/avatar-placeholder.png" alt="User Avatar" width={40} height={40} className="rounded-full border-2 border-gray-200"/>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="flex flex-col">
                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>John Doe</span>
                <span className={`text-xs ${theme === 'dark' ? 'text-gray-200' : 'text-gray-500'}`}>Administrator</span>
              </div>
              <outline_1.ChevronDownIcon className={theme === 'dark' ? "w-5 h-5 text-gray-100" : "w-5 h-5 text-gray-600"}/>
            </div>

            {open && (<div className={`absolute right-0 mt-2 w-48 origin-top-right ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg shadow-lg z-10`}>
                <div className="py-1">
                  <a href="#" className={`flex items-center px-4 py-2 text-sm ${theme === 'dark' ? 'text-gray-100 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <outline_1.UserIcon className={`w-5 h-5 mr-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}/>
                    Profile
                  </a>
                  <a href="#" className={`flex items-center px-4 py-2 text-sm ${theme === 'dark' ? 'text-gray-100 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <outline_1.Cog6ToothIcon className={`w-5 h-5 mr-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}/>
                    Settings
                  </a>
                  <div className={`border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'}`}></div>
                  <a href="#" className={`flex items-center px-4 py-2 text-sm ${theme === 'dark' ? 'text-gray-100 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <outline_1.ArrowRightOnRectangleIcon className={`w-5 h-5 mr-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}/>
                    Logout
                  </a>
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </header>);
}
