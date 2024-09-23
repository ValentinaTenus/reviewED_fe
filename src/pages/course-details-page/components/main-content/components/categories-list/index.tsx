import React from "react";

import { Category } from "./components/category";
import styles from "./styles.module.scss";

const CategoriesSection: React.FC = () => {
	return (
		<div>
			<h3 className={styles["categories_header"]}>Категорії курса</h3>
			<Category categoryName="Інформаційні технології, IT" />
		</div>
	);
};

export { CategoriesSection };
