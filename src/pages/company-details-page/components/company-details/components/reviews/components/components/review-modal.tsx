import { Rating } from "@mui/material";
import React, { useCallback, useState } from "react";

import { Button } from "~/common/components/index";
import { Modal } from "~/common/components/modal";
import { ButtonSize, ButtonVariant } from "~/common/enums/index";
import { Company } from "~/common/types";
import globalStyles from "~/pages/company-details-page/components/company-details/styles.module.scss";
import { useSendReviewMutation } from "~/redux/reviews/reviews-companies-api";

import styles from "./styles.module.scss";

const ReviewModal: React.FC<{
	company: Company;
	isOpen: boolean;
	onClose: () => void;
}> = ({ company, isOpen, onClose }) => {
	const ZERO = 0;
	const MIN_TEXT = 200;
	const FORBIDDEN = 403;

	const [rating, setRating] = useState<null | number>(ZERO);
	const [reviewText, setReviewText] = useState("");

	const [sendReview] = useSendReviewMutation();

	const handleReviewChange = useCallback(
		(event: React.ChangeEvent<HTMLTextAreaElement>) => {
			setReviewText(event.target.value);
		},
		[setReviewText],
	);

	const handleRatingChange = useCallback(
		(_: React.SyntheticEvent, newValue: null | number) => {
			setRating(newValue);
		},
		[],
	);

	const handleCloseReviewModal = useCallback(() => {
		onClose();
		setRating(ZERO);
		setReviewText("");
	}, [onClose, setRating, setReviewText]);

	const handleSubmit = useCallback(async () => {
		const response = await sendReview({
			companyId: company.id,
			rating: rating,
			text: reviewText,
		});
		if (response.error) {
			if ("status" in response.error && response.error.status !== FORBIDDEN) {
				window.location.href = "/privacy-policy";
			}
		} else {
			const userCompanyReviews = JSON.parse(
				localStorage.getItem("userCompanyReviews") || "[]",
			);
			localStorage.setItem(
				"userCompanyReviews",
				JSON.stringify([...userCompanyReviews, company.id]),
			);
		}
		handleCloseReviewModal();
	}, [company.id, rating, reviewText, sendReview, handleCloseReviewModal]);

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
							precision={0.5}
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
		</>
	);
};

export { ReviewModal };
