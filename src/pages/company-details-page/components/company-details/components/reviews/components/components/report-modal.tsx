import React, { useCallback, useState } from "react";

import { Button } from "~/common/components/index";
import { Modal } from "~/common/components/modal";
import { ButtonSize, ButtonVariant } from "~/common/enums/index";
import globalStyles from "~/pages/company-details-page/components/company-details/styles.module.scss";
// import { useSendReviewMutation } from "~/redux/reviews/reviews-companies-api";

import styles from "./styles.module.scss";

const ReportModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
	isOpen,
	onClose,
}) => {
	const MIN_TEXT = 200;

	const [reportText, setReportText] = useState("");

	// const [sendReview] = useSendReviewMutation();
	const handleReviewChange = useCallback(
		(event: React.ChangeEvent<HTMLTextAreaElement>) => {
			setReportText(event.target.value);
		},
		[setReportText],
	);

	const handleSubmit = useCallback(async () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		// const response = await sendReview({
		// 	companyId: 1,
		// 	text: setReportText,
		// });
		// onClose();
		// }, [reportText, sendReview, onClose]);
	}, []);

	const handleCloseReviewModal = useCallback(() => {
		onClose();
		setReportText("");
	}, [onClose, setReportText]);

	return (
		<Modal
			isOpen={isOpen}
			onClose={handleCloseReviewModal}
			title="Поскаржитися"
		>
			<div className={styles["modal_content"]}>
				<div className={styles["modal_review-block"]}>
					<h4 className={styles["modal_label"]}>Ваш коментар</h4>
					<textarea
						className={`${styles["modal_review-textarea"]} ${globalStyles["body-r"]}`}
						id="review"
						maxLength={2000}
						onChange={handleReviewChange}
						placeholder="Текст відгуку"
						value={reportText}
					/>
					<div
						className={`${styles["modal_char-counter"]} ${globalStyles["small_r"]}`}
					>
						<span>Мінімальна к-ть символів - 200</span>
						<span>{reportText.length}/2000</span>
					</div>
				</div>
				<Button
					className={styles["modal_submit-button"]}
					disabled={reportText.length < MIN_TEXT}
					onClick={handleSubmit}
					size={ButtonSize.LARGE}
					variant={ButtonVariant.PRIMARY}
				>
					Залишити скаргу
				</Button>
			</div>
		</Modal>
	);
};

export { ReportModal };
