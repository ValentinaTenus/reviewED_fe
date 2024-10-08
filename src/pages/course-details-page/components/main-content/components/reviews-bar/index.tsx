import { forwardRef } from "react";

import Image from "~/assets/images/no-reviews.png";
import { Button } from "~/common/components";
import { ButtonSize, ButtonVariant } from "~/common/enums/index";
import { useGetReviewsStatsQuery } from "~/redux/reviews/reviews-stats-api";

import { ReviewsList } from "./components/reviews-list";
import { ReviewsStatsBar } from "./components/reviews-stats";
import styles from "./styles.module.scss";

const MOCK_COURSE_ID = 1;
const mockStats = {
	"five": 0,
	"four": 1,
	"one": 110,
	"three": 2,
	"two": 100,
};

const mockList = ["Just mock thing to not have it empty"];

const ReviewsBar = forwardRef<HTMLDivElement>((_: unknown, ref) => {
	const { data: stats } = useGetReviewsStatsQuery(MOCK_COURSE_ID);

	return (
		<div className={styles["reviews-bar"]}>
			<h3 className={styles["reviews-bar__header"]} ref={ref}>
				Відгуки
			</h3>
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
			{stats && <ReviewsStatsBar stats={mockStats} />}
			<Button
				className={styles["reviews-bar__button"]}
				size={ButtonSize.MEDIUM}
				variant={ButtonVariant.PRIMARY}
			>
				Написати відгук
			</Button>
		</div>
	);
});

ReviewsBar.displayName = "ReviewsBar";

export { ReviewsBar };
