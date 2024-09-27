import { HttpMethods } from "~/common/enums/index.ts";
import {
	type AuthResponseDto,
	type LoginResponseDto,
	type LogOutRequestDto,
} from "~/common/types/index.ts";

import { api } from "../services.ts";
import { authApiPath } from "./constants.ts";

const REDIRECT_URI = `${import.meta.env.VITE_AUTH_REDIRECT_URL}`;
const BASE_URL = `${import.meta.env.VITE_BASE_URL}`;

export const authApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getLoginUrl: builder.query<AuthResponseDto, undefined>({
			query: () => {
				return {
					method: HttpMethods.GET,
					url: `${BASE_URL}${authApiPath.LOGIN}?redirect_uri=${REDIRECT_URI}`,
				};
			},
		}),
		login: builder.query<LoginResponseDto, { code: string; state: string }>({
			query: ({ code, state }) => {
				return {
					method: HttpMethods.GET,
					url: `${BASE_URL}${authApiPath.LINKEDIN_CALLBACK}?code=${code}&state=${state}&redirect_uri=${REDIRECT_URI}`,
				};
			},
		}),
		logOut: builder.query<string, LogOutRequestDto>({
			query: (refresh) => {
				return {
					body: refresh,
					method: HttpMethods.POST,
					url: `${BASE_URL}${authApiPath.LOGOUT}`,
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
