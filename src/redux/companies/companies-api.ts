import { httpMethods } from "~/common/enums/index.ts";
import { type Company } from "~/common/types/index.ts";

import { api } from "../services.ts";
import {
	companiesApiPath,
} from "./constants.ts";

type GetCompaniesRequestQuery = {
	name?: string;
	city?: string;
};

export const companiesApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getCompanyById: builder.query<Company, string | undefined>({
			query: (id) => ({
				method: httpMethods.GET,
				url: companiesApiPath.ROOT + `/${id}`,
			}),
		}),
		getCompanies: builder.query<Company[], GetCompaniesRequestQuery>({
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
		}),
	}),
});

export const {
  useGetCompaniesQuery,
  useGetCompanyByIdQuery
} = companiesApi;
