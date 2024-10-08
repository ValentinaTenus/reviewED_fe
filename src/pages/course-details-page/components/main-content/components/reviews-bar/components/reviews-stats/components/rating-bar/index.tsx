import React from "react";

import { type ReviewsStats } from "~/common/types";

import { RatingLine } from "./components/rating-line";
import styles from "./styles.module.scss";

type RatingBarProperties = {
	stats: ReviewsStats;
};

const MIN_LINE_WIDTH = 4;
const PERCENT_NUMBER = 100;
const WIDTH_RATIO_MAX_LINE_TO_CONTAINER = 0.6943;

const RatingBar: React.FC<RatingBarProperties> = ({ stats }) => {
	const calculateWidthPercent = (rating: number): string => {
		if (!rating) return `${MIN_LINE_WIDTH}px`;

		const ratingsArray: number[] = Object.values(stats);

		if (ratingsArray.every((item) => item <= PERCENT_NUMBER)) {
			return `calc(${rating * WIDTH_RATIO_MAX_LINE_TO_CONTAINER}% + ${MIN_LINE_WIDTH}px)`;
		} else {
			const maxRating = Math.max(...ratingsArray);
			return `calc(${(rating / maxRating) * PERCENT_NUMBER * WIDTH_RATIO_MAX_LINE_TO_CONTAINER}% + ${MIN_LINE_WIDTH}px)`;
		}
	};

	return (
		<div className={styles["rating-bar"]}>
			<RatingLine
				lineWidth={calculateWidthPercent(stats.five)}
				rate="5"
				ratingNumber={stats.five}
			/>
			<RatingLine
				lineWidth={calculateWidthPercent(stats.four)}
				rate="4"
				ratingNumber={stats.four}
			/>
			<RatingLine
				lineWidth={calculateWidthPercent(stats.three)}
				rate="3"
				ratingNumber={stats.three}
			/>
			<RatingLine
				lineWidth={calculateWidthPercent(stats.two)}
				rate="2"
				ratingNumber={stats.two}
			/>
			<RatingLine
				lineWidth={calculateWidthPercent(stats.one)}
				rate="1"
				ratingNumber={stats.one}
			/>
		</div>
	);
};

export { RatingBar };
