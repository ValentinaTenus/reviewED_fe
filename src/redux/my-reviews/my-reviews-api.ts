import { HttpMethods } from "~/common/enums/index.ts";
import { GetMyReviewsQueryParams } from "~/common/types/my-reviews/get-my-reviews-params.type.ts";
import { GetMyReviewsResponse } from "~/common/types/my-reviews/get-my-reviews-response.type.ts";

import { api } from "../services.ts";
import { myReviewsApiPath } from "./constants.ts";
import { MyReview } from "~/common/types/my-reviews/my-review.type.ts";

export const myRewiewsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getMyReviews: builder.query<
			GetMyReviewsResponse,
			{ params: GetMyReviewsQueryParams; userId: number }
		>({
			query: ({ params, userId }) => {
				return {
					method: HttpMethods.GET,
					params,
					url: `${myReviewsApiPath.MY_REVIEWS_USER}/${userId}`,
				};
			},
			providesTags: ["MyReviews"],
		}),
		addReview: builder.mutation<
			MyReview,
			{
				entityId: number;
				category: string;
				body: { text: string; rating: number };
			}
		>({
			query: ({ entityId, body, category }) => {
				return {
					method: HttpMethods.POST,
					body,
					url: `${category === "course" ? myReviewsApiPath.REVIEWS_COURSES : myReviewsApiPath.REVIEWS_COMPANIES}/${entityId}/`,
				};
			},
			invalidatesTags: ["MyReviews"],
		}),
		editMyReview: builder.mutation<
			MyReview,
			{
				entityId: number;
				category: string;
				body: { text: string; rating: number };
			}
		>({
			query: ({ entityId, body, category }) => {
				return {
					method: HttpMethods.PATCH,
					body,
					url: `${category === "course" ? myReviewsApiPath.MY_REVIEWS_COURSE : myReviewsApiPath.MY_REVIEWS_COMPANY}/${entityId}/`,
				};
			},
			invalidatesTags: ["MyReviews"],
		}),
		deleteMyReview: builder.mutation<
			string,
			{ entityId: number; category: string }
		>({
			query: ({ entityId, category }) => {
				return {
					method: HttpMethods.DELETE,
					url: `${category === "course" ? myReviewsApiPath.MY_REVIEWS_COURSE : myReviewsApiPath.MY_REVIEWS_COMPANY}/${entityId}/`,
				};
			},
			invalidatesTags: ["MyReviews"],
		}),
	}),
});

export const {
	useGetMyReviewsQuery,
	useAddReviewMutation,
	useDeleteMyReviewMutation,
	useEditMyReviewMutation,
} = myRewiewsApi;
