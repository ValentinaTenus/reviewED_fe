import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { type Company, type FilterType } from "~/common/types/index";

type CompanyFilter = {
	category_by_id?: FilterType[];
	city?: string;
	name?: string;
};

type CompaniesState = {
	companies: Company[] | null;
	filters: CompanyFilter | null;
};

const initialState: CompaniesState = {
	companies: null,
	filters: {
		category_by_id: [],
		city: undefined,
		name: "",
	},
};

const companiesSlice = createSlice({
	initialState,
	name: "companies",
	reducers: {
		clearFilters(state) {
			state.filters = {
				...state.filters,
				category_by_id: [],
				city: undefined,
				name: "",
			};
		},
		setCompanies: (state, action: PayloadAction<Company[]>) => {
			state.companies = action.payload;
		},
		setFilters: (state, action: PayloadAction<CompanyFilter>) => {
			state.filters = { ...state.filters, ...action.payload };
		},
	},
});

export const { clearFilters, setCompanies, setFilters } =
	companiesSlice.actions;
export const companiesReducer = companiesSlice.reducer;
