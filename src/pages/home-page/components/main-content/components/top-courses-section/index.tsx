import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { AppRoute } from "~/common/enums/index";
import { Course } from "~/common/types/index";

import {
	CourseCard,
	ItemsContainer,
	ItemsContentWrapperSection,
	ItemsHeader,
} from "../index";
import styles from "./styles.module.scss";

type TopCoursesSectionProperties = {
	courses: Course[];
	screenWidth: number;
};

const TopCoursesSection: React.FC<TopCoursesSectionProperties> = ({
	courses,
	screenWidth,
}) => {
	const navigate = useNavigate();

	const handleSeeAllClick = useCallback(() => {
		navigate(AppRoute.TOP_COURSES);
	}, [navigate]);

	return (
		<ItemsContainer>
			<ItemsHeader
				header="TOП Курси"
				onClick={handleSeeAllClick}
				screenWidth={screenWidth}
			/>
			<ItemsContentWrapperSection className={styles["items_section"]}>
				{courses.map((course) => (
					<CourseCard
						className={styles["item_card"]}
						course={course}
						key={course.id}
					/>
				))}
			</ItemsContentWrapperSection>
		</ItemsContainer>
	);
};

export { TopCoursesSection };
