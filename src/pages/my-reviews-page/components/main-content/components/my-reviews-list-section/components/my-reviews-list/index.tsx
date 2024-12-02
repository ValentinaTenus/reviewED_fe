import React from "react";

import { MyReview, MyReviewCategory } from "~/common/types/my-reviews";

import { ReviewListItem } from "../";
import styles from "./styles.module.scss";

interface Properties {
	category: MyReviewCategory;
	openModal: (currentModal: string, entityId: number) => void;
	reviews: MyReview[];
}

const MyReviewsList: React.FC<Properties> = ({
	category,
	openModal,
	reviews,
}) => {
	return (
		<ul className={styles["my-reviews-list__list"]}>
			{reviews.map((review) => (
				<ReviewListItem
					category={category}
					key={review.id}
					openModal={openModal}
					review={review}
				/>
			))}
		</ul>
	);
};

export { MyReviewsList };
