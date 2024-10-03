import React from "react";

import { Button } from "~/common/components";
import { ButtonSize, ButtonVariant } from "~/common/enums/index";
import { useGetReviewsStatsQuery } from "~/redux/reviews/reviews-stats-api";

import { ReviewsList } from "./components/reviews-list";
import { ReviewsStatsBar } from "./components/reviews-stats";
import styles from "./styles.module.scss";

const MOCK_COURSE_ID = 1;

const ReviewsBar: React.FC = () => {
	const { data: stats } = useGetReviewsStatsQuery(MOCK_COURSE_ID);

	return (
		<div className={styles["reviews-bar"]}>
			<h3 className={styles["reviews-bar__header"]}>Відгуки</h3>
			<ReviewsList />
			{stats && <ReviewsStatsBar stats={stats} />}
			<Button
				className={styles["reviews-bar__button"]}
				size={ButtonSize.MEDIUM}
				variant={ButtonVariant.PRIMARY}
			>
				Написати відгук
			</Button>
		</div>
	);
};

export { ReviewsBar };
