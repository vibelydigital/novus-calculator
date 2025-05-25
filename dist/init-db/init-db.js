"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: '.env.local' });
var mongodb_1 = require("./mongodb");
var bcrypt = require('bcryptjs');
function initDb() {
    return __awaiter(this, void 0, void 0, function () {
        var client, db, collections, collectionExists, adminUser, hashedPassword, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 10, , 11]);
                    return [4 /*yield*/, mongodb_1.default];
                case 1:
                    client = _a.sent();
                    db = client.db();
                    return [4 /*yield*/, db.listCollections().toArray()];
                case 2:
                    collections = _a.sent();
                    collectionExists = collections.some(function (col) { return col.name === 'users'; });
                    if (!!collectionExists) return [3 /*break*/, 4];
                    return [4 /*yield*/, db.createCollection('users')];
                case 3:
                    _a.sent();
                    console.log('Created users collection');
                    _a.label = 4;
                case 4: 
                // Create indexes
                return [4 /*yield*/, db.collection('users').createIndex({ email: 1 }, { unique: true })];
                case 5:
                    // Create indexes
                    _a.sent();
                    console.log('Created email index');
                    return [4 /*yield*/, db.collection('users').findOne({ email: 'admin@novus.com' })];
                case 6:
                    adminUser = _a.sent();
                    if (!!adminUser) return [3 /*break*/, 9];
                    return [4 /*yield*/, bcrypt.hash('admin123', 10)];
                case 7:
                    hashedPassword = _a.sent();
                    return [4 /*yield*/, db.collection('users').insertOne({
                            email: 'admin@novus.com',
                            password: hashedPassword,
                            name: 'Admin User',
                            role: 'admin',
                            createdAt: new Date(),
                            updatedAt: new Date()
                        })];
                case 8:
                    _a.sent();
                    console.log('Created admin user');
                    _a.label = 9;
                case 9:
                    console.log('Database initialization completed');
                    return [3 /*break*/, 11];
                case 10:
                    error_1 = _a.sent();
                    console.error('Database initialization failed:', error_1);
                    throw error_1;
                case 11: return [2 /*return*/];
            }
        });
    });
}
// Run the initialization
initDb().catch(console.error);
