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
		getCoursesByFilter: builder.query<
			GetCoursesResponse,
			GetCoursesRequestQuery
		>({
			forceRefetch({ currentArg, previousArg }) {
				return (
					currentArg?.title !== previousArg?.title ||
					currentArg?.category_by_id !== previousArg?.category_by_id ||
					currentArg?.subcategory_by_id !== previousArg?.subcategory_by_id ||
					currentArg?.limit !== previousArg?.limit ||
					currentArg?.offset !== previousArg?.offset ||
					currentArg?.company_id !== previousArg?.company_id ||
					currentArg?.sort !== previousArg?.sort ||
					currentArg?.city !== previousArg?.city
				);
			},
			query: (filters: GetCoursesRequestQuery = {}) => {
				const {
					category_by_id = [],
					city = [],
					company_id,
					limit,
					offset,
					sort,
					subcategory_by_id = [],
					title = "",
				} = filters;

				const queryParams = [
					...city.map((c) => `city=${encodeURIComponent(c)}`),
					...subcategory_by_id.map(
						(sc) => `subcategory_by_id=${encodeURIComponent(sc)}`,
					),
					...category_by_id.map(
						(c) => `category_by_id=${encodeURIComponent(c)}`,
					),
					title ? `title=${encodeURIComponent(title)}` : "",
					limit ? `limit=${limit}` : "",
					offset ? `offset=${offset}` : "",
					company_id ? `company_id=${company_id}` : "",
					sort ? `sort=${sort}` : "",
				]
					.filter(Boolean)
					.join("&");

				return {
					method: HttpMethods.GET,
					url: `${coursesApiPath.ROOT}?${queryParams}`,
				};
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
