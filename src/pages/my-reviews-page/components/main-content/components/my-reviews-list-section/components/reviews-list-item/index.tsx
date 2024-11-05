import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";

import { Icon, Logo, StarRating } from "~/common/components/index";
import { IconName } from "~/common/enums/index";
import { useTransformDate } from "~/common/hooks";
import { MyReview, MyReviewCategory } from "~/common/types/my-reviews";

import {
	ActionIconsPanel,
	MoreOptions,
	ReviewStatus,
	ReviewTextSection,
} from "../";
import styles from "./styles.module.scss";

const SINGLE_COURSE = 1;
const MIN_PLURAL_COURSE = 2;
const MAX_PLURAL_COURSE = 4;

const getCourseLabel = (count: number, word: string) => {
	if (count === SINGLE_COURSE) {
		return `${count} ${word}`;
	} else if (count >= MIN_PLURAL_COURSE && count <= MAX_PLURAL_COURSE) {
		return `${count} ${word}и`;
	} else {
		return `${count} ${word}ів`;
	}
};

interface Properties {
	category: MyReviewCategory;
	openModal: (currentModal: string, entityId: number) => void;
	review: MyReview;
}

const ReviewListItem: React.FC<Properties> = ({
	category,
	openModal,
	review,
}) => {
	const { formattedDate } = useTransformDate(review.time_added);
	const isCategoryCourse = category === "course";

	return (
		<li className={styles["review-item"]}>
			<div
				className={clsx(
					styles["review-more-options"],
					styles["review-item__elem"],
				)}
			>
				<MoreOptions isForTablet openModal={openModal} reviewId={review.id} />
			</div>

			<div className={clsx(styles["review-info"], styles["review-item__elem"])}>
				<div className={styles["review-info__inner"]}>
					<div
						className={clsx(styles["review-info__top"], {
							[styles["review-info__top--course"]]: isCategoryCourse,
						})}
					>
						<div
							className={clsx(styles["review-info__logo-wrapper"], {
								[styles["review-info__logo-wrapper--course"]]: isCategoryCourse,
							})}
						>
							<Logo
								className={styles["review-info__logo"]}
								logo={review.logo}
								name={review.related_entity_name}
							/>
						</div>
						<div className={styles["review-info__top-content"]}>
							<h3 className={styles["review-info__top-name"]}>
								{review.related_entity_name}
							</h3>

							{!isCategoryCourse && (
								<div className={clsx(styles["review-info__top-details"])}>
									<p className={styles["reviews-count"]}>
										Відгуків: <span>{review.company_reviews_count}</span>
									</p>
									<p className={styles["courses-count"]}>
										Курсів: <span>{review.total_courses_count}</span>
									</p>
									<p className={styles["reviews-count-mobile"]}>
										{getCourseLabel(review.company_reviews_count, "відгук")}
									</p>
								</div>
							)}
						</div>
					</div>

					<div className={clsx(styles["review-info__bottom"])}>
						<p
							className={clsx(styles["review-info__bottom-reviews"], {
								[styles["review-info__bottom-reviews--course"]]:
									isCategoryCourse,
							})}
						>
							{getCourseLabel(review.total_courses_count, "курс")}
						</p>

						<div
							className={clsx(styles["review-info__bottom-author"], {
								[styles["review-info__bottom-author--course"]]:
									isCategoryCourse,
							})}
						>
							<span>Від</span>{" "}
							<Link to={`/company-details/${review.company_id}`}>
								{review.company_name}
							</Link>
						</div>

						<div className={clsx(styles["review-info__bottom-status"])}>
							<ReviewStatus status={review.status} />
						</div>
					</div>
				</div>
			</div>

			<div
				className={clsx(styles["review-content"], styles["review-item__elem"])}
			>
				<div className={styles["review-content__inner"]}>
					<div className={styles["review-content__top"]}>
						<div className={styles["review-content__metadata"]}>
							<StarRating averageRating={review.rating} isNumberShown={false} />
							<span>ID відгуку:</span>
							{review.id}
						</div>

						<div className={styles["review-content__date"]}>
							{formattedDate.replace(/\s+/g, "")}
						</div>
					</div>

					<ReviewTextSection
						id={review.id}
						likesCount={review.likes_count}
						openModal={openModal}
						text={review.text}
					/>
				</div>
			</div>

			<div
				className={clsx(styles["review-status"], styles["review-item__elem"])}
			>
				<div className={clsx(styles["review-status__status"])}>
					<ReviewStatus status={review.status} />

					<div className={styles["review-status__more-options"]}>
						{review.status === "removed" && (
							<div className={styles["icon-warning"]}>
								<Icon name={IconName.WARNING} />
							</div>
						)}

						<MoreOptions openModal={openModal} reviewId={review.id} />
					</div>
				</div>

				<div className={styles["review-status__actions"]}>
					<ActionIconsPanel
						likesCount={review.likes_count}
						openModal={openModal}
						reviewId={review.id}
						showEditIcon
					/>
				</div>
			</div>
		</li>
	);
};

export { ReviewListItem };
