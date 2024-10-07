import React from "react";
import { Link } from "react-router-dom";

import ShieldTick from "~/assets/images/shield-tick.svg?react";
import { AvatarGroup, Logo, StarRating } from "~/common/components/index";
import { AppRoute, RatingSize } from "~/common/enums/index";
import { Company } from "~/common/types/index";
import { useGetReviewsByCompanyIdQuery } from "~/redux/reviews/reviews-companies-api";

import styles from "./styles.module.scss";

type Properties = {
	company: Company;
};

const CompanyListCardDesktop: React.FC<Properties> = ({ company }) => {
	const { data: companyReviews } = useGetReviewsByCompanyIdQuery(
		company.id.toString(),
	);
	const avatars = companyReviews?.map((review) => review.author_avatar) ?? [];
	return (
		<Link
			className={styles["company_list_card__container"]}
			to={AppRoute.COMPANY_DETAILS.replace(":companyId", company.id.toString())}
		>
			<div className={styles["company_list_card__title"]}>
				<Logo
					className={styles["company_list_card__logo"]}
					logo={company.logo}
					name={company.name}
				/>
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
					<AvatarGroup avatars={avatars} />
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
