import clsx from "clsx";
import React, { type ReactNode } from "react";

import { ButtonType } from "~/common/enums";
import { ValueOf } from "~/common/types";

import styles from "./styles.module.scss";

type IconButtonProperties = {
	children?: ReactNode;
	className?: string;
	isDisabled?: boolean;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	type?: ValueOf<typeof ButtonType>;
};

const IconButton: React.FC<IconButtonProperties> = ({
	children,
	className,
	isDisabled,
	onClick,
	type,
}) => (
	<button
		className={clsx(styles.icon__button, className)}
		disabled={isDisabled}
		onClick={onClick}
		type={type || ButtonType.BUTTON}
	>
		{children}
	</button>
);

export { IconButton };
