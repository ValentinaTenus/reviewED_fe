import React from "react";

import { Button, Icon } from "~/common/components";
import { ButtonSize, ButtonVariant, IconName } from "~/common/enums";
import { DeleteReviewModalData } from "~/common/types/my-reviews";

import { DialogModal } from "../dialog-modal";
import styles from "./styles.module.scss";

interface Properties {
	isOpen: boolean;
	reviewId: null | number;
	setDeleteReviewModalData: (data: DeleteReviewModalData) => void;
}

const DeleteReviewModal: React.FC<Properties> = ({
	isOpen,
	reviewId,
	setDeleteReviewModalData,
}) => {
	if (!isOpen) return null;

	const handleClose = () => {
		setDeleteReviewModalData({ isOpen: false, reviewId: null });
	};
	const handleDelete = () => {
		//Add redux logic
	};

	return (
		<DialogModal isOpen={isOpen} onClose={handleClose} withIconClose>
			<div className={styles["delete-modal__wrapper"]}>
				<div className={styles["delete-modal__top"]}>
					<div className={styles["delete-modal__icon"]}>
						<div className={styles["icon__inner"]}>
							<Icon name={IconName.WARNING} />
						</div>
					</div>
					<div className={styles["delete-modal__title"]}>Delete review?</div>
					<div className={styles["delete-modal__text"]}>
						<p>Are you sure you want to delete this review?</p>
						<p>Once deleted, it cannot be recovered.</p>
					</div>
				</div>

				<hr />

				<div className={styles["delete-modal__bottom"]}>
					<div className={styles["delete-modal__buttons"]}>
						<Button
							onClick={handleClose}
							size={ButtonSize.MEDIUM}
							variant={ButtonVariant.SECONDARY}
						>
							Cancel
						</Button>
						<Button
							onClick={handleDelete}
							size={ButtonSize.MEDIUM}
							variant={ButtonVariant.DELETE}
						>
							Delete
						</Button>
					</div>
				</div>
			</div>
		</DialogModal>
	);
};

export { DeleteReviewModal };
