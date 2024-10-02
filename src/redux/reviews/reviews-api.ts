import { HttpMethods } from "~/common/enums/index.ts";
import {
	type CompanyAndCourseReviewsByUserId,
	type GetCompanyAndCourseReviewsByUserIdResponse,
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
				response: GetCompanyAndCourseReviewsByUserIdResponse,
			) => response.results,
		}),
	}),
});

export const {
	useGetCourseReviewsQuery,
	useGetRecentReviewsQuery,
	useGetReviewsByUserIdQuery,
	useLazyGetReviewsByUserIdQuery,
} = reviewsApi;
