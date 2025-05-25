"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const themeSlice_1 = __importDefault(require("./themeSlice"));
const campaignSlice_1 = __importDefault(require("./features/campaignSlice"));
exports.store = (0, toolkit_1.configureStore)({
    reducer: {
        theme: themeSlice_1.default,
        campaign: campaignSlice_1.default,
    },
});
