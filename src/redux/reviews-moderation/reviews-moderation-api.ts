import { HttpMethods } from "~/common/enums/index.ts";
import { type GetModerationReviews } from "~/common/types/index.ts";

import { api } from "../services.ts";
import { reviewsApiPath } from "./constans.ts";

export const reviewsModerationApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getReviewsModeration: builder.query<GetModerationReviews, void>({
			query: () => ({
				method: HttpMethods.GET,
				url: reviewsApiPath.ROOT,
			}),
		}),
	}),
});

export const { useGetReviewsModerationQuery } = reviewsModerationApi;
