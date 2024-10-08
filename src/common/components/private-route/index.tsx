import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AppRoute } from "~/common/enums/index";
import { useAppSelector } from "~/redux/hooks.type";
import { RootState } from "~/redux/store.ts";

const PrivateRoute: React.FC = () => {
	const user = useAppSelector((state: RootState) => state.auth.user);

	return user ? <Outlet /> : <Navigate to={AppRoute.ROOT} />;
};

export { PrivateRoute };
