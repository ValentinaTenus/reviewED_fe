import React from "react";

import { MyReview, MyReviewCategory } from "~/common/types/my-reviews";

import { ReviewListItem } from "../reviews-list-item";
import styles from "./styles.module.scss";

interface Properties {
	category: MyReviewCategory;
	myReviews: MyReview[];
}

const MyReviewsList: React.FC<Properties> = ({ category, myReviews }) => {
	return (
		<ul className={styles["my-reviews-list__list"]}>
			{myReviews.map((review) => (
				<ReviewListItem category={category} key={review.id} review={review} />
			))}
		</ul>
	);
};

export { MyReviewsList };
