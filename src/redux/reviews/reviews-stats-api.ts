import { HttpMethods } from "~/common/enums/index.ts";
import { type ReviewsStats } from "~/common/types/index.ts";

import { api } from "../services.ts";
import { reviewsApiPath } from "./constants.ts";

export const reviewsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getReviewsStats: builder.query<ReviewsStats, number>({
			query: (id) => {
				return {
					method: HttpMethods.GET,
					url: reviewsApiPath.REVIEWS_STATS_BY_COURSE_ID + `${id}`,
				};
			},
		}),
	}),
});

export const { useGetReviewsStatsQuery, useLazyGetReviewsStatsQuery } =
	reviewsApi;
