import { HttpMethods } from "~/common/enums/index.ts";
import {
	type CourseReview,
	type GetQueryResponse,
	type LikeReviewRequest,
	type ReviewReport,
	type SendCourseRequest,
	type SendReportRequest,
} from "~/common/types/index.ts";

import { api } from "../services.ts";
import { reviewsApiPath } from "./constants.ts";

export const coursesReviewsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getCourseReviews: builder.query<GetQueryResponse<CourseReview>, number>({
			query: (id) => {
				return {
					method: HttpMethods.GET,
					url: reviewsApiPath.REVIEWS_BY_COURSE_ID + `${id}`,
				};
			},
		}),
		likeReview: builder.mutation<undefined, LikeReviewRequest>({
			query: (reviewData) => ({
				method: HttpMethods.POST,
				url: `${reviewsApiPath.LIKE_COMPANIES_REVIEWS}${reviewData.reviewId}/`,
			}),
		}),

		sendCourseReview: builder.mutation<CourseReview, SendCourseRequest>({
			query: ({ courseId, rating, text }) => ({
				body: {
					rating: rating,
					text: text,
				},
				method: HttpMethods.POST,
				url: `${reviewsApiPath.POST_COURSES_REVIEWS}${courseId}/`,
			}),
		}),
		sendReport: builder.mutation<ReviewReport, SendReportRequest>({
			query: (reviewData) => ({
				body: {
					reason: reviewData.reason,
				},
				method: HttpMethods.POST,
				url: `${reviewsApiPath.POST_REPORTS}${reviewData.reviewType}/${reviewData.reviewId}`,
			}),
		}),
		unlikeReview: builder.mutation<undefined, LikeReviewRequest>({
			query: (reviewData) => ({
				method: HttpMethods.DELETE,
				url: `${reviewsApiPath.LIKE_COMPANIES_REVIEWS}${reviewData.reviewId}/`,
			}),
		}),
	}),
});

export const {
	useGetCourseReviewsQuery,
	useLazyGetCourseReviewsQuery,
	useLikeReviewMutation,
	useSendCourseReviewMutation,
	useSendReportMutation,
	useUnlikeReviewMutation,
} = coursesReviewsApi;
