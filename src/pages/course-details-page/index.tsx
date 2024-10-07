import React from "react";
import { useParams } from "react-router-dom";

import { Footer, Header } from "~/common/components";

import { MainContent } from "./components";
import styles from "./styles.module.scss";

const CourseDetailsPage: React.FC = () => {
	const { id } = useParams();

	if (id) {
		return (
			<div className={styles["course_details_page"]}>
				<Header />
				<MainContent courseId={id} />
				<Footer />
			</div>
		);
	}
};

export { CourseDetailsPage };
