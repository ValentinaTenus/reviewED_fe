import { HttpMethods } from "~/common/enums/index.ts";
import {
	type CourseReview,
	type GetQueryResponse,
	type SendCourseRequest,
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
	}),
});

export const {
	useGetCourseReviewsQuery,
	useLazyGetCourseReviewsQuery,
	useSendCourseReviewMutation,
} = coursesReviewsApi;
