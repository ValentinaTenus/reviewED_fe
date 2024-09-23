import clsx from "clsx";
import React from "react";

import { type SpinnerVariant } from "~/common/enums/index";

import styles from "./styles.module.scss";

type SpinnerPayload = {
	variant: SpinnerVariant;
};

const variants: Record<SpinnerVariant, string> = {
	medium: styles.spinner__medium,
	small: styles.spinner__small,
};

const Spinner: React.FC<SpinnerPayload> = ({ variant }) => {
	return (
		<div className={styles["spinner__container"]}>
			<div className={clsx(styles.spinner, variants[variant])} />
		</div>
	);
};

export { Spinner };
