import { HttpMethods } from "~/common/enums/index.ts";
import { type UserWithStaff } from "~/common/types/index.ts";

import { api } from "../services.ts";
import { userApiPath } from "./constants.ts";

export const userApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getUser: builder.query<UserWithStaff, undefined>({
			query: () => ({
				method: HttpMethods.GET,
				url: userApiPath.USER,
			}),
		}),
	}),
});

export const { useGetUserQuery } = userApi;
