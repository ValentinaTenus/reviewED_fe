import React, { useCallback, useState } from "react";

import { Button, Icon, Input, StarRating } from "~/common/components";
import {
	ButtonSize,
	ButtonType,
	ButtonVariant,
	IconName,
} from "~/common/enums";
import { useAppForm } from "~/common/hooks";
import { MyReview } from "~/common/types/my-reviews";

import { DialogModal } from "../dialog-modal";
import styles from "./styles.module.scss";

interface Properties {
	isOpen: boolean;
	isEditing: boolean;
	review: MyReview;
	handleEditReview: (data: { text: string; rating: number }) => void;
	handleCloseEditReview: () => void;
}

const EditReviewModal: React.FC<Properties> = ({
	isOpen,
	isEditing,
	review,
	handleEditReview,
	handleCloseEditReview,
}) => {
	const [rating, setRating] = useState<number | null>(null);
	const { control, errors, handleSubmit } = useAppForm({
		defaultValues: {
			text: review?.text || "",
		},
	});

	const handleClose = useCallback(() => {
		handleCloseEditReview();
	}, []);

	const onEditReview = useCallback(
		({ text }: { text: string }) => {
			if (!text) return;
			handleEditReview({ text, rating: rating || review.rating });
		},
		[rating],
	);

	const handleStarClick = useCallback((rating: number) => {
		setRating(rating);
	}, []);

	return (
		<DialogModal isOpen={isOpen} onClose={handleClose} classNames="edit-modal">
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
						<StarRating
							averageRating={rating || review.rating}
							isNumberShown={false}
							isEditRating
							classNameStarsBlock={styles["rating_stars--edit"]}
							handleClick={handleStarClick}
						/>
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
							<span>{review.count_likes} likes</span>
						</div>
					</div>
				</div>

				<div className={styles["review-content__edit"]}>
					<form onSubmit={handleSubmit(onEditReview)}>
						<div className={styles["edit__title"]}>Editing review</div>
						<div className={styles["edit__textarea"]}>
							<Input
								control={control}
								errors={errors}
								maxWords={2000}
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
										disabled={isEditing}
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
