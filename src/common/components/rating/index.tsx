import React from "react";

import HalfFilledStar from "~/assets/images/half-filled-star.svg?react";
import StarIcon from "~/assets/images/star.svg?react";

import styles from "./styles.module.scss";

const TOTAL_STARTS = 5;
const INCREMENT_RATING_NUMBER = 1;
const DECREMENT_RATING_NUMBER = 0.5;

type RatingProperties = {
	averageRating: number;
};

const Rating: React.FC<RatingProperties> = ({ averageRating }) => {
	const totalStars = TOTAL_STARTS;

	return (
		<div className={styles["rating"]}>
			{[...Array(totalStars)].map((_, index) => {
				const ratingValue = index + INCREMENT_RATING_NUMBER;

				return (
					<span className={styles["star"]} key={index}>
						{averageRating >= ratingValue ? (
							<StarIcon />
						) : averageRating >= ratingValue - DECREMENT_RATING_NUMBER ? (
							<HalfFilledStar className={styles["star_half_filled"]} />
						) : (
							<StarIcon className={styles["star_empty"]} />
						)}
					</span>
				);
			})}
			<span className={styles["average_rating"]}>{`(${averageRating})`}</span>
		</div>
	);
};

export { Rating };
