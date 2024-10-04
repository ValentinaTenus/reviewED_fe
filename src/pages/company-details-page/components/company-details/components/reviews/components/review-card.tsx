import { Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { AuthorAvatar, Icon } from "~/common/components";
import { IconName } from "~/common/enums";
import { Review } from "~/common/types";
import globalStyles from "~/pages/company-details-page/components/company-details/styles.module.scss";
import {
	useLikeReviewMutation,
	useUnlikeReviewMutation,
} from "~/redux/reviews/reviews-companies-api";

import { ReportModal } from "./components/report-modal";
import { ShareModal } from "./components/share-modal";
import styles from "./styles.module.scss";

const ReviewCard: React.FC<{
	review: Review;
}> = ({ review }) => {
	const RATING_SCALE = 1.0;
	const ONE = 1;

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

	const [likesCount, setLikesCount] = useState(review.count_likes);
	const [isLiked, setIsLiked] = useState(false);

	const [likeReview] = useLikeReviewMutation();
	const [unlikeReview] = useUnlikeReviewMutation();

	useEffect(() => {
		const likedReviews = JSON.parse(
			localStorage.getItem("likedReviews") || "[]",
		);
		setIsLiked(likedReviews.includes(review.id));
	}, [review.id]);

	const handleLike = async () => {
		try {
			await likeReview({ reviewId: review.id }).unwrap();
			setLikesCount((prevCount) => prevCount + ONE);
			setIsLiked(true);
			const likedReviews = JSON.parse(
				localStorage.getItem("likedReviews") || "[]",
			);
			localStorage.setItem(
				"likedReviews",
				JSON.stringify([...likedReviews, review.id]),
			);
		} catch {
			await unlikeReview({ reviewId: review.id }).unwrap();
			setLikesCount((prevCount) => prevCount - ONE);
			setIsLiked(false);
			const likedReviews = JSON.parse(
				localStorage.getItem("likedReviews") || "[]",
			);
			localStorage.setItem(
				"likedReviews",
				JSON.stringify(likedReviews.filter((id: number) => id !== review.id)),
			);
		}
	};

	return (
		<>
			<div className={styles["review_top"]}>
				<div className={styles["review_profile"]}>
					<AuthorAvatar
						className={styles["review_avatar"]}
						name={review.author_name}
						src={review.author_avatar}
					/>
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
					<Link
						className={styles["review_icon-text"]}
						onClick={handleLike}
						to="#"
					>
						<Icon
							className={`${styles["review_like"]} ${isLiked ? styles["liked"] : ""}`}
							name={IconName.LIKE}
						/>
						<span className={globalStyles["small_r"]}>{likesCount}</span>
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
