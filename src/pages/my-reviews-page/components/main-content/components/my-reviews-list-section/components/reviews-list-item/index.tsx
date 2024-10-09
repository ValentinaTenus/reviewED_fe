import clsx from "clsx";
import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";

import { Icon, Logo, StarRating } from "~/common/components/index";
import { IconName } from "~/common/enums/index";
import { useTransformDate } from "~/common/hooks";
import {
	MyReview,
	MyReviewCategory,
	MyReviewOptions,
} from "~/common/types/my-reviews";

import {
	ActionsReviewModal,
	IconsSection,
	PopupMenu,
	ReviewTextSection,
} from "../";
import styles from "./styles.module.scss";

const MY_REVIEW_OPTIONS: MyReviewOptions[] = [
	{ iconName: IconName.EDIT, value: "edit" },
	{ iconName: IconName.MESSAGES, value: "contact moderator" },
	{ iconName: IconName.DELETE, value: "delete" },
];

const MOBILE_BREAKPOINT = 576;

interface Properties {
	activePopup: null | number;
	category: MyReviewCategory;
	handleClickDeleteReview: (entityId: null | number) => void;
	handleClickEditReview: (entityId: null | number) => void;
	handleTogglePopup: (item: null | number) => void;
	review: MyReview;
}

const ReviewListItem: React.FC<Properties> = ({
	activePopup,
	category,
	handleClickDeleteReview,
	handleClickEditReview,
	handleTogglePopup,
	review,
}) => {
	const [isOpenActionsModal, setIsOpenActionsModal] = useState<boolean>(false);
	const { formattedDate } = useTransformDate(review.time_added);

	const togglePopup = useCallback(() => {
		// If the popup is already active for this review - close it
		if (activePopup === review.id) {
			handleTogglePopup(null);
		} else {
			handleTogglePopup(review.id);
		}
	}, [activePopup, review.id, handleTogglePopup]);

	const handleSelect = useCallback(
		(option: string) => {
			if (option === "edit") {
				handleClickEditReview(review.id);
			}

			if (option === "delete") {
				handleClickDeleteReview(review.id);
			}

			handleTogglePopup(null);
		},
		[
			handleTogglePopup,
			handleClickDeleteReview,
			handleClickEditReview,
			review.id,
		],
	);

	const handleClickMoreOptions = useCallback(() => {
		const width = window.innerWidth;

		// for mobile open ActionsModal, for table open PopupMenu
		if (width > MOBILE_BREAKPOINT) {
			handleTogglePopup(review.id);
			setIsOpenActionsModal(false);
			return;
		}

		handleTogglePopup(null);
		setIsOpenActionsModal(true);
	}, [review.id, handleTogglePopup]);

	return (
		<li className={styles["list__item"]}>
			<div className={clsx(styles["item__elem"], styles["more-options"])}>
				<span className={styles["icon-more"]} onClick={handleClickMoreOptions}>
					<Icon name={IconName.MORE} />
				</span>
				<div
					className={clsx(styles["popup-menu"], styles["popup-menu-mobile"])}
				>
					{activePopup === review.id && (
						<PopupMenu onSelect={handleSelect} options={MY_REVIEW_OPTIONS} />
					)}
				</div>
			</div>

			<div className={styles["item__elem"]}>
				<div className={styles["item__info-wrapper"]}>
					<div
						className={clsx(
							styles["item__info"],
							category === "course" && styles["course"],
						)}
					>
						<div
							className={clsx(
								styles["item__img-wrapper"],
								category === "course" && styles["course"],
							)}
						>
							<Logo
								className={styles["item__img"]}
								logo={review.logo}
								name={review.related_entity_name}
							/>
						</div>
						<div className={styles["item__info-content"]}>
							<h3 className={styles["item__info-name"]}>
								{review.related_entity_name}
							</h3>
							<div
								className={clsx(
									styles["item__info-details"],
									category === "course" && styles["course"],
								)}
							>
								<p className={styles["details__reviews"]}>
									Reviews: <span>{review.company_reviews_count}</span>
								</p>
								<p className={styles["details__courses"]}>
									Courses: <span>{review.total_courses_count}</span>
								</p>
								<p className={styles["reviews-modile"]}>
									{review.company_reviews_count} reviews
								</p>
							</div>
						</div>
					</div>

					<div
						className={clsx(
							styles["item__info-bottom"],
							category === "course" && styles["course"],
						)}
					>
						<p
							className={clsx(
								styles["courses-mobile"],
								category === "course" && styles["course"],
							)}
						>
							{review.total_courses_count} courses
						</p>

						<div
							className={clsx(
								styles["item__info-author"],
								category === "course" && styles["course"],
							)}
						>
							<span>By</span>{" "}
							<Link to={`/company-details/${review.company_id}`}>
								{review.company_name}
							</Link>
						</div>

						<div className={styles["status"]}>
							<div
								className={clsx(
									styles["status-text"],
									styles[`${review.status}`],
								)}
							>
								{review.status === "removed" ? "Unsuccessful" : review.status}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className={styles["item__elem"]}>
				<div className={styles["item__review"]}>
					<div className={styles["review-top"]}>
						<div className={styles["review-top__detail"]}>
							<StarRating averageRating={review.rating} isNumberShown={false} />
							<span>Review ID:</span>
							{review.id}
						</div>
						<div className={styles["date"]}>{formattedDate}</div>
					</div>
					<ReviewTextSection
						handleClickEditReview={handleClickEditReview}
						id={review.id}
						likesCount={review.likes_count}
						text={review.text}
					/>
				</div>
			</div>

			<div className={clsx(styles["item__elem"], styles["item__elem-bottom"])}>
				<div className={clsx(styles["status"], styles["status-bottom"])}>
					<div
						className={clsx(styles["status-text"], styles[`${review.status}`])}
					>
						{review.status === "removed" ? "Unsuccessful" : review.status}
					</div>
					<div className={styles["status-icons"]}>
						<div className={styles["icon-warning"]}>
							{review.status === "removed" && <Icon name={IconName.WARNING} />}
						</div>
						<div className={styles["icon-more"]} onClick={togglePopup}>
							<Icon name={IconName.MORE} />
							<div
								className={clsx(
									styles["popup-menu"],
									styles["popup-menu-desktop"],
								)}
							>
								{activePopup === review.id && (
									<PopupMenu
										onSelect={handleSelect}
										options={MY_REVIEW_OPTIONS}
									/>
								)}
							</div>
						</div>
					</div>
				</div>

				<div className={styles["icons-bottom"]}>
					<IconsSection
						handleClickEdit={handleClickEditReview}
						likesCount={review.likes_count}
						reviewId={review.id}
						withEditIcon
					/>
				</div>
			</div>

			{isOpenActionsModal && (
				<ActionsReviewModal
					isOpen={isOpenActionsModal}
					onSelect={handleSelect}
					options={MY_REVIEW_OPTIONS}
					setIsOpenActionsModal={setIsOpenActionsModal}
				/>
			)}
		</li>
	);
};

export { ReviewListItem };
