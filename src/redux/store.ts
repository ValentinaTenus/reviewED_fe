import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { companiesApi } from './companies/companies-api.ts';
import { companiesReducer } from './companies/companies-slice.ts';
import { coursesApi } from './courses/courses-api.ts';
import { api } from './services.ts';
import { coursesReducer } from './courses/courses-slice.ts';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
	companies: companiesReducer,
	companiesApiSlice: companiesApi.reducer,
	courses: coursesReducer,
	coursesApiSlice: coursesApi.reducer
});

const persistConfig = {
	key: 'root',
	storage,
  whitelist: ['companies'],
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
