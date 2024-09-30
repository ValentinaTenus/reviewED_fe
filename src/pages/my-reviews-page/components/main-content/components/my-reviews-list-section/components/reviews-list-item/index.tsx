import clsx from "clsx";
import React, { useCallback, useEffect, useState } from "react";

import { Icon } from "~/common/components/index";
import { StarRating } from "~/common/components/star-rating";
import { IconName } from "~/common/enums/index";
import {
	MyReview,
	MyReviewCategory,
	PopupMenuOption,
} from "~/common/types/my-reviews";

import styles from "./styles.module.scss";
import { PopupMenu } from "../popup-menu";

const POPUP_OPTIONS: PopupMenuOption[] = [
	{ value: "edit", iconName: IconName.EDIT },
	{ value: "contact moderator", iconName: IconName.MESSAGES },
	{ value: "delete", iconName: IconName.DELETE },
];

// Constants for breakpoints and max preview lengths
const MAX_PREVIEW_LENGTH_DESKTOP = 200;
const MAX_PREVIEW_LENGTH_MOBILE = 150;
const MAX_PREVIEW_LENGTH_TABLET = 230;
const MAX_PREVIEW_LENGTH_LARGE_SCREEN = 350;
const MAX_PREVIEW_LENGTH_EXTRA_LARGE = 190;
const MOBILE_BREAKPOINT = 450;
const TABLET_BREAKPOINT = 630;
const LARGE_SCREEN_BREAKPOINT = 888;
const ZERO_NUMBER = 0;

interface Properties {
	category: MyReviewCategory;
	review: MyReview;
	activePopup: number | null;
	handleTogglePopup: (item: number | null) => void;
	handleDeleteReview: (reviewId: number) => void;
	handleEditReview: ({
		reviewId,
		text,
	}: {
		reviewId: number;
		text: string;
	}) => void;
}

const ReviewListItem: React.FC<Properties> = ({
	category,
	review,
	handleEditReview,
	handleDeleteReview,
	handleTogglePopup,
	activePopup,
}) => {
	const [showFullText, setShowFullText] = useState(false);
	const [maxPreviewLength, setMaxPreviewLength] = useState(
		MAX_PREVIEW_LENGTH_DESKTOP,
	);

	const togglePopup = () => {
		// If the popup is already active for this review, close it
		if (activePopup === review.id) {
			handleTogglePopup(null);
		} else {
			handleTogglePopup(review.id);
		}
	};

	const handleSelect = (option: string) => {
		if (option === "edit") {
			handleEditReview({ reviewId: review.id, text: review.text });
		}

		if (option === "delete") {
			handleDeleteReview(review.id);
		}

		handleTogglePopup(null);
	};

	const toggleText = () => setShowFullText(!showFullText);

	const handleResize = useCallback(() => {
		const width = window.innerWidth;

		if (width <= MOBILE_BREAKPOINT) {
			setMaxPreviewLength(MAX_PREVIEW_LENGTH_MOBILE);
		} else if (width <= TABLET_BREAKPOINT) {
			setMaxPreviewLength(MAX_PREVIEW_LENGTH_TABLET);
		} else if (width <= LARGE_SCREEN_BREAKPOINT) {
			setMaxPreviewLength(MAX_PREVIEW_LENGTH_LARGE_SCREEN);
		} else {
			setMaxPreviewLength(MAX_PREVIEW_LENGTH_EXTRA_LARGE);
		}
	}, []);

	useEffect(() => {
		handleResize();

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [handleResize]);

	return (
		<li className={styles["list__item"]}>
			<div className={clsx(styles["item__elem"], styles["more-options"])}>
				<span className={styles["icon-more"]} onClick={togglePopup}>
					<Icon name={IconName.MORE} />
				</span>
				<div
					className={clsx(styles["popup-menu"], styles["popup-menu-mobile"])}
				>
					{activePopup === review.id && (
						<PopupMenu options={POPUP_OPTIONS} onSelect={handleSelect} />
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
							<img alt="" className={styles["item__img"]} src={review.logo} />
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
							<span>By</span> <a href="/">{review.author_full_name}</a>
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
						<div className={styles["date"]}>{review.time_added}</div>
					</div>
					<div className={styles["review__body"]}>
						{showFullText ? (
							<>
								{review.text}
								<p className={styles["body__close"]} onClick={toggleText}>
									Close
								</p>
								<div
									className={clsx(
										styles["icons"],
										styles["review__body-icons"],
									)}
								>
									<div className={styles["icons-left"]}>
										<Icon name={IconName.EDIT} /> <span>Edit</span>
									</div>
									<div className={styles["icons-right"]}>
										<Icon name={IconName.SHARE} /> <span>Share</span>
										<Icon className="like-icon" name={IconName.LIKE} />{" "}
										<span>21</span>
									</div>
								</div>
							</>
						) : (
							<>
								{review.text.length > maxPreviewLength ? (
									<>
										{review.text.slice(ZERO_NUMBER, maxPreviewLength)}
										<span
											className={styles["body__more-details"]}
											onClick={toggleText}
										>
											... More details
										</span>
									</>
								) : (
									review.text
								)}
							</>
						)}
					</div>
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
									<PopupMenu options={POPUP_OPTIONS} onSelect={handleSelect} />
								)}
							</div>
						</div>
					</div>
				</div>

				<div className={clsx(styles["icons"], styles["icons-bottom"])}>
					<div className={styles["icons-left"]}>
						<Icon name={IconName.EDIT} /> <span>Edit</span>
					</div>
					<div className={styles["icons-right"]}>
						<Icon name={IconName.SHARE} /> <span>Share</span>
						<Icon className="like-icon" name={IconName.LIKE} /> <span>21</span>
					</div>
				</div>
			</div>
		</li>
	);
};

export { ReviewListItem };
