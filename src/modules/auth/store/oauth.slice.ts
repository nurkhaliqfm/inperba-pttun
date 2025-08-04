import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, OAuthData } from "../types/oauth.type";
import type { RootState } from "@/store/store";

const initialState: AuthState = {
	oauthData: null,
};

const oauthSlice = createSlice({
	name: "oauth",
	initialState,
	reducers: {
		setOAuth: (state, action: PayloadAction<OAuthData>) => {
			state.oauthData = action.payload;
		},
		clearOAuth: (state) => {
			state.oauthData = null;
		},
	},
});

export const { setOAuth, clearOAuth } = oauthSlice.actions;
export default oauthSlice.reducer;

export const selectAuthSession = (state: RootState) => state.oauths.oauthData;
