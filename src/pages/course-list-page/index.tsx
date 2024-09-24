import React, { useState } from "react";

import {
	BreadCrumb,
	Footer,
	Header,
	Pagination,
} from "~/common/components/index";
import { AppRoute } from "~/common/enums";

import styles from "./styles.module.scss";

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
