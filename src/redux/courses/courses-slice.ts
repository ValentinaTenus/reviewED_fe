import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { type Course } from "~/common/types/index";

type CourseFilter = {
	category_by_id?: string[];
	city?: { id: string; name: string }[];
	limit?: number;
	offset?: number;
	sort?: string;
	subcategory_by_id?: { id: string; name: string }[];
	title?: string;
};

type CoursesState = {
	courses: Course[] | null;
	filters: CourseFilter | null;
};

const initialState: CoursesState = {
	courses: null,
	filters: {
		category_by_id: [],
		city: [],
		subcategory_by_id: [],
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
		setFilters: (state, action: PayloadAction<CourseFilter>) => {
			state.filters = { ...state.filters, ...action.payload };
		},
	},
});

export const { clearFilters, setCourses, setFilters } = coursesSlice.actions;
export const coursesReducer = coursesSlice.reducer;
