import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { type Category } from "~/common/types/index";

type CategoryState = {
	categories: Category[] | null;
};

const initialState: CategoryState = {
	categories: null,
};

const categoriesSlice = createSlice({
	initialState,
	name: "categories",
	reducers: {
		setCategories: (state, action: PayloadAction<Category[]>) => {
			state.categories = action.payload;
		},
	},
});

export const { setCategories } = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;
