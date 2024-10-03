import { Rating } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Icon } from "~/common/components";
import { IconName } from "~/common/enums";
import { Review } from "~/common/types";
import globalStyles from "~/pages/company-details-page/components/company-details/styles.module.scss";

import { ReportModal } from "./components/report-modal";
import { ShareModal } from "./components/share-modal";
import styles from "./styles.module.scss";

const ReviewCard: React.FC<{
	review: Review;
}> = ({ review }) => {
	const RATING_SCALE = 1.0;

	const [isReportModalOpen, setIsReportModalOpen] = useState(false);

	const handleOpenReportModal = () => {
		setIsReportModalOpen(true);
	};

	const handleCloseReportModal = () => {
		setIsReportModalOpen(false);
	};

	const [isShareModalOpen, setIsShareModalOpen] = useState(false);

	const handleOpenShareModal = () => {
		setIsShareModalOpen(true);
	};

	const handleCloseShareModal = () => {
		setIsShareModalOpen(false);
	};

	return (
		<>
			<div className={styles["review_top"]}>
				<div className={styles["review_profile"]}>
					<div className={styles["review_profile-info"]}>
						<div className={styles["review_profile-name-verified"]}>
							<span className={globalStyles["large_sb"]}>
								{review.author_name}
							</span>
							<div
								className={`${globalStyles["_verified"]} ${styles["desktop_verified"]}`}
							>
								<Icon
									className={globalStyles["_shield"]}
									name={IconName.SHIELD_TICK}
								/>
								<span className={globalStyles["_verified-span"]}>
									Verified Via LinkedIn
								</span>
							</div>
						</div>
						<span className={globalStyles["small_r"]}>Студент</span>
					</div>
				</div>
				<div className={styles["review_top-right"]}>
					<span
						className={`${styles["review_date"]} ${globalStyles["small_r"]}`}
					>
						Дата відгуку
					</span>
					<div
						className={`${globalStyles["rating"]} ${styles["review_phone-rating"]}`}
					>
						<div className={styles["rating_stars"]}>
							<Rating
								name="half-rating-read"
								precision={0.5}
								readOnly
								value={review.rating}
							/>
						</div>
						<Icon className={styles["review_star"]} name={IconName.STAR} />
						<span className={styles["review_rating"]}>
							({(review?.rating / RATING_SCALE).toFixed(RATING_SCALE)})
						</span>
					</div>
				</div>
			</div>
			<div
				className={`${globalStyles["_verified"]} ${styles["phone_verified"]}`}
			>
				<Icon className={globalStyles["_shield"]} name={IconName.SHIELD_TICK} />
				<span
					className={`${globalStyles["_verified-span"]} ${styles["phone_verified-span"]}`}
				>
					Verified Via LinkedIn
				</span>
			</div>
			<p className={`${styles["review_text"]} ${globalStyles["body_r"]}`}>
				{review.text}
			</p>
			<div className={styles["review_bottom"]}>
				<Link
					className={styles["review_icon-text"]}
					onClick={handleOpenReportModal}
					to="#"
				>
					<Icon className={styles["review_flag"]} name={IconName.FLAG} />
					<span className={globalStyles["small_r"]}>Report</span>
				</Link>
				<div className={styles["review_share-like"]}>
					<Link
						className={styles["review_icon-text"]}
						onClick={handleOpenShareModal}
						to="#"
					>
						<Icon className={styles["review_share"]} name={IconName.SHARE} />
						<span className={globalStyles["small_r"]}>Share</span>
					</Link>
					<Link className={styles["review_icon-text"]} to="#">
						<Icon className={styles["review_like"]} name={IconName.LIKE} />
						<span className={globalStyles["small_r"]}>
							{review.count_likes}
						</span>
					</Link>
				</div>
			</div>
			<ReportModal
				isOpen={isReportModalOpen}
				onClose={handleCloseReportModal}
				review={review}
			/>
			<ShareModal
				isOpen={isShareModalOpen}
				onClose={handleCloseShareModal}
				review={review}
			/>
		</>
	);
};

export { ReviewCard };
