import clsx from "clsx";
import React from "react";

import { Icon, IconButton } from "~/common/components/index";
import { IconName } from "~/common/enums/index";
import { useModal } from "~/common/hooks/index";

import styles from "./styles.module.scss";

type ModalProperties = {
	children: React.ReactNode;
	className?: string;
	footer?: React.ReactNode;
	isOpen: boolean;
	onClose: () => void;
	title?: string;
};

const Modal: React.FC<ModalProperties> = ({
	children,
	className,
	footer,
	isOpen,
	onClose,
	title,
}) => {
	const { handleOutsideClick, preventModalCloseOnClick } = useModal({
		isOpen,
		onClose,
	});

	if (!isOpen) {
		return null;
	}

	return (
		<div
			className={clsx(styles["modal"], className)}
			onClick={handleOutsideClick}
		>
			<div
				className={styles["modal__container"]}
				onClick={preventModalCloseOnClick}
				tabIndex={-1}
			>
				<div className={styles["modal__header"]}>
					<h2 className={styles["modal__title"]}>{title}</h2>
					<IconButton
						className={styles["modal__close_button"]}
						onClick={onClose}
					>
						<Icon
							className={styles["modal__icon-close"]}
							name={IconName.CLOSE}
						/>
					</IconButton>
				</div>
				<div className={styles["modal__content"]}>{children}</div>
				{footer && <div className={styles["modal__footer"]}>{footer}</div>}
			</div>
		</div>
	);
};

export { Modal };
