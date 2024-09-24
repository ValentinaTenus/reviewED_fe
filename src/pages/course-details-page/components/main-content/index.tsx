import React from "react";

import { useGetCoursesQuery } from "~/redux/courses/courses-api";

import { CategoriesSection } from "./components/categories-list";
import { DescriptionSection } from "./components/description-section";
import { Header } from "./components/header";
import { PricingBar } from "./components/pricing-bar";
import { SkillsList } from "./components/skills-list";
import { TargetGroupSection } from "./components/target-group-section";
import styles from "./styles.module.scss";

const MainContent: React.FC = () => {
	const { data: courses } = useGetCoursesQuery(undefined);

	const exampleCourseIndex = 0;
	const mockCourse = courses?.[exampleCourseIndex];

	return (
		<div className={styles["main_content_wrapper"]}>
			<div className={styles["main_content"]}>
				<Header />
				<PricingBar price={mockCourse ? mockCourse.price : ""} />
				<TargetGroupSection targetGroup={mockCourse ? mockCourse.age : ""} />
				<DescriptionSection
					description={mockCourse ? mockCourse.description : ""}
				/>
				<SkillsList />
				<CategoriesSection />
			</div>
		</div>
	);
};

export { MainContent };
