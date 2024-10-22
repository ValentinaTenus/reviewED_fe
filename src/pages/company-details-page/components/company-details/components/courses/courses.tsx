import React, { useState } from "react";

import { Button, CourseCard, Icon } from "~/common/components";
import { ButtonVariant, IconName } from "~/common/enums";
import { type GetCompanyByIdResponse, GetCoursesResult } from "~/common/types";

import styles from "./styles.module.scss";

const Courses = React.forwardRef<
	HTMLDivElement,
	{ company: GetCompanyByIdResponse; courses: GetCoursesResult[] }
>(({ courses }, ref) => {
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
			<h2 className={styles["courses_heading"]}>
				<span>Курси</span>
				<span className={styles["courses_heading__number"]}>
					({courses.length})
				</span>
			</h2>
			<div className={styles["courses_cards"]}>
				{displayedCourses.map((course, index) => (
					<CourseCard course={course} isLogoShown={false} key={index} />
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
