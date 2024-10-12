import { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Image from "~/assets/images/no-reviews.png";
import { Button, SortDropdown } from "~/common/components";
import { ReviewsCourseSortOptions } from "~/common/constants";
import { AppRoute, ButtonSize, ButtonVariant } from "~/common/enums/index";
import {
	type CourseReview,
	type GetCourseByIdResponseDto,
} from "~/common/types";
import { useAppSelector } from "~/redux/hooks.type";
import { useGetReviewsStatsQuery } from "~/redux/reviews/reviews-stats-api";

import { ReviewModal } from "./components/review-modal";
import { ReviewsList } from "./components/reviews-list";
import { ReviewsStatsBar } from "./components/reviews-stats";
import styles from "./styles.module.scss";

const MOCK_COURSE_ID = 1;
const THREE_SECONDS = 3000;
const ZERO = 0;
const mockStats = {
	"five": 0,
	"four": 1,
	"one": 110,
	"three": 2,
	"two": 100,
};

const mockText =
	"Курс QA тестування перевершив мої очікування. Чітко структурована програма охопила всі ключові аспекти, від основ до автоматизації. Інструктори досвідчені та доступні, завжди готові допомогти. Практичні завдання дозволили закріпити знання на реальних кейсах. Рекомендую цей курс для старту в QA! Курс QA тестування перевершив мої очікування. Чітко структурована програма охопила всі ключові аспекти, від основ до автоматизації. Інструктори досвідчені та доступні, завжди готові допомогти. Практичні завдання дозволили закріпити знання на реальних кейсах. Рекомендую цей курс для старту в QA!Курс QA тестування перевершив мої очікування. Чітко структурована програма охопила всі ключові аспекти, від основ до автоматизації. Інструктори досвідчені та доступні, завжди готові допомогти. Практичні завдання дозволили закріпити знання на реальних кейсах. Рекомендую цей курс для старту в QA!Курс QA тестування перевершив мої очікування. Чітко структурована програма охопила всі ключові аспекти, від основ до автоматизації. Інструктори досвідчені та доступні, завжди готові допомогти. Практичні завдання дозволили закріпити знання на реальних кейсах. Рекомендую цей курс для старту в QA!Курс QA тестування перевершив мої очікування. Чітко структурована програма охопила всі ключові аспекти, від основ до автоматизації. Інструктори досвідчені та доступні, завжди готові допомогти. Практичні завдання дозволили закріпити знання на реальних кейсах. Рекомендую цей курс для старту в QA!Курс QA тестування перевершив мої очікування. Чітко структурована програма охопила всі ключові аспекти, від основ до автоматизації. Інструктори досвідчені та доступні, завжди готові допомогти. Практичні завдання дозволили закріпити знання на реальних кейсах. Рекомендую цей курс для старту в QA!Курс QA тестування перевершив мої очікування. Чітко структурована програма охопила всі ключові аспекти, від основ до автоматизації. Інструктори досвідчені та доступні, завжди готові допомогти. Практичні завдання дозволили закріпити знання на реальних кейсах. Рекомендую цей курс для старту в QA!Курс QA тестування перевершив мої очікування. Чітко структурована програма охопила всі ключові аспекти, від основ до автоматизації. Інструктори досвідчені та доступні, завжди готові допомогти. Практичні завдання дозволили закріпити знання на реальних кейсах. Рекомендую цей курс для старту в QA!";

const mockList: CourseReview[] = [
	{
		author_avatar: "",
		author_name: "Іван Підкова",
		company_name: "SuperDuperEdCompany",
		count_likes: 77,
		course_title: "English for everyone",
		id: 1,
		rating: 4,
		status: "Студент",
		text: mockText,
		time_added: "2024-10-11",
	},
	{
		author_avatar: "",
		author_name: "Василь-Костянтин Острозький",
		company_name: "SuperDuperEdCompany",
		count_likes: 7,
		course_title: "English for everyone",
		id: 2,
		rating: 5,
		status: "Студент",
		text: mockText,
		time_added: "2024-10-10",
	},
	{
		author_avatar: "",
		author_name: "Петро Конашевич-Сагайдачний",
		company_name: "SuperDuperEdCompany",
		count_likes: 2,
		course_title: "English for everyone",
		id: 3,
		rating: 3,
		status: "Студент",
		text: mockText,
		time_added: "2024-02-12",
	},
	{
		author_avatar: "",
		author_name: "Вільгельм Франц Йозеф Карл фон Габсбург-Лотаринзький",
		company_name: "SuperDuperEdCompany",
		count_likes: 757,
		course_title: "English for everyone",
		id: 4,
		rating: 5,
		status: "Студент",
		text: mockText,
		time_added: "2023-10-16",
	},
];

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
		}, [userCourseReviews, isUserInAccount, MOCK_COURSE_ID]);

		const [isReviewed, setIsReviewed] = useState(false);

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
			if (!mockList) return [];

			return [...mockList].sort((a, b): number => {
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
		}, [sortBy]);

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
				{mockList.length ? (
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
