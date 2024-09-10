import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { type Company } from "~/common/types/index";

type CompaniesState = {
	companies: Company[] | null;
};

const initialState: CompaniesState = {
	companies: null,
};

const compamiesSlice = createSlice({
	initialState,
	name: "companies",
	reducers: {
		setCompanies: (state, action: PayloadAction<Company[]>) => {
			state.companies = action.payload;
		},
	},
});

export const { setCompanies } = compamiesSlice.actions;
export const companiesReducer = compamiesSlice.reducer;
