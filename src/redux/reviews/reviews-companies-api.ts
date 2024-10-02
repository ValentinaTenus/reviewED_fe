import { HttpMethods } from "~/common/enums/index.ts";
import {
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
	}),
});

export const { useGetReviewsByCompanyIdQuery } = reviewsApi;
