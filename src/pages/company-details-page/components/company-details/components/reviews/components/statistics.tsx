import clsx from "clsx";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Button, Icon, StarRating } from "~/common/components";
import { AppRoute, ButtonVariant, IconName, RatingSize } from "~/common/enums";
import { type GetCompanyByIdResponse, type ReviewsStats } from "~/common/types";
import globalStyles from "~/pages/company-details-page/components/company-details/styles.module.scss";
import { useAppSelector } from "~/redux/hooks.type";
import { useGetMyReviewsQuery } from "~/redux/my-reviews/my-reviews-api";

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

	const { user } = useAppSelector((state) => state.auth);
	const {
		data: companyReviewsByUser,
		refetch: refetchGetCompanyReviewsByUser,
	} = useGetMyReviewsQuery(
		{
			params: { limit: 10, offset: 0, type: "company" },
			userId: user?.id as number,
		},
		{
			skip: typeof user?.id !== "number",
		},
	);

	const navigate = useNavigate();

	const formattedRating = (company.avg_rating / ONE).toFixed(ONE);
	const formattedRatingOverall = (company.avg_overall_rating / ONE).toFixed(
		ONE,
	);
	const [isVisible, setIsVisible] = useState(false);
	const [isCompanyReviewedByUser, setIsCompanyReviewedByUser] = useState(false);
	const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

	const handleToggleVisibility = () => {
		setIsVisible(!isVisible);
	};

	const handleOpenReviewModal = useCallback(() => {
		if (user) {
			if (user.is_staff) {
				toast.error("Модератор не може залишати відгуки");
			}

			if (!isCompanyReviewedByUser) {
				setIsReviewModalOpen(true);
			} else {
				toast.error("Ви вже залишили відгук для цієї компанії");
			}
		} else {
			navigate(AppRoute.AUTH);
		}
	}, [navigate, isCompanyReviewedByUser, user]);

	const handleCloseReviewModal = useCallback(() => {
		setIsReviewModalOpen(false);
	}, []);

	const handleReviewSubmit = useCallback(() => {
		refetchGetCompanyReviewsByUser();
	}, [refetchGetCompanyReviewsByUser]);

	useEffect(() => {
		const isCompanyReviewedByUser = companyReviewsByUser?.results.find(
			(review) => review.related_entity_name === company.name,
		);

		if (isCompanyReviewedByUser) {
			setIsCompanyReviewedByUser(true);
		}
	}, [companyReviewsByUser?.results, company.name]);

	return (
		<div className={styles["reviews_stats-container"]}>
			<div className={styles["reviews_stats-card"]}>
				<div className={styles["reviews_stats-left"]}>
					<div className={styles["reviews_stats-total-amount"]}>
						<p
							className={clsx(
								globalStyles["p-sb"],
								styles["reviews_stats-title"],
							)}
						>
							Загальна кількість
						</p>
						<span className={globalStyles["stats_span"]}>
							{company.review_count}
						</span>
					</div>
					<div className={styles["reviews_stats-avg-rating"]}>
						<p className={globalStyles["p-sb"]}>Середній рейтинг</p>
						<div className={styles["reviews_stats-avg-rating-data"]}>
							<span className={globalStyles["stats_span"]}>
								{formattedRating}
							</span>
							<StarRating
								averageRating={company.avg_rating}
								isNumberShown={false}
								size={RatingSize.MEDIUM}
							/>
						</div>
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
					<ul className={styles["reviews_stats-right-list"]}>
						{STAR_RATING_VALUES.map((number) => (
							<li className={styles["amount-stars"]} key={number}>
								<div className={styles["amount-stars-content"]}>
									<div className={styles["amount-stars-content-icon"]}>
										<Icon
											className={styles["review_stats-star"]}
											name={IconName.STAR}
										/>
										<span
											className={`${globalStyles["p-sb"]} ${styles["stars-line"]}`}
										>
											{number}
										</span>
									</div>

									<div
										className={styles["line"]}
										style={{
											width: `${(reviewsCount[numberToStringMap[number]] / (company.review_count || ONE)) * HUNDRED}%`,
										}}
									/>
									<span className="reviews-count">
										{reviewsCount[numberToStringMap[number]]}
									</span>
								</div>
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
						<div className={styles["reviews_stats-avg-rating-data"]}>
							<span
								className={`${globalStyles["stats_span"]} ${styles["span_before-rating"]}`}
							>
								{formattedRatingOverall}
							</span>
							<StarRating
								averageRating={company.avg_rating}
								isNumberShown={false}
								size={RatingSize.MEDIUM}
							/>
						</div>
					</div>
				</div>
			</div>
			<Button
				className={styles["reviews-stats__button"]}
				onClick={handleOpenReviewModal}
				variant={ButtonVariant.PRIMARY}
			>
				Написати відгук
			</Button>
			{isReviewModalOpen && (
				<ReviewModal
					company={company}
					isOpen={isReviewModalOpen}
					onClose={handleCloseReviewModal}
					onReviewSubmit={handleReviewSubmit}
				/>
			)}
		</div>
	);
};

export { Statistics };
