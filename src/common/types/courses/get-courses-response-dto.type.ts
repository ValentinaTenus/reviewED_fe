import { type Course } from "./course.type";

type GetCoursesResponse = {
	count: number;
	next: null | string;
	previous: null | string;
	results: Course[];
};

export { type GetCoursesResponse };
