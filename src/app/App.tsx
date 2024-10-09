import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { updatePageTab } from "~/common/helpers";
import { useGetUser } from "~/common/hooks/use-get-user.hook";
import { useAppSelector } from "~/redux/hooks.type";
import { type RootState } from "~/redux/store";
import { Slide, ToastContainer } from "react-toastify";

const App: React.FC = () => {
	const location = useLocation();

	const { refetch } = useGetUser();
	const user = useAppSelector((state: RootState) => state.auth.user);

	useEffect(() => {
		if (!user) {
			refetch();
		}
	}, [user, refetch]);

	useEffect(() => {
		updatePageTab();
	}, [location]);

	return (
		<>
			<Outlet />
			<ToastContainer
				position="top-right"
				autoClose={5000}
				pauseOnHover={false}
				theme="light"
				transition={Slide}
			/>
		</>
	);
};

export { App };
