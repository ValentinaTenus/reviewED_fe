import React from "react";

import { Icon } from "~/common/components";
import { IconName } from "~/common/enums";

import styles from "./styles.module.scss";

type RatingLineProperties = {
	lineWidth: string;
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
				style={{ width: lineWidth }}
			/>
			<p>{ratingNumber}</p>
		</div>
	);
};

export { RatingLine };
