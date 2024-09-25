import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useGetUser } from "~/common/hooks/use-get-user.hook";
import { useAppSelector } from "~/redux/hooks.type";
import { type RootState } from "~/redux/store";

const App: React.FC = () => {
	const { refetch } = useGetUser();
	const user = useAppSelector((state: RootState) => state.auth.user);

	useEffect(() => {
		if (!user) {
			refetch();
		}
	}, [user, refetch]);

	return (
		<>
			<Outlet />
		</>
	);
};

export { App };
