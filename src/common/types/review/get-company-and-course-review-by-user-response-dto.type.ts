import { type CompanyAndCourseReviewsByUserId } from "./company-and-courses-review-by-user-id.type";

type GetCompanyAndCourseReviewsByUserIdResponse = {
	count: number;
	next: null | number;
	previous: null | number;
	results: CompanyAndCourseReviewsByUserId[];
};

export { type GetCompanyAndCourseReviewsByUserIdResponse };
