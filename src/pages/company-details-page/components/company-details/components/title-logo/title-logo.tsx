import { Rating } from "@mui/material";
import React from "react";

import { Logo } from "~/common/components";
import { GetCompanyByIdResponse } from "~/common/types/company";
import globalStyles from "~/pages/company-details-page/components/company-details/styles.module.scss";

import styles from "./styles.module.scss";

const TitleLogo: React.FC<{
	company: GetCompanyByIdResponse;
}> = ({ company }) => {
	if (company) {
		const RATING_SCALE = 1.0;

		const formattedRating = (company.avg_rating / RATING_SCALE).toFixed(
			RATING_SCALE,
		);

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
							<Rating
								name="half-rating-read"
								precision={0.5}
								readOnly
								value={company?.avg_rating}
							/>
							<span>({formattedRating})</span>
						</div>
					</div>
				</div>
				<div className={styles["rating_mobile"]}>
					<Rating
						name="half-rating-read"
						precision={0.5}
						readOnly
						value={company?.avg_rating}
					/>
					<span>({formattedRating})</span>
				</div>
			</>
		);
	}
};

export { TitleLogo };
