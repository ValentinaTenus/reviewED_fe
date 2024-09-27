import { HttpMethods } from "~/common/enums/index.ts";
import { GetMyReviewsQueryParams } from "~/common/types/my-reviews/get-my-reviews-params.type.ts";
import { GetMyReviewsResponse } from "~/common/types/my-reviews/get-my-reviews-response.type.ts";

import { api } from "../services.ts";
import { myReviewsApiPath } from "./constants.ts";

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
		}),
	}),
});

export const { useGetMyReviewsQuery } = myRewiewsApi;
