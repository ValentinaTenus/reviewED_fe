import { type Course } from "./course.type";

type GetCoursesResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Course[];
};

export { type GetCoursesResponse };
