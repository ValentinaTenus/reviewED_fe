import { HttpMethods } from "~/common/enums/index.ts";
import {
	type CompanyReview,
	type GetQueryResponse,
	type GetReviewsByCompanyIdResponseDto,
	type ReviewReport,
} from "~/common/types/index.ts";

import { api } from "../services.ts";
import { reviewsApiPath } from "./constants.ts";

export const companiesReviewsApi = api.injectEndpoints({
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
		likeReview: builder.mutation<undefined, LikeReviewRequest>({
			query: (reviewData) => ({
				method: HttpMethods.POST,
				url: `${reviewsApiPath.LIKE_COMPANIES_REVIEWS}${reviewData.reviewId}/`,
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
		sendReview: builder.mutation<CompanyReview, SendReviewRequest>({
			query: (reviewData) => ({
				body: {
					rating: reviewData.rating,
					text: reviewData.text,
				},
				method: HttpMethods.POST,
				url: `${reviewsApiPath.POST_COMPANIES_REVIEWS}${reviewData.companyId}/`,
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

export type LikeReviewRequest = {
	reviewId: number;
};

export type SendReviewRequest = {
	companyId: number;
	rating: null | number;
	text: string;
};

export type SendReportRequest = {
	reason: string;
	reviewId: number;
	reviewType: string;
};

export const {
	useGetReviewsByCompanyIdQuery,
	useLikeReviewMutation,
	useSendReportMutation,
	useSendReviewMutation,
	useUnlikeReviewMutation,
} = companiesReviewsApi;
