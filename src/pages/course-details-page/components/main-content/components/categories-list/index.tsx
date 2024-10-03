import React from "react";

import { GetCourseByIdResponseDto } from "~/common/types";

import { CategoryBlock } from "./components/category";
import styles from "./styles.module.scss";

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
						return <CategoryBlock category={category} key={index} />;
					})}
			</article>
		</div>
	);
};

export { CategoriesSection };
