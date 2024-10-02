import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";

import { Logo, StarRating } from "~/common/components/index";
import { AppRoute, RatingSize, StarRatingVariant } from "~/common/enums/index";
import { type GetCoursesResult } from "~/common/types/index";

import styles from "./styles.module.scss";

type CourseCardProperties = {
	className?: string;
	course: GetCoursesResult;
};

const CourseCard: React.FC<CourseCardProperties> = ({ className, course }) => {
	return (
		<Link
			className={clsx(styles["item_card"], className)}
			key={course.id}
			to={`${AppRoute.COURSE_DETAILS}${course.id}`}
		>
			<div className={styles["item_loco_container"]}>
				<Logo
					className={styles["course_image"]}
					logo={course.company_logo}
					name={course.company}
				/>
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
