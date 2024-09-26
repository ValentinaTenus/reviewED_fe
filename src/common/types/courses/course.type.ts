import { Category } from "../category";

type Course = {
	age: string;
	avg_rating: number;
	categories: Category[];
	company: string;
	company_logo: string;
	contact: string;
	description: string;
	id: number;
	location: string;
	price: string;
	reviews_count: number;
	title: string;
	website: string;
};

export { type Course };
