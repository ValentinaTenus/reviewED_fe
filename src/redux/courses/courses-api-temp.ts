import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { type Company } from "~/common/types/index.ts";

export const coursesApiTemp = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: "https://reviewed-api.azurewebsites.net/api/v1",
	}),
	endpoints: (builder) => ({
		getCourses: builder.query<Company[], void>({
			query: () => `/courses`,
		}),
	}),
	reducerPath: "coursesTemp",
});

export const { useGetCoursesQuery } = coursesApiTemp;
