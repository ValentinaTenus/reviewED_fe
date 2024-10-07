import React from "react";
import { Link } from "react-router-dom";

import { Logo, StarRating } from "~/common/components/index";
import { AppRoute, RatingSize, StarRatingVariant } from "~/common/enums/index";
import { Company } from "~/common/types/index";

import styles from "./styles.module.scss";

type CompanyCardProperties = {
	company: Company;
};

const CompanyCard: React.FC<CompanyCardProperties> = ({ company }) => {
	return (
		<Link
			className={styles["item_card"]}
			key={company.id}
			to={AppRoute.COMPANY_DETAILS.replace(":companyId", company.id.toString())}
		>
			<div className={styles["item_rating_container"]}>
				<p className={styles["reviews_amount"]}>
					{company.total_reviews_count} відгуків
				</p>
				<StarRating
					averageRating={company.avg_overall_rating}
					size={RatingSize.SMALL}
					variant={StarRatingVariant.SMALL_CARD}
				/>
			</div>
			<div className={styles["item_logo_container"]}>
				<Logo
					className={styles["company_logo"]}
					logo={company.logo}
					name={company.name}
				/>
				<h4 className={styles["item_name"]}>{company.name}</h4>
			</div>
		</Link>
	);
};

export { CompanyCard };
