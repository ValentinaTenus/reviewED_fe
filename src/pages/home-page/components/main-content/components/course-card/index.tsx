import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";

import { DefaultAvatar, StarRating } from "~/common/components/index";
import { IMAGE_UPLOAD_URL, LOGO_NONE } from "~/common/constants/index";
import { AppRoute, RatingSize, StarRatingVariant } from "~/common/enums/index";
import { Course } from "~/common/types/index";

import styles from "./styles.module.scss";

type CourseCardProperties = {
	className?: string;
	course: Course;
};

const CourseCard: React.FC<CourseCardProperties> = ({ className, course }) => {
	return (
		<Link
			className={clsx(styles["item_card"], className)}
			key={course.id}
			to={`${AppRoute.COURSE_DETAILS}${course.id}`}
		>
			<div className={styles["item_loco_container"]}>
				{course.company_logo !== LOGO_NONE ? (
					<img
						alt="$course.title} course - company logo"
						className={styles["course_image"]}
						src={`${IMAGE_UPLOAD_URL}${course.company_logo}`}
					/>
				) : (
					<DefaultAvatar
						className={styles["course_image"]}
						name={course.company}
					/>
				)}
				<div className={styles["item_rating_container"]}>
					<StarRating
						averageRating={course.avg_rating}
						size={RatingSize.SMALL}
						variant={StarRatingVariant.SMALL_CARD}
					/>
					<p className={styles["reviews_amount"]}>
						{course.reviews_count} відгуків
					</p>
				</div>
			</div>
			<h4 className={styles["item_name"]}>{course.title}</h4>
		</Link>
	);
};

export { CourseCard };
