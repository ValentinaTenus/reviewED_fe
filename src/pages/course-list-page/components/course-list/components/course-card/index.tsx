import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Icon, Logo, StarRating } from "~/common/components/index";
import { ScreenBreakpoints } from "~/common/constants/screen-breakpoints";
import { AppRoute, IconName, RatingSize } from "~/common/enums";
import { useGetScreenWidth } from "~/common/hooks";
import { GetCoursesResult } from "~/common/types/courses/course.type";

import { CourseCategory } from "./components/course-category";
import styles from "./styles.module.scss";

const CHAR_LIMIT_MOBILE = 107;
const CHAR_LIMIT_DESKTOP = 303;
const START_INDEX = 0;
const ZERO_LENGTH = 0;

type CourseCardProps = {
	className?: string;
	course: GetCoursesResult;
};

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [maxLength, setMaxLength] = useState(CHAR_LIMIT_DESKTOP);

	const screenWidth = useGetScreenWidth();

	const toggleDescription = () => {
		setIsExpanded(!isExpanded);
	};

	const handleChangeMaxLength = useCallback(() => {
		if (screenWidth < ScreenBreakpoints.TABLET) {
			setMaxLength(CHAR_LIMIT_MOBILE);
		} else {
			setMaxLength(CHAR_LIMIT_DESKTOP);
		}
	}, [screenWidth]);

	useEffect(() => {
		handleChangeMaxLength();
	}, [handleChangeMaxLength, screenWidth]);

	return (
		<div className={styles["course-card"]}>
			<div className={styles["course-card__head"]}>
				<h2 className={styles["course-card__title"]}>{course.title}</h2>
				<div className={styles["course-card__logo"]}>
					<Logo
						className={styles["course-card__logo-image"]}
						logo={course.company_logo}
						name={course.company}
					/>
					<StarRating
						averageRating={course.avg_rating}
						isOneStar={screenWidth < ScreenBreakpoints.TABLET}
						size={RatingSize.MEDIUM}
					/>
				</div>
			</div>

			<div className={styles["course-card__data"]}>
				<div className={styles["course-card__company"]}>
					Компанія:
					<span className={styles["course-card__company-name"]}>
						{course.company}
					</span>
				</div>
				<div className={styles["course-card__location"]}>
					<Icon
						className={styles["course-card__location-icon"]}
						name={IconName.LOCATION}
					/>
					{course.location === "None" ? "Online" : course.location}
				</div>
				<div className={styles["course-card__price"]}>
					<Icon
						className={styles["course-card__price-icon"]}
						name={IconName.DOLLAR_SIGN}
					/>
					UAH {course.price}
				</div>
			</div>

			<div className={styles["course-card__ages"]}>
				<Icon
					className={styles["course-card__ages-icon"]}
					name={IconName.PEOPLE}
				/>
				{course.age}
			</div>

			<div className={styles["course-card__description"]}>
				<div className={styles["course-card__description-categories"]}>
					{course.categories.map((category) => (
						<CourseCategory category={category} key={category.id} />
					))}
				</div>
				{course.description.length > ZERO_LENGTH && (
					<p className={styles["course-card__description-text"]}>
						{isExpanded
							? course.description
							: `${course.description.substring(START_INDEX, maxLength)}...`}
						<span
							className={styles["course-card__description-toggle"]}
							onClick={toggleDescription}
						>
							{isExpanded ? " Сховати" : " Показати більше"}
						</span>
					</p>
				)}
			</div>
			<div className={styles["course-card__reviews"]}>
				<div className={styles["course-card__reviews-info"]}>
					{/* <AvatarGroup
						avatars={course.avatars}
						className={styles["course-card__reviews-info-avatar"]}
					/> */}
					<span className={styles["course-card__reviews-info-count"]}>
						{course.reviews_count} Reviews
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
				<Link
					className={styles["course-card__link"]}
					to={`${AppRoute.COURSE_DETAILS}${course.id}`}
				>
					Читати відгуки
				</Link>
			</div>
		</div>
	);
};

export { CourseCard };
