import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "~/assets/styles/index.scss";

import { App } from "./app/App.tsx";
import { AppRoute } from "./common/enums/app-route.enum.ts";
import { HomePage } from "./pages/index.ts";
import { store } from "./redux/store.ts";

const routes = createBrowserRouter([
	{
		children: [
			{
				element: <HomePage />,
				path: AppRoute.ROOT,
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
