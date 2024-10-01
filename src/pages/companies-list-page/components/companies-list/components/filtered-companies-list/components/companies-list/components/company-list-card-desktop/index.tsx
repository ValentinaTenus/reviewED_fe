import React from "react";
import { Link } from "react-router-dom";

import ShieldTick from "~/assets/images/shield-tick.svg?react";
import { DefaultAvatar, StarRating } from "~/common/components/index";
import { IMAGE_UPLOAD_URL, LOGO_NONE } from "~/common/constants/index";
import { AppRoute, RatingSize } from "~/common/enums/index";
import { Company } from "~/common/types/index";

import styles from "./styles.module.scss";

type Properties = {
	company: Company;
};

const CompanyListCardDesktop: React.FC<Properties> = ({ company }) => {
	return (
		<Link
			className={styles["company_list_card__container"]}
			to={`${AppRoute.COMPANY_DETAILS}${company.id}`}
		>
			<div className={styles["company_list_card__title"]}>
				{company.logo !== LOGO_NONE ? (
					<img
						alt={`${company.name} logo`}
						className={styles["company_list_card__logo"]}
						src={`${IMAGE_UPLOAD_URL}${company.logo}`}
					/>
				) : (
					<DefaultAvatar
						className={styles["company_list_card__logo"]}
						name={company.name}
					/>
				)}

				<span className={styles["company_list_card__name"]}>
					{company.name}
				</span>
			</div>

			<div className={styles["company_list_card__total_courses"]}>
				{company.total_courses} курсів
			</div>

			<div className={styles["company_list_card__reviews_container"]}>
				<div className={styles["company_list_card__reviews"]}>
					<div className={styles["company_list_card__reviewer_avatars"]} />
					<span className={styles["company_list_card__review_amount"]}>
						{company.total_reviews_count} відгуків
					</span>
				</div>
				<ShieldTick className={styles["company_list_card__review_icon"]} />
			</div>

			<StarRating
				averageRating={company.avg_overall_rating}
				size={RatingSize.LARGE}
			/>
		</Link>
	);
};

export { CompanyListCardDesktop };
