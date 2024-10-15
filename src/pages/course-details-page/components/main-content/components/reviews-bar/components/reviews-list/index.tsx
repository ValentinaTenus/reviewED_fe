import React, { useState } from "react";

import { Pagination } from "~/common/components";
import { type CourseReview } from "~/common/types";

import { Review } from "./components/review";
import styles from "./styles.module.scss";

type ReviewListProperties = {
	reviews: CourseReview[];
};

const MAX_REVIEWS_SHOWN = 4;
const DEFAULT_PAGE = 1;
const INDEX_ONE = 1;

const ReviewsList: React.FC<ReviewListProperties> = ({ reviews }) => {
	const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);

	const isPaginationNeeded = reviews.length > MAX_REVIEWS_SHOWN;

	const firstReviewIndex = (currentPage - INDEX_ONE) * MAX_REVIEWS_SHOWN;
	const lastReviewIndex = firstReviewIndex + MAX_REVIEWS_SHOWN;

	let pagesNumber = 0;

	if (reviews) {
		pagesNumber = Math.ceil(reviews.length / MAX_REVIEWS_SHOWN);
	}

	return (
		<div className={styles["reviews-list"]}>
			{(isPaginationNeeded
				? reviews.slice(firstReviewIndex, lastReviewIndex)
				: reviews
			).map((review, index) => (
				<Review key={index} review={review} />
			))}

			{isPaginationNeeded && (
				<Pagination
					defaultCurrentPage={currentPage}
					pages={pagesNumber}
					setCurrentPage={setCurrentPage}
				/>
			)}
		</div>
	);
};

export { ReviewsList };
