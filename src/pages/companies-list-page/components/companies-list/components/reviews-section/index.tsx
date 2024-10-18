import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React from "react";

import { Spinner } from "~/common/components/index";
import { SpinnerVariant } from "~/common/enums/index";
import { useGetMyReviewsQuery } from "~/redux/my-reviews/my-reviews-api";

import { ReviewCard } from "./components/index";
import styles from "./styles.module.scss";

const ZERO_LENGTH = 0;

type ReviewsSectionProperties = {
	screenWidth: number;
	userId: number;
};

const ReviewsSection: React.FC<ReviewsSectionProperties> = ({
	screenWidth,
	userId,
}) => {
	const {
		data: userReviews,
		error: reviewsLoadError,
		isLoading: isReviewLoading,
	} = useGetMyReviewsQuery({
		params: {
			limit: 3,
			offset: 0,
			status: "approved",
		},
		userId: userId,
	});

	if (reviewsLoadError) {
		return (
			<div className={styles["error"]}>
				{(reviewsLoadError as FetchBaseQueryError).status}
				{JSON.stringify((reviewsLoadError as FetchBaseQueryError).data)}
			</div>
		);
	}

	if (isReviewLoading) {
		return <Spinner variant={SpinnerVariant.SMALL} />;
	}

	if (userReviews?.results && userReviews?.results.length > ZERO_LENGTH) {
		return (
			<div className={styles["reviews__container"]}>
				<h1 className={styles["reviews__title"]}>Нещодавні відгуки</h1>
				<div className={styles["reviews__content"]}>
					{userReviews &&
						userReviews.results.map((review) => (
							<ReviewCard
								key={review.id}
								screenWidth={screenWidth}
								userReview={review}
							/>
						))}
				</div>
			</div>
		);
	}
};

export { ReviewsSection };
