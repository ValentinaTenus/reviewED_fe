import { HttpMethods } from "~/common/enums/index.ts";
import { GetCompanyByIdResponse } from "~/common/types/company/get-company-by-id-response-dto.type.ts";
import {
	type Company,
	type GetCompaniesRequestQuery,
	type GetQueryResponse,
} from "~/common/types/index.ts";

import { api } from "../services.ts";
import { companiesApiPath } from "./constants.ts";

export const companiesApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getCompanies: builder.query<Company[], GetCompaniesRequestQuery>({
			query: (filters: GetCompaniesRequestQuery = {}) => {
				return {
					method: HttpMethods.GET,
					params: filters,
					url: companiesApiPath.ROOT,
				};
			},
			serializeQueryArgs: ({ endpointName }) => {
				return endpointName;
			},
			transformResponse: (response: GetQueryResponse<Company>) => {
				return response.results;
			},
		}),
		getCompaniesByFilter: builder.query<
			GetQueryResponse<Company>,
			GetCompaniesRequestQuery
		>({
			forceRefetch({ currentArg, previousArg }) {
				return (
					currentArg?.name !== previousArg?.name ||
					currentArg?.sort !== previousArg?.sort ||
					currentArg?.category_by_id !== previousArg?.category_by_id ||
					currentArg?.limit !== previousArg?.limit ||
					currentArg?.offset !== previousArg?.limit ||
					currentArg?.city !== previousArg?.city
				);
			},
			query: (filters: GetCompaniesRequestQuery = {}) => {
				return {
					method: HttpMethods.GET,
					params: { ...filters },
					url: `${companiesApiPath.ROOT}`,
				};
			},
			serializeQueryArgs: ({ endpointName }) => {
				return endpointName;
			},
		}),
		getCompanyById: builder.query<GetCompanyByIdResponse, string | undefined>({
			query: (id) => ({
				method: HttpMethods.GET,
				url: `${companiesApiPath.ROOT}/${id}`,
			}),
		}),
	}),
});

export const {
	useGetCompaniesByFilterQuery,
	useGetCompaniesQuery,
	useGetCompanyByIdQuery,
	useLazyGetCompaniesQuery,
} = companiesApi;
