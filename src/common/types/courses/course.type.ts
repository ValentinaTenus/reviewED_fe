import { Category } from "../category";

type CourseCompany = {
	id: number;
	name: string;
	website: string;
};

type Course = {
	age: string;
	avg_rating: number;
	categories: Category[];
	company_logo: string;
	contact: string;
	description: string[];
	id: number;
	location: string;
	price: string;
	reviews_count: number;
	title: string;
	website: string;
};

type GetCoursesResult = {
	company: string;
} & Course;

type GetCourseByIdResponseDto = {
	company: CourseCompany;
} & Course;

export { type Course, type GetCourseByIdResponseDto, type GetCoursesResult };
