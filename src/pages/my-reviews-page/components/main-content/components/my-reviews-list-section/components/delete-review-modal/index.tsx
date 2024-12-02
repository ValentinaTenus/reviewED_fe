import React, { useCallback } from "react";
import { toast } from "react-toastify";

import { Button, Icon } from "~/common/components";
import { ButtonSize, ButtonVariant, IconName } from "~/common/enums";
import { MyReviewCategory } from "~/common/types/my-reviews";
import { useDeleteMyReviewMutation } from "~/redux/my-reviews/my-reviews-api";

import { DialogModal } from "../";
import styles from "./styles.module.scss";

type Properties = {
	category: MyReviewCategory;
	closeModal: () => void;
	reviewId: number;
};

const DeleteReviewModal: React.FC<Properties> = ({
	category,
	closeModal,
	reviewId,
}) => {
	const [deleteMyReview, { isLoading }] = useDeleteMyReviewMutation();

	const handleClose = useCallback(() => {
		closeModal();
	}, [closeModal]);

	const handleDeleteReview = useCallback(async () => {
		if (reviewId) {
			try {
				await deleteMyReview({ category, entityId: reviewId }).unwrap();
			} catch (error) {
				if (error instanceof Error) {
					toast.error(`Error: ${error.message}`);
				} else {
					toast.error("Виникла помилка при видаленні відгуку.");
				}
			} finally {
				closeModal();
			}
		}
	}, [reviewId, category, deleteMyReview, closeModal]);

	return (
		<DialogModal classNames="delete-modal" onClose={handleClose} withIconClose>
			<div className={styles["delete-modal"]}>
				<div className={styles["delete-modal__top"]}>
					<div className={styles["delete-modal__icon"]}>
						<div className={styles["icon__inner"]}>
							<Icon name={IconName.WARNING} />
						</div>
					</div>
					<div className={styles["delete-modal__title"]}>Видалити відгук?</div>
					<div className={styles["delete-modal__text"]}>
						<p>Ви впевнені, що хочете видалити цей відгук?</p>
						<p>Після видалення його не можна буде відновити.</p>
					</div>
				</div>

				<hr />

				<div className={styles["delete-modal__bottom"]}>
					<div className={styles["delete-modal__buttons"]}>
						<Button
							onClick={() => closeModal()}
							size={ButtonSize.MEDIUM}
							variant={ButtonVariant.SECONDARY}
						>
							Скасувати
						</Button>
						<Button
							disabled={isLoading}
							onClick={handleDeleteReview}
							size={ButtonSize.MEDIUM}
							variant={ButtonVariant.DELETE}
						>
							Видалити
						</Button>
					</div>
				</div>
			</div>
		</DialogModal>
	);
};

export { DeleteReviewModal };
