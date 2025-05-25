"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCurrentCampaign = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    currentCampaign: null,
};
const campaignSlice = (0, toolkit_1.createSlice)({
    name: 'campaign',
    initialState,
    reducers: {
        setCurrentCampaign: (state, action) => {
            state.currentCampaign = action.payload;
        },
    },
});
exports.setCurrentCampaign = campaignSlice.actions.setCurrentCampaign;
exports.default = campaignSlice.reducer;
