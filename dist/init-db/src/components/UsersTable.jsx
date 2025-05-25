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
const UsersTable = ({ title = "Users", icon = <outline_1.UserIcon className="h-6 w-6"/>, selectable = false, onRowClick, onEdit, onDelete, }) => {
    const router = (0, navigation_1.useRouter)();
    const [users, setUsers] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/data/users.json');
                const data = await response.json();
                setUsers(data.users || []);
            }
            catch (error) {
                console.error('Error fetching users:', error);
                setUsers([]);
            }
            finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);
    // Map users to the format expected by TableBuilder
    const tableUsers = users.map(user => ({
        id: user.userId,
        userName: user.userName,
        userType: user.userType,
        avatarUrl: user.avatarUrl,
        joiningDate: user.joiningDate,
        endingDate: user.endingDate,
        status: user.status,
        contact: user.contact,
        address: user.address,
    }));
    const columns = [
        {
            key: 'userName',
            label: 'Name',
            type: 'link',
            linkHref: (value) => `/users/${value}`,
            className: 'text-gray-900 dark:text-white'
        },
        {
            key: 'userType',
            label: 'Role',
            type: 'status',
            className: 'text-gray-900 dark:text-white'
        },
        {
            key: 'status',
            label: 'Status',
            type: 'status',
            className: 'text-gray-900 dark:text-white'
        },
        {
            key: 'contact',
            label: 'Contact',
            className: 'text-gray-900 dark:text-white'
        },
        {
            key: 'joiningDate',
            label: 'Joining Date',
            type: 'date',
            className: 'text-gray-900 dark:text-white'
        },
        {
            key: 'endingDate',
            label: 'Ending Date',
            type: 'date',
            className: 'text-gray-900 dark:text-white'
        },
    ];
    const handleRowClick = (tableUser) => {
        const user = users.find(u => u.userId === tableUser.id);
        if (user) {
            if (onRowClick) {
                onRowClick(user);
            }
            else {
                router.push(`/users/${user.userId}`);
            }
        }
    };
    const handleEdit = (tableUser) => {
        const user = users.find(u => u.userId === tableUser.id);
        if (user && onEdit) {
            onEdit(user);
        }
    };
    const handleDelete = (tableUser) => {
        if (onDelete) {
            onDelete(tableUser.id);
        }
    };
    if (loading) {
        return <div>Loading...</div>;
    }
    return (<TableBuilder_1.default data={tableUsers} columns={columns} title={title} icon={icon} selectable={selectable} onRowClick={handleRowClick} onEdit={onEdit ? handleEdit : undefined} onDelete={onDelete ? handleDelete : undefined} actionButton={{
            label: 'Add User',
            href: '/users/new',
        }}/>);
};
exports.default = UsersTable;
