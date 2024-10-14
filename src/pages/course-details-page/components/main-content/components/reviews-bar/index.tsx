import { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Image from "~/assets/images/no-reviews.png";
import { Button, SortDropdown, Spinner } from "~/common/components";
import { ReviewsCourseSortOptions } from "~/common/constants";
import {
	AppRoute,
	ButtonSize,
	ButtonVariant,
	SpinnerVariant,
} from "~/common/enums/index";
import { type GetCourseByIdResponseDto } from "~/common/types";
import { useAppSelector } from "~/redux/hooks.type";
import { useGetCourseReviewsQuery } from "~/redux/reviews/reviews-course-api";
import { useGetReviewsStatsQuery } from "~/redux/reviews/reviews-stats-api";

import { ReviewModal } from "./components/review-modal";
import { ReviewsList } from "./components/reviews-list";
import { ReviewsStatsBar } from "./components/reviews-stats";
import styles from "./styles.module.scss";

const THREE_SECONDS = 3000;
const ZERO = 0;

type ReviewsBarProperties = {
	course: GetCourseByIdResponseDto;
};

const ReviewsBar = forwardRef<HTMLDivElement, ReviewsBarProperties>(
	({ course }, ref) => {
		const isUserInAccount = useAppSelector((state) => state.auth.user);
		const userCourseReviews = useAppSelector(
			(state) => state.reviews.userCourseReviews,
		);

		const { data: stats } = useGetReviewsStatsQuery({
			id: course.id,
			type: "course",
		});
		const { data: reviews, isFetching } = useGetCourseReviewsQuery(course.id);
		const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

		const [isReviewed, setIsReviewed] = useState(false);
		const [isButtonInactive, setIsButtonInactive] = useState(false);

		const navigate = useNavigate();

		const handleOpenReviewModal = () => {
			if (!isButtonInactive) setIsReviewModalOpen(true);
			else if (isUserInAccount !== null) setIsReviewed(true);
			else navigate(AppRoute.AUTH);
		};

		const handleCloseReviewModal = useCallback(() => {
			setIsReviewModalOpen(false);
		}, []);

		useEffect(() => {
			if (userCourseReviews?.includes(course.id) || isUserInAccount === null) {
				setIsButtonInactive(true);
			} else {
				setIsButtonInactive(false);
			}
		}, [userCourseReviews, isUserInAccount, course.id]);

		useEffect(() => {
			if (isReviewed) {
				const timer = setTimeout(() => {
					setIsReviewed(false);
				}, THREE_SECONDS);

				return () => clearTimeout(timer);
			}
		}, [isReviewed]);

		const [sortBy, setSortBy] = useState<string>("rating");

		const handleChangeSortBy = useCallback((newSortBy: number | string) => {
			setSortBy(newSortBy.toString());
		}, []);

		const sortedReviews = useMemo(() => {
			if (!reviews) return [];

			return [...reviews].sort((a, b): number => {
				switch (sortBy) {
					case "new":
						return b.time_added.localeCompare(a.time_added);
					case "old":
						return a.time_added.localeCompare(b.time_added);
					case "rating":
						return b.count_likes - a.count_likes;
					default:
						return ZERO;
				}
			});
		}, [sortBy, reviews]);

		return (
			<div className={styles["reviews-bar"]}>
				<h3 className={styles["reviews-bar__header"]} ref={ref}>
					Відгуки
				</h3>
				<aside className={styles["reviews-bar__sorting"]}>
					<p>Сортувати за</p>
					<SortDropdown
						aiEnd={false}
						onChange={handleChangeSortBy}
						options={ReviewsCourseSortOptions}
					/>
				</aside>
				{isFetching && <Spinner variant={SpinnerVariant.SMALL} />}
				{reviews?.length && !isFetching ? (
					<ReviewsList reviews={sortedReviews} />
				) : (
					<article className={styles["reviews-bar__no-reviews"]}>
						<img
							alt=""
							className={styles["reviews-bar__picture"]}
							src={Image}
						/>
						<p className={styles["reviews-bar__big-text"]}>
							Тут ще ніхто не залишив відгук
						</p>
						<p className={styles["reviews-bar__small-text"]}>
							Станьте першим, хто поділиться враженням!
						</p>
					</article>
				)}
				{stats && (
					<ReviewsStatsBar courseId={course.id.toString()} stats={stats} />
				)}
				<Button
					className={styles["reviews-bar__button"]}
					onClick={handleOpenReviewModal}
					size={ButtonSize.MEDIUM}
					variant={ButtonVariant.PRIMARY}
				>
					Написати відгук
				</Button>
				<ReviewModal
					course={course}
					isOpen={isReviewModalOpen}
					onClose={handleCloseReviewModal}
				/>
			</div>
		);
	},
);

ReviewsBar.displayName = "ReviewsBar";

export { ReviewsBar };
