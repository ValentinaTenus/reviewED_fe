import React from "react";

import { Button, Icon, Input, StarRating } from "~/common/components";
import {
	ButtonSize,
	ButtonType,
	ButtonVariant,
	IconName,
} from "~/common/enums";
import { useAppForm } from "~/common/hooks";
import { EditReviewModalData, MyReview } from "~/common/types/my-reviews";

import { DialogModal } from "../dialog-modal";
import styles from "./styles.module.scss";

interface Properties {
	isOpen: boolean;
	review: MyReview;
	setEditReviewModalData: (data: EditReviewModalData) => void;
}

const EditReviewModal: React.FC<Properties> = ({
	isOpen,
	review,
	setEditReviewModalData,
}) => {
	const { control, errors, handleSubmit } = useAppForm({
		defaultValues: {
			text: review.text,
		},
	});

	const handleClose = () => {
		setEditReviewModalData({ isOpen: false, reviewId: null, text: "" });
	};

	const handleEdit = (data: { text: string }) => {
		// Add redux logic
	};

	return (
		<DialogModal isOpen={isOpen} onClose={handleClose} classNames='edit-modal'>
			<div className={styles["review-content"]}>
				<div className={styles["review-content__info"]}>
					<div className={styles["info__left"]}>
						<div className={styles["info__img-wrapper"]}>
							<img alt="" className={styles["img"]} src={review.logo} />
						</div>
						<div className={styles["info__name"]}>
							{review.related_entity_name}
						</div>
					</div>
					<div className={styles["info__right"]}>
						<div className={styles["date"]}>{review.time_added}</div>
						<StarRating averageRating={review.rating} isNumberShown={false} />
					</div>
				</div>

				<div className={styles["review-content__body"]}>
					<div className={styles["review-content__text"]}>{review.text}</div>
					<div className={styles["review-content__icons"]}>
						<div className={styles["icon-share"]}>
							<Icon name={IconName.SHARE} />
							<span>Share</span>
						</div>
						<div className={styles["icon-like"]}>
							<Icon name={IconName.LIKE} />
							<span>21 likes</span>
						</div>
					</div>
				</div>

				<div className={styles["review-content__edit"]}>
					<form onSubmit={handleSubmit(handleEdit)}>
						<div className={styles["edit__title"]}>Editing review</div>
						<div className={styles["edit__textarea"]}>
							<Input
								control={control}
								errors={errors}
								maxWords={1000}
								name="text"
								placeholder="Review text"
								rows={1}
							/>
							<div className={styles["edit__bottom"]}>
								<div className={styles["edit__questing"]}>
									<p>Are you sure you want to edit this review?</p>
									<p>
										Once edited, it will be sent to the moderator or review
										again before it’s published.
									</p>
								</div>
								<div className={styles["edit__buttons"]}>
									<Button
										onClick={handleClose}
										size={ButtonSize.MEDIUM}
										variant={ButtonVariant.SECONDARY}
									>
										Cancel
									</Button>
									<Button
										size={ButtonSize.MEDIUM}
										type={ButtonType.SUBMIT}
										variant={ButtonVariant.PRIMARY}
									>
										Edit
									</Button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</DialogModal>
	);
};

export { EditReviewModal };
