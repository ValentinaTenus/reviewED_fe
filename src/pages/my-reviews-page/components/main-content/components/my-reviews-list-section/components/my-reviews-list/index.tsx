import React from "react";

import { MyReview, MyReviewCategory } from "~/common/types/my-reviews";

import { ReviewListItem } from "../";
import styles from "./styles.module.scss";

interface Properties {
	category: MyReviewCategory;
	handleClickDeleteReview: (entityId: null | number) => void;
	handleClickEditReview: (entityId: null | number) => void;
	reviews: MyReview[];
}

const MyReviewsList: React.FC<Properties> = ({
	category,
	handleClickDeleteReview,
	handleClickEditReview,
	reviews,
}) => {
	return (
		<ul className={styles["my-reviews-list__list"]}>
			{reviews.map((review) => (
				<ReviewListItem
					category={category}
					handleClickDeleteReview={handleClickDeleteReview}
					handleClickEditReview={handleClickEditReview}
					key={review.id}
					review={review}
				/>
			))}
		</ul>
	);
};

export { MyReviewsList };
