import { HttpMethods } from "~/common/enums/index.ts";
import {
	type CourseReview,
	type GetQueryResponse,
	type SendCourseRequest,
} from "~/common/types/index.ts";

import { api } from "../services.ts";
import { reviewsApiPath } from "./constants.ts";

export const reviewsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getCourseReviews: builder.query<CourseReview[], number>({
			query: (id) => {
				return {
					method: HttpMethods.GET,
					url: reviewsApiPath.REVIEWS_BY_COURSE_ID + `${id}`,
				};
			},
			transformResponse: (response: GetQueryResponse<CourseReview>) =>
				response.results,
		}),
		sendReview: builder.mutation<CourseReview, SendCourseRequest>({
			query: (reviewData) => ({
				body: {
					rating: reviewData.rating,
					text: reviewData.text,
				},
				method: HttpMethods.POST,
				url: `${reviewsApiPath.POST_COURSES_REVIEWS}${reviewData.courseId}/`,
			}),
		}),
	}),
});

export const {
	useGetCourseReviewsQuery,
	useLazyGetCourseReviewsQuery,
	useSendReviewMutation,
} = reviewsApi;
