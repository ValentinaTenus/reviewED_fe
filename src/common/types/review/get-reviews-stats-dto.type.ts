import { type ReviewsStats } from "./reviews-stats.type";
type GetReviewsStats = {
	count: number;
	next: null | number;
	previous: null | number;
	results: ReviewsStats[];
};

export { type GetReviewsStats };
