import React, { useCallback } from "react";

import { Button, Icon } from "~/common/components";
import { ButtonSize, ButtonVariant, IconName } from "~/common/enums";

import { DialogModal } from "../";
import styles from "./styles.module.scss";

type Properties = {
	handleCloseDeleteReview: () => void;
	handleDeleteReview: () => void;
	isDeleting: boolean;
	isOpen: boolean;
};

const DeleteReviewModal: React.FC<Properties> = ({
	handleCloseDeleteReview,
	handleDeleteReview,
	isDeleting,
	isOpen,
}) => {
	const handleClose = useCallback(() => {
		handleCloseDeleteReview();
	}, [handleCloseDeleteReview]);

	const handleClickDelete = useCallback(() => {
		handleDeleteReview();
	}, [handleDeleteReview]);

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
