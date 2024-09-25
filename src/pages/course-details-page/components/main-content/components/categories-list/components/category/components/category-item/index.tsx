import React from "react";

import styles from "./styles.module.scss";
// import {type Subcategory} from "~/common/types/index";
type CategoryItemProperties = {
	title: string;
};

const CategoryItem: React.FC<CategoryItemProperties> = ({ title }) => {
	return <li className={styles["category_item"]}>{title}</li>;
};

export { CategoryItem };