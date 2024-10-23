import { Rating } from "@mui/material";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Button } from "~/common/components/index";
import { Modal } from "~/common/components/modal";
import { PrivacyPolicyModal } from "~/common/components/privacy-policy-modal";
import { ButtonSize, ButtonVariant } from "~/common/enums/index";
import { useGetUser } from "~/common/hooks/use-get-user.hook";
import { type GetCourseByIdResponseDto } from "~/common/types";
import { useAppSelector } from "~/redux/hooks.type";
import { useSendCourseReviewMutation } from "~/redux/reviews/reviews-course-api";

import styles from "./styles.module.scss";

const ReviewModal: React.FC<{
	course: GetCourseByIdResponseDto;
	isOpen: boolean;
	onClose: () => void;
	onReviewSubmit: () => void;
}> = ({ course, isOpen, onClose, onReviewSubmit }) => {
	const ONE = 1;
	const MIN_TEXT = 200;
	const { refetch: refetchUser } = useGetUser();
	const [sendReview] = useSendCourseReviewMutation();

	const { user } = useAppSelector((state) => state.auth);

	const [isPrivacyPolicyModalOpen, setIsPrivacyPolicyModalOpen] =
		useState(false);

	const [rating, setRating] = useState<null | number>(ONE);
	const [reviewText, setReviewText] = useState("");

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
		if (!user?.policy_agreed) {
			setIsPrivacyPolicyModalOpen(true);
			return;
		}

		try {
			await sendReview({
				courseId: course.id,
				rating: rating,
				text: reviewText,
			}).unwrap();
			toast.success(`Ваш відгук для ${course.title} успішно відправлено`);
			onReviewSubmit();
		} catch (error) {
			if (error) {
				const loadError = ((error as FetchBaseQueryError).data as {
					detail: string;
				})
					? ((error as FetchBaseQueryError).data as { detail: string })
					: { detail: "Виникла невідома помилка" };
				toast.error(loadError.detail);
			}
		} finally {
			handleCloseReviewModal();
		}
	}, [
		course.id,
		course.title,
		onReviewSubmit,
		rating,
		reviewText,
		sendReview,
		handleCloseReviewModal,
		user?.policy_agreed,
	]);

	useEffect(() => {
		if (user?.policy_agreed) {
			setIsPrivacyPolicyModalOpen(false);
			refetchUser();
		}
	}, [user?.policy_agreed, refetchUser]);

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
							className={styles["modal_review-textarea"]}
							id="review"
							maxLength={2000}
							onChange={handleReviewChange}
							placeholder="Текст відгуку"
							value={reviewText}
						/>
						<div className={styles["modal_char-counter"]}>
							<span>Мінімальна к-ть символів - 200</span>
							<span>{reviewText.length}/2000</span>
						</div>
					</div>

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
			{isPrivacyPolicyModalOpen && (
				<PrivacyPolicyModal
					isOpen={isPrivacyPolicyModalOpen}
					onClose={() => setIsPrivacyPolicyModalOpen(false)}
				/>
			)}
		</>
	);
};

export { ReviewModal };
