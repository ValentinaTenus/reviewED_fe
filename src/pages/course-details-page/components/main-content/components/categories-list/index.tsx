import React from "react";

import { Category } from "./components/category";
import styles from "./styles.module.scss";

import { GetCourseByIdResponseDto } from "~/common/types";

type CategorySectionProperties = {
	course: GetCourseByIdResponseDto;
};

const CategoriesSection: React.FC<CategorySectionProperties> = ({ course }) => {
	return (
		<div>
			<h3 className={styles["categories__header"]}>Категорії курса</h3>
			<article className={styles["categories__list"]}>
			{course &&
				course.categories.map((category, index) => {
					return <Category category={category} key={index} />;
				})}
			</article>

		</div>
	);
};

export { CategoriesSection };
