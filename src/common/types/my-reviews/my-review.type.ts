type MyReview = {
	author_full_name: string;
	company_id: number;
	company_name: string;
	company_reviews_count: number;
	id: number;
	likes_count: number;
	logo: string;
	rating: number;
	related_entity_name: string;
	status: "pending" | "published" | "removed";
	text: string;
	time_added: string;
	total_courses_count: number;
};

export { type MyReview };
