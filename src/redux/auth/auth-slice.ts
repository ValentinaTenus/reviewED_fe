import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { type GetTokensResponseDto } from "~/common/types/index";
import { UserWithStaff } from "~/common/types/user";

type AuthState = {
	access: null | string;
	refresh: null | string;
	user: null | UserWithStaff;
};

const initialState: AuthState = {
	access: null,
	refresh: null,
	user: null,
};

const authSlice = createSlice({
	initialState,
	name: "auth",
	reducers: {
		logout: (state) => {
			state.user = null;
			state.access = null;
			state.refresh = null;
		},
		setTokens: (state, action: PayloadAction<GetTokensResponseDto>) => {
			state.access = action.payload.access;
			state.refresh = action.payload.refresh;
		},
		setUser: (state, action: PayloadAction<UserWithStaff>) => {
			state.user = action.payload;
		},
	},
});

export const { logout, setTokens, setUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
