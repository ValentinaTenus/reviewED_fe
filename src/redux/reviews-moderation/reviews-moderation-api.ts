import { httpMethods } from "~/common/enums/index.ts";
import { type GetModerationReviewsResponse } from "~/common/types/index.ts";
import { ModerationReviews } from "~/common/types/review/get-moderation-reviews.ts";

import { api } from "../services.ts";
import { reviewsApiPath } from "./constans.ts";

type ModerationReviewsRequest = {
	id?: string;
	ordering?: "-time_added" | "time_added";
	status?: "approved" | "pending" | "rejected";
	type?: "company" | "course";
};

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
			ModerationReviewsRequest
		>({
			forceRefetch({ currentArg, previousArg }) {
				return (
					currentArg?.type !== previousArg?.type ||
					currentArg?.status !== previousArg?.status ||
					currentArg?.ordering !== previousArg?.ordering ||
					currentArg?.id !== previousArg?.id
				);
			},
			query: (filters: ModerationReviewsRequest = {}) => {
				return {
					method: httpMethods.GET,
					params: {
						ordering: filters.ordering,
						status: filters.status,
						type: filters.type,
					},
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
		getReviewsModerationById: builder.query<
			ModerationReviews,
			{ id: string | undefined; type: ModerationReviewsRequest["type"] }
		>({
			forceRefetch({ currentArg, previousArg }) {
				return (
					currentArg?.type !== previousArg?.type ||
					currentArg?.id !== previousArg?.id
				);
			},
			query: ({ id, type }) => {
				const url =
					type === "course"
						? reviewsApiPath.COURSES_ID + `/${id}`
						: reviewsApiPath.COMPANIES_ID + `/${id}`;
				return {
					method: httpMethods.GET,
					url: url,
				};
			},
		}),
	}),
});

export const {
	useGetReviewsModerationByFilterQuery,
	useGetReviewsModerationByIdQuery,
	useGetReviewsModerationQuery,
} = reviewsModerationApi;
