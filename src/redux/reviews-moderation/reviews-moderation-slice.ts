import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { type GetModerationReviews } from "~/common/types";

type ReviewsState = {
	reviewsModeration: GetModerationReviews["results"] | null;
};

const initialState: ReviewsState = {
	reviewsModeration: null,
};

const reviewsModerationSlice = createSlice({
	initialState,
	name: "reviewsModeration",
	reducers: {
		setRewiews: (
			state,
			action: PayloadAction<GetModerationReviews["results"]>,
		) => {
			state.reviewsModeration = action.payload;
		},
	},
});

export const { setRewiews } = reviewsModerationSlice.actions;
export const reviewsModerationReducer = reviewsModerationSlice.reducer;
