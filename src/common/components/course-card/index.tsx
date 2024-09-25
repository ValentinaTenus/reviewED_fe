import React, { useState } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";
import { Icon } from "~/common/components/index";
import DefaultCompanyImage from "../../../assets/images/default-company-image.png";
import { StarRating } from "../star-rating";
import { IconName, RatingSize } from "~/common/enums";

type CourseCardProps = {
	className?: string;
	title: string;
	company: string;
	price: string;
	status: string;
	rating: number;
	reviewsCount: number;
	specialization: string;
	peopleCategories: string[];
	techCategories: string[];
	description: string;
	onClickDetails: () => void;
};

const CourseCard: React.FC<CourseCardProps> = ({
	className,
	title,
	company,
	price,
	status,
	rating,
	// //   logo,
	reviewsCount,
	peopleCategories,
	techCategories,
	description,
	specialization,
}) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleDescription = () => {
		setIsExpanded(!isExpanded);
	};

	const maxLength = 303;
	return (
		<div className={styles["course-card"]}>
			<div className={styles["course-card__head"]}>
				<h2 className={styles["course-card__title"]}>{title}</h2>
				<div className={styles["course-card__logo"]}>
					<img
						className={styles["course-card__logo-image"]}
						src={DefaultCompanyImage}
						alt="Company logo"
					/>
					<StarRating size={RatingSize.MEDIUM} averageRating={rating} />
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
				{peopleCategories.map((peopleCategory, index) => (
					<span
						className={styles["course-card__categories-item"]}
						key={peopleCategory}
					>
						{peopleCategory}
						{index < peopleCategories.length - 1 ? ", " : ""}
					</span>
				))}
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
						: `${description.substring(0, maxLength)}...`}
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
							name={IconName.SHIELD_TICK}
							className={styles["course-card__reviews-info-verified-icon"]}
						/>
						Verified Via LinkedIn
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
