import React, { useCallback, useState } from "react";

import { Button, Input, Logo, StarRating } from "~/common/components";
import { ButtonSize, ButtonType, ButtonVariant } from "~/common/enums";
import { useAppForm, useTransformDate } from "~/common/hooks";
import { MyReview } from "~/common/types/my-reviews";

import { DialogModal, IconsSection } from "../";
import styles from "./styles.module.scss";

interface Properties {
	handleCloseEditReview: () => void;
	handleEditReview: (data: { rating: number; text: string }) => void;
	isEditing: boolean;
	isOpen: boolean;
	review: MyReview;
}

const EditReviewModal: React.FC<Properties> = ({
	handleCloseEditReview,
	handleEditReview,
	isEditing,
	isOpen,
	review,
}) => {
	const [rating, setRating] = useState<null | number>(null);
	const { formattedDate } = useTransformDate(review.time_added);
	const { control, errors, handleSubmit } = useAppForm({
		defaultValues: {
			text: review?.text || "",
		},
	});

	const handleClose = useCallback(() => {
		handleCloseEditReview();
	}, [handleCloseEditReview]);

	const onEditReview = useCallback(
		({ text }: { text: string }) => {
			if (!text) return;

			const finalRating = rating !== null ? Math.ceil(rating) : review.rating;

			handleEditReview({ rating: finalRating, text });
		},
		[rating, handleEditReview, review.rating],
	);

	const handleStarClick = useCallback((rating: number) => {
		setRating(rating);
	}, []);

	return (
		<DialogModal classNames="edit-modal" isOpen={isOpen} onClose={handleClose}>
			<div className={styles["review-content"]}>
				<div className={styles["review-content__info"]}>
					<div className={styles["info__left"]}>
						<div className={styles["info__img-wrapper"]}>
							<Logo
								className={styles["item__img"]}
								logo={review.logo}
								name={review.related_entity_name}
							/>
						</div>
						<div className={styles["info__name"]}>
							{review.related_entity_name}
						</div>
					</div>
					<div className={styles["info__right"]}>
						<div className={styles["date"]}>
							{formattedDate.replace(/\s+/g, "")}
						</div>
						<StarRating
							averageRating={rating || review.rating}
							classNameStarsBlock={styles["rating_stars--edit"]}
							handleClick={handleStarClick}
							isEditRating
							isNumberShown={false}
						/>
					</div>
				</div>

				<div className={styles["review-content__body"]}>
					<div className={styles["review-content__text"]}>{review.text}</div>
					<div className={styles["review-content__icons"]}>
						<IconsSection likesCount={review.likes_count} />
					</div>
				</div>

				<div className={styles["review-content__edit"]}>
					<form onSubmit={handleSubmit(onEditReview)}>
						<div className={styles["edit__title"]}>Редагування відгуку</div>
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
									<p>Ви впевнені, що хочете відредагувати цей відгук?</p>
									<p>
										Після редагування він буде надісланий модератору для
										повторного розгляду перед публікацією.
									</p>
								</div>
								<div className={styles["edit__buttons"]}>
									<Button
										onClick={handleClose}
										size={ButtonSize.MEDIUM}
										variant={ButtonVariant.SECONDARY}
									>
										Скасувати
									</Button>
									<Button
										disabled={isEditing}
										size={ButtonSize.MEDIUM}
										type={ButtonType.SUBMIT}
										variant={ButtonVariant.PRIMARY}
									>
										Редагувати
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
