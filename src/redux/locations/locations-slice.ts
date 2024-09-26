import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type LocationsState = {
	locations: null | string[];
};

const initialState: LocationsState = {
	locations: null,
};

const locationsSlice = createSlice({
	initialState,
	name: "locations",
	reducers: {
		setLocations: (state, action: PayloadAction<string[]>) => {
			state.locations = action.payload;
		},
	},
});

export const { setLocations } = locationsSlice.actions;
export const locationsReducer = locationsSlice.reducer;
