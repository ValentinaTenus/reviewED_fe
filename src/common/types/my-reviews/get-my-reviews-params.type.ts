import { MyReviewCategory } from "./my-review-category.type";

type GetMyReviewsQueryParams = {
	limit: number;
	offset: number;
	type?: MyReviewCategory;
};

export { type GetMyReviewsQueryParams };
