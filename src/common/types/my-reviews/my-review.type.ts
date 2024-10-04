type MyReview = {
	author_full_name: string;
	company_reviews_count: number;
	id: number;
	logo: string;
	rating: number;
	related_entity_name: string;
	status: "pending" | "published" | "removed";
	text: string;
	time_added: string;
	count_likes: number
	total_courses_count: number;
};

export { type MyReview };
