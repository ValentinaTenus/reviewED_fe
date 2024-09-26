import React, { useEffect, useState } from "react";

import { Icon } from "~/common/components/index";
import { ScreenBreakpoints } from "~/common/constants/screen-breakpoints";
import { IconName, RatingSize } from "~/common/enums";

import DefaultCompanyImage from "../../../assets/images/default-company-image.png";
import { StarRating } from "../star-rating";
import styles from "./styles.module.scss";

type CourseCardProps = {
	className?: string;
	company: string;
	description: string;
	peopleCategories: string[];
	price: string;
	rating: number;
	reviewsCount: number;
	specialization: string;
	status: string;
	techCategories: string[];
	title: string;
};

const CourseCard: React.FC<CourseCardProps> = ({
	company,
	description,
	peopleCategories,
	price,
	rating,
	reviewsCount,
	specialization,
	status,
	techCategories,
	title,
}) => {
	const CHAR_LIMIT_MOBILE = 107;
	const CHAR_LIMIT_DESKTOP = 303;
	const LAST_INDEX_OFFSET = 1;
	const START_INDEX = 0;
	const [isExpanded, setIsExpanded] = useState(false);
	const [isOneStar, setIsOneStar] = useState(false);
	const [maxLength, setMaxLength] = useState(CHAR_LIMIT_DESKTOP);

	const toggleDescription = () => {
		setIsExpanded(!isExpanded);
	};

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < ScreenBreakpoints.TABLET) {
				setMaxLength(CHAR_LIMIT_MOBILE);
			} else {
				setMaxLength(CHAR_LIMIT_DESKTOP);
			}
			setIsOneStar(window.innerWidth < ScreenBreakpoints.TABLET);
		};

		window.addEventListener("resize", handleResize);

		handleResize();

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);
	return (
		<div className={styles["course-card"]}>
			<div className={styles["course-card__head"]}>
				<h2 className={styles["course-card__title"]}>{title}</h2>
				<div className={styles["course-card__logo"]}>
					<img
						alt="Company logo"
						className={styles["course-card__logo-image"]}
						src={DefaultCompanyImage}
					/>
					<StarRating
						averageRating={rating}
						isOneStar={isOneStar}
						size={RatingSize.MEDIUM}
					/>
				</div>
			</div>

			<div className={styles["course-card__data"]}>
				<div className={styles["course-card__company"]}>
					By:
					<span className={styles["course-card__company-name"]}>{company}</span>
				</div>
				<div className={styles["course-card__status"]}>
					<Icon
						className={styles["course-card__status-icon"]}
						name={IconName.LOCATION}
					/>
					<span className={styles["course-card__status-text"]}>{status}</span>
				</div>
				<div className={styles["course-card__price"]}>
					<Icon
						className={styles["course-card__price-icon"]}
						name={IconName.DOLLAR_SIGN}
					/>
					UAH {price} per course
				</div>
			</div>

			<div className={styles["course-card__categories"]}>
				<Icon
					className={styles["course-card__categories-icon"]}
					name={IconName.PEOPLE}
				/>
				<div className={styles["course-card__categories-list"]}>
					{peopleCategories.map((peopleCategory, index) => (
						<span
							className={styles["course-card__categories-item"]}
							key={peopleCategory}
						>
							{peopleCategory}
							{index < peopleCategories.length - LAST_INDEX_OFFSET ? ", " : ""}
						</span>
					))}
				</div>
			</div>

			<div className={styles["course-card__description"]}>
				<div className={styles["course-card__description-categories"]}>
					<Icon
						className={styles["course-card__description-categories-icon"]}
						name={IconName.TEACHER}
					/>
					<span
						className={
							styles["course-card__description-categories-specialization"]
						}
					>
						{specialization}:
					</span>
					{techCategories.map((techCategory) => (
						<span
							className={styles["course-card__description-categories-tag"]}
							key={techCategory}
						>
							{techCategory}
						</span>
					))}
				</div>
				<p className={styles["course-card__description-text"]}>
					{isExpanded
						? description
						: `${description.substring(START_INDEX, maxLength)}...`}
					<span
						className={styles["course-card__description-toggle"]}
						onClick={toggleDescription}
					>
						{isExpanded ? " Show Less" : " More Details"}
					</span>
				</p>
			</div>

			<div className={styles["course-card__reviews"]}>
				<div className={styles["course-card__reviews-info"]}>
					<div className={styles["course-card__reviews-info-avatar"]}>
						<img src="https://via.placeholder.com/98x32" />
					</div>
					<span className={styles["course-card__reviews-info-count"]}>
						{reviewsCount} Reviews
					</span>
					<span className={styles["course-card__reviews-info-verified"]}>
						<Icon
							className={styles["course-card__reviews-info-verified-icon"]}
							name={IconName.SHIELD_TICK}
						/>
						<span className={styles["course-card__reviews-info-verified-text"]}>
							Verified Via LinkedIn
						</span>
					</span>
				</div>
				<button className={styles["course-card__reviews-button"]}>
					Read Reviews
				</button>
			</div>
		</div>
	);
};

export default CourseCard;
