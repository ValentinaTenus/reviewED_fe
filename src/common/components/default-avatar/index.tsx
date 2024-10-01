import clsx from "clsx";
import React from "react";

import styles from "./styles.module.scss";

const FIRST_LETTER_INDEX = 0;

type Properties = {
	className?: string;
	name: string;
};

const DefaultAvatar: React.FC<Properties> = ({ className, name }) => {
	const firstLetter = name
		? name.charAt(FIRST_LETTER_INDEX).toUpperCase()
		: "?";

	return (
		<div className={clsx(styles["default_logo"], className)}>{firstLetter}</div>
	);
};

export { DefaultAvatar };
