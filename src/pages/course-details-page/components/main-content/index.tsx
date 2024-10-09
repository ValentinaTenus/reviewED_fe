import React, { useRef } from "react";

import { BreadCrumb, Spinner } from "~/common/components";
import { AppRoute, SpinnerVariant } from "~/common/enums";
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

	const aboutCourseRef = useRef(null);
	const aboutCompanyRef = useRef(null);

	const breadcrumbs = [
		{ label: "Головна сторінка", path: AppRoute.ROOT },
		{ label: "Курси", path: AppRoute.ALL_COURSES },
		{ label: courseName },
	];

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
							<div className={styles["main-content__header"]}>
								<PageTitle course={course} />
								<NavBar
									aboutCompany={aboutCompanyRef}
									aboutCourse={aboutCourseRef}
								/>
							</div>

							<div className={styles["main-content__about"]}>
								<Header ref={aboutCourseRef} title="Про курс" />
								<PricingBar price={course ? course.price : ""} />
								<div className={styles["main-content__about-description"]}>
									<TargetGroupSection targetGroup={course ? course.age : ""} />
									<DescriptionSection
										description={course ? course.description : ""}
									/>
									<CategoriesSection course={course} />
								</div>
							</div>

							<ContactsBar
								course={course}
								ref={aboutCompanyRef}
								title="Про компанію"
							/>
							<ReviewsBar courseId={courseId} />
						</div>
					)}
				</>
			)}
		</div>
	);
};

export { MainContent };
