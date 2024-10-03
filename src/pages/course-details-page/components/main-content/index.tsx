import React from "react";
import { useRef } from "react";
import { ContactsBar } from "./components/contacts-bar";
import { useGetCourseByIdQuery } from "~/redux/courses/courses-api";


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

type MainContentProperties = {
	courseId: string;
};

const MainContent: React.FC<MainContentProperties> = ({courseId}) => {



	const { data: course } = useGetCourseByIdQuery(courseId);
console.log(course)

	const courseName: string = course?.title || "";

	const breadcrumbs = [
		{ label: "Головна сторінка", path: `../`},
		{ label: "Пошук", path: "#" },
		{ label: courseName, path: "#" },
	];

	const aboutCourseRef = useRef(null);
	const aboutCompanyRef = useRef(null);


	return (
		<div className={styles["main_content_wrapper"]}>
			{course && (
				<div className={styles["main_content"]}>
					<BreadCrumb items={breadcrumbs} />
					<PageTitle course={course} />
					<NavBar aboutCourse={aboutCourseRef} aboutCompany={aboutCompanyRef} />
					<Header ref={aboutCourseRef} title="Про курс" />
					<PricingBar price={course ? course.price : ""} />
					<TargetGroupSection targetGroup={course ? course.age : ""} />
					<DescriptionSection
						description={course ? course.description : ""}
					/>
					<CategoriesSection course={course} />
					<ContactsBar
						course={course}
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
