import { httpMethods } from "~/common/enums/index.ts";
import {
	type Course,
	type GetCoursesRequestQuery,
	type GetCoursesResponse,
} from "~/common/types/index.ts";

import { api } from "../services.ts";
import { coursesApiPath } from "./constants.ts";

export const coursesApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getCourseById: builder.query<Course, string | undefined>({
			query: (id) => ({
				method: httpMethods.GET,
				url: coursesApiPath.ROOT + `/${id}`,
			}),
		}),
		getCourses: builder.query<Course[], undefined>({
			query: (filters: GetCoursesRequestQuery = {}) => {
			
				return {
					method: httpMethods.GET,
					params: filters,
					url: coursesApiPath.ROOT,
				};
			},
			serializeQueryArgs: ({ endpointName }) => {
				return endpointName;
			},
			transformResponse: (response: GetCoursesResponse) => {
        return response.results; 
      },
		}),
		getCoursesByFilter: builder.query<Course[], GetCoursesRequestQuery>({
			forceRefetch({ currentArg, previousArg }) {
				return (
					currentArg?.title !== previousArg?.title ||
					currentArg?.city !== previousArg?.city
				);
			},
			query: (filters: GetCoursesRequestQuery = {}) => {
				return {
					method: httpMethods.GET,
					params: filters,
					url: coursesApiPath.ROOT,
				};
			},
			serializeQueryArgs: ({ endpointName }) => {
				return endpointName;
			},
			transformResponse: (response: GetCoursesResponse) => {
				return response.results;
			},
		}),
	}),
});

export const {
  useGetCourseByIdQuery,
	useGetCoursesQuery,
	useGetCoursesByFilterQuery,
	useLazyGetCoursesByFilterQuery
} = coursesApi;
