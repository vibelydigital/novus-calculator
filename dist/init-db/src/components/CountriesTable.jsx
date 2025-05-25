"use strict";
'use client';
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
const react_1 = __importStar(require("react"));
const navigation_1 = require("next/navigation");
const outline_1 = require("@heroicons/react/24/outline");
const TableBuilder_1 = __importDefault(require("./TableBuilder"));
const CountriesTable = () => {
    const router = (0, navigation_1.useRouter)();
    const [countries, setCountries] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('/api/countries');
                const data = await response.json();
                setCountries(data);
            }
            catch (error) {
                console.error('Error fetching countries:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchCountries();
    }, []);
    const columns = [
        { key: 'name', label: 'Country Name', type: 'link', linkHref: (value) => `/countries/${value}` },
        { key: 'code', label: 'Country Code' },
        { key: 'population', label: 'Population', type: 'number' },
        { key: 'area', label: 'Area (km²)', type: 'number' },
        { key: 'gdp', label: 'GDP (USD)', type: 'currency' },
        { key: 'status', label: 'Status', type: 'status' },
        { key: 'lastUpdated', label: 'Last Updated', type: 'date' },
    ];
    const handleRowClick = (country) => {
        router.push(`/countries/${country.id}`);
    };
    if (loading) {
        return <div>Loading...</div>;
    }
    return (<TableBuilder_1.default data={countries} columns={columns} title="Countries" icon={<outline_1.GlobeAltIcon className="h-6 w-6"/>} onRowClick={handleRowClick} actionButton={{
            label: 'Add Country',
            href: '/countries/new',
        }}/>);
};
exports.default = CountriesTable;
