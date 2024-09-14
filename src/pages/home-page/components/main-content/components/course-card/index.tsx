import clsx from "clsx";
import React from "react";

import DefaultCompanyImage from "~/assets/images/default-company-image.png";
import { Rating } from "~/common/components/index";
import { Course } from "~/common/types/index";

import styles from "./styles.module.scss";

type CourseCardProperties = {
	className?: string;
	course: Course;
};

const CourseCard: React.FC<CourseCardProperties> = ({ className, course }) => {
	return (
		<div className={clsx(styles["item_card"], className)} key={course.id}>
			<div className={styles["item_loco_container"]}>
				<img
					alt={course.title}
					className={styles["course_image"]}
					src={DefaultCompanyImage}
				/>
				<div className={styles["item_rating_container"]}>
					<Rating averageRating={course.average_rating} />
					<p className={styles["reviews_amount"]}>
						{course.reviews_count} відгуків
					</p>
				</div>
			</div>
			<h4 className={styles["item_name"]}>{course.title}</h4>
		</div>
	);
};

export { CourseCard };
