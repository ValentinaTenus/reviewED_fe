import { Category } from "../category";

type Company = {
	avg_overall_rating: number;
	categories: Category[];
	city: string;
	contact_person: string;
	description: string;
	email: string;
	id: number;
	// last_review_authors_avatars: null[] | string;
	logo: string;
	name: string;
	phone_numbers: string[];
	// total_courses: number;
	total_reviews_count: number;
	website: string;
};

export { type Company };
