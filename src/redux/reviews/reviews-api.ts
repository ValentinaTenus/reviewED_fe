import { HttpMethods } from "~/common/enums/index.ts";
import {
	type CompanyAndCourseReviewsByUserId,
	type GetQueryResponse,
} from "~/common/types/index.ts";
import { type RecentReview } from "~/common/types/review/index.ts";

import { api } from "../services.ts";
import { reviewsApiPath } from "./constants.ts";

export const reviewsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getCourseReviews: builder.query<RecentReview[], number>({
			query: (courseId) => ({
				method: HttpMethods.GET,
				url: `/reviews/courses/list/${courseId}`,
			}),
		}),
		getRecentReviews: builder.query<RecentReview[], number>({
			query: (count) => ({
				method: HttpMethods.GET,
				url: `/reviews/recent?count=${count}`,
			}),
		}),
		getReviewsByUserId: builder.query<
			CompanyAndCourseReviewsByUserId[],
			number
		>({
			query: (id) => ({
				method: HttpMethods.GET,
				url: reviewsApiPath.REVIEWS_BY_USER_ID + `${id}`,
			}),
			transformResponse: (
				response: GetQueryResponse<CompanyAndCourseReviewsByUserId>,
			) => response.results,
		}),
		getShareableLink: builder.query<
			{ shareable_link: string },
			{ id: number; review_type: string }
		>({
			query: ({ id, review_type }) => ({
				method: HttpMethods.GET,
				url: reviewsApiPath.SHAREABLE_LINK + `${review_type}/${id}`,
			}),
		}),
	}),
});

export const {
	useGetCourseReviewsQuery,
	useGetRecentReviewsQuery,
	useGetReviewsByUserIdQuery,
	useGetShareableLinkQuery,
	useLazyGetReviewsByUserIdQuery,
} = reviewsApi;
