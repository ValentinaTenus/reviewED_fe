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
	ReviewStatus,
	ReviewTextSection,
} from "../";
import styles from "./styles.module.scss";

const MY_REVIEW_OPTIONS: MyReviewOptions[] = [
	{ iconName: IconName.EDIT, label: "редагувати", value: "edit" },
	{
		iconName: IconName.MESSAGES,
		label: "зв'язатися з модератором",
		value: "contact moderator",
	},
	{ iconName: IconName.DELETE, label: "видалити", value: "delete" },
];

const MOBILE_BREAKPOINT = 576;

const SINGLE_COURSE = 1;
const MIN_PLURAL_COURSE = 2;
const MAX_PLURAL_COURSE = 4;

const POPUP_CLOSE_DELAY = 500;

const getCourseLabel = (count: number) => {
	if (count === SINGLE_COURSE) {
		return `${count} курс`;
	} else if (count >= MIN_PLURAL_COURSE && count <= MAX_PLURAL_COURSE) {
		return `${count} курси`;
	} else {
		return `${count} курсів`;
	}
};

interface Properties {
	category: MyReviewCategory;
	handleClickDeleteReview: (entityId: null | number) => void;
	handleClickEditReview: (entityId: null | number) => void;
	review: MyReview;
}

const ReviewListItem: React.FC<Properties> = ({
	category,
	handleClickDeleteReview,
	handleClickEditReview,
	review,
}) => {
	const [isOpenActionsModal, setIsOpenActionsModal] = useState<boolean>(false);
	const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
	const [activePopup, setActivePopup] = useState<null | number>(null);
	const { formattedDate } = useTransformDate(review.time_added);

	const handleClosePopup = useCallback(() => {
		setActivePopup(null);
		// Prevent reopening the Popup if the outside click is on the Popup open trigger
		setTimeout(() => {
			setIsOpenPopup(false);
		}, POPUP_CLOSE_DELAY);
	}, []);

	const handleClickOpenPopup = useCallback(() => {
		const width = window.innerWidth;

		// for mobile open ActionsModal, for desktop and tablet open PopupMenu
		if (width > MOBILE_BREAKPOINT) {
			setIsOpenPopup(true);
			setActivePopup(review.id);
		} else {
			setIsOpenActionsModal(true);
		}
	}, [review.id]);

	const handleSelectPopupOption = useCallback(
		(option: string) => {
			if (option === "edit") {
				handleClickEditReview(review.id);
			}

			if (option === "delete") {
				handleClickDeleteReview(review.id);
			}

			setActivePopup(null);
		},
		[handleClickDeleteReview, handleClickEditReview, review.id],
	);

	return (
		<li className={styles["list__item"]}>
			<div className={clsx(styles["item__elem"], styles["more-options"])}>
				<div
					className={styles["icon-more"]}
					onClick={!isOpenPopup ? handleClickOpenPopup : undefined}
				>
					<span className={styles["icon-more__button"]}>
						<Icon name={IconName.MORE} />
					</span>

					<div
						className={clsx(styles["popup-menu"], styles["popup-menu-tablet"])}
					>
						<PopupMenu
							handleClosePopup={handleClosePopup}
							handleSelect={handleSelectPopupOption}
							isOpen={activePopup === review.id}
							options={MY_REVIEW_OPTIONS}
						/>
					</div>
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
									Відгуків: <span>{review.company_reviews_count}</span>
								</p>
								<p className={styles["details__courses"]}>
									Курсів: <span>{review.total_courses_count}</span>
								</p>
								<p className={styles["reviews-modile"]}>
									{review.company_reviews_count} відгуків
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
							{getCourseLabel(review.total_courses_count)}
						</p>

						<div
							className={clsx(
								styles["item__info-author"],
								category === "course" && styles["course"],
							)}
						>
							<span>Від</span>{" "}
							<Link to={`/company-details/${review.company_id}`}>
								{review.company_name}
							</Link>
						</div>

						<div className={styles["status-section"]}>
							<ReviewStatus status={review.status} />
						</div>
					</div>
				</div>
			</div>

			<div className={styles["item__elem"]}>
				<div className={styles["item__review"]}>
					<div className={styles["review-top"]}>
						<div className={styles["review-top__detail"]}>
							<StarRating averageRating={review.rating} isNumberShown={false} />
							<span>ID відгуку:</span>
							{review.id}
						</div>
						<div className={styles["date"]}>
							{formattedDate.replace(/\s+/g, "")}
						</div>
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
				<div
					className={clsx(
						styles["status-section"],
						styles["status-section-bottom"],
					)}
				>
					<ReviewStatus status={review.status} />

					<div className={styles["status-section__icons"]}>
						{review.status === "removed" && (
							<div className={styles["icon-warning"]}>
								<Icon name={IconName.WARNING} />
							</div>
						)}
						<div
							className={styles["icon-more"]}
							onClick={!isOpenPopup ? handleClickOpenPopup : undefined}
						>
							<span className={styles["icon-more__button"]}>
								<Icon name={IconName.MORE} />
							</span>

							<div
								className={clsx(
									styles["popup-menu"],
									styles["popup-menu-desktop"],
								)}
							>
								<PopupMenu
									handleClosePopup={handleClosePopup}
									handleSelect={handleSelectPopupOption}
									isOpen={activePopup === review.id}
									options={MY_REVIEW_OPTIONS}
								/>
							</div>
						</div>
					</div>
				</div>

				<div className={styles["status-section__icons-bottom"]}>
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
					onSelect={handleSelectPopupOption}
					options={MY_REVIEW_OPTIONS}
					setIsOpenActionsModal={setIsOpenActionsModal}
				/>
			)}
		</li>
	);
};

export { ReviewListItem };
