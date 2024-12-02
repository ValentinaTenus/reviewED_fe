import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";

import { Button, Input, Logo, StarRating } from "~/common/components";
import { ButtonSize, ButtonType, ButtonVariant } from "~/common/enums";
import { useAppForm, useTransformDate } from "~/common/hooks";
import { MyReview, MyReviewCategory } from "~/common/types/my-reviews";
import { useEditMyReviewMutation } from "~/redux/my-reviews/my-reviews-api";

import { ActionIconsPanel, DialogModal } from "../";
import styles from "./styles.module.scss";

const MIN_SYMBOL_COUNT = 200;

const errorMessage = `Мінімальна кількість символів — ${MIN_SYMBOL_COUNT}`;

const schema = yup
	.object({
		text: yup
			.string()
			.required(errorMessage)
			.min(MIN_SYMBOL_COUNT, errorMessage),
	})
	.required();

type FormData = yup.InferType<typeof schema>;

interface Properties {
	category: MyReviewCategory;
	closeModal: () => void;
	openModal: (currentModal: string, entityId: number) => void;
	review: MyReview;
}

const EditReviewModal: React.FC<Properties> = ({
	category,
	closeModal,
	openModal,
	review,
}) => {
	const [rating, setRating] = useState<null | number>(null);
	const { formattedDate } = useTransformDate(review.time_added);
	const [editMyReview, { isLoading }] = useEditMyReviewMutation();

	const { control, errors, handleSubmit } = useAppForm<FormData>({
		defaultValues: {
			text: review?.text || "",
		},
		mode: "onBlur",
		validationSchema: schema,
	});

	const handleEditReview = useCallback(
		async ({ text }: { text: string }) => {
			const finalRating = rating !== null ? Math.ceil(rating) : review.rating;

			try {
				await editMyReview({
					body: { rating: finalRating, text },
					category,
					entityId: review.id,
				}).unwrap();
			} catch (error) {
				if (error instanceof Error) {
					toast.error(`Error: ${error.message}`);
				} else {
					toast.error("Виникла помилка при редагуванні відгуку.");
				}
			} finally {
				closeModal();
			}
		},
		[rating, review.rating, review.id, category, closeModal, editMyReview],
	);

	const handleClose = useCallback(() => {
		closeModal();
	}, [closeModal]);

	const handleStarClick = useCallback((rating: number) => {
		setRating(rating);
	}, []);

	return (
		<DialogModal classNames="edit-modal" onClose={handleClose}>
			<div className={styles["review"]}>
				<div className={styles["review__info"]}>
					<div className={styles["review__info-left"]}>
						<div className={styles["review__info-logo-wrapper"]}>
							<Logo
								className={styles["review__info-logo"]}
								logo={review.logo}
								name={review.related_entity_name}
							/>
						</div>

						<div className={styles["review__info-name"]}>
							{review.related_entity_name}
						</div>
					</div>

					<div className={styles["review__info-right"]}>
						<div className={styles["review__info-date"]}>
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

				<div className={styles["review__text"]}>
					<div className={styles["review__text-text"]}>{review.text}</div>

					<div className={styles["review__text-icons"]}>
						<ActionIconsPanel
							likesCount={review.likes_count}
							openModal={openModal}
							reviewId={review.id}
						/>
					</div>
				</div>

				<div className={styles["review__edit"]}>
					<form onSubmit={handleSubmit(handleEditReview)}>
						<div className={styles["review__edit-title"]}>
							Редагування відгуку
						</div>

						<div className={styles["review__edit-textarea"]}>
							<Input
								control={control}
								errors={errors}
								hasVisuallyHiddenLabel
								maxWords={2000}
								name="text"
								placeholder="Текст відгуку"
								rows={1}
							/>

							<div className={styles["review__edit-error"]}>
								{errors.text && errors.text.message}
							</div>

							<div className={styles["review__edit-bottom"]}>
								<div className={styles["review__edit-questing"]}>
									<p>Ви впевнені, що хочете відредагувати цей відгук?</p>
									<p>
										Після редагування він буде надісланий модератору для
										повторного розгляду перед публікацією.
									</p>
								</div>

								<div className={styles["review__edit-buttons"]}>
									<Button
										onClick={handleClose}
										size={ButtonSize.MEDIUM}
										variant={ButtonVariant.SECONDARY}
									>
										Скасувати
									</Button>
									<Button
										disabled={isLoading}
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
