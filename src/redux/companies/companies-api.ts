import { httpMethods } from "~/common/enums/index.ts";
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
					method: httpMethods.GET,
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
		getCompaniesByFilter: builder.query<Company[], GetCompaniesRequestQuery>({
			forceRefetch({ currentArg, previousArg }) {
				return (
					currentArg?.name !== previousArg?.name ||
					currentArg?.city !== previousArg?.city
				);
			},
			query: (filters: GetCompaniesRequestQuery = {}) => {
				return {
					method: httpMethods.GET,
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
		getCompanyById: builder.query<Company, string | undefined>({
			query: (id) => ({
				method: httpMethods.GET,
				url: companiesApiPath.ROOT + `/${id}`,
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
