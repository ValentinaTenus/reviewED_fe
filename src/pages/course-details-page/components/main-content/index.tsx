import React from "react";
import { useRef } from "react";
import { ContactsBar } from "./components/contacts-bar";
import { useGetCoursesQuery } from "~/redux/courses/courses-api";

import { CategoriesSection } from "./components/categories-list";
import { DescriptionSection } from "./components/description-section";
import { Header } from "./components/header";
import { PricingBar } from "./components/pricing-bar";
import { SkillsList } from "./components/skills-list";
import { TargetGroupSection } from "./components/target-group-section";
import styles from "./styles.module.scss";
import { BreadCrumb } from "~/common/components";
import { PageTitle } from "./components/page-title";
import { NavBar } from "./components/navigation-bar";



const breadcrumbs = [{label: "Головна сторінка", path: "#"}, {label: "Пошук", path: "#"}, {label: "Наша сторінка", path: "#"},];

const MainContent: React.FC = () => {
	const { data: courses } = useGetCoursesQuery(undefined);

	const exampleCourseIndex = 0;
	const mockCourse = courses?.[exampleCourseIndex];


	const aboutCourseRef = useRef(null);
	const aboutCompanyRef = useRef(null);

console.log(mockCourse);
	return (
		<div className={styles["main_content_wrapper"]}>
			{mockCourse && <div className={styles["main_content"]}>
				<BreadCrumb items={breadcrumbs}/>
				<PageTitle course={mockCourse}/>
				<NavBar aboutCourse={aboutCourseRef} aboutCompany={aboutCompanyRef}/>
				<Header ref={aboutCourseRef} title="Про курс"/>
				<PricingBar price={mockCourse ? mockCourse.price : ""} />
				<TargetGroupSection targetGroup={mockCourse ? mockCourse.age : ""} />
				<DescriptionSection
					description={mockCourse ? mockCourse.description : ""}
				/>
				<SkillsList />
				<CategoriesSection />
				<ContactsBar course={mockCourse} ref={aboutCompanyRef} title="Про компанію"/>
			</div>}
		</div>
	);
};

export { MainContent };
