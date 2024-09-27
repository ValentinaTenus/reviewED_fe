import { Rating } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import { Button, Icon } from "~/common/components";
import { ButtonVariant, IconName } from "~/common/enums";
import { Company, Course } from "~/common/types";
import globalStyles from "~/pages/company-details-page/components/company-details/styles.module.scss";

import styles from "./styles.module.scss";

const CourseCard: React.FC<{
	company: Company;
	course: Course;
}> = ({ company, course }) => {
	const RATING_SCALE = 1.0;

	return (
		<>
			<div className={styles["course_title-rating"]}>
				<p className={styles["course_title"]}>{course.title}</p>
				<div className={globalStyles["rating"]}>
					<div className={styles["rating_stars"]}>
						<Rating
							name="half-rating-read"
							precision={0.5}
							readOnly
							value={company?.avg_overall_rating}
						/>
					</div>
					<Icon className={styles["course_star"]} name={IconName.STAR} />
					<span className={styles["course_rating"]}>
						({(course?.avg_rating / RATING_SCALE).toFixed(RATING_SCALE)})
					</span>
				</div>
			</div>
			<div className={styles["course_info-top"]}>
				<div className={globalStyles["items-center"]}>
					<span className={globalStyles["body-r"]}>By:</span>
					<Link
						className={`${styles["course_company"]} ${globalStyles["body-r"]}`}
						to="#"
					>
						{course.company}
					</Link>
				</div>
				<div className={globalStyles["items-center"]}>
					<Icon
						className={styles["course_location"]}
						name={IconName.LOCATION}
					/>
					<span
						className={`${styles["course_type"]} ${globalStyles["body-r"]}`}
					>
						Online
					</span>
				</div>
				<div className={globalStyles["items-center"]}>
					<Icon className={styles["course_price"]} name={IconName.PRICE} />
					<span className={globalStyles["body-r"]}>{course.price}</span>
				</div>
			</div>
			<div className={styles["course_info-middle"]}>
				<Icon className={styles["course_audience"]} name={IconName.AUDIENCE} />
				<p className={globalStyles["body-r"]}>{course.age}</p>
			</div>
			<div className={styles["course_categories"]}>
				<div className={styles["course_categories-span"]}>
					<Icon className={styles["course_teacher"]} name={IconName.TEACHER} />
					<span className={globalStyles["body-r"]}>
						Information technology:
					</span>
				</div>
				{course.categories.map((category, index) => (
					<span className={styles["course_category"]} key={index}>
						{category.name}
					</span>
				))}
			</div>
			<div className={styles["course_bottom"]}>
				<div className={styles["course_bottom-left"]}>
					<div className={styles["course_reviews"]}>
						<div>
							<img alt="" src="/src/assets/images/profile_pics.png" />
						</div>
						<span className={globalStyles["body-r"]}>
							{company.total_reviews_count} Reviews
						</span>
					</div>
					<div className={globalStyles["_verified"]}>
						<Icon
							className={globalStyles["_shield"]}
							name={IconName.SHIELD_TICK}
						/>
						<span className={globalStyles["_verified-span"]}>
							Verified Via LinkedIn
						</span>
					</div>
				</div>
				<Button variant={ButtonVariant.PRIMARY}>Read reviews</Button>
			</div>
		</>
	);
};

export { CourseCard };
