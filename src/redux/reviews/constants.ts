const reviewsApiPath = {
	COMPANIES_REVIEWS: "/reviews/companies/list/",
	COURSES_REVIEWS: "/reviews/courses/list/",
	POST_COMPANIES_REVIEWS: "/reviews/companies/",
	POST_REPORTS: "/reviews/report/",
	REVIEWS_BY_COURSE_ID: "/reviews/courses/list/",
	REVIEWS_BY_USER_ID: "/reviews-page/user/",
	REVIEWS_STATS_BY_COURSE_ID: "/reviews/stats/course/",
	ROOT: "/reviews",
	SHAREABLE_LINK: "/reviews/share/",
} as const;

export { reviewsApiPath };
