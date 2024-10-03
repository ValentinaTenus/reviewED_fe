import React from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";

import { Icon } from "~/common/components";
import { MyReviewOptions } from "~/common/types/my-reviews";
import { DialogModal } from "../../../dialog-modal";

type Properties = {
	isOpen: boolean;
	options: MyReviewOptions[];
	onSelect: (option: string) => void;
	setIsOpenActionsModal: (value: boolean) => void;
};

const ActionsReviewModal: React.FC<Properties> = ({
	isOpen,
	options,
	onSelect,
	setIsOpenActionsModal,
}) => {
	const handleClose = () => {
		setIsOpenActionsModal(false);
	};

	const handleSelect = (option: string) => {
		onSelect(option);
		setIsOpenActionsModal(false);
	};

	return (
		<DialogModal
			isOpen={isOpen}
			onClose={handleClose}
			classNames="actions-modal"
		>
			<div className={styles["actions-modal"]}>
				<div className={styles["actions-modal__title"]}>Actions</div>
				
				<hr />

				<div className={styles["actions-modal__options"]}>
					{options.map((option) => (
						<div
							className={clsx(
								styles["actions-modal__option"],
								option.value === "delete" && styles["option-delete"],
							)}
							key={option.value}
							onClick={() => handleSelect(option.value)}
						>
							<Icon name={option.iconName} />
							<span>{option.value}</span>
						</div>
					))}
				</div>
			</div>
		</DialogModal>
	);
};

export { ActionsReviewModal };
