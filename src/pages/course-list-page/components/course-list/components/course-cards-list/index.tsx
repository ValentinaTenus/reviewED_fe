import React from "react";

import { type GetCoursesResult } from "~/common/types";

import { CourseCard } from "../course-card";
import styles from "./styles.module.scss";

type Properties = {
	courses: GetCoursesResult[];
};

const CourseCardsList: React.FC<Properties> = ({ courses }) => {
	return (
		<div className={styles["course_list__container"]}>
			{courses.map((course) => (
				<CourseCard course={course} key={course.id} />
			))}
		</div>
	);
};

export { CourseCardsList };
