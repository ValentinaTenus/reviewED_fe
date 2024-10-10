import { forwardRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Image from "~/assets/images/no-reviews.png";
import { Button } from "~/common/components";
import { AppRoute, ButtonSize, ButtonVariant } from "~/common/enums/index";
import { type GetCourseByIdResponseDto } from "~/common/types";
import { useAppSelector } from "~/redux/hooks.type";
import { useGetReviewsStatsQuery } from "~/redux/reviews/reviews-stats-api";

import { ReviewModal } from "./components/review-modal";
import { ReviewsList } from "./components/reviews-list";
import { ReviewsStatsBar } from "./components/reviews-stats";
import styles from "./styles.module.scss";

const MOCK_COURSE_ID = 1;
const THREE_SECONDS = 3000;
const mockStats = {
	"five": 0,
	"four": 1,
	"one": 110,
	"three": 2,
	"two": 100,
};

const mockList = ["Just mock thing to not have it empty"];

type ReviewsBarProperties = {
	course: GetCourseByIdResponseDto;
};

const ReviewsBar = forwardRef<HTMLDivElement, ReviewsBarProperties>(
	({ course }, ref) => {
		const { data: stats } = useGetReviewsStatsQuery(MOCK_COURSE_ID);
		const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

		const navigate = useNavigate();

		const handleOpenReviewModal = () => {
			if (!isButtonInactive) setIsReviewModalOpen(true);
			else if (isUserInAccount !== null) setIsReviewed(true);
			else navigate(AppRoute.AUTH);
		};

		const handleCloseReviewModal = () => {
			setIsReviewModalOpen(false);
		};

		const [isButtonInactive, setIsButtonInactive] = useState(false);

		const userCourseReviews = useAppSelector(
			(state) => state.reviews.userCourseReviews,
		);

		const isUserInAccount = useAppSelector((state) => state.auth.user);

		useEffect(() => {
			if (
				userCourseReviews.includes(MOCK_COURSE_ID) ||
				isUserInAccount === null
			) {
				setIsButtonInactive(true);
			} else {
				setIsButtonInactive(false);
			}
		}, [userCourseReviews, isUserInAccount]);

		const [isReviewed, setIsReviewed] = useState(false);

		useEffect(() => {
			if (isReviewed) {
				const timer = setTimeout(() => {
					setIsReviewed(false);
				}, THREE_SECONDS);

				return () => clearTimeout(timer);
			}
		}, [isReviewed]);

		return (
			<div className={styles["reviews-bar"]}>
				<h3 className={styles["reviews-bar__header"]} ref={ref}>
					Відгуки
				</h3>
				{mockList.length ? (
					<ReviewsList />
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
				{stats && <ReviewsStatsBar stats={mockStats} />}
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
