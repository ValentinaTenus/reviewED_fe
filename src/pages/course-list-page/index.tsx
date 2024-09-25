import React, { useState } from "react";

import {
	BreadCrumb,
	Footer,
	Header,
	Pagination,
} from "~/common/components/index";
import { AppRoute } from "~/common/enums";

import styles from "./styles.module.scss";
import CourseCard from "~/common/components/course-card";

const DEFAULT_PAGE_COUNT = 10;
const DEFAULT_CURRENT_PAGE = 1;

const CourseList: React.FC = () => {
	const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);
	const [pageCount, setPageCount] = useState(DEFAULT_PAGE_COUNT);
	return (
		<div className={styles["course-list_page"]}>
			<Header />
			<BreadCrumb
				className="bread_crumb__container"
				items={[
					{ label: "Головна сторінка", path: AppRoute.ROOT },
					{ label: "Courses", path: AppRoute.ALL_COURSES },
				]}
			/>
			<CourseCard
				className="course-card__container"
				title="Tester. QA testing, become a software tester"
				company="Lemon School"
				price="2000"
				status="Online"
				rating={4.5}
				reviewsCount={100}
				peopleCategories={["Students", "adults", "pre-schoolers", "junior high", "high school", "pensioners"]} 
				specialization="Information technology"
				techCategories={["Programming", "Development"]}
				description="The course 'QA testing. Software tester' will help you learn the basics of software testing and become a professional in the field of quality control. You will learn to work with various testing tools, create test cases, find and document bugs, and understand the role of a tester in product development and more!"
				onClickDetails={() => console.log("onClickDetails")}
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
