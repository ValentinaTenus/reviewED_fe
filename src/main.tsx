import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "~/assets/styles/index.scss";

import { App } from "./app/App.tsx";
import { AppRoute } from "./common/enums/app-route.enum.ts";
import { FaqPage } from "./pages/faq-page/index.tsx";
import { CompaniesListPage, HomePage, ModeratorsPage } from "./pages/index.ts";
import { store } from "./redux/store.ts";

const routes = createBrowserRouter([
	{
		children: [
			{
				element: <HomePage />,
				path: AppRoute.ROOT,
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
