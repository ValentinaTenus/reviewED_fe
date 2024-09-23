import React from "react";

import { CategoryItem } from "./components/category-item";
import styles from "./styles.module.scss";

type CategoryProperties = {
	categoryName: string;
};
const mockCategoriesNumber = 2;
const mockSkills = new Array(mockCategoriesNumber).fill(
	"Програмування, розробка",
);
const Category: React.FC<CategoryProperties> = ({ categoryName }) => {
	return (
		<div>
			<h4 className={styles["categories_header"]}>{categoryName}</h4>
			<ul className={styles["categories_list"]}>
				{mockSkills.map((item, index) => {
					return <CategoryItem key={index} reference="#" title={item} />;
				})}
			</ul>
		</div>
	);
};

export { Category };
