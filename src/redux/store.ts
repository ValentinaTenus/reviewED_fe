import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authApi } from "./auth/auth-api.ts";
import { authReducer } from "./auth/auth-slice.ts";
import { categoriesApi } from "./categories/categories-api.ts";
import { categoriesReducer } from "./categories/categories-slice.ts";
import { companiesApi } from "./companies/companies-api.ts";
import { companiesReducer } from "./companies/companies-slice.ts";
import { coursesApi } from "./courses/courses-api.ts";
import { coursesReducer } from "./courses/courses-slice.ts";
import { locationsApi } from "./locations/locations-api.ts";
import { locationsReducer } from "./locations/locations-slice.ts";
import { reviewsModerationApi } from "./reviews-moderation/reviews-moderation-api.ts";
import { reviewsModerationReducer } from "./reviews-moderation/reviews-moderation-slice.ts";
import { api } from "./services.ts";

const rootReducer = combineReducers({
	[api.reducerPath]: api.reducer,
	auth: authReducer,
	authApiSlice: authApi.reducer,
	categories: categoriesReducer,
	categoriesApiSlice: categoriesApi.reducer,
	companies: companiesReducer,
	companiesApiSlice: companiesApi.reducer,
	courses: coursesReducer,
	coursesApiSlice: coursesApi.reducer,
	locations: locationsReducer,
	locationsApiSlice: locationsApi.reducer,
	rewiewsModeration: reviewsModerationReducer,
	rewiewsModerationApiSlice: reviewsModerationApi.reducer,
});

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["companies"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
			},
		}).concat(api.middleware),
	reducer: persistedReducer,
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

export { persistor, store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
