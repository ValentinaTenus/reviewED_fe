import React from "react";

import { Logo, StarRating } from "~/common/components";
import { RatingSize } from "~/common/enums";
import { type GetCourseByIdResponseDto } from "~/common/types";

import styles from "./styles.module.scss";

type PageTitleProperties = {
	course: GetCourseByIdResponseDto;
};

const PageTitle: React.FC<PageTitleProperties> = ({ course }) => {
	return (
		<div className={styles["title_wrapper"]}>
			<Logo
				className={styles["title_logo"]}
				logo={course.company_logo}
				name={course.company.name}
			/>

			<h3 className={styles["title_name"]}>{course.company.name}</h3>
			<StarRating
				averageRating={course.avg_rating}
				className={styles["title_rating"]}
				size={RatingSize.MEDIUM}
			/>
		</div>
	);
};

export { PageTitle };
