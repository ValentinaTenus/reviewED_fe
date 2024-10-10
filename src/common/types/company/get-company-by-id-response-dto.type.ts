import { type Category } from "../category";

type GetCompanyByIdResponse = {
	address: string;
	avg_overall_rating: number;
	avg_rating: number;
	categories: Category[];
	city: string;
	contact_person: string;
	description: string[];
	email: string;
	id: number;
	logo: string;
	name: string;
	phone_numbers: string[];
	review_count: number;
	total_reviews_count: number;
	website: string;
};

export { type GetCompanyByIdResponse };
