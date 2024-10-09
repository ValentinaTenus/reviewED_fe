import {
	BaseQueryFn,
	createApi,
	FetchArgs,
	fetchBaseQuery,
	FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";

import { HttpMethods, HttpStatusCode } from "~/common/enums";
import { GetTokensResponseDto } from "~/common/types";

import { logout, setIsRefreshing, setTokens } from "./auth/auth-slice";
import { authApiPath } from "./auth/constants";
import { RootState } from "./store";

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
	baseUrl: `${import.meta.env.VITE_BASE_URL}`,
	mode: "cors",
	prepareHeaders: (headers, { getState }) => {
		const state = getState() as RootState;
		const token = state.auth.access;

		if (token) headers.set("authorization", `Bearer ${token}`);

		return headers;
	},
});

const baseQueryWithReauth: BaseQueryFn<
	FetchArgs | string,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	const state = api.getState() as RootState;
	const { refresh } = state.auth;

	await mutex.waitForUnlock();
	let result = await baseQuery(args, api, extraOptions);

	if (
		result.error &&
		result.error.status === HttpStatusCode.UNAUTHORIZED &&
		refresh
	) {
		if (!mutex.isLocked()) {
			const release = await mutex.acquire();

			try {
				const refreshResult = await baseQuery(
					{
						body: { refresh },
						method: HttpMethods.POST,
						url: authApiPath.REFRESH_TOKEN,
					},
					api,
					extraOptions,
				);

				if (refreshResult.data) {
					const data = refreshResult.data as GetTokensResponseDto;
					api.dispatch(setTokens(data));
					api.dispatch(setIsRefreshing(false));
					result = await baseQuery(args, api, extraOptions);
				} else {
					api.dispatch(logout());
				}
			} finally {
				release();
			}
		} else {
			await mutex.waitForUnlock();
			result = await baseQuery(args, api, extraOptions);
		}
	}

	return result;
};

export const api = createApi({
	baseQuery: baseQueryWithReauth,
	endpoints: () => ({}),
	reducerPath: "api",
	tagTypes: ["User", "MyReviews"],
});
