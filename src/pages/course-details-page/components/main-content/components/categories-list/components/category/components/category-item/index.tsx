import React from "react";

import styles from "./styles.module.scss";

type CategoryItemProperties = {
	title: string;
};

const CategoryItem: React.FC<CategoryItemProperties> = ({ title }) => {
	return <li className={styles["category_item"]}>{title}</li>;
};

export { CategoryItem };
