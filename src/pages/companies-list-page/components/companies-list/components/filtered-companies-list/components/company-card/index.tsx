import React from "react";

import DefaultCompanyImage from "~/assets/images/default-company-image.png";
import ShieldTick from "~/assets/images/shield-tick.svg?react";
import { Rating } from "~/common/components/index";
import { ScreenBreakpoints } from "~/common/constants/index";
import { Company } from "~/common/types/index";

import styles from "./styles.module.scss";

type CompanyCardProperties = {
	company: Company;
};

const CompanyCard: React.FC<CompanyCardProperties> = ({ company }) => {
	const screenWidth = window.innerWidth;

	return (
		<div className={styles["company_card__container"]} key={company.id}>
			<div className={styles["company_card__logo_container"]}>
				<img
					alt={company.name}
					className={styles["company_card__company_logo"]}
					src={DefaultCompanyImage}
				/>
				<div className={styles["company_card__rating_container"]}>
					<Rating
						averageRating={company.average_rating}
						isOneStar={screenWidth < ScreenBreakpoints.DESKTOP}
					/>
					<p className={styles["company_card__courses_amount"]}>10 courses</p>
				</div>
			</div>

			<div className={styles["company_card__name_container"]}>
				<h4 className={styles["company_card__company_name"]}>{company.name}</h4>
				<div className={styles["company_card__reviews_container"]}>
					<span className={styles["company_card__reviews_text"]}>
						100 Reviews
					</span>
					<ShieldTick className={styles["company_card__reviews_icon"]} />
				</div>
			</div>
		</div>
	);
};

export { CompanyCard };
