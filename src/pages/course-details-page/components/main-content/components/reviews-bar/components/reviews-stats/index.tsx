import React, { useEffect, useState } from "react";

import styles from "./styles.module.scss";

import { ScreenBreakpoints } from "~/common/constants/index";
import { type ReviewsStats } from "~/common/types";
import { StatsBar } from "./components/stats-bar";
import { Button, StarRating } from "~/common/components";
import { RatingBar } from "./components/rating-bar";
import { RatingSize, ButtonSize, ButtonVariant } from "~/common/enums";

type ReviewsStatsProperties = {
	stats: ReviewsStats;
};

const ReviewsStats: React.FC<ReviewsStatsProperties> = ({ stats }) => {
	const [isRatingBarShown, setIsRatingBarShown] = useState<boolean>(false);

	const updateRatingDisplay = () => {
		const screenWidth = window.innerWidth;

		if (screenWidth <= ScreenBreakpoints.MOBILE) {
			setIsRatingBarShown(false);
		} else {
			setIsRatingBarShown(true);
		}
	};

	useEffect(() => {
		updateRatingDisplay();
		window.addEventListener("resize", updateRatingDisplay);

		return () => window.removeEventListener("resize", updateRatingDisplay);
	}, []);

	return (
		<div className={styles["reviews-stats"]}>
			<div className={styles["stats-container"]}>
				<StatsBar result="100500" title="Загальна кількість" />
				<StatsBar
					result="3.0"
					title="Середній рейтинг"
					visualization={
						<StarRating
							averageRating={4.6}
							isNumberShown={false}
							size={RatingSize.MEDIUM}
						/>
					}
				/>
			</div>

			{isRatingBarShown && <RatingBar stats={stats} />}
			{!isRatingBarShown && (
				<Button size={ButtonSize.MEDIUM} variant={ButtonVariant.OUTLINED}>
					Hello
				</Button>
			)}
		</div>
	);
};

export { ReviewsStats };
