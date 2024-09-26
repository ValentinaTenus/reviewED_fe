/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";

import CourseCard from "~/common/components/course-card";
import { Footer, Header, Pagination } from "~/common/components/index";

import { CourseContent } from "./components";
import styles from "./styles.module.scss";

const DEFAULT_PAGE_COUNT = 10;
const DEFAULT_CURRENT_PAGE = 1;

const CourseList: React.FC = () => {
	const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);
	const [pageCount] = useState(DEFAULT_PAGE_COUNT);

	return (
		<div className={styles["course-list_page"]}>
			<Header />
			<div className={styles["course-list__content"]}>
				<CourseContent />
			</div>
			<CourseCard
				company="Lemon School"
				description="The course 'QA testing. Software tester' will help you learn the basics of software testing and become a professional in the field of quality control. You will learn to work with various testing tools, create test cases, find and document bugs, and understand the role of a tester in product development and more"
				peopleCategories={[
					"Students",
					"adults",
					"pre-schoolers",
					"junior high",
					"high-school",
					"pensioners",
				]}
				price="2000"
				rating={5}
				reviewsCount={200}
				specialization="Information technology"
				status="Online"
				techCategories={["Programming", "Development"]}
				title="Tester. QA testing, become a software tester"
			/>
			<Pagination
				defaultCurrentPage={currentPage}
				pages={pageCount}
				setCurrentPage={setCurrentPage}
			/>
			<Footer />
		</div>
	);
};

export { CourseList };
