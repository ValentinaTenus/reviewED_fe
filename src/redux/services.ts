import {
	BaseQueryFn,
	createApi,
	FetchArgs,
	fetchBaseQuery,
	FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

import { HttpMethods, HttpStatusCode } from "~/common/enums/index";
import { type GetTokensResponseDto } from "~/common/types/index";

import { logout, setIsRefreshing, setTokens } from "./auth/auth-slice";
import { authApiPath } from "./auth/constants";
import { type RootState } from "./store";

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

	try {
		let result = await baseQuery(args, api, extraOptions);
		if (
			result.error &&
			result.error.status === HttpStatusCode.UNAUTHORIZED &&
			refresh
		) {
			if (!(api.getState() as RootState).auth.isRefreshing) {
				api.dispatch(setIsRefreshing(true));
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
					api.dispatch(setIsRefreshing(false));
					api.dispatch(logout());
				}
			}
		}

		return result;
	} catch (error) {
		return { error: error as FetchBaseQueryError };
	}
};

export const api = createApi({
	baseQuery: baseQueryWithReauth,
	endpoints: () => ({}),
	reducerPath: "api",
	tagTypes: ["User"],
});
