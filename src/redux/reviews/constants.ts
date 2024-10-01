const reviewsApiPath = {
	REVIEWS_BY_COURSE_ID: "/reviews/courses/list/",
	REVIEWS_BY_USER_ID: "/reviews-page/user/",
	REVIEWS_STATS_BY_COURSE_ID: "/reviews/stats/course/",
	ROOT: "/reviews",
} as const;

export { reviewsApiPath };
