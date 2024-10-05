import React from "react";

import { type ReviewsStats } from "~/common/types";

import { RatingLine } from "./components/rating-line";
import styles from "./styles.module.scss";

type RatingBarProperties = {
	stats: ReviewsStats;
};

const MIN_LINE_WIDTH = 4;
const MAX_LINE_WIDTH = 188;
const PERCENT_NUMBER = 100;

const RatingBar: React.FC<RatingBarProperties> = ({ stats }) => {
	const calculatePixelsUnit = (): number => {
		const ratingsArray: number[] = Object.values(stats);
		if (ratingsArray.every((item) => item <= PERCENT_NUMBER))
			return (MAX_LINE_WIDTH - MIN_LINE_WIDTH) / PERCENT_NUMBER;

		const maxRatings = Math.max(...ratingsArray);
		return (maxRatings - MIN_LINE_WIDTH) / PERCENT_NUMBER;
	};

	const pixelsUnit = calculatePixelsUnit();

	const defineWidth = (ratingValue: number): number => {
		if (ratingValue) return MIN_LINE_WIDTH;
		return pixelsUnit * ratingValue + MIN_LINE_WIDTH;
	};

	return (
		<div className={styles["rating-bar"]}>
			<RatingLine
				lineWidth={defineWidth(stats.five)}
				rate="5"
				ratingNumber={stats.five}
			/>
			<RatingLine
				lineWidth={defineWidth(stats.four)}
				rate="4"
				ratingNumber={stats.four}
			/>
			<RatingLine
				lineWidth={defineWidth(stats.three)}
				rate="3"
				ratingNumber={stats.three}
			/>
			<RatingLine
				lineWidth={defineWidth(stats.two)}
				rate="2"
				ratingNumber={stats.two}
			/>
			<RatingLine
				lineWidth={defineWidth(stats.one)}
				rate="1"
				ratingNumber={stats.one}
			/>
		</div>
	);
};

export { RatingBar };
