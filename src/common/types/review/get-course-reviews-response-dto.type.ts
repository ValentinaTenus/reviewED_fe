import { type CourseReview } from "./course-reviews.type";
type GetCourseReviewsResponse = {
	count: number;
	next: null | number;
	previous: null | number;
	results: CourseReview[];
};

export { type GetCourseReviewsResponse };
