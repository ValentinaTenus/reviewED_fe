import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useGetUser } from "~/common/hooks/use-get-user.hook";
import { useAppSelector } from "~/redux/hooks.type";
import { type RootState } from "~/redux/store";
import { Slide, ToastContainer } from "react-toastify";

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
