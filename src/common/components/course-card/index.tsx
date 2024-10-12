import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
	AvatarGroup,
	Button,
	ExpandableDescription,
	Icon,
	Logo,
} from "~/common/components/index";
import { ScreenBreakpoints } from "~/common/constants/screen-breakpoints";
import { ButtonVariant, IconName, RatingSize } from "~/common/enums";
import { GetCoursesResult } from "~/common/types/courses/course.type";
import { useGetCourseReviewsQuery } from "~/redux/reviews/reviews-api";

import { StarRating } from "../star-rating";
import styles from "./styles.module.scss";

type CourseCardProps = {
	className?: string;
	course: GetCoursesResult;
	isLogoShown?: boolean;
};

const CourseCard: React.FC<CourseCardProps> = ({ course, isLogoShown }) => {
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
					{isLogoShown && (
						<Logo
							className={styles["course-card__logo-image"]}
							logo={course.company_logo}
							name={course.company}
						/>
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
					{course.price}
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
				{course.description && (
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
						{course.reviews_count} Відгуки
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
				<Link to={`/course-details/${course.id}`}>
					<Button
						className={styles["course-card__reviews-button"]}
						variant={ButtonVariant.PRIMARY}
					>
						Читати відгуки
					</Button>
				</Link>
			</div>
		</div>
	);
};

export { CourseCard };
