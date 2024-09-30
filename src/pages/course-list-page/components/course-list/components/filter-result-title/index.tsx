import React from "react";

import styles from "./styles.module.scss";

type Properties = {
	resultCount: number;
};

const FilterResultTitle: React.FC<Properties> = ({ resultCount }) => {
	return (
		<h2 className={styles["filter_result__title"]}>
			Знайдено {resultCount} по вашому запиту
		</h2>
	);
};

export { FilterResultTitle };
