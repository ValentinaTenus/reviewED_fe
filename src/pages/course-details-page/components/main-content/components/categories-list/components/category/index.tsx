import React from "react";

import { CategoryItem } from "./components/category-item";
import styles from "./styles.module.scss";
import { type Category } from "~/common/types";
type CategoryProperties = {
	category: Category;
};

const Category: React.FC<CategoryProperties> = ({ category }) => {
	return (
		<div>
			<h4 className={styles["category__header"]}>{category.name}</h4>
			<ul className={styles["subcategories__list"]}>
				{category.subcategories.map((item, index) => {
					return <CategoryItem key={index} title={item.name} />;
				})}
			</ul>
		</div>
	);
};

export { Category };
