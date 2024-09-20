import React from "react";

import styles from "./styles.module.scss";
import { Category } from "./components/category";


const CategoriesSection: React.FC = () => {
	return (
		<div>
			<h3 className={styles["categories_header"]}>Категорії курса</h3>
           <Category categoryName="Інформаційні технології, IT"/>
		</div>
	);
};

export { CategoriesSection };
