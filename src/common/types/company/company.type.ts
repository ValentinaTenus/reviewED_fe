import { Category } from "../category";

type Company = {
	average_rating: number;
	categories: Category[];
	city: string;
	contact_person: string;
	description: string;
	email: string;
	id: number;
	logo: string;
	name: string;
	phone_numbers: string[];
	website: string;
};

export { type Company };
