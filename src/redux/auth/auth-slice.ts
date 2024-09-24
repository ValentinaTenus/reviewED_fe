import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { type GetTokensResponseDto, type User } from "~/common/types/index";

type AuthState = {
	accessToken: null | string;
	refreshToken: null | string;
	user: null | User;
};

const initialState: AuthState = {
	accessToken: null,
	refreshToken: null,
	user: null,
};

const authSlice = createSlice({
	initialState,
	name: "auth",
	reducers: {
		logout: (state) => {
			state.user = null;
			state.accessToken = null;
			state.refreshToken = null;
		},
		setTokens: (state, action: PayloadAction<GetTokensResponseDto>) => {
			state.accessToken = action.payload.access;
			state.refreshToken = action.payload.refresh;
		},
		setUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
		},
	},
});

export const { logout, setTokens, setUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
