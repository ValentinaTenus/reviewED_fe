import { httpMethods } from "~/common/enums/index.ts";

import { api } from "../services.ts";
import { locationsApiPath } from "./constants.ts";

export const locationsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getCompaniesLocations: builder.query<string[], undefined>({
			query: () => ({
				method: httpMethods.GET,
				url: locationsApiPath.LOCATIONS_COMPANIES,
			}),
		}),
		getCoursesLocations: builder.query<string[], undefined>({
			query: () => ({
				method: httpMethods.GET,
				url: locationsApiPath.LOCATIONS_COURSES,
			}),
		}),
	}),
});

export const { useGetCompaniesLocationsQuery, useGetCoursesLocationsQuery } =
	locationsApi;
