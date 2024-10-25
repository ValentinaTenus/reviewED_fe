import React from "react";

import { CourseReview } from "~/common/types";

import { ReviewFooter } from "./components/review-footer";
import { ReviewHeader } from "./components/review-header";
import { ReviewMain } from "./components/review-main";
import styles from "./styles.module.scss";

type ReviewProperties = {
	review: CourseReview;
};

const Review: React.FC<ReviewProperties> = ({ review }) => {
	return (
		<div className={styles["review"]}>
			<ReviewHeader
				avatar={review.author_avatar}
				date={review.time_added}
				name={review.author_name}
				rating={review.rating}
				role=""
			/>
			<ReviewMain text={review.text} />
			<ReviewFooter review={review} />
		</div>
	);
};

export { Review };
