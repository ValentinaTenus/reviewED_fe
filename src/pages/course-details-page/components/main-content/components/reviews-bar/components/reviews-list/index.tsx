import React from "react";

import styles from "./styles.module.scss";
// import { useGetCourseReviewsQuery } from "~/redux/reviews/reviews-course-api";
import { Review } from "./components/review";
type ReviewsListProperties = {};

// const mockCourseId = 7;

const ReviewsList: React.FC<ReviewsListProperties> = ({}) => {
	// const { data: reviews } = useGetCourseReviewsQuery(mockCourseId);
	// console.log(reviews);

	return <div className={styles["reviews-list"]}>

		<Review />
	</div>;
};

export { ReviewsList };
