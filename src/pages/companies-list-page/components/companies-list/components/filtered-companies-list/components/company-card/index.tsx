import React from "react";
import { Link } from "react-router-dom";

import ShieldTick from "~/assets/images/shield-tick.svg?react";
import { Logo, StarRating } from "~/common/components/index";
import { ScreenBreakpoints } from "~/common/constants/index";
import { AppRoute, RatingSize } from "~/common/enums/index";
import { useGetScreenWidth } from "~/common/hooks";
import { Company } from "~/common/types/index";

import styles from "./styles.module.scss";

type CompanyCardProperties = {
	company: Company;
};

const CompanyCard: React.FC<CompanyCardProperties> = ({ company }) => {
	const screenWidth = useGetScreenWidth();

	return (
		<Link
			className={styles["company_card__container"]}
			key={company.id}
			to={AppRoute.COMPANY_DETAILS.replace(":companyId", company.id.toString())}
		>
			<div className={styles["company_card__logo_container"]}>
				<Logo
					className={styles["company_card__company_logo"]}
					logo={company.logo}
					name={company.name}
				/>
				<div className={styles["company_card__rating_container"]}>
					<StarRating
						averageRating={company.avg_overall_rating}
						isOneStar={screenWidth < ScreenBreakpoints.DESKTOP}
						size={RatingSize.MEDIUM}
					/>
					<p className={styles["company_card__courses_amount"]}>
						{company.total_courses} курсів
					</p>
				</div>
			</div>

			<div className={styles["company_card__name_container"]}>
				<h4 className={styles["company_card__company_name"]}>{company.name}</h4>
				<div className={styles["company_card__reviews_container"]}>
					<span className={styles["company_card__reviews_text"]}>
						{company.total_reviews_count} Відгуків
					</span>
					<ShieldTick className={styles["company_card__reviews_icon"]} />
				</div>
			</div>
		</Link>
	);
};

export { CompanyCard };
