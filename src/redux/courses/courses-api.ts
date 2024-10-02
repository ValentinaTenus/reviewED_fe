import { HttpMethods } from "~/common/enums/index.ts";
import {
	type Course,
	type GetCoursesRequestQuery,
	type GetQueryResponse,
} from "~/common/types/index.ts";

import { api } from "../services.ts";
import { coursesApiPath } from "./constants.ts";

const ZERO_LENGTH = 0;

export const coursesApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getCourseById: builder.query<Course, string | undefined>({
			query: (id) => ({
				method: HttpMethods.GET,
				url: `${coursesApiPath.ROOT}/${id}`,
			}),
		}),
		getCourses: builder.query<Course[], undefined>({
			query: (filters: GetCoursesRequestQuery = {}) => {
				return {
					method: HttpMethods.GET,
					params: filters,
					url:
						`https://reviewed-api.azurewebsites.net/api/v1/` +
						coursesApiPath.ROOT,
				};
			},
			serializeQueryArgs: ({ endpointName }) => {
				return endpointName;
			},
			transformResponse: (response: GetQueryResponse<Course>) => {
				return response.results;
			},
		}),
		getCoursesByFilter: builder.query<
			GetQueryResponse<Course[]>,
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
					city.length > ZERO_LENGTH
						? `city=${encodeURIComponent(city.join(","))}`
						: "",
					subcategory_by_id.length > ZERO_LENGTH
						? `subcategory_by_id=${encodeURIComponent(subcategory_by_id.join(","))}`
						: "",
					category_by_id.length > ZERO_LENGTH
						? `category_by_id=${encodeURIComponent(category_by_id.join(","))}`
						: "",
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
