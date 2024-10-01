import React from "react";

import styles from "./styles.module.scss";
import { type ReviewsStats } from "~/common/types";
import { RatingLine } from "./components/rating-line";

type RatingBarProperties = {
	stats: ReviewsStats;
};

const MIN_LINE_WIDTH = 4;
const MAX_LINE_WIDTH = 188;

const RatingBar: React.FC<RatingBarProperties> = ({ stats }) => {

	const calculatePixelsUnit = (): number => {
		const ratingsArray: number[] = Object.values(stats);
		if (ratingsArray.every((item) => item <= 100))
			return (MAX_LINE_WIDTH - MIN_LINE_WIDTH) / 100;

		const maxRatings = Math.max(...ratingsArray);
		return (maxRatings - MIN_LINE_WIDTH) / 100;
	};

	return (
		<div className={styles["rating-bar"]}>
			<RatingLine lineWidth={calculatePixelsUnit() * stats.five} rate="5" ratingNumber={stats.five} />
			<RatingLine lineWidth={calculatePixelsUnit() * stats.four} rate="4" ratingNumber={stats.four} />
			<RatingLine lineWidth={calculatePixelsUnit() * stats.three} rate="3" ratingNumber={stats.three} />
			<RatingLine lineWidth={calculatePixelsUnit() * stats.two} rate="2" ratingNumber={stats.two} />
			<RatingLine lineWidth={calculatePixelsUnit() * stats.one} rate="1" ratingNumber={stats.one} />
		</div>
	);
};

export { RatingBar };
