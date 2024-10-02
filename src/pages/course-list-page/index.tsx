import React from "react";

import { Footer, Header } from "~/common/components/index";

import { CourseContent } from "./components/index";
import styles from "./styles.module.scss";

const CourseList: React.FC = () => {
	return (
		<div className={styles["course-list_page"]}>
			<Header />
			<div className={styles["course-list__content"]}>
				<CourseContent />
			</div>
			<Footer />
		</div>
	);
};

export { CourseList };
