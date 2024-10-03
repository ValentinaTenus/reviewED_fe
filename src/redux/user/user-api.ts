import { HttpMethods } from "~/common/enums/index.ts";
import {
	type AgreePolicyRequest,
	type UserWithStaff,
} from "~/common/types/index.ts";

import { api } from "../services.ts";
import { userApiPath } from "./constants.ts";

export const userApi = api.injectEndpoints({
	endpoints: (builder) => ({
		agreePolicy: builder.mutation<string, AgreePolicyRequest>({
			query: (consent) => ({
				body: consent,
				method: HttpMethods.POST,
				url: userApiPath.USER_AGREE_POLICY,
			}),
		}),
		getUser: builder.query<UserWithStaff, undefined>({
			query: () => ({
				method: HttpMethods.GET,
				url: userApiPath.USER,
			}),
		}),
	}),
});

export const { useAgreePolicyMutation, useGetUserQuery } = userApi;
