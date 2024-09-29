import { type Review } from "./review.type";

type GetReviewsResponse = {
	count: number;
	next: null | string;
	previous: null | string;
	results: Review[];
};

export { type GetReviewsResponse };
