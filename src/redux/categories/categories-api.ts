import { HttpMethods } from "~/common/enums/index.ts";
import { type Category } from "~/common/types/index.ts";

import { api } from "../services.ts";
import { categoriesApiPath } from "./constants.ts";

export const categoriesApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getCategories: builder.query<Category[], undefined>({
			query: () => {
				return {
					method: HttpMethods.GET,
					url: categoriesApiPath.ROOT,
				};
			},
		}),
	}),
});

export const { useGetCategoriesQuery } = categoriesApi;
