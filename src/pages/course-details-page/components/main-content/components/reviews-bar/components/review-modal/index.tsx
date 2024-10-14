import { Rating } from "@mui/material";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React, { useCallback, useEffect, useState } from "react";

import { Button } from "~/common/components/index";
import { Modal } from "~/common/components/modal";
import { PrivacyPolicyModal } from "~/common/components/privacy-policy-modal";
import { ButtonSize, ButtonVariant } from "~/common/enums/index";
import { type GetCourseByIdResponseDto } from "~/common/types";
import globalStyles from "~/pages/company-details-page/components/company-details/styles.module.scss";
import { useAppDispatch } from "~/redux/hooks.type";
import { useSendReviewMutation } from "~/redux/reviews/reviews-course-api";
import { addCourseReview } from "~/redux/reviews/reviews-slice";
import { useGetUserQuery } from "~/redux/user/user-api";

import styles from "./styles.module.scss";

const ReviewModal: React.FC<{
	course: GetCourseByIdResponseDto;
	isOpen: boolean;
	onClose: () => void;
}> = ({ course, isOpen, onClose }) => {
	const { data: user } = useGetUserQuery(undefined);

	const [isPrivacyPolicyModalOpen, setIsPrivacyPolicyModalOpen] =
		useState(false);

	const dispatch = useAppDispatch();

	const ONE = 1;
	const MIN_TEXT = 200;

	const [rating, setRating] = useState<null | number>(ONE);
	const [reviewText, setReviewText] = useState("");
	const [serverError, setServerError] = useState("");

	const [sendReview] = useSendReviewMutation();

	const handleReviewChange = useCallback(
		(event: React.ChangeEvent<HTMLTextAreaElement>) => {
			setReviewText(event.target.value);
		},
		[setReviewText],
	);

	const handleRatingChange = useCallback(
		(_: React.SyntheticEvent, newValue: null | number) => {
			setRating(newValue ?? ONE);
		},
		[],
	);

	const handleCloseReviewModal = useCallback(() => {
		onClose();
		setRating(ONE);
		setReviewText("");
	}, [onClose, setRating, setReviewText]);

	const handleSubmit = useCallback(async () => {
		if (user?.policy_agreed === false) {
			setIsPrivacyPolicyModalOpen(true);
		}

		if (user?.policy_agreed === true) {
			try {
				await sendReview({
					courseId: course.id,
					rating: rating,
					text: reviewText,
				});

				dispatch(addCourseReview(course.id));
				handleCloseReviewModal();
			} catch (error) {
				const loadError = ((error as FetchBaseQueryError).data as {
					detail: string;
				})
					? ((error as FetchBaseQueryError).data as { detail: string })
					: { detail: "Виникла невідома помилка" };
				setServerError(loadError.detail);
			}
		}
	}, [
		course.id,
		dispatch,
		rating,
		reviewText,
		sendReview,
		handleCloseReviewModal,
		user?.policy_agreed,
	]);

	useEffect(() => {
		if (user?.policy_agreed) {
			setIsPrivacyPolicyModalOpen(false);
		}
	}, [user]);

	return (
		<>
			<Modal
				isOpen={isOpen}
				onClose={handleCloseReviewModal}
				title="Залиш свій відгук"
			>
				<div className={styles["modal_content"]}>
					<div className={styles["modal_rating-block"]}>
						<h4 className={styles["modal_label"]}>Ваша оцінка</h4>
						<Rating
							name="simple-controlled"
							onChange={handleRatingChange}
							precision={1}
							value={rating}
						/>
					</div>
					<div className={styles["modal_review-block"]}>
						<h4 className={styles["modal_label"]}>Ваш відгук</h4>
						<textarea
							className={`${styles["modal_review-textarea"]} ${globalStyles["body-r"]}`}
							id="review"
							maxLength={2000}
							onChange={handleReviewChange}
							placeholder="Текст відгуку"
							value={reviewText}
						/>
						<div
							className={`${styles["modal_char-counter"]} ${globalStyles["small_r"]}`}
						>
							<span>Мінімальна к-ть символів - 200</span>
							<span>{reviewText.length}/2000</span>
						</div>
					</div>

					{serverError && <p>{serverError}</p>}
					<Button
						className={styles["modal_submit-button"]}
						disabled={reviewText.length < MIN_TEXT}
						onClick={handleSubmit}
						size={ButtonSize.LARGE}
						variant={ButtonVariant.PRIMARY}
					>
						Написати відгук
					</Button>
				</div>
			</Modal>
			<PrivacyPolicyModal
				isOpen={isPrivacyPolicyModalOpen}
				onClose={() => setIsPrivacyPolicyModalOpen(false)}
			/>
		</>
	);
};

export { ReviewModal };
