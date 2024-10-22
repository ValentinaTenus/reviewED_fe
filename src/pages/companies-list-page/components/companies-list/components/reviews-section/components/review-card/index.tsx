import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Button, Icon, StarRating } from "~/common/components/index";
import { IMAGE_UPLOAD_URL, ScreenBreakpoints } from "~/common/constants/index";
import {
	AppRoute,
	ButtonVariant,
	IconName,
	RatingSize,
} from "~/common/enums/index";
import { MyReview } from "~/common/types/my-reviews";
import { useAppSelector } from "~/redux/hooks.type";

import styles from "./styles.module.scss";

const FIRST_SYMBOL_INDEX = 0;
const MAX_LENGTH = 120;

type ReviewCardProperties = {
	screenWidth: number;
	userReview: MyReview;
};

const ReviewCard: React.FC<ReviewCardProperties> = ({
	screenWidth,
	userReview,
}) => {
	const { user } = useAppSelector((state) => state.auth);
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleExpand = () => {
		setIsExpanded((prevState) => !prevState);
	};

	const getTruncatedText = (text: string, limit: number) => {
		if (text?.length <= limit) return text;
		return `${text?.substring(FIRST_SYMBOL_INDEX, limit)}...`;
	};

	return (
		<div className={styles["review_card__container"]}>
			<div className={styles["review_card__content"]}>
				<div className={styles["review_card__header"]}>
					<div className={styles["review_card__user_data"]}>
						<img
							alt={userReview.related_entity_name}
							className={styles["review_card__user_avatar"]}
							src={user?.picture}
						/>
						<div className={styles["review_card__user_info"]}>
							<div className={styles["review_card__user_name"]}>
								<p className={styles["review_card__name"]}>{user?.full_name}</p>
								<Icon
									className={styles["review_card__shield_icon"]}
									name={IconName.SHIELD_TICK}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className={styles["review_card__text"]}>
					{isExpanded
						? userReview.text
						: getTruncatedText(userReview.text, MAX_LENGTH)}
				</div>
			</div>
			<div className={styles["review_card__logo_and_rating"]}>
				<Link
					className={styles["review_card__company_logo"]}
					to={AppRoute.COMPANY_DETAILS.replace(
						":companyId",
						userReview.company_id.toString(),
					)}
				>
					<img
						alt="Review company logo"
						className={styles["review_card__company_logo-image"]}
						src={`${IMAGE_UPLOAD_URL}${userReview.logo}`}
					/>
				</Link>
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
			<Button
				className={styles["review_card__button"]}
				onClick={toggleExpand}
				variant={ButtonVariant.OUTLINED}
			>
				{isExpanded ? "Сховати" : "Читати більше"}
			</Button>
		</div>
	);
};

export { ReviewCard };
