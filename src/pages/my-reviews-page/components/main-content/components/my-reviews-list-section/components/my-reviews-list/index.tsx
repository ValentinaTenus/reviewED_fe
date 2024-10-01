import React, { useState } from "react";

import {
	DeleteReviewModalData,
	EditReviewModalData,
	MyReview,
	MyReviewCategory,
} from "~/common/types/my-reviews";

import { ReviewListItem } from "../reviews-list-item";
import styles from "./styles.module.scss";

interface Properties {
	category: MyReviewCategory;
	reviews: MyReview[];
	setDeleteReviewModalData: (data: DeleteReviewModalData) => void;
	setEditReviewModalData: (data: EditReviewModalData) => void;
}

const MyReviewsList: React.FC<Properties> = ({
	category,
	reviews,
	setDeleteReviewModalData,
	setEditReviewModalData,
}) => {
	const [activePopup, setActivePopup] = useState<null | number>(null);

	const handleTogglePopup = (item: null | number) => {
		setActivePopup((prev) => (prev === item ? null : item));
	};

	const handleEditReview = ({
		reviewId,
		text,
	}: {
		reviewId: number;
		text: string;
	}) => {
		setEditReviewModalData({ isOpen: true, reviewId, text });
	};

	const handleDeleteReview = (reviewId: number) => {
		setDeleteReviewModalData({ isOpen: true, reviewId });
	};

	return (
		<ul className={styles["my-reviews-list__list"]}>
			{reviews.map((review) => (
				<ReviewListItem
					activePopup={activePopup}
					category={category}
					handleDeleteReview={handleDeleteReview}
					handleEditReview={handleEditReview}
					handleTogglePopup={handleTogglePopup}
					key={review.id}
					review={review}
				/>
			))}
		</ul>
	);
};

export { MyReviewsList };
