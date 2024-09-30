import React from "react";

import styles from "./styles.module.scss";

type Properties = {
	resultCount: number;
	resultTerm: string;
};

const FilterResultTitle: React.FC<Properties> = ({
	resultCount,
	resultTerm,
}) => {
	return (
		<h2 className={styles["filter_result__title"]}>
			Знайдено {resultCount} по вашому запиту {resultTerm}
		</h2>
	);
};

export { FilterResultTitle };
