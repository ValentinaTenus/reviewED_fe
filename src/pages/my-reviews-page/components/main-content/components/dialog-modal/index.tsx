import clsx from "clsx";
import type React from "react";
import { useEffect } from "react";

import styles from "./styles.module.scss";
import { Icon } from "~/common/components";
import { IconName } from "~/common/enums";

type Properties = {
	children?: React.ReactNode;
	isOpen: boolean;
	onClose: () => void;
	withIconClose?: boolean;
	classNames?: keyof typeof styles;
};

const DialogModal: React.FC<Properties> = ({
	children,
	isOpen,
	onClose,
	withIconClose = false,
	classNames,
}) => {
	// Prevent background scrolling when the modal is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}

		// Cleanup when modal is closed
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	if (!isOpen) return null;

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
