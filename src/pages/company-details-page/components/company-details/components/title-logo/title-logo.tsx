import React from "react";

import { Logo, StarRating } from "~/common/components";
import { RatingSize, StarRatingVariant } from "~/common/enums";
import { GetCompanyByIdResponse } from "~/common/types/company";
import globalStyles from "~/pages/company-details-page/components/company-details/styles.module.scss";

import styles from "./styles.module.scss";

const TitleLogo: React.FC<{
	company: GetCompanyByIdResponse;
}> = ({ company }) => {
	if (company) {
		return (
			<>
				<div className={styles["title-logo_container"]}>
					<div className={styles["logo_container"]}>
						<Logo
							className={styles["logo_image"]}
							logo={company.logo}
							name={company.name}
						/>
					</div>
					<div className={styles["title-rating_container"]}>
						<p className={styles["title"]}>{company.name}</p>

						<div className={globalStyles["rating"]}>
							<StarRating
								averageRating={company?.avg_rating}
								size={RatingSize.MEDIUM}
								variant={StarRatingVariant.DEFAULT}
							/>
						</div>
					</div>
				</div>
				<div className={styles["rating_mobile"]}>
					<StarRating
						averageRating={company?.avg_rating}
						size={RatingSize.LARGE}
						variant={StarRatingVariant.DEFAULT}
					/>
				</div>
			</>
		);
	}
};

export { TitleLogo };
