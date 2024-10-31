import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Icon, ShareModal } from "~/common/components";
import { AppRoute, ButtonSize, ButtonVariant, IconName } from "~/common/enums";
import { type CourseReview } from "~/common/types";
import { useAppDispatch, useAppSelector } from "~/redux/hooks.type";
import {
	useLikeReviewMutation,
	useUnlikeReviewMutation,
} from "~/redux/reviews/reviews-course-api";
import {
	likeCourseReview,
	unlikeCourseReview,
} from "~/redux/reviews/reviews-slice";

import { ReportModal } from "./components/report-modal";
import styles from "./styles.module.scss";

type ReviewFooterProperties = {
	review: CourseReview;
};

const ONE = 1;

const ReviewFooter: React.FC<ReviewFooterProperties> = ({ review }) => {
	const navigate = useNavigate();

	const dispatch = useAppDispatch();

	const isUserInAccount = useAppSelector((state) => state.auth.user);

	const [isReportModalOpen, setIsReportModalOpen] = useState(false);

	const handleOpenReportModal = () => {
		if (isUserInAccount === null) navigate(AppRoute.AUTH);
		else setIsReportModalOpen(true);
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

	const userLikedCompanyReviews = useAppSelector(
		(state) => state.reviews.userLikedCompanyReviews,
	);

	useEffect(() => {
		if (userLikedCompanyReviews) {
			setIsLiked(userLikedCompanyReviews.includes(review.id));
		}
	}, [userLikedCompanyReviews, review.id]);

	const handleLike = async () => {
		if (isUserInAccount === null) navigate(AppRoute.AUTH);
		else {
			try {
				await likeReview({ reviewId: review.id }).unwrap();
				setLikesCount((prevCount) => prevCount + ONE);
				setIsLiked(true);
				dispatch(likeCourseReview(review.id));
			} catch {
				await unlikeReview({ reviewId: review.id }).unwrap();
				setLikesCount((prevCount) => prevCount - ONE);
				setIsLiked(false);
				dispatch(unlikeCourseReview(review.id));
			}
		}
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
				<p
					className={`${styles["footer__text"]} ${styles["footer__text_hoverable"]}`}
				>
					Поскаржитися
				</p>
			</Button>
			<ReportModal
				isOpen={isReportModalOpen}
				onClose={handleCloseReportModal}
				review={review}
			/>
			<aside className={styles["footer__button-container"]}>
				<Button
					className={styles["footer__button"]}
					onClick={handleOpenShareModal}
					prependedIcon={
						<Icon className={styles["footer__icon"]} name={IconName.SHARE} />
					}
					size={ButtonSize.SMALL}
					variant={ButtonVariant.DEFAULT}
				>
					<p
						className={`${styles["footer__text"]} ${styles["footer__text_hoverable"]}`}
					>
						Поділитися
					</p>
				</Button>
				<ShareModal
					isOpen={isShareModalOpen}
					onClose={handleCloseShareModal}
					reviewId={review.id}
					reviewType="course"
				/>
				<Button
					className={styles["footer__button"]}
					onClick={handleLike}
					prependedIcon={
						<Icon
							className={`${styles["footer__icon"]} ${styles["footer__like-icon"]} ${isLiked ? styles["liked"] : ""}`}
							name={IconName.LIKE}
						/>
					}
					size={ButtonSize.SMALL}
					variant={ButtonVariant.DEFAULT}
				>
					<p className={styles["footer__text"]}>{likesCount}</p>
				</Button>
			</aside>
		</div>
	);
};

export { ReviewFooter };
