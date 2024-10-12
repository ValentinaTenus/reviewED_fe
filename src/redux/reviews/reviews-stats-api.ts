import { HttpMethods } from "~/common/enums/index.ts";
import { type ReviewsStats } from "~/common/types/index.ts";

import { api } from "../services.ts";
import { reviewsApiPath } from "./constants.ts";

export const reviewsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getReviewsStats: builder.query<ReviewsStats, { id: number; type: string }>({
			query: ({ id, type }) => {
				return {
					method: HttpMethods.GET,
					url: `${reviewsApiPath.REVIEWS_STATS_BY_ID}${type}/${id}`,
				};
			},
		}),
	}),
});

export const { useGetReviewsStatsQuery, useLazyGetReviewsStatsQuery } =
	reviewsApi;
