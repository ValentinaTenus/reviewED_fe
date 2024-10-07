import React from "react";

import { Review } from "./components/review";
import styles from "./styles.module.scss";

const ReviewsList: React.FC = () => {
	return (
		<div className={styles["reviews-list"]}>
			<Review />
		</div>
	);
};

export { ReviewsList };
