import React from "react";

import styles from "./styles.module.scss";
import { ReviewsList } from "./components/reviews-list";
import { ReviewsStats } from "./components/reviews-stats";
import { Button } from "~/common/components";
import { ButtonVariant, ButtonSize } from "~/common/enums/index";
import { useGetReviewsStatsQuery } from "~/redux/reviews/reviews-stats-api";

type ReviewsBarProperties = {};

const MOCK_COURSE_ID = 1;

const ReviewsBar: React.FC<ReviewsBarProperties> = ({}) => {

	const {data: stats} = useGetReviewsStatsQuery(MOCK_COURSE_ID);

	return (
		<div className={styles["reviews-bar"]}>
			<h3 className={styles["reviews-bar__header"]}>Відгуки</h3>
			<ReviewsList />
			{stats && <ReviewsStats stats={stats} />}
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
