import clsx from "clsx";
import React, { useCallback } from "react";

import { Icon } from "~/common/components";
import { MyReviewOptions } from "~/common/types/my-reviews";

import { DialogModal } from "../";
import styles from "./styles.module.scss";

type Properties = {
	onSelect: (option: string) => void;
	options: MyReviewOptions[];
	setIsOpenActionsModal: (value: boolean) => void;
};

const ActionsReviewModal: React.FC<Properties> = ({
	onSelect,
	options,
	setIsOpenActionsModal,
}) => {
	const handleClose = useCallback(() => {
		setIsOpenActionsModal(false);
	}, [setIsOpenActionsModal]);

	const handleSelect = useCallback(
		(option: string) => {
			onSelect(option);
			setIsOpenActionsModal(false);
		},
		[onSelect, setIsOpenActionsModal],
	);

	return (
		<DialogModal classNames="actions-modal" onClose={handleClose}>
			<div className={styles["actions-modal"]}>
				<div className={styles["actions-modal__title"]}>Дії</div>

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
							<span>{option.label}</span>
						</div>
					))}
				</div>
			</div>
		</DialogModal>
	);
};

export { ActionsReviewModal };
