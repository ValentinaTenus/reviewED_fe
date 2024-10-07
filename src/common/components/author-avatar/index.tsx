import clsx from "clsx";
import React from "react";

import { AUTHOR_AVATAR_NONE } from "~/common/constants/index";

import styles from "./styles.module.scss";

const FIRST_LETTER_INDEX = 0;

type Properties = {
	className?: string;
	name: string;
	src: string;
};

const AuthorAvatar: React.FC<Properties> = ({ className, name, src }) => {
	const firstLetter = name
		? name.charAt(FIRST_LETTER_INDEX).toUpperCase()
		: "?";

	return (
		<>
			{src !== AUTHOR_AVATAR_NONE ? (
				<img alt={`${name} - logo`} className={className} src={`${src}`} />
			) : (
				<div className={clsx(styles["default_logo"], className)}>
					{firstLetter}
				</div>
			)}
		</>
	);
};

export { AuthorAvatar };
