import clsx from "clsx";
import React from "react";

import HalfFilledStar from "~/assets/images/half-filled-star.svg?react";
import StarIcon from "~/assets/images/star.svg?react";

import styles from "./styles.module.scss";

const TOTAL_STARTS = 5;
const INCREMENT_RATING_NUMBER = 1;
const DECREMENT_RATING_NUMBER = 0.5;

type RatingProperties = {
	averageRating: number;
	className?: string;
	isOneStar?: boolean;
};

const Rating: React.FC<RatingProperties> = ({
	averageRating,
	className,
	isOneStar,
}) => {
	const totalStars = TOTAL_STARTS;

	return (
		<div className={clsx(styles["rating"], className)}>
			{isOneStar && (
				<span className={styles["star"]}>
					<StarIcon />
				</span>
			)}
			{!isOneStar &&
				[...Array(totalStars)].map((_, index) => {
					const ratingValue = index + INCREMENT_RATING_NUMBER;

					return (
						<div key={index}>
							{averageRating >= ratingValue ? (
								<StarIcon className={styles["star"]} key={index} />
							) : averageRating >= ratingValue - DECREMENT_RATING_NUMBER ? (
								<HalfFilledStar
									className={clsx(styles["star_half_filled"], styles["star"])}
									key={index}
								/>
							) : (
								<StarIcon
									className={clsx(styles["star_empty"], styles["star"])}
									key={index}
								/>
							)}
						</div>
					);
				})}
			<span className={styles["average_rating"]}>{`(${averageRating})`}</span>
		</div>
	);
};

export { Rating };
