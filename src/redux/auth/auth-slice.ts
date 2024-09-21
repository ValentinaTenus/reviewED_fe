import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { type User } from "~/common/types/index";

type UserState = {
	user: null | User;
};

const initialState: UserState = {
	user: null,
};

const userSlice = createSlice({
	initialState,
	name: "user",
	reducers: {
		setUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
		},
	},
});

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
