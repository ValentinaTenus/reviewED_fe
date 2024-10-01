import React from "react";

import styles from "./styles.module.scss";
import { Icon } from "~/common/components";
import { IconName } from "~/common/enums";

type RatingLineProperties = {
	lineWidth: number;
	rate: string;
	ratingNumber: number;
};

const RatingLine: React.FC<RatingLineProperties> = ({
	lineWidth,
	rate,
	ratingNumber,
}) => {
	return (
		<div className={styles["rating-line__container"]}>
			<Icon className={styles["rating-line__star"]} name={IconName.STAR} />
			<p>{rate}</p>
			<div
				className={styles["rating-line__view"]}
				style={{ width: `${lineWidth}px` }}
			></div>
			<p>{ratingNumber}</p>
		</div>
	);
};

export { RatingLine };
