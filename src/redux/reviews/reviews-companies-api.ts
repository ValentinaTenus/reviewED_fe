import { HttpMethods } from "~/common/enums/index.ts";
import {
	type CompanyReview,
	type GetQueryResponse,
	type GetReviewsByCompanyIdResponseDto,
} from "~/common/types/index.ts";

import { api } from "../services.ts";
import { reviewsApiPath } from "./constants.ts";

export const reviewsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getReviewsByCompanyId: builder.query<
			GetReviewsByCompanyIdResponseDto[],
			string
		>({
			query: (company_id) => {
				return {
					method: HttpMethods.GET,
					url: `${reviewsApiPath.COMPANIES_REVIEWS}/${company_id}`,
				};
			},
			transformResponse: (
				response: GetQueryResponse<GetReviewsByCompanyIdResponseDto>,
			) => {
				return response.results;
			},
		}),
		sendReview: builder.mutation<CompanyReview, SendReviewRequest>({
			query: (reviewData) => ({
				body: {
					rating: reviewData.rating,
					text: reviewData.text,
				},
				method: HttpMethods.POST,
				url: `${reviewsApiPath.POST_COMPANIES_REVIEWS}${reviewData.companyId}`,
			}),
		}),
	}),
});

export type SendReviewRequest = {
	companyId: number;
	rating: null | number;
	text: string;
};

export const { useGetReviewsByCompanyIdQuery, useSendReviewMutation } =
	reviewsApi;
