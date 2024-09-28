import { HttpMethods } from "~/common/enums/index.ts";
import { type Category } from "~/common/types/index.ts";

import { api } from "../services.ts";
import { categoriesApiPath } from "./constants.ts";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}`;

export const categoriesApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getCategories: builder.query<Category[], undefined>({
			query: () => {
				return {
					method: HttpMethods.GET,
					url: `${BASE_URL}${categoriesApiPath.ROOT}`,
				};
			},
		}),
	}),
});

export const { useGetCategoriesQuery } = categoriesApi;
