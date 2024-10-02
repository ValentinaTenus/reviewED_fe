import React, { useEffect, useState } from "react";

import { ScreenBreakpoints } from "~/common/constants/index";
import { type GetCoursesResult } from "~/common/types/index";
import { useGetCompaniesQuery } from "~/redux/companies/companies-api";
import { useGetCoursesQuery } from "~/redux/courses/courses-api";

import {
	AddCompanySection,
	BanerBlock,
	CompaniesSection,
	NewCoursesSection,
	QuestionAndAnswer,
	SearchBlock,
	TopCoursesSection,
} from "./components/index";
import styles from "./styles.module.scss";

const VisibleCards = {
	DESKTOP: 8,
	MOBILE: 3,
	SMALL_TABLET: 4,
	TABLET: 6,
};

const DEFAULT_SCREEN_WIDTH = 0;
const INDEX_ZERO = 0;

const MainContent: React.FC = () => {
	const [topCourses, setTopCourses] = useState<GetCoursesResult[]>([]);
	const { data: companies } = useGetCompaniesQuery({});
	const { data: courses } = useGetCoursesQuery(undefined);

	const [visibleItems, setVisibleItems] = useState(VisibleCards.DESKTOP);
	const [screenWidth, setScreenWidth] = useState<number>(DEFAULT_SCREEN_WIDTH);

	const updateVisibleItems = () => {
		const screenWidth = window.innerWidth;
		setScreenWidth(screenWidth);
		if (screenWidth <= ScreenBreakpoints.MOBILE) {
			setVisibleItems(VisibleCards.MOBILE);
		} else if (screenWidth <= ScreenBreakpoints.TABLET) {
			setVisibleItems(VisibleCards.SMALL_TABLET);
		} else if (screenWidth <= ScreenBreakpoints.DESKTOP) {
			setVisibleItems(VisibleCards.TABLET);
		} else {
			setVisibleItems(VisibleCards.DESKTOP);
		}
	};

	useEffect(() => {
		updateVisibleItems();
		window.addEventListener("resize", updateVisibleItems);

		return () => window.removeEventListener("resize", updateVisibleItems);
	}, []);

	useEffect(() => {
		if (courses) {
			const topCourses = [...courses]?.sort(
				(course1, course2) => course2.avg_rating - course1.avg_rating,
			);
			setTopCourses(topCourses);
		}
	}, [courses]);

	return (
		<div className={styles["main_content_wrapper"]}>
			<div className={styles["main_content"]}>
				<BanerBlock />
				<SearchBlock companies={companies || []} />
				<CompaniesSection
					companies={companies ? companies.slice(INDEX_ZERO, visibleItems) : []}
					screenWidth={screenWidth}
				/>
				<NewCoursesSection
					courses={courses ? courses.slice(INDEX_ZERO, visibleItems) : []}
					screenWidth={screenWidth}
				/>
				<TopCoursesSection
					courses={topCourses ? topCourses.slice(INDEX_ZERO, visibleItems) : []}
					screenWidth={screenWidth}
				/>
				<AddCompanySection />
				<QuestionAndAnswer screenWidth={screenWidth} />
			</div>
		</div>
	);
};

export { MainContent };
