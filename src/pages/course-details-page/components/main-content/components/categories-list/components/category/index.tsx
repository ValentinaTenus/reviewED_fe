import React from "react";

import { type Category } from "~/common/types";

import { CategoryItem } from "./components/category-item";
import styles from "./styles.module.scss";

type CategoryProperties = {
	category: Category;
};

const CategoryBlock: React.FC<CategoryProperties> = ({ category }) => {
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

export { CategoryBlock };
