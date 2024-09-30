import React from "react";

import styles from "./styles.module.scss";
import { type Course } from "~/common/types";
import { StarRating } from "~/common/components";

// type CustomCourse = Omit<Course, "company"> {company: {id: string };
// }

type PageTitleProperties = {
	course: Course;
};

const PageTitle: React.FC<PageTitleProperties> = ({ course }) => {
	const companyImage = `https://reviewed-api.azurewebsites.net/api/v1/companies/upload/${course.company_logo}`;
	
	return (
		<div className={styles["title_wrapper"]}>
			<img className={styles["title_logo"]} src={companyImage}  />
			<h3 className={styles["title_name"]}>{course.company}</h3>
			<StarRating averageRating={course.avg_rating} className={styles["title_rating"]}/>
		</div>
	);
};

export { PageTitle };
