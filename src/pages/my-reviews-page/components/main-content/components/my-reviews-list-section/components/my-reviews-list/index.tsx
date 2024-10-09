import React, { useCallback, useState } from "react";

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
	const [activePopup, setActivePopup] = useState<null | number>(null);

	const handleTogglePopup = useCallback((item: null | number) => {
		setActivePopup((prev) => (prev === item ? null : item));
	}, []);

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
