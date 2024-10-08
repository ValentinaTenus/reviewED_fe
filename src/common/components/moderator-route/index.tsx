import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AppRoute } from "~/common/enums/index";
import { useAppSelector } from "~/redux/hooks.type";
import { RootState } from "~/redux/store.ts";

const ModeratorRoute: React.FC = () => {
	const user = useAppSelector((state: RootState) => state.auth.user);

	return user && user.is_staff ? <Outlet /> : <Navigate to={AppRoute.ROOT} />;
};

export { ModeratorRoute };
