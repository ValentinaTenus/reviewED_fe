import React, { useRef } from "react";

import { type ReviewsStats } from "~/common/types";

import { RatingLine } from "./components/rating-line";
import styles from "./styles.module.scss";

type RatingBarProperties = {
	stats: ReviewsStats;
};

const MIN_LINE_WIDTH = 4;
const PERCENT_NUMBER = 100;
const RATIO_MAX_LINE_WIDTH_TO_BAR_WIDTH = 0.6164;

const RatingBar: React.FC<RatingBarProperties> = ({ stats }) => {
	let ratingBarRef = useRef<HTMLDivElement>(null);
	const currentRef = ratingBarRef.current;

	const defineWidth = (ratingValue: number): number => {
		if (currentRef !== null) {
			let pixelsUnit: number;

			const ratingsArray: number[] = Object.values(stats);
			const currentBarWidth = (currentRef as HTMLElement).offsetWidth;
			const maxLineWidth = currentBarWidth * RATIO_MAX_LINE_WIDTH_TO_BAR_WIDTH;

			if (ratingsArray.every((item) => item <= PERCENT_NUMBER)) {
				pixelsUnit = (maxLineWidth - MIN_LINE_WIDTH) / PERCENT_NUMBER;
			} else {
				const maxRating = Math.max(...ratingsArray);
				pixelsUnit = (maxLineWidth - MIN_LINE_WIDTH) / maxRating;
			}

			if (!ratingValue) return MIN_LINE_WIDTH;

			return pixelsUnit * ratingValue + MIN_LINE_WIDTH;
		} else {
			return MIN_LINE_WIDTH;
		}
	};

	return (
		<div className={styles["rating-bar"]} ref={ratingBarRef}>
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
