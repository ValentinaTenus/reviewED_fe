import { HttpMethods } from "~/common/enums/index.ts";
import { GetReviewsResponse, type Review } from "~/common/types/index.ts";

import { api } from "../services.ts";
import { reviewsApiPath } from "./constants.ts";

export const reviewsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getReviewsByCompanyId: builder.query<Review[], string>({
			query: (company_id) => {
				return {
					method: HttpMethods.GET,
					url: `${reviewsApiPath.ROOT}/companies/list/${company_id}`,
				};
			},
			transformResponse: (response: GetReviewsResponse) => {
				return response.results;
			},
		}),
		sendReview: builder.mutation<ReviewResponse, SendReviewRequest>({
			query: (reviewData) => ({
				body: {
					rating: reviewData.rating,
					text: reviewData.text,
				},
				method: HttpMethods.POST,
				url: `${reviewsApiPath.ROOT}/companies/${reviewData.companyId}`,
			}),
		}),
	}),
});

export type SendReviewRequest = {
	companyId: number;
	rating: null | number;
	text: string;
};

export type ReviewResponse = {
	companyId: number;
	rating: number;
	text: string;
};

export const { useGetReviewsByCompanyIdQuery, useSendReviewMutation } =
	reviewsApi;
