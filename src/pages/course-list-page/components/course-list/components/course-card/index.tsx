import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Icon, Logo, StarRating } from "~/common/components/index";
import { ScreenBreakpoints } from "~/common/constants/screen-breakpoints";
import { AppRoute, ButtonVariant, IconName, RatingSize } from "~/common/enums";
import { useGetScreenWidth } from "~/common/hooks";
import { GetCoursesResult } from "~/common/types/courses/course.type";

import { CourseCategory } from "./components/course-category";
import styles from "./styles.module.scss";

const CHAR_LIMIT_MOBILE = 107;
const CHAR_LIMIT_DESKTOP = 303;
const START_INDEX = 0;

type CourseCardProps = {
	className?: string;
	course: GetCoursesResult;
};

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [maxLength, setMaxLength] = useState(CHAR_LIMIT_DESKTOP);

	const screenWidth = useGetScreenWidth();
	const navigate = useNavigate();

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

	const handleRedirect = useCallback(() => {
		navigate(`${AppRoute.COURSE_DETAILS}${course.id}`);
	}, [course.id, navigate]);

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
				<div className={styles["course-card__categories"]}>
					{course.categories.map((category) => (
						<CourseCategory category={category} key={category.id} />
					))}
				</div>
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
				<Button onClick={handleRedirect} variant={ButtonVariant.PRIMARY}>
					Читати відгуки
				</Button>
			</div>
		</div>
	);
};

export { CourseCard };
