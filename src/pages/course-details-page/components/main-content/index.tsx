import React, { useRef } from "react";

import { BreadCrumb, Spinner } from "~/common/components";
import { SpinnerVariant } from "~/common/enums";
import { useGetCourseByIdQuery } from "~/redux/courses/courses-api";

import { CategoriesSection } from "./components/categories-list";
import { ContactsBar } from "./components/contacts-bar";
import { DescriptionSection } from "./components/description-section";
import { Header } from "./components/header";
import { NavBar } from "./components/navigation-bar";
import { PageTitle } from "./components/page-title";
import { PricingBar } from "./components/pricing-bar";
import { ReviewsBar } from "./components/reviews-bar";
import { TargetGroupSection } from "./components/target-group-section";
import styles from "./styles.module.scss";

type MainContentProperties = {
	courseId: string;
};

const MainContent: React.FC<MainContentProperties> = ({ courseId }) => {
	const { data: course, isFetching } = useGetCourseByIdQuery(courseId);

	const courseName: string = course?.title || "";

	const breadcrumbs = [
		{ label: "Головна сторінка", path: `../` },
		{ label: "Пошук", path: "#" },
		{ label: courseName, path: "#" },
	];

	const aboutCourseRef = useRef(null);
	const aboutCompanyRef = useRef(null);
	const reviewsRef = useRef(null);

	// if(isFetching){
	// 	return (
	// 		<div className={styles["course-details_spinner"]}>
	// 			<Spinner variant={SpinnerVariant.MEDIUM}/>
	// 		</div>
	// 	)
	// }

	return (
		<div className={styles["main-content__wrapper"]}>
			{isFetching && (
				<div className={styles["course-details_spinner"]}>
					<Spinner variant={SpinnerVariant.MEDIUM} />
				</div>
			)}
			{!isFetching && (
				<>
					<BreadCrumb items={breadcrumbs} />
					{course && (
						<div className={styles["main-content"]}>
							<PageTitle course={course} />
							<NavBar
								aboutCompany={aboutCompanyRef}
								aboutCourse={aboutCourseRef}
								reviews={reviewsRef}
							/>
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
							<ReviewsBar course={course} ref={reviewsRef} />
						</div>
					)}
				</>
			)}
		</div>
	);
};

export { MainContent };
