import clsx from "clsx";
import { useEffect } from "react";
import type React from "react";

import { Icon } from "~/common/components";
import { IconName } from "~/common/enums";

import styles from "./styles.module.scss";

type Properties = {
	children?: React.ReactNode;
	classNames?: keyof typeof styles;
	onClose: () => void;
	withIconClose?: boolean;
};

const DialogModal: React.FC<Properties> = ({
	children,
	classNames,
	onClose,
	withIconClose = false,
}) => {
	// Prevent background scrolling and handle content shifting
	useEffect(() => {
		const scrollbarWidth =
			window.innerWidth - document.documentElement.clientWidth;
		document.body.style.paddingRight = `${scrollbarWidth}px`;
		document.body.style.overflow = "hidden";

		// Cleanup when modal is closed
		return () => {
			document.body.style.overflow = "";
			document.body.style.paddingRight = "";
		};
	}, []);

	return (
		<div
			className={clsx(styles["modal"], classNames && styles[classNames])}
			onClick={onClose}
		>
			<div
				className={styles["modal-content"]}
				onClick={(e) => e.stopPropagation()}
			>
				<div
					className={clsx(
						styles["modal-content__icon-close"],
						withIconClose && styles["modal-content__icon-close--visible"],
					)}
					onClick={onClose}
				>
					<Icon name={IconName.CLOSE} />
				</div>
				{children}
			</div>
		</div>
	);
};

export { DialogModal };
