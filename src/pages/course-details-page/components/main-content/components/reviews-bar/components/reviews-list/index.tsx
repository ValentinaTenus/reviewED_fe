import React from "react";

import styles from "./styles.module.scss";

import { Review } from "./components/review";

const ReviewsList: React.FC = () => {
	return (
		<div className={styles["reviews-list"]}>
			<Review />
			<Review />
			<Review />
		</div>
	);
};

export { ReviewsList };
