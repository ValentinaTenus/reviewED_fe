import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { type Course } from "~/common/types/index";

type CoursesState = {
	courses: Course[] | null;
};

const initialState: CoursesState = {
	courses: null,
};

const coursesSlice = createSlice({
	initialState,
	name: "courses",
	reducers: {
		setCourses: (state, action: PayloadAction<Course[]>) => {
			state.courses = action.payload;
		},
	},
});

export const { setCourses } = coursesSlice.actions;
export const coursesReducer = coursesSlice.reducer;
