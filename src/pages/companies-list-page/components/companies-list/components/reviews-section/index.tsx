import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React from "react";

import { Spinner } from "~/common/components/index";
import { SpinnerVariant } from "~/common/enums/index";
import { useGetReviewsByUserIdQuery } from "~/redux/reviews/reviews-api";

import { ReviewCard } from "./components/index";
import styles from "./styles.module.scss";

type ReviewsSectionProperties = {
	screenWidth: number;
	userId: number;
};

const ReviewsSection: React.FC<ReviewsSectionProperties> = ({
	screenWidth,
	userId,
}) => {
	const {
		data: recentUserReviews,
		error,
		isLoading,
	} = useGetReviewsByUserIdQuery(userId);

	const errorMessage =
		error &&
		(((error as FetchBaseQueryError).data as { message: string }).message ||
			"Виникла неввідома помилка");

	return (
		<div className={styles["reviews__container"]}>
			<h1 className={styles["reviews__title"]}>Нещодавні відгуки</h1>
			<div className={styles["reviews__content"]}>
				{isLoading && <Spinner variant={SpinnerVariant.SMALL} />}
				{recentUserReviews &&
					recentUserReviews.map((review) => (
						<ReviewCard
							key={review.id}
							screenWidth={screenWidth}
							userReview={review}
						/>
					))}
				{error && <p>{errorMessage}</p>}
			</div>
		</div>
	);
};

export { ReviewsSection };
