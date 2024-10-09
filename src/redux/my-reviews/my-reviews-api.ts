import { HttpMethods } from "~/common/enums/index.ts";
import { GetMyReviewsQueryParams } from "~/common/types/my-reviews/get-my-reviews-params.type.ts";
import { GetMyReviewsResponse } from "~/common/types/my-reviews/get-my-reviews-response.type.ts";
import { MyReview } from "~/common/types/my-reviews/my-review.type.ts";

import { api } from "../services.ts";
import { myReviewsApiPath } from "./constants.ts";

export const myRewiewsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		deleteMyReview: builder.mutation<
			string,
			{ category: string; entityId: number }
		>({
			invalidatesTags: ["MyReviews"],
			query: ({ category, entityId }) => {
				return {
					method: HttpMethods.DELETE,
					url: `${category === "course" ? myReviewsApiPath.MY_REVIEWS_COURSE : myReviewsApiPath.MY_REVIEWS_COMPANY}/${entityId}/`,
				};
			},
		}),
		editMyReview: builder.mutation<
			MyReview,
			{
				body: { rating: number; text: string };
				category: string;
				entityId: number;
			}
		>({
			invalidatesTags: ["MyReviews"],
			query: ({ body, category, entityId }) => {
				return {
					body,
					method: HttpMethods.PATCH,
					url: `${category === "course" ? myReviewsApiPath.MY_REVIEWS_COURSE : myReviewsApiPath.MY_REVIEWS_COMPANY}/${entityId}/`,
				};
			},
		}),
		getMyReviews: builder.query<
			GetMyReviewsResponse,
			{ params: GetMyReviewsQueryParams; userId: number }
		>({
			providesTags: ["MyReviews"],
			query: ({ params, userId }) => {
				return {
					method: HttpMethods.GET,
					params: {
						...params,
						sort: "time_added:desc",
					},
					url: `${myReviewsApiPath.MY_REVIEWS_USER}/${userId}`,
				};
			},
		}),
	}),
});

export const {
	useDeleteMyReviewMutation,
	useEditMyReviewMutation,
	useGetMyReviewsQuery,
} = myRewiewsApi;
