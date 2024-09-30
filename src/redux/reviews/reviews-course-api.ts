import { HttpMethods } from "~/common/enums/index.ts";
import {
	type CourseReview,
	type GetCourseReviewsResponse,
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
			transformResponse: (response: GetCourseReviewsResponse) =>
				response.results,
		}),
	}),
});

export const { useGetCourseReviewsQuery, useLazyGetCourseReviewsQuery } =
	reviewsApi;
