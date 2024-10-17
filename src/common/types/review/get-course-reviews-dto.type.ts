import { type CourseReview } from "./course-reviews.type";

type GetCourseReviews = {
	count: number;
	next: null | number;
	previous: null | number;
	results: CourseReview[];
};

export { type GetCourseReviews };
