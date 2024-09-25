import { HttpMethods } from "~/common/enums/index.ts";
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
				method: HttpMethods.GET,
				url: coursesApiPath.ROOT + `/${id}`,
			}),
		}),
		getCourses: builder.query<Course[], undefined>({
			query: (filters: GetCoursesRequestQuery = {}) => {
				return {
					method: HttpMethods.GET,
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
					currentArg?.category_by_id !== previousArg?.category_by_id ||
					currentArg?.subcategory_by_id !== previousArg?.subcategory_by_id ||
					currentArg?.city !== previousArg?.city ||
					currentArg?.company_id !== previousArg?.company_id
				);
			},
			query: (filters: GetCoursesRequestQuery = {}) => {
				return {
					method: HttpMethods.GET,
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
	useGetCoursesByFilterQuery,
	useGetCoursesQuery,
	useLazyGetCoursesByFilterQuery,
} = coursesApi;
