import React from "react";

import { type CourseReview } from "~/common/types";
import { Review } from "./components/review";
import styles from "./styles.module.scss";

type ReviewListProperties = {
	reviews: CourseReview[];
};

const ReviewsList: React.FC<ReviewListProperties> = ({ reviews }) => {
	return (
		<div className={styles["reviews-list"]}>
			{reviews.map((review, index) => (
				<Review key={index} review={review} />
			))}
		</div>
	);
};

export { ReviewsList };
