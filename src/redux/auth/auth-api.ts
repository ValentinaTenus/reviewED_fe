import { httpMethods } from "~/common/enums/index.ts";
import { type AuthResponseDto } from "~/common/types/index.ts";

import { api } from "../services.ts";
import { authApiPath } from "./constants.ts";

export const authApi = api.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.query<AuthResponseDto, undefined>({
			query: () => {
				return {
					method: httpMethods.GET,
					url: authApiPath.LOGIN,
				};
			},
		}),
	}),
});

export const { useLazyLoginQuery, useLoginQuery } = authApi;
