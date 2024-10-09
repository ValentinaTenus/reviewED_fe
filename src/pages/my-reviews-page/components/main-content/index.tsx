import React, { useState } from "react";

import { MyReviewCategory } from "~/common/types/my-reviews";

import { OptionsSection, TopSection } from "./components/index";
import { MyReviewsListSection } from "./components/my-reviews-list-section/index";
import styles from "./styles.module.scss";

const MainContent: React.FC = () => {
	const [category, setCategory] = useState<MyReviewCategory>("course");

	const handleOptionClick = (category: MyReviewCategory) => {
		setCategory(category);
	};

	return (
		<div className={styles["main_content_wrapper"]}>
			<div className={styles["main_content"]}>
				<TopSection />
				<OptionsSection category={category} handleClick={handleOptionClick} />
				<MyReviewsListSection category={category} />
			</div>
		</div>
	);
};

export { MainContent };
