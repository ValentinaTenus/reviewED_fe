import React, { ReactNode } from "react";

import styles from "./styles.module.scss";

type StatsBarProperties = {
	result: string;
	title: string;
	visualization?: ReactNode;
};

const StatsBar: React.FC<StatsBarProperties> = ({
	result,
	title,
	visualization,
}) => {
	return (
		<div className={styles["stats-bar"]}>
			<p className={styles["stats-bar__title"]}>{title}</p>
			<section className={styles["stats-bar__display"]}>
				<p className={styles["stats-bar__number"]}>{result}</p>
				{visualization}
			</section>
		</div>
	);
};

export { StatsBar };
