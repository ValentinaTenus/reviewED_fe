import React, { useCallback } from "react";
import styles from "./styles.module.scss";

import { Button, Icon } from "~/common/components";
import { ButtonSize, ButtonVariant, IconName } from "~/common/enums";
import { DialogModal } from "../dialog-modal";

interface Properties {
	isOpen: boolean;
	isDeleting: boolean;
	handleDeleteReview: () => void;
	handleCloseDeleteReview: () => void;
}

const DeleteReviewModal: React.FC<Properties> = ({
	isOpen,
	isDeleting,
	handleDeleteReview,
	handleCloseDeleteReview,
}) => {
	if (!isOpen) return null;

	const handleClose = useCallback(() => {
		handleCloseDeleteReview();
	}, []);

	const handleClickDelete = useCallback(() => {
		handleDeleteReview();
	}, []);

	return (
		<DialogModal
			classNames="delete-modal"
			isOpen={isOpen}
			onClose={handleClose}
			withIconClose
		>
			<div className={styles["delete-modal"]}>
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
							disabled={isDeleting}
							onClick={handleClickDelete}
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
