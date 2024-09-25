import { httpMethods } from "~/common/enums/index.ts";
import { type GetModerationReviewsResponse } from "~/common/types/index.ts";
import { GetModerationReviewsRequest } from "~/common/types/review/get-moderation-reviews.ts";

import { api } from "../services.ts";
import { reviewsApiPath } from "./constans.ts";

export const reviewsModerationApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getReviewsModeration: builder.query<GetModerationReviewsResponse, void>({
			query: () => ({
				method: httpMethods.GET,
				url: reviewsApiPath.ROOT,
			}),
		}),
		getReviewsModerationByFilter: builder.query<
			GetModerationReviewsResponse,
			GetModerationReviewsRequest
		>({
			forceRefetch({ currentArg, previousArg }) {
				return (
					currentArg?.type !== previousArg?.type ||
					currentArg?.status !== previousArg?.status ||
					currentArg?.ordering !== previousArg?.ordering
				);
			},
			query: (filters: GetModerationReviewsRequest = {}) => {
				return {
					method: httpMethods.GET,
					params: filters,
					url: reviewsApiPath.ROOT,
				};
			},
			serializeQueryArgs: ({ endpointName }) => {
				return endpointName;
			},
			// transformResponse: (response: GetModerationReviewsResponse) => {
			// 	return response.results;
			// },
		}),
	}),
});

export const {
	useGetReviewsModerationByFilterQuery,
	useGetReviewsModerationQuery,
} = reviewsModerationApi;
