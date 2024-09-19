import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { Icon, IconButton, StarRating } from "~/common/components/index";
import { AppRoute, IconName, RatingSize } from "~/common/enums/index";
import { Company } from "~/common/types/index";

import styles from "./styles.module.scss";

type Properties = {
	company: Company;
};

const CompanyListCard: React.FC<Properties> = ({ company }) => {
	const navigate = useNavigate();

	const handleRedirect = useCallback(() => {
		navigate(`${AppRoute.COMPANY_DETAILS}${company.id}`);
	}, [company, navigate]);

	return (
		<div className={styles["company_list_card__container"]}>
			<div className={styles["company_list_card__header"]}>
				<div className={styles["company_list_card__logo_container"]}>
					<img
						alt={company.name}
						className={styles["company_list_card__logo"]}
						src={company.logo}
					/>
					<span className={styles["company_list_card__name"]}>
						{company.name}
					</span>
				</div>
				<IconButton onClick={handleRedirect}>
					<Icon
						className={styles["company_list_card__arrow"]}
						name={IconName.ARROW_RIGHT_WIDE}
					/>
				</IconButton>
			</div>

			<div className={styles["company_list_card__details"]}>
				<div className={styles["company_list_card__detail_item"]}>
					<span className={styles["company_list_card__detail_title"]}>
						Total courses:
					</span>
					<span className={styles["company_list_card__detail_value"]}>
						{company.total_courses}
					</span>
				</div>
				<div className={styles["company_list_card__detail_item"]}>
					<span className={styles["company_list_card__detail_title"]}>
						Reviews:
					</span>
					<div className={styles["company_list_card__reviews_details"]}>
						<Icon
							className={styles["company_list_card__reviews_icon"]}
							name={IconName.SHIELD_TICK}
						/>
						<span className={styles["company_list_card__detail_value"]}>
							{company.total_reviews_count} Reviews
						</span>
					</div>
				</div>
				<div className={styles["company_list_card__detail_item"]}>
					<span className={styles["company_list_card__detail_title"]}>
						Rating:
					</span>
					<StarRating
						averageRating={company.avg_overall_rating}
						className={styles["company_list_card__rating_stars"]}
						size={RatingSize.LARGE}
					/>
				</div>
			</div>
		</div>
	);
};

export { CompanyListCard };
