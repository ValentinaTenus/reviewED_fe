import clsx from "clsx";
import type React from "react";
import { useEffect } from "react";

import styles from "./styles.module.scss";

type Properties = {
	children?: React.ReactNode;
	isOpen: boolean;
	onClose: () => void;
	withIconClose?: boolean;
};

const DialogModal: React.FC<Properties> = ({
	children,
	isOpen,
	onClose,
	withIconClose = false,
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
		<div className={styles["modal"]} onClick={onClose}>
			<div
				className={styles["modal-content"]}
				onClick={(e) => e.stopPropagation()}
			>
				<button
					className={clsx(
						styles["modal-content__icon-close"],
						withIconClose && styles["with-icon-close"],
					)}
					onClick={onClose}
				>
					&times;
				</button>

				{children}
			</div>
		</div>
	);
};

export { DialogModal };
