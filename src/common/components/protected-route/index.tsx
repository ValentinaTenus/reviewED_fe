import React from "react";
import { Navigate } from "react-router-dom";

import { AppRoute } from "~/common/enums";
import { useAppSelector } from "~/redux/hooks.type";

export const ProtectedRouteIsStaff = ({
	element,
}: {
	element: React.JSX.Element;
}) => {
	const { user } = useAppSelector((state) => state.auth);
	return user?.is_staff ? element : <Navigate to={AppRoute.ROOT} />;
};

export const ProtectedRouteIsLogined = ({
	element,
}: {
	element: React.JSX.Element;
}) => {
	const { user } = useAppSelector((state) => state.auth);
	return user ? element : <Navigate to={AppRoute.ROOT} />;
};
