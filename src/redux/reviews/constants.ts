const reviewsApiPath = {
	COMPANIES_REVIEWS: "/reviews/companies/list/",
	COURSES_REVIEWS: "/reviews/courses/list/",
	LIKE_COMPANIES_REVIEWS: "/reviews-like/company/",
	POST_COMPANIES_REVIEWS: "/reviews/companies/",
	POST_REPORTS: "/reviews/report/",
	REVIEWS_BY_USER_ID: "/reviews-page/user/",
	ROOT: "/reviews",
	SHAREABLE_LINK: "/reviews/share/",
} as const;

export { reviewsApiPath };
