import { Rating } from "@mui/material";
import React, { useState } from "react";

import { Button, Icon } from "~/common/components";
import { ButtonVariant, IconName } from "~/common/enums";
import { Company } from "~/common/types";
import globalStyles from "~/pages/company-details-page/components/company-details/styles.module.scss";

import styles from "./styles.module.scss";

const Statistics: React.FC<{
	company: Company;
	reviewsCount: {
		[key: number]: number;
	};
}> = ({ company, reviewsCount }) => {
	const STARS_AMOUNT = 5;
	const ONE = 1;
	const ZERO = 0;
	const HUNDRED = 100;

	const [isVisible, setIsVisible] = useState(false);

	const handleToggleVisibility = () => {
		setIsVisible(!isVisible);
	};

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
							{company.avg_rating}
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
						{Array.from({ length: 6 }, (_, i) => STARS_AMOUNT - i).map(
							(number) => (
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
											width: `${((reviewsCount[number] || ZERO) / (company.review_count || ONE)) * HUNDRED}%`,
										}}
									/>
									<span className="reviews-count">
										{reviewsCount[number] || ZERO}
									</span>
								</li>
							),
						)}
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
							{company.avg_overall_rating}
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
			<Button variant={ButtonVariant.PRIMARY}>Написати відгук</Button>
		</div>
	);
};

export { Statistics };
