import { Alert, Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Icon } from "~/common/components";
import { AppRoute, ButtonVariant, IconName } from "~/common/enums";
import { type GetCompanyByIdResponse, type ReviewsStats } from "~/common/types";
import globalStyles from "~/pages/company-details-page/components/company-details/styles.module.scss";
import { useAppSelector } from "~/redux/hooks.type";

import { ReviewModal } from "./components/review-modal";
import styles from "./styles.module.scss";

const numberToStringMap: Record<number, keyof ReviewsStats> = {
	1: "one",
	2: "two",
	3: "three",
	4: "four",
	5: "five",
};
const STAR_RATING_LENGTH = 5;
const STAR_RATING_VALUES = Array.from(
	{ length: STAR_RATING_LENGTH },
	(_, index) => STAR_RATING_LENGTH - index,
);

const Statistics: React.FC<{
	company: GetCompanyByIdResponse;
	reviewsCount: ReviewsStats;
}> = ({ company, reviewsCount }) => {
	const HUNDRED = 100;
	const ONE = 1;
	const THREE_SECONDS = 3000;

	const navigate = useNavigate();

	const formattedRating = (company.avg_rating / ONE).toFixed(ONE);
	const formattedRatingOverall = (company.avg_overall_rating / ONE).toFixed(
		ONE,
	);

	const [isVisible, setIsVisible] = useState(false);

	const handleToggleVisibility = () => {
		setIsVisible(!isVisible);
	};

	const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

	const handleOpenReviewModal = () => {
		if (!isButtonInactive) setIsReviewModalOpen(true);
		else if (isUserInAccount !== null) setIsReviewed(true);
		else navigate(AppRoute.AUTH);
	};

	const handleCloseReviewModal = () => {
		setIsReviewModalOpen(false);
	};

	const [isButtonInactive, setIsButtonInactive] = useState(false);

	const userCompanyReviews = useAppSelector(
		(state) => state.reviews.userCompanyReviews,
	);

	const isUserInAccount = useAppSelector((state) => state.auth.user);

	useEffect(() => {
		if (userCompanyReviews.includes(company.id) || isUserInAccount === null) {
			setIsButtonInactive(true);
		} else {
			setIsButtonInactive(false);
		}
	}, [userCompanyReviews, isUserInAccount, company.id]);

	const [isReviewed, setIsReviewed] = useState(false);

	useEffect(() => {
		if (isReviewed) {
			const timer = setTimeout(() => {
				setIsReviewed(false);
			}, THREE_SECONDS);

			return () => clearTimeout(timer);
		}
	}, [isReviewed]);

	return (
		<div className={styles["reviews_stats-container"]}>
			<div className={styles["reviews_stats-card"]}>
				<div className={styles["reviews_stats-left"]}>
					<div className={styles["reviews_stats-total-amount"]}>
						<p className={globalStyles["p-sb"]}>Загальна кількість</p>
						<span className={globalStyles["stats_span"]}>
							{company.review_count}
						</span>
					</div>
					<div className={styles["reviews_stats-avg-rating"]}>
						<p className={globalStyles["p-sb"]}>Середній рейтинг</p>
						<span
							className={`${globalStyles["stats_span"]} ${styles["span_before-rating"]}`}
						>
							{formattedRating}
						</span>
						<Rating
							name="half-rating-read"
							precision={0.5}
							readOnly
							value={company.avg_rating}
						/>
					</div>
					<Button
						className={styles["see-more"]}
						onClick={handleToggleVisibility}
						variant={ButtonVariant.OUTLINED}
					>
						{isVisible ? "Сховати" : "Подивитись детальніше"}
					</Button>
				</div>
				<div
					className={`${styles["reviews_stats-right"]} ${
						isVisible ? styles["show"] : ""
					}`}
				>
					<ul>
						{STAR_RATING_VALUES.map((number) => (
							<li className={styles["amount-stars"]} key={number}>
								<Icon
									className={styles["review_stats-star"]}
									name={IconName.STAR}
								/>
								<span
									className={`${globalStyles["p-sb"]} ${styles["stars-line"]}`}
								>
									{number}
								</span>
								<div
									className={styles["line"]}
									style={{
										width: `${(reviewsCount[numberToStringMap[number]] / (company.review_count || ONE)) * HUNDRED}%`,
									}}
								/>
								<span className="reviews-count">
									{reviewsCount[numberToStringMap[number]]}
								</span>
							</li>
						))}
					</ul>
				</div>
			</div>
			<div
				className={`${styles["reviews_stats-card"]} ${styles["reviews_stats-card-col"]}`}
			>
				<h4 className={styles["reviews_stats-card-heading"]}>
					Загальний рейтинг компанії та її курсів
				</h4>
				<div className={styles["reviews_stats-bottom"]}>
					<div
						className={`${styles["reviews_stats-total-amount"]} ${styles["reviews_stats-total-amount-col"]}`}
					>
						<p className={globalStyles["p-sb"]}>Загальна кількість</p>
						<span className={globalStyles["stats_span"]}>
							{company.total_reviews_count}
						</span>
					</div>
					<div
						className={`${styles["reviews_stats-avg-rating"]} ${styles["reviews_stats-avg-rating-col"]}`}
					>
						<p className={globalStyles["p-sb"]}>Середній рейтинг</p>
						<span
							className={`${globalStyles["stats_span"]} ${styles["span_before-rating"]}`}
						>
							{formattedRatingOverall}
						</span>
						<Rating
							name="half-rating-read"
							precision={0.5}
							readOnly
							value={company.avg_rating}
						/>
					</div>
				</div>
			</div>
			<Button onClick={handleOpenReviewModal} variant={ButtonVariant.PRIMARY}>
				Написати відгук
			</Button>
			<ReviewModal
				company={company}
				isOpen={isReviewModalOpen}
				onClose={handleCloseReviewModal}
			/>
			{isReviewed && (
				<Alert className={styles["alert"]} severity="info" variant="filled">
					Ви вже залишили відгук для цієї компанії
				</Alert>
			)}
		</div>
	);
};

export { Statistics };
