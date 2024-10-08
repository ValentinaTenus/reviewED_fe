import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
	type GetTokensResponseDto,
	type UserWithStaff,
} from "~/common/types/index";

type AuthState = {
	access: null | string;
	isRefreshing?: boolean;
	refresh: null | string;
	user: null | UserWithStaff;
};

const initialState: AuthState = {
	access: null,
	isRefreshing: false,
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
		setIsRefreshing: (state, action: PayloadAction<boolean>) => {
			state.isRefreshing = action.payload;
		},
		setTokens: (state, action: PayloadAction<GetTokensResponseDto>) => {
			state.access = action.payload.access;
			state.refresh = action.payload.refresh;
		},
		setUser: (state, action: PayloadAction<null | UserWithStaff>) => {
			state.user = action.payload;
		},
	},
});

export const { logout, setIsRefreshing, setTokens, setUser } =
	authSlice.actions;
export const authReducer = authSlice.reducer;
