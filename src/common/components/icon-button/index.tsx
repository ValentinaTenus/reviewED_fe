import clsx from "clsx";
import React, { type ReactNode } from "react";

import styles from "./styles.module.scss";

type IconButtonProperties = {
	children?: ReactNode;
	className?: string;
	isDisabled?: boolean;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const IconButton: React.FC<IconButtonProperties> = ({
	children,
	className,
	isDisabled,
	onClick,
}) => (
	<button
		className={clsx(styles.icon__button, className)}
		disabled={isDisabled}
		onClick={onClick}
		type="button"
	>
		{children}
	</button>
);

export { IconButton };
