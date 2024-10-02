import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { ScreenBreakpoints } from "~/common/constants/index";
import { AppRoute } from "~/common/enums/index";
import { type GetCoursesResult } from "~/common/types/index";

import { CourseCard, ItemsContentWrapperSection, ItemsHeader } from "../index";
import styles from "./styles.module.scss";

type NewCoursesSectionProperties = {
	courses: GetCoursesResult[];
	screenWidth: number;
};

const NewCoursesSection: React.FC<NewCoursesSectionProperties> = ({
	courses,
	screenWidth,
}) => {
	const navigate = useNavigate();

	const handleSeeAllClick = useCallback(() => {
		navigate(AppRoute.ALL_COURSES);
	}, [navigate]);

	return (
		<div className={styles["new_courses"]}>
			<ItemsHeader
				header={
					screenWidth < ScreenBreakpoints.DESKTOP
						? "Нові курси"
						: "Нещодавно додані курси"
				}
				onClick={handleSeeAllClick}
				screenWidth={screenWidth}
			/>
			<ItemsContentWrapperSection className={styles["items_section"]}>
				{courses.map((course) => (
					<CourseCard course={course} key={course.id} />
				))}
			</ItemsContentWrapperSection>
		</div>
	);
};

export { NewCoursesSection };
