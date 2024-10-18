import { MyReviewCategory } from "./my-review-category.type";

type GetMyReviewsQueryParams = {
	limit: number;
	offset: number;
	status?: "approved" | "pending" | "rejected";
	type?: MyReviewCategory;
};

export { type GetMyReviewsQueryParams };
