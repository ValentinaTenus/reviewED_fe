import React from "react";

import { Button, Icon, StarRating } from "~/common/components/index";
import { ScreenBreakpoints } from "~/common/constants/index";
import { ButtonVariant, IconName, RatingSize } from "~/common/enums/index";
import { GetCompanyAndCourseReviewsByUserIdResponse } from "~/common/types/index";

import styles from "./styles.module.scss";

type ReviewCardProperties = {
	screenWidth: number;
	userReview: GetCompanyAndCourseReviewsByUserIdResponse;
};

const ReviewCard: React.FC<ReviewCardProperties> = ({
	screenWidth,
	userReview,
}) => {
	return (
		<div className={styles["review_card__container"]}>
			<div className={styles["review_card__content"]}>
				<div className={styles["review_card__header"]}>
					<div className={styles["review_card__user_data"]}>
						<img
							alt={userReview.related_entity_name}
							className={styles["review_card__user_avatar"]}
							src={userReview.logo}
						/>
						<div className={styles["review_card__user_info"]}>
							<div className={styles["review_card__user_name"]}>
								<p className={styles["review_card__name"]}>
									{userReview.user_name}
								</p>
								<Icon
									className={styles["review_card__shield_icon"]}
									name={IconName.SHIELD_TICK}
								/>
							</div>
							<p className={styles["review_card__user_status"]}>student</p>
						</div>
					</div>
					<div className={styles["review_card__date_and_rating"]}>
						<StarRating
							averageRating={userReview.rating}
							isNumberShown={screenWidth < ScreenBreakpoints.TABLET}
							isOneStar={screenWidth < ScreenBreakpoints.TABLET}
							size={
								screenWidth < ScreenBreakpoints.TABLET
									? RatingSize.SMALL
									: RatingSize.MEDIUM
							}
						/>
						<span className={styles["review_card__date"]}>
							{userReview.time_added}
						</span>
					</div>
				</div>
				<div className={styles["review_card__text"]}>
					{userReview.short_description}
				</div>
			</div>
			<Button
				className={styles["review_card__button"]}
				variant={ButtonVariant.OUTLINED}
			>
				Читати більше
			</Button>
		</div>
	);
};

export { ReviewCard };
