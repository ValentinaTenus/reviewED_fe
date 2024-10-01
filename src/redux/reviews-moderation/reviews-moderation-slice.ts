import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { type GetModerationReviewsResponse } from "~/common/types";

type ReviewsState = {
	reviewsModeration: GetModerationReviewsResponse["results"] | null;
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
			action: PayloadAction<GetModerationReviewsResponse["results"]>,
		) => {
			state.reviewsModeration = action.payload;
		},
	},
});

export const { setRewiews } = reviewsModerationSlice.actions;
export const reviewsModerationReducer = reviewsModerationSlice.reducer;
