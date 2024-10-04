import React from "react";

import { Footer, Header } from "~/common/components";

import { MainContent } from "./components";
import styles from "./styles.module.scss";

const MOCK_ID = "128";

const CourseDetailsPage: React.FC = () => {
	return (
		<div className={styles["course_details_page"]}>
			<Header />
			<MainContent courseId={MOCK_ID} />
			<Footer />
		</div>
	);
};

export { CourseDetailsPage };
