import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { type RecentReview } from "~/common/types/index";

type ReviewsState = {
	recentReviews: null | RecentReview[];
};

const initialState: ReviewsState = {
	recentReviews: null,
};

const reviewsSlice = createSlice({
	initialState,
	name: "reviews",
	reducers: {
		setRecentReviews: (state, action: PayloadAction<RecentReview[]>) => {
			state.recentReviews = action.payload;
		},
	},
});

export const { setRecentReviews } = reviewsSlice.actions;
export const reviewsReducer = reviewsSlice.reducer;
