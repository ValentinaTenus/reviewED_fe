import React from "react";
import { useRef } from "react";
import { ContactsBar } from "./components/contacts-bar";
// import { useGetCourseByIdQuery } from "~/redux/courses/courses-api";
import { useGetCoursesQuery } from "~/redux/courses/courses-api";

import { CategoriesSection } from "./components/categories-list";
import { DescriptionSection } from "./components/description-section";
import { Header } from "./components/header";
import { PricingBar } from "./components/pricing-bar";
import { TargetGroupSection } from "./components/target-group-section";
import styles from "./styles.module.scss";
import { BreadCrumb } from "~/common/components";
import { PageTitle } from "./components/page-title";
import { NavBar } from "./components/navigation-bar";
import { ReviewsBar } from "./components/reviews-bar";

const MainContent: React.FC = () => {
	const { data: courses } = useGetCoursesQuery(undefined);
	const mockCourse = courses?.[0];

	// const exampleCourseIndex = "2";
	// const { data: mockCourse } = useGetCourseByIdQuery(exampleCourseIndex);
	console.log(mockCourse);

	const courseName: string = mockCourse?.title || "";

	const breadcrumbs = [
		{ label: "Головна сторінка", path: `${import.meta.env.VITE_BASE_URL}`},
		{ label: "Пошук", path: "#" },
		{ label: courseName, path: "#" },
	];

	const aboutCourseRef = useRef(null);
	const aboutCompanyRef = useRef(null);

	console.log(mockCourse);
	return (
		<div className={styles["main_content_wrapper"]}>
			{mockCourse && (
				<div className={styles["main_content"]}>
					<BreadCrumb items={breadcrumbs} />
					<PageTitle course={mockCourse} />
					<NavBar aboutCourse={aboutCourseRef} aboutCompany={aboutCompanyRef} />
					<Header ref={aboutCourseRef} title="Про курс" />
					<PricingBar price={mockCourse ? mockCourse.price : ""} />
					<TargetGroupSection targetGroup={mockCourse ? mockCourse.age : ""} />
					<DescriptionSection
						description={mockCourse ? mockCourse.description : ""}
					/>
					<CategoriesSection />
					<ContactsBar
						course={mockCourse}
						ref={aboutCompanyRef}
						title="Про компанію"
					/>
					<ReviewsBar />
				</div>
			)}
		</div>
	);
};

export { MainContent };
