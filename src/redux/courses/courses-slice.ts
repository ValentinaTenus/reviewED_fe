import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { type Course, type GetCoursesRequestQuery } from "~/common/types/index";

type CoursesState = {
	courses: Course[] | null;
	filters: GetCoursesRequestQuery | null;
};

const initialState: CoursesState = {
	courses: null,
	filters: {
		category_by_id: "",
		city: "",
		title: "",
	},
};

const coursesSlice = createSlice({
	initialState,
	name: "courses",
	reducers: {
		clearFilters(state) {
			state.filters = {};
		},
		setCourses: (state, action: PayloadAction<Course[]>) => {
			state.courses = action.payload;
		},
		setFilters: (state, action: PayloadAction<GetCoursesRequestQuery>) => {
			state.filters = { ...state.filters, ...action.payload };
		},
	},
});

export const { clearFilters, setCourses, setFilters } = coursesSlice.actions;
export const coursesReducer = coursesSlice.reducer;
