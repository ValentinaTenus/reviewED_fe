import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "~/assets/styles/index.scss";

import { App } from "./app/App.tsx";
import { AppRoute } from "./common/enums/app-route.enum.ts";
import { AuthSuccess } from "./pages/auth/auth-success.tsx";
import { CourseList } from "./pages/course-list-page/index.tsx";
import { FaqPage } from "./pages/faq-page/index.tsx";
import {
	AuthPage,
	CompaniesListPage,
	CompanyDetailsPage,
	CourseDetailsPage,
	HomePage,
	ModeratorsPage,
	PrivacyPolicy,
	UserRequests,
	UserReviews,
} from "./pages/index.ts";
import { store } from "./redux/store.ts";

const routes = createBrowserRouter([
	{
		children: [
			{
				element: <HomePage />,
				path: AppRoute.ROOT,
			},
			{
				element: <AuthPage />,
				path: AppRoute.AUTH,
			},
			{
				element: <AuthSuccess />,
				path: AppRoute.AUTH_SUCCESS,
			},
			{
				element: <CompaniesListPage />,
				path: AppRoute.ALL_COMPANIES,
			},
			{
				element: <ModeratorsPage />,
				path: AppRoute.MODERATORS_PAGE,
			},
			{
				element: <FaqPage />,
				path: AppRoute.FAQ_PAGE,
			},
			{
				element: <CompanyDetailsPage />,
				path: AppRoute.COMPANY_DETAILS,
			},
			{
				element: <CourseDetailsPage />,
				path: AppRoute.COURSE_DETAILS,
			},
			{
				element: <CourseList />,
				path: AppRoute.ALL_COURSES,
			},
			{
				element: <UserReviews />,
				path: AppRoute.USER_REVIEWS,
			},
			{
				element: <UserRequests />,
				path: AppRoute.USER_REQUESTS,
			},
			{
				element: <PrivacyPolicy />,
				path: AppRoute.PRIVACY_POLICY,
			},
		],
		element: <App />,
		path: AppRoute.ROOT,
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={routes} />
		</Provider>
	</StrictMode>,
);
