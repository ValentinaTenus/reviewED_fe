import React from "react";
import { Link } from "react-router-dom";

import { Rating } from "~/common/components/index";
import { AppRoute } from "~/common/enums";
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
			to={`${AppRoute.COMPANY_DETAILS}${company.id}`}
		>
			<div className={styles["item_rating_container"]}>
				<p className={styles["reviews_amount"]}>56 відгуків</p>
				<Rating averageRating={company.average_rating} />
			</div>
			<div className={styles["item_logo_container"]}>
				<img
					alt={company.name}
					className={styles["company_logo"]}
					src={company.logo}
				/>
				<h4 className={styles["item_name"]}>{company.name}</h4>
			</div>
		</Link>
	);
};

export { CompanyCard };
