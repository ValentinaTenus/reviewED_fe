import React from "react";
import { Link } from "react-router-dom";

import { AppRoute } from "~/common/enums";
import { Subcategory } from "~/common/types";

import styles from "./styles.module.scss";

type CategoryItemProperties = {
	subcategory: Subcategory;
};

const CategoryItem: React.FC<CategoryItemProperties> = ({ subcategory }) => {
	return (
		<li className={styles["category_item"]}>
			<Link to={`${AppRoute.ALL_COURSES}?subcategory=${subcategory.id}`}>
				{subcategory.name}
			</Link>
		</li>
	);
};

export { CategoryItem };
