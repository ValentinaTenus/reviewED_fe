import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { type Company } from "~/common/types/index";

type CompaniesState = {
	companies: Company[] | null;
};

const initialState: CompaniesState = {
	companies: null,
};

const companiesSlice = createSlice({
	initialState,
	name: "companies",
	reducers: {
		setCompanies: (state, action: PayloadAction<Company[]>) => {
			state.companies = action.payload;
		},
	},
});

export const { setCompanies } = companiesSlice.actions;
export const companiesReducer = companiesSlice.reducer;
