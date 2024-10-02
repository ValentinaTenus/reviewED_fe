import React from "react";

import { Icon } from "~/common/components/index";
import { IconName } from "~/common/enums/index";
import { Category } from "~/common/types/index";

import styles from "./styles.module.scss";

type Properties = {
	category: Category;
};

const CourseCategory: React.FC<Properties> = ({ category }) => {
	return (
		<div className={styles["course_category"]}>
			<Icon
				className={styles["course_category__icon"]}
				name={IconName.TEACHER}
			/>
			<span className={styles["course_category__specialization"]}>
				{category.name}:
			</span>
			{category.subcategories.map((subcategory) => (
				<div className={styles["course_category__tag"]} key={subcategory.id}>
					{subcategory.name}
				</div>
			))}
		</div>
	);
};

export { CourseCategory };
