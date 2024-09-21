import { Course } from "~/common/types/index";

interface ICoursesListProps {
	courses: Course[];
}

const CoursesList = ({ courses }: ICoursesListProps) => {
	return (
		<div>
			{courses.map((course: Course) => (
				<section key={course.id}>
					<h2>{course.title}</h2>
					<p>{course.location}</p>
				</section>
			))}
		</div>
	);
};

export default CoursesList;
