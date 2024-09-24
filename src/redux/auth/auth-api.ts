import { HttpMethods } from "~/common/enums/index.ts";
import {
	type AuthResponseDto,
	type LoginResponseDto,
	type LogOutRequestDto,
} from "~/common/types/index.ts";

import { api } from "../services.ts";
import { authApiPath } from "./constants.ts";

export const authApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getLoginUrl: builder.query<AuthResponseDto, undefined>({
			query: () => {
				return {
					method: HttpMethods.GET,
					url: authApiPath.LOGIN,
				};
			},
		}),
		login: builder.query<LoginResponseDto, string>({
			query: (code: string) => {
				return {
					method: HttpMethods.GET,
					url: `${authApiPath.LINKEDIN_CALLBACK}?code=${code}`,
				};
			},
		}),
		logOut: builder.query<string, LogOutRequestDto>({
			query: (refresh) => {
				return {
					body: { refresh },
					method: HttpMethods.POST,
					url: authApiPath.LOGOUT,
				};
			},
		}),
	}),
});

export const {
	useLazyGetLoginUrlQuery,
	useLazyLoginQuery,
	useLazyLogOutQuery,
} = authApi;
