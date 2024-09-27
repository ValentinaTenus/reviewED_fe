import { type MyReview } from "./my-review.type";

type GetMyReviewsResponse = {
	count: number;
	next: null | string;
	previous: null | string;
	results: MyReview[];
};

export { type GetMyReviewsResponse };
