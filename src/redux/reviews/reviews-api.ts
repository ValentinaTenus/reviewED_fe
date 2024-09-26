import { HttpMethods } from "~/common/enums/index.ts";
import {
	type CompanyAndCourseReviewsByUserId,
	type GetCompanyAndCourseReviewsByUserIdResponse,
} from "~/common/types/index.ts";

import { api } from "../services.ts";
import { reviewsApiPath } from "./constants.ts";

export const reviewsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getReviewsByUserId: builder.query<
			CompanyAndCourseReviewsByUserId[],
			number
		>({
			query: (id) => {
				return {
					method: HttpMethods.GET,
					url: reviewsApiPath.REVIEWS_BY_USER_ID + `${id}`,
				};
			},
			transformResponse: (
				response: GetCompanyAndCourseReviewsByUserIdResponse,
			) => response.results,
		}),
	}),
});

export const { useGetReviewsByUserIdQuery } = reviewsApi;
