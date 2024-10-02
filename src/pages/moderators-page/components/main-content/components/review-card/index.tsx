import clsx from "clsx";
import React, { useCallback, useState } from "react";

import { Button, Logo, StarRating } from "~/common/components";
import {
	ButtonSize,
	ButtonType,
	ButtonVariant,
	ModerationReviewStatus,
	RatingSize,
	StarRatingVariant,
} from "~/common/enums";
import { useTransformDate } from "~/common/hooks";
import {
	ModerationReviews,
	SetModerationReviewsStatusRequest,
} from "~/common/types/review/index";
import { useLazySetReviewsModerationStatusQuery } from "~/redux/reviews-moderation/reviews-moderation-api";

import style from "./styles.module.scss";

type ReviewModeratorsCardProps = {
	onUpdateModeratorsReviews: () => Promise<void>;
	review: ModerationReviews;
};

const INDEX_ZERO = 0;

const ReviewModeratorsCard: React.FC<ReviewModeratorsCardProps> = ({
	onUpdateModeratorsReviews,
	review,
}) => {
	const [isTruncated, setIsTruncated] = useState(true);
	const { formattedDate, formattedTime } = useTransformDate(review.time_added);

	const [setReviewStatus] = useLazySetReviewsModerationStatusQuery();

	const transformedReviewType = review.type.split("_")[INDEX_ZERO];

	const handleSetApproveReviewStatus = useCallback(async () => {
		const result = await setReviewStatus({
			id: review.id.toString(),
			status: "approved",
			type: transformedReviewType as SetModerationReviewsStatusRequest["type"],
		});
		if (result.data) onUpdateModeratorsReviews();
	}, [
		review.id,
		transformedReviewType,
		setReviewStatus,
		onUpdateModeratorsReviews,
	]);

	const handleSetRejectReviewStatus = useCallback(async () => {
		const result = await setReviewStatus({
			id: review.id.toString(),
			status: "rejected",
			type: transformedReviewType as SetModerationReviewsStatusRequest["type"],
		});
		if (result.data) onUpdateModeratorsReviews();
	}, [
		review.id,
		transformedReviewType,
		setReviewStatus,
		onUpdateModeratorsReviews,
	]);

	const handleTruncatedText = () => setIsTruncated(!isTruncated);

	return (
		<div>
			<div className={style.card}>
				<div
					className={clsx(style["card__state"], [
						style[`card__state--${review.status}`],
					])}
				>
					{
						ModerationReviewStatus[
							review.status as keyof typeof ModerationReviewStatus
						]
					}
				</div>
				<div className={style.info}>
					<p className={style["info__UID-text"]}>
						UID відгуку:{" "}
						<span className={style["info__UID-number"]}>{review.id}</span>
					</p>
					<div className={style["info__links"]}>
						<p className={style["info__link-text"]}>
							Профіль Linkedin:
							<a
								className={style["info__link"]}
								href={review.author_profile_link}
								rel="noreferrer"
								target="_blank"
							>
								{" "}
								{review.author_profile_link}
							</a>
						</p>
						<p className={style["info__link-text"]}>
							email:
							<a className={style["info__link"]} href="#">
								{" "}
								{review.author_email}
							</a>
						</p>
					</div>
				</div>
				<div className={clsx(style["card__title"], style["title"])}>
					<Logo
						className={style["title__img"]}
						logo={review.logo}
						name={review.related_entity_name}
					/>
					<h4 className={style["title__text"]}>{review.related_entity_name}</h4>
					<div className={style["title__stars"]}>
						<StarRating
							averageRating={review.avg_rating}
							className={style["rating_block"]}
							classNameStarsBlock={style["stars_block"]}
							variant={StarRatingVariant.SMALL_CARD}
						/>
					</div>
				</div>
				<div className={clsx(style["content"], style["card__content"])}>
					<div className={style["content__info"]}>
						<div className={style["content__date"]}>
							{formattedDate},{" "}
							<span className={style["content__time"]}>{formattedTime}</span>
						</div>
						<StarRating
							averageRating={review.rating}
							className={style["rating_block_big"]}
							classNameStarsBlock={style["stars_block_big"]}
							size={RatingSize.MEDIUM}
							variant={StarRatingVariant.SMALL_CARD}
						/>
					</div>
					<p
						className={clsx(style["content__text"], {
							[style["content__text--truncated"]]: isTruncated,
						})}
					>
						{review.text}
					</p>
					<button
						className={style["content__text_button"]}
						onClick={handleTruncatedText}
					>
						{!isTruncated ? "Приховати" : "Показати повністю"}
					</button>
				</div>
				<div className={style["card__buttons"]}>
					{(review.status === "pending" || review.status === "rejected") && (
						<Button
							className={style["button_fixed"]}
							isFullWidth
							onClick={handleSetApproveReviewStatus}
							size={ButtonSize.SMALL}
							type={ButtonType.BUTTON}
							variant={ButtonVariant.PRIMARY}
						>
							Опубліковати
						</Button>
					)}
					{(review.status === "approved" || review.status === "pending") && (
						<Button
							className={style["button_fixed"]}
							isFullWidth
							onClick={handleSetRejectReviewStatus}
							size={ButtonSize.SMALL}
							type={ButtonType.BUTTON}
							variant={ButtonVariant.OUTLINED}
						>
							Зняти з публікації
						</Button>
					)}
				</div>

				<div className="card__buttons" />
			</div>
		</div>
	);
};

export { ReviewModeratorsCard };
