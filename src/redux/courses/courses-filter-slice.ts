import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IFilterState {
	[key: string]: string;
}

interface IFilterPayload {
	name: keyof IFilterState;
	value: string;
}

const initialState: IFilterState = {};

const filterSlice = createSlice({
	initialState,
	name: "filter",
	reducers: {
		clearFilter: (state, action) => {
			delete state[action.payload];
		},
		setFilter: (state, action: PayloadAction<IFilterPayload>) => {
			const { name, value } = action.payload;
			state[name] = value;
		},
	},
});

export const { clearFilter, setFilter } = filterSlice.actions;
export default filterSlice.reducer;
