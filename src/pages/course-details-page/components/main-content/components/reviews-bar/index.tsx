import React from "react";

import Image from "~/assets/images/no-reviews.png";
import { Button } from "~/common/components";
import { ButtonSize, ButtonVariant } from "~/common/enums/index";
import { useGetReviewsStatsQuery } from "~/redux/reviews/reviews-stats-api";

import { ReviewsList } from "./components/reviews-list";
import { ReviewsStatsBar } from "./components/reviews-stats";
import styles from "./styles.module.scss";

const mockList = [];

type Properties = {
	courseId: string;
};

const ReviewsBar: React.FC<Properties> = ({ courseId }) => {
	const { data: stats } = useGetReviewsStatsQuery(+courseId);

	return (
		<div className={styles["reviews-bar"]}>
			<h3 className={styles["reviews-bar__header"]}>Відгуки</h3>
			{mockList.length ? (
				<ReviewsList />
			) : (
				<article className={styles["reviews-bar__no-reviews"]}>
					<img alt="" className={styles["reviews-bar__picture"]} src={Image} />
					<p className={styles["reviews-bar__big-text"]}>
						Тут ще ніхто не залишив відгук
					</p>
					<p className={styles["reviews-bar__small-text"]}>
						Станьте першим, хто поділиться враженням!
					</p>
				</article>
			)}
			{stats && <ReviewsStatsBar courseId={courseId} stats={stats} />}
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
