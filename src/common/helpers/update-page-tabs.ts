import { tabs } from "../constants/index";

const matchDynamicRoute = (pathname: string): string | undefined => {
	if (/^\/company-details\/.+/.test(pathname)) {
		return tabs["/company-details"];
	}
	if (/^\/course-details\/.+/.test(pathname)) {
		return tabs["/course-details"];
	}
	return undefined;
};

const updatePageTab = (): void => {
	const title = tabs[location.pathname] || matchDynamicRoute(location.pathname);
	document.title = title || "ReviewED";
};

export { updatePageTab };
