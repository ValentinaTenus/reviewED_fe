import clsx from "clsx";
import React from "react";

import { IMAGE_UPLOAD_URL, LOGO_NONE } from "~/common/constants/index";

import styles from "./styles.module.scss";

const FIRST_LETTER_INDEX = 0;

type Properties = {
	className?: string;
	logo: string;
	name: string;
};

const Logo: React.FC<Properties> = ({ className, logo, name }) => {
	const firstLetter = name
		? name.charAt(FIRST_LETTER_INDEX).toUpperCase()
		: "?";

	return (
		<>
			{logo !== LOGO_NONE ? (
				<img
					alt={`${name} - logo`}
					className={className}
					src={`${IMAGE_UPLOAD_URL}${logo}`}
				/>
			) : (
				<div className={clsx(styles["default_logo"], className)}>
					{firstLetter}
				</div>
			)}
		</>
	);
};

export { Logo };
