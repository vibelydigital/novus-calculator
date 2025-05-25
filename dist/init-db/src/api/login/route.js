"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const server_1 = require("next/server");
const mongodb_1 = __importDefault(require("@/lib/mongodb"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
async function POST(request) {
    try {
        const { email, password } = await request.json();
        if (!email || !password) {
            return server_1.NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }
        const client = await mongodb_1.default;
        const db = client.db();
        const user = await db.collection('users').findOne({ email });
        if (!user) {
            return server_1.NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }
        const isValidPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!isValidPassword) {
            return server_1.NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }
        // Remove password from response
        const { password: _ } = user, userWithoutPassword = __rest(user, ["password"]);
        return server_1.NextResponse.json(userWithoutPassword);
    }
    catch (error) {
        console.error('Login error:', error);
        return server_1.NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
