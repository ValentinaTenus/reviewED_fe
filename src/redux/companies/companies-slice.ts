import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { type Company, GetCompaniesRequestQuery } from "~/common/types/index";

type CompaniesState = {
	companies: Company[] | null;
	filters: GetCompaniesRequestQuery | null;
};

const initialState: CompaniesState = {
	companies: null,
	filters: {
		category_by_id: undefined,
		city: undefined,
		limit: undefined,
		name: undefined,
		offset: undefined,
		sort: undefined,
	},
};

const companiesSlice = createSlice({
	initialState,
	name: "companies",
	reducers: {
		clearFilters(state) {
			state.filters = {};
		},
		setCompanies: (state, action: PayloadAction<Company[]>) => {
			state.companies = action.payload;
		},
		setFilters: (state, action: PayloadAction<GetCompaniesRequestQuery>) => {
			state.filters = { ...state.filters, ...action.payload };
		},
	},
});

export const { clearFilters, setCompanies, setFilters } =
	companiesSlice.actions;
export const companiesReducer = companiesSlice.reducer;
