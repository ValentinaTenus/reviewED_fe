import React, { useCallback, useState } from "react";

import { Button } from "~/common/components/index";
import { Modal } from "~/common/components/modal";
import { ButtonSize, ButtonVariant } from "~/common/enums/index";
import { Review } from "~/common/types";
import globalStyles from "~/pages/company-details-page/components/company-details/styles.module.scss";
import { useSendReportMutation } from "~/redux/reviews/reviews-companies-api";

import { ReportSuccessModal } from "./components/report-success-modal";
import styles from "./styles.module.scss";

const ReportModal: React.FC<{
	isOpen: boolean;
	onClose: () => void;
	review: Review;
}> = ({ isOpen, onClose, review }) => {
	const MIN_TEXT = 200;

	const [isReportSuccessModalOpen, setIsReportSuccessModalOpen] =
		useState(false);

	const [reportText, setReportText] = useState("");

	const [sendReport] = useSendReportMutation();
	const handleReviewChange = useCallback(
		(event: React.ChangeEvent<HTMLTextAreaElement>) => {
			setReportText(event.target.value);
		},
		[setReportText],
	);

	const handleCloseReportModal = useCallback(() => {
		onClose();
		setReportText("");
	}, [onClose, setReportText]);

	const handleSubmit = useCallback(async () => {
		const response = await sendReport({
			reason: reportText,
			reviewId: review.id,
			reviewType: "company",
		});
		handleCloseReportModal();
		if (response.data) {
			setIsReportSuccessModalOpen(true);
		}
	}, [reportText, review.id, sendReport, handleCloseReportModal]);

	const handleCloseReportSuccessModal = useCallback(() => {
		setIsReportSuccessModalOpen(false);
	}, [setIsReportSuccessModalOpen]);

	return (
		<>
			<Modal
				isOpen={isOpen}
				onClose={handleCloseReportModal}
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
			<ReportSuccessModal
				isOpen={isReportSuccessModalOpen}
				onClose={handleCloseReportSuccessModal}
			/>
		</>
	);
};

export { ReportModal };
