import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Icon } from "~/common/components";
import { AppRoute, ButtonSize, ButtonVariant, IconName } from "~/common/enums";
import { type CourseReview } from "~/common/types";
import { useAppSelector } from "~/redux/hooks.type";

import { ReportModal } from "./components/report-modal";
import styles from "./styles.module.scss";

type ReviewFooterProperties = {
	review: CourseReview;
};

const ReviewFooter: React.FC<ReviewFooterProperties> = ({ review }) => {
	const navigate = useNavigate();

	const isUserInAccount = useAppSelector((state) => state.auth.user);

	const [isReportModalOpen, setIsReportModalOpen] = useState(false);

	const handleOpenReportModal = () => {
		if (isUserInAccount === null) navigate(AppRoute.AUTH);
		else setIsReportModalOpen(true);
	};

	const handleCloseReportModal = () => {
		setIsReportModalOpen(false);
	};

	return (
		<div className={styles["review__footer"]}>
			<Button
				className={styles["footer__button"]}
				onClick={handleOpenReportModal}
				prependedIcon={
					<Icon className={styles["footer__icon"]} name={IconName.FLAG} />
				}
				size={ButtonSize.SMALL}
				variant={ButtonVariant.DEFAULT}
			>
				Поскаржитися
			</Button>
			<ReportModal
				isOpen={isReportModalOpen}
				onClose={handleCloseReportModal}
				review={review}
			/>
			<aside className={styles["footer__button-container"]}>
				<Button
					className={styles["footer__button"]}
					prependedIcon={
						<Icon className={styles["footer__icon"]} name={IconName.SHARE} />
					}
					size={ButtonSize.SMALL}
					variant={ButtonVariant.DEFAULT}
				>
					Поділитися
				</Button>
				<Button
					className={styles["footer__button"]}
					prependedIcon={
						<Icon className={styles["footer__icon"]} name={IconName.LIKE} />
					}
					size={ButtonSize.SMALL}
					variant={ButtonVariant.DEFAULT}
				>
					{review.count_likes}
				</Button>
			</aside>
		</div>
	);
};

export { ReviewFooter };
