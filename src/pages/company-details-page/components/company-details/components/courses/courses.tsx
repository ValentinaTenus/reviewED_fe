import React, { useState } from "react";

import { Button, Icon } from "~/common/components";
import { ButtonVariant, IconName } from "~/common/enums";
import { Company, GetCoursesResult } from "~/common/types";

import { CourseCard } from "./components/course-card/course-card";
import styles from "./styles.module.scss";

const Courses = React.forwardRef<
	HTMLDivElement,
	{ company: Company; courses: GetCoursesResult[] }
>(({ company, courses }, ref) => {
	const [showAll, setShowAll] = useState(false);

	const toggleShowAll = () => {
		setShowAll((prev) => !prev);
	};

	const MIN_NUMBER = 0;
	const MAX_NUMBER = 3;

	const displayedCourses = showAll
		? courses
		: courses.slice(MIN_NUMBER, MAX_NUMBER);

	return (
		<div className={styles["courses"]} ref={ref}>
			<h2 className={styles["courses_heading"]}>Курси</h2>
			<div className={styles["courses_cards"]}>
				{displayedCourses.map((course, index) => (
					<div className={styles["course_card"]} key={index}>
						<CourseCard course={course} />
					</div>
				))}
			</div>
			{courses.length > MAX_NUMBER && (
				<Button onClick={toggleShowAll} variant={ButtonVariant.OUTLINED}>
					{showAll ? "Сховати" : "Показати всі"}
					<Icon name={showAll ? IconName.ARROW_TOP : IconName.ARROW_DOWN} />
				</Button>
			)}
		</div>
	);
});

Courses.displayName = "Courses";

export { Courses };
