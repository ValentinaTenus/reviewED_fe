import React, { useEffect, useState } from "react";

import {
	AvatarGroup,
	ExpandableDescription,
	Icon,
} from "~/common/components/index";
import { ScreenBreakpoints } from "~/common/constants/screen-breakpoints";
import { IconName, RatingSize } from "~/common/enums";
import { Course } from "~/common/types/courses/course.type";
import { useGetCourseReviewsQuery } from "~/redux/reviews/reviews-api";

import { StarRating } from "../star-rating";
import styles from "./styles.module.scss";

type CourseCardProps = {
	className?: string;
	course: Course;
};

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
	const CHAR_LIMIT_MOBILE = 107;
	const CHAR_LIMIT_DESKTOP = 303;

	const [isOneStar, setIsOneStar] = useState(false);
	const [maxLength, setMaxLength] = useState(CHAR_LIMIT_DESKTOP);

	const { data: courseReviews } = useGetCourseReviewsQuery(course.id);

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

	const avatars = Array.isArray(courseReviews)
		? courseReviews.map((review) => review.author_avatar)
		: [];

	return (
		<div className={styles["course-card"]}>
			<div className={styles["course-card__head"]}>
				<h2 className={styles["course-card__title"]}>{course.title}</h2>
				<div className={styles["course-card__logo"]}>
					{course.company_logo ? (
						<img
							alt="Company logo"
							className={styles["course-card__logo-image"]}
							src={course.company_logo}
						/>
					) : (
						<div className={styles["course-card__logo-placeholder"]} />
					)}
					<StarRating
						averageRating={course.avg_rating}
						isOneStar={isOneStar}
						size={RatingSize.MEDIUM}
					/>
				</div>
			</div>

			<div className={styles["course-card__data"]}>
				<div className={styles["course-card__company"]}>
					By:
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
					UAH {course.price} per course
				</div>
			</div>

			<div className={styles["course-card__age"]}>
				<Icon
					className={styles["course-card__age-icon"]}
					name={IconName.PEOPLE}
				/>
				<div className={styles["course-card__age-list"]}>
					{course.age && (
						<span className={styles["course-card__age-item"]}>
							{course.age}
						</span>
					)}
				</div>
			</div>
			<div className={styles["course-card__categories"]}>
				<div className={styles["course-card__categories-list"]}>
					<Icon
						className={styles["course-card__categories-icon"]}
						name={IconName.TEACHER}
					/>
					{course.categories.map((category) => (
						<div
							className={styles["course-card__categories-item"]}
							key={category.id}
						>
							<span className={styles["course-card__categories-name"]}>
								{category.name}:
							</span>
							{category.subcategories.map((subcategory) => (
								<span
									className={styles["course-card__categories-subcategory"]}
									key={subcategory.id}
								>
									{subcategory.name}
								</span>
							))}
						</div>
					))}
				</div>
				{course.description.trim() !== "" && (
					<ExpandableDescription
						description={course.description}
						maxLength={maxLength}
					/>
				)}
			</div>

			<div className={styles["course-card__reviews"]}>
				<div className={styles["course-card__reviews-info"]}>
					<AvatarGroup
						avatars={avatars}
						className={styles["course-card__reviews-info-avatar"]}
					/>
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
				<button className={styles["course-card__reviews-button"]}>
					Read Reviews
				</button>
			</div>
		</div>
	);
};

export { CourseCard };
