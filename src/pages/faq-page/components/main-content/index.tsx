import React from "react";

import { QuestionAndAnswer, SendQuestionSection } from "./components/index";
import styles from "./styles.module.scss";

const MainContent: React.FC = () => {
	return (
		<div className={styles["main_content_wrapper"]}>
			<div className={styles["main_content"]}>
				<QuestionAndAnswer />
				<SendQuestionSection />
			</div>
		</div>
	);
};

export { MainContent };
