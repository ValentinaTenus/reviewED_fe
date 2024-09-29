import { Rating } from "@mui/material";
import React from "react";

import { Company } from "~/common/types";
import globalStyles from "~/pages/company-details-page/components/company-details/styles.module.scss";

import styles from "./styles.module.scss";

const TitleLogo: React.FC<{
	company: Company;
}> = ({ company }) => {
	if (company) {
		const RATING_SCALE = 1.0;

		const companyImage = `https://reviewed-api.azurewebsites.net/api/v1/companies/upload/${company.logo}`;
		const formattedRating = (company.avg_overall_rating / RATING_SCALE).toFixed(
			RATING_SCALE,
		);

		return (
			<>
				<div className={styles["title-logo_container"]}>
					<div className={styles["logo_container"]}>
						<img
							alt={companyImage}
							className={styles["logo_image"]}
							src={companyImage}
						/>
					</div>
					<div className={styles["title-rating_container"]}>
						<p className={styles["title"]}>{company.name}</p>
						<div className={globalStyles["rating"]}>
							<Rating
								name="half-rating-read"
								precision={0.5}
								readOnly
								value={company?.avg_overall_rating}
							/>
							<span>({formattedRating})</span>
						</div>
					</div>
				</div>
			</>
		);
	}
};

export { TitleLogo };
