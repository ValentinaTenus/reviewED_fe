import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { type RecentReview } from "~/common/types/index";

type ReviewsState = {
	recentReviews: null | RecentReview[];
	userCompanyReviews: number[];
	userCourseReviews: number[];
	userLikedCompanyReviews: number[];
};

const initialState: ReviewsState = {
	recentReviews: null,
	userCompanyReviews: [],
	userCourseReviews: [],
	userLikedCompanyReviews: [],
};

const reviewsSlice = createSlice({
	initialState,
	name: "reviews",
	reducers: {
		addCompanyReview(state, action: PayloadAction<number>) {
			if (!state.userCompanyReviews.includes(action.payload)) {
				state.userCompanyReviews = [
					...state.userCompanyReviews,
					action.payload,
				];
			}
		},
		addCourseReview(state, action: PayloadAction<number>) {
			if (!state.userCourseReviews.includes(action.payload)) {
				state.userCourseReviews = [...state.userCourseReviews, action.payload];
			}
		},
		likeCompanyReview(state, action: PayloadAction<number>) {
			// eslint-disable-next-line no-console
			console.log(state.userLikedCompanyReviews);
			if (!state.userLikedCompanyReviews.includes(action.payload)) {
				state.userLikedCompanyReviews = [
					...state.userLikedCompanyReviews,
					action.payload,
				];
			}
		},
		setRecentReviews: (state, action: PayloadAction<RecentReview[]>) => {
			state.recentReviews = action.payload;
		},
		unlikeCompanyReview(state, action: PayloadAction<number>) {
			state.userLikedCompanyReviews = state.userLikedCompanyReviews.filter(
				(id) => id !== action.payload,
			);
		},
	},
});

export const {
	addCompanyReview,
	addCourseReview,
	likeCompanyReview,
	setRecentReviews,
	unlikeCompanyReview,
} = reviewsSlice.actions;
export const reviewsReducer = reviewsSlice.reducer;
