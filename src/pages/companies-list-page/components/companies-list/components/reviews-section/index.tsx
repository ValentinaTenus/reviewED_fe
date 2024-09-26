import React from "react";

import { UserReviews } from "~/common/constants/mock-data/mock-user-reviews";

import { ReviewCard } from "./components/index";
import styles from "./styles.module.scss";

type ReviewsSectionProperties = {
	screenWidth: number;
};

const ReviewsSection: React.FC<ReviewsSectionProperties> = ({
	screenWidth,
}) => {
	return (
		<div className={styles["reviews__container"]}>
			<h1 className={styles["reviews__title"]}>Нещодавні відгуки</h1>
			<div className={styles["reviews__content"]}>
				{UserReviews.map((review) => (
					<ReviewCard
						key={review.id}
						screenWidth={screenWidth}
						userReview={review}
					/>
				))}
			</div>
		</div>
	);
};

export { ReviewsSection };
