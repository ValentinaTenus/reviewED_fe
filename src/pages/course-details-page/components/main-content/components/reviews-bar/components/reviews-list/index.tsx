import React from "react";

import { CourseReview } from "~/common/types";

import { Review } from "./components/review";
import styles from "./styles.module.scss";

type ReviewsListProperties = {
	reviews: CourseReview[];
};
const ReviewsList: React.FC<ReviewsListProperties> = ({ reviews }) => {
	return (
		<div className={styles["reviews-list"]}>
			{reviews.map((review) => (
				<Review key={review.id} review={review} />
			))}
		</div>
	);
};

export { ReviewsList };
