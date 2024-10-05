import React, { useEffect, useState } from "react";

import { Button, StarRating } from "~/common/components";
import { ScreenBreakpoints } from "~/common/constants/index";
import { ButtonSize, ButtonVariant, RatingSize } from "~/common/enums";
import { type ReviewsStats } from "~/common/types";
import { useGetCourseByIdQuery } from "~/redux/courses/courses-api";

import { RatingBar } from "./components/rating-bar";
import { StatsBar } from "./components/stats-bar";
import styles from "./styles.module.scss";
import { useGetScreenWidth } from "~/common/hooks";

type ReviewsStatsProperties = {
	stats: ReviewsStats;
};

const ReviewsStatsBar: React.FC<ReviewsStatsProperties> = ({ stats }) => {
	const [isRatingBarShown, setIsRatingBarShown] = useState<boolean>(false);

	const { data: course } = useGetCourseByIdQuery("1");

	const scrWidth = useGetScreenWidth();

	useEffect(() => {
		if (scrWidth <= ScreenBreakpoints.MOBILE) {
			setIsRatingBarShown(false);
		} else {
			setIsRatingBarShown(true);
		}
	}, [scrWidth]);

	return (
		<div className={styles["reviews-stats"]}>
			{course && (
				<div className={styles["stats-container"]}>
					<StatsBar
						result={`${course.reviews_count}`}
						title="Загальна кількість"
					/>
					<StatsBar
						result={`${course.avg_rating}`}
						title="Середній рейтинг"
						visualization={
							<StarRating
								averageRating={course.avg_rating}
								isNumberShown={false}
								size={RatingSize.MEDIUM}
							/>
						}
					/>
				</div>
			)}
			{isRatingBarShown && <RatingBar stats={stats} />}

			{!isRatingBarShown && (
				<Button
					className={styles["stats-container__button"]}
					onClick={() => setIsRatingBarShown(!isRatingBarShown)}
					size={ButtonSize.MEDIUM}
					variant={ButtonVariant.OUTLINED}
				>
					Подивитись детальніше
				</Button>
			)}
		</div>
	);
};

export { ReviewsStatsBar };
