import {
	createApi,
	fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
	baseUrl: `${import.meta.env.VITE_BASE_URL}`,
	mode: "cors",
});

export const api = createApi({
	baseQuery,
	endpoints: () => ({}),
	reducerPath: "api",
  tagTypes: ['companies'],
});
