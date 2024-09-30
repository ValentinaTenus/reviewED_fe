import React from "react";

import styles from "./styles.module.scss";
import { ReviewsList } from "./components/reviews-list";

type ReviewsBarProperties = {
	
};

const ReviewsBar: React.FC<ReviewsBarProperties> = ({  }) => {
	return (
		<div className={styles["main_content"]}>
	<h3 className={styles["reviews-header"]}>Відгуки</h3>
	<ReviewsList />
		</div>
	);
};

export { ReviewsBar };
