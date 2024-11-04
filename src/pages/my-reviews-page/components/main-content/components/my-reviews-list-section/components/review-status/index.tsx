import clsx from "clsx";
import React from "react";

import styles from "./styles.module.scss";

const STATUS_TRANSLATIONS = {
	pending: "В очікуванні",
	published: "Опубліковано",
	removed: "Неуспішно",
};

type Status = keyof typeof STATUS_TRANSLATIONS;

type Properties = {
	status: Status;
};

const ReviewStatus: React.FC<Properties> = ({ status }) => {
	return (
		<div className={styles["status"]}>
			<span className={clsx(styles["status__text"], styles[`${status}`])}>
				{STATUS_TRANSLATIONS[status]}
			</span>
		</div>
	);
};

export { ReviewStatus };
