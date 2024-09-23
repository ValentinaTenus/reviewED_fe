import React from "react";

import styles from "./styles.module.scss";

type CategoryItemProperties = {
	reference: string;
	title: string;
};

const CategoryItem: React.FC<CategoryItemProperties> = ({
	reference,
	title,
}) => {
	return (
		<li className={styles["category_item"]}>
			<a href={reference}>{title}</a>
		</li>
	);
};

export { CategoryItem };
