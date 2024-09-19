import React from "react";

import { Footer, Header } from "~/common/components";
import styles from "./styles.module.scss";
import { MainContent } from "./components";

const CourseDetailsPage: React.FC = () => {
	return (
		<div className={styles["course_details_page"]}>
			<Header />
			<MainContent />
			<Footer />
		</div>
	);
};

export { CourseDetailsPage };
