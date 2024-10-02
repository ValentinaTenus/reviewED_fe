import { Rating } from "@mui/material";
import React, { useState } from "react";

import { Button } from "~/common/components/index";
import { Modal } from "~/common/components/modal";
import { ButtonSize, ButtonVariant } from "~/common/enums/index";
import globalStyles from "~/pages/company-details-page/components/company-details/styles.module.scss";
import { useSendReviewMutation } from "~/redux/reviews/reviews-companies-api";

import styles from "./styles.module.scss";

const ReviewModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
	isOpen,
	onClose,
}) => {
	const ZERO = 0;
	const MIN_TEXT = 200;

	const [rating, setRating] = useState<null | number>(ZERO);
	const [reviewText, setReviewText] = useState("");

	const [sendReview] = useSendReviewMutation();

	const handleReviewChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>,
	) => {
		setReviewText(event.target.value);
	};

	const handleSubmit = async () => {
		const response = await sendReview({
			companyId: 1,
			rating: rating,
			text: reviewText,
		});
		onClose();
	};

	const handleCloseReviewModal = () => {
		onClose();
		setRating(ZERO);
		setReviewText("");
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={handleCloseReviewModal}
			title="Залиш свій відгук"
		>
			<div className={styles["review-modal_content"]}>
				<div className={styles["review-modal_rating-block"]}>
					<h4 className={styles["review-modal_label"]}>Ваша оцінка</h4>
					<Rating
						name="simple-controlled"
						onChange={(event, newValue) => {
							setRating(newValue);
						}}
						precision={0.5}
						value={rating}
					/>
				</div>
				<div className={styles["review-modal_review-block"]}>
					<h4 className={styles["review-modal_label"]}>Ваш відгук</h4>
					<textarea
						className={`${styles["review-modal_review-textarea"]} ${globalStyles["body-r"]}`}
						id="review"
						maxLength={2000}
						onChange={handleReviewChange}
						placeholder="Текст відгуку"
						value={reviewText}
					/>
					<div
						className={`${styles["review-modal_char-counter"]} ${globalStyles["small_r"]}`}
					>
						<span>Мінімальна к-ть символів - 200</span>
						<span>{reviewText.length}/2000</span>
					</div>
				</div>
				<Button
					className={styles["review-modal_submit-button"]}
					disabled={reviewText.length < MIN_TEXT}
					onClick={handleSubmit}
					size={ButtonSize.LARGE}
					variant={ButtonVariant.PRIMARY}
				>
					Написати відгук
				</Button>
			</div>
		</Modal>
	);
};

export { ReviewModal };
