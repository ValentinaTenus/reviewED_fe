import {
	type TypedUseSelectorHook,
	useDispatch,
	useSelector,
} from "react-redux";

import type { AppDispatch, RootState } from "./store.ts";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
