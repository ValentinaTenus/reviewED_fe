import { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
import { useGetMyReviewsQuery } from "~/redux/my-reviews/my-reviews-api";
import { useGetCourseReviewsQuery } from "~/redux/reviews/reviews-course-api";
import { useGetReviewsStatsQuery } from "~/redux/reviews/reviews-stats-api";

import { ReviewModal } from "./components/review-modal";
import { ReviewsList } from "./components/reviews-list";
import { ReviewsStatsBar } from "./components/reviews-stats";
import styles from "./styles.module.scss";

const ZERO = 0;

type ReviewsBarProperties = {
	course: GetCourseByIdResponseDto;
};

const ReviewsBar = forwardRef<HTMLDivElement, ReviewsBarProperties>(
	({ course }, ref) => {
		const { data: stats } = useGetReviewsStatsQuery({
			id: course.id,
			type: "course",
		});

		const { data: reviews, isFetching } = useGetCourseReviewsQuery(course.id);
		const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

		const { user } = useAppSelector((state) => state.auth);
		const {
			data: courseReviewsByUser,
			refetch: refetchGetCourseReviewsByUser,
		} = useGetMyReviewsQuery(
			{
				params: { limit: 10, offset: 0, type: "course" },
				userId: user?.id as number,
			},
			{
				skip: typeof user?.id !== "number",
			},
		);

		const [isCourseReviewedByUser, setIsCourseReviewedByUser] = useState(false);

		const navigate = useNavigate();

		const handleOpenReviewModal = useCallback(() => {
			if (user) {
				if (!isCourseReviewedByUser) {
					setIsReviewModalOpen(true);
				} else {
					toast.error("Ви вже залишили відгук для цієї компанії");
				}
			} else {
				navigate(AppRoute.AUTH);
			}
		}, [navigate, isCourseReviewedByUser, user]);

		const handleCloseReviewModal = useCallback(() => {
			setIsReviewModalOpen(false);
		}, []);

		const handleReviewSubmit = useCallback(() => {
			refetchGetCourseReviewsByUser();
		}, [refetchGetCourseReviewsByUser]);

		useEffect(() => {
			const isCourseReviewedByUser = courseReviewsByUser?.results.find(
				(review) => review.related_entity_name === course.title,
			);

			if (isCourseReviewedByUser) {
				setIsCourseReviewedByUser(true);
			}
		}, [courseReviewsByUser?.results, course.title]);

		const [sortBy, setSortBy] = useState<string>("rating");

		const handleChangeSortBy = useCallback((newSortBy: number | string) => {
			setSortBy(newSortBy.toString());
		}, []);

		const sortedReviews = useMemo(() => {
			if (!reviews) return [];

			if (reviews.length > ZERO) {
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
			}
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
				{reviews?.length && sortedReviews && !isFetching ? (
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
					onReviewSubmit={handleReviewSubmit}
				/>
			</div>
		);
	},
);

ReviewsBar.displayName = "ReviewsBar";

export { ReviewsBar };
