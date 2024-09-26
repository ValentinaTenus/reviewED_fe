import { HttpMethods } from "~/common/enums/index.ts";
import {
	type Company,
	type GetCompaniesRequestQuery,
	type GetCompaniesResponse,
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
			transformResponse: (response: GetCompaniesResponse) => {
				return response.results;
			},
		}),
		getCompaniesByFilter: builder.query<
			GetCompaniesResponse,
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
					params: filters,
					url: companiesApiPath.ROOT,
				};
			},
			serializeQueryArgs: ({ endpointName }) => {
				return endpointName;
			},
		}),
		getCompanyById: builder.query<Company, string | undefined>({
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
