import clsx from "clsx";
import React from "react";

import StarIcon from "~/assets/images/star.svg?react";
import { RatingSize, StarRatingVariant } from "~/common/enums/index";

import styles from "./styles.module.scss";

const TOTAL_STARTS = 5;
const INCREMENT_RATING_NUMBER = 0.5;

const variants: Record<StarRatingVariant, string> = {
	default: styles.rating__base,
	small_card: styles.rating__small_card,
};

const sizes: Record<RatingSize, string> = {
	large: styles.size__large,
	medium: styles.size__medium,
	small: styles.size__small,
};

type RatingProperties = {
	averageRating: number;
	className?: string;
	classNameStarsBlock?: string;
	handleClick?: (rating: number) => void;
	isEditRating?: boolean;
	isNumberShown?: boolean;
	isOneStar?: boolean;
	size?: RatingSize;
	variant?: StarRatingVariant;
};

const StarRating: React.FC<RatingProperties> = ({
	averageRating,
	className,
	classNameStarsBlock,
	handleClick,
	isEditRating,
	isNumberShown = true,
	isOneStar,
	size = RatingSize.SMALL,
	variant = StarRatingVariant.DEFAULT,
}) => {
	const totalStars = TOTAL_STARTS;

	return (
		<div
			className={clsx(
				styles["rating"],
				sizes[size],
				variants[variant],
				className,
			)}
		>
			{isOneStar && (
				<span className={styles["star"]}>
					<StarIcon />
				</span>
			)}
			<div
				className={clsx(
					styles["rating_stars"],
					isEditRating && styles["rating_stars--edit"],
					classNameStarsBlock,
				)}
			>
				{!isOneStar &&
					[...Array(totalStars)].map((_, index) => {
						const ratingValue = index + INCREMENT_RATING_NUMBER;

						return (
							<div
								className={styles["rating_stars-item"]}
								key={index}
								onClick={
									handleClick ? () => handleClick(ratingValue) : undefined
								}
							>
								{averageRating >= ratingValue ? (
									<StarIcon className={styles["star"]} key={index} />
								) : (
									<StarIcon
										className={clsx(styles["star_empty"], styles["star"])}
										key={index}
									/>
								)}
							</div>
						);
					})}
			</div>
			{isNumberShown && (
				<span className={styles["average_rating"]}>{`(${averageRating})`}</span>
			)}
		</div>
	);
};

export { StarRating };
