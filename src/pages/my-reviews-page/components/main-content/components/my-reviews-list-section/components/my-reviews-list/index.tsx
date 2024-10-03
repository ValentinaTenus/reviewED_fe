import React, { useState } from "react";
import styles from "./styles.module.scss";

import { MyReview, MyReviewCategory } from "~/common/types/my-reviews";
import { ReviewListItem } from "../reviews-list-item";

interface Properties {
	category: MyReviewCategory;
	reviews: MyReview[];
	handleClickDeleteReview: (entityId: number | null) => void;
	handleClickEditReview: (entityId: number | null) => void;
}

const MyReviewsList: React.FC<Properties> = ({
	category,
	reviews,
	handleClickDeleteReview,
	handleClickEditReview,
}) => {
	const [activePopup, setActivePopup] = useState<null | number>(null);

	const handleTogglePopup = (item: null | number) => {
		setActivePopup((prev) => (prev === item ? null : item));
	};

	return (
		<ul className={styles["my-reviews-list__list"]}>
			{reviews.map((review) => (
				<ReviewListItem
					activePopup={activePopup}
					category={category}
					handleClickDeleteReview={handleClickDeleteReview}
					handleClickEditReview={handleClickEditReview}
					handleTogglePopup={handleTogglePopup}
					key={review.id}
					review={review}
				/>
			))}
		</ul>
	);
};

export { MyReviewsList };
