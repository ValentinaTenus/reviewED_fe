import clsx from "clsx";
import React, { type ReactNode } from "react";

import { ButtonSize, ButtonType, ButtonVariant } from "~/common/enums/index.ts";
import { type ValueOf } from "~/common/types/index.ts";

import styles from "./styles.module.scss";

const variants: Record<ButtonVariant, string> = {
	default: styles.button__base,
	delete: styles.button__delete,
	group_buttons: styles.group__buttons,
	login: styles.button__login,
	outlined: styles.button__outlined,
	outlined_mobile: clsx(
		styles.button__outlined,
		styles.button__outlined_mobile,
	),
	primary: styles.button__primary,
	secondary: styles.button__secondary,
	share_facebook: styles.button__share_facebook,
	share_linkedin: styles.button__share_linkedin,
	share_twitter: styles.button__share_twitter,
};

const sizes: Record<ButtonSize, string> = {
	large: styles.size__large,
	medium: styles.size__medium,
	small: styles.size__small,
};

type ButtonProperties = {
	appendedIcon?: ReactNode;
	children?: ReactNode;
	className?: string;
	disabled?: boolean;
	isFullWidth?: boolean;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	prependedIcon?: ReactNode;
	size?: ValueOf<typeof ButtonSize>;
	type?: ValueOf<typeof ButtonType>;
	variant: ValueOf<typeof ButtonVariant>;
};

const Button: React.FC<ButtonProperties> = ({
	appendedIcon,
	children,
	className,
	disabled,
	isFullWidth,
	onClick,
	prependedIcon,
	size = ButtonSize.SMALL,
	type,
	variant,
	...restProperties
}) => {
	return (
		<button
			className={clsx(
				styles.button,
				sizes[size],
				variants[variant],
				isFullWidth && styles["width__full"],
				className,
			)}
			disabled={disabled}
			onClick={onClick}
			type={type}
			{...restProperties}
		>
			{prependedIcon}
			{children}
			{appendedIcon}
		</button>
	);
};

export { Button };
