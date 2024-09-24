import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
	baseUrl: `${import.meta.env.VITE_BASE_URL}`,
	mode: "cors",
	prepareHeaders: (headers) => {
		const authToken = `${import.meta.env.AUTH_TOKEN}`;
		const csrfToken = `${import.meta.env.CSRF_TOKEN}`;

		headers.set("accept", "application/json");
		headers.set("authorization", `Basic ${authToken}`);
		headers.set("X-CSRFToken", csrfToken);

		return headers;
	},
});

export const api = createApi({
	baseQuery,
	endpoints: () => ({}),
	reducerPath: "api",
	tagTypes: ["companies"],
});
