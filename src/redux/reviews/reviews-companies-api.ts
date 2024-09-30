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
	}),
});

export const { useGetReviewsByCompanyIdQuery } = reviewsApi;
