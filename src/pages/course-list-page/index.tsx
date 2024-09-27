import React, { useState } from "react";

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
				<CourseContent CoursesCurrentPage={currentPage} />
			</div>
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
