import type { OTPItemState } from "@/types/session";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type SessionState = {
	session: OTPItemState | null;
};

const initialState: SessionState = {
	session: null,
};

const sessionSlice = createSlice({
	name: "session",
	initialState,
	reducers: {
		addToSession: (state, action: PayloadAction<OTPItemState>) => {
			state.session = { ...action.payload };
		},
		updateValidation: (state, action: PayloadAction<{ identity: string }>) => {
			if (state.session && state.session.identity === action.payload.identity) {
				state.session.isValidate = true;
			}
		},
		clearSession: (state) => {
			state.session = null;
		},
	},
});

export const { addToSession, clearSession, updateValidation } =
	sessionSlice.actions;
export default sessionSlice.reducer;

export const selectSessionItems = (state: { sessions: SessionState }) =>
	state.sessions.session;
