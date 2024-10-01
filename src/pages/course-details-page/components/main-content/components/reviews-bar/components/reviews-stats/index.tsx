import React from "react";

import styles from "./styles.module.scss";

import { type ReviewsStats } from "~/common/types";
import { StatsBar } from "./components/stats-bar";
import { StarRating } from "~/common/components";
import { RatingBar } from "./components/rating-bar";
import { RatingSize } from "~/common/enums";
type ReviewsStatsProperties = {
	stats: ReviewsStats;
};

const ReviewsStats: React.FC<ReviewsStatsProperties> = ({ stats }) => {
	return (
		<div className={styles["reviews-stats"]}>
			<div className={styles["stats-container"]}>
			<StatsBar result="100500" title="Загальна кількість" />
			<StatsBar
				result="3.0"
				title="Середній рейтинг"
				visualization={<StarRating averageRating={4.6} isNumberShown={false} size={RatingSize.MEDIUM}/>}
			/>
			</div>

			<RatingBar stats={stats} />
		</div>
	);
};

export { ReviewsStats };
