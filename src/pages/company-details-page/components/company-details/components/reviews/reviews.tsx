import { forwardRef, useCallback, useMemo, useState } from "react";

import { Pagination, SortDropdown } from "~/common/components";
import { ReviewsSortOptions } from "~/common/constants";
import { type GetCompanyByIdResponse, Review } from "~/common/types";
import globalStyles from "~/pages/company-details-page/components/company-details/styles.module.scss";

import { ReviewCard } from "./components/review-card";
import { Statistics } from "./components/statistics";
import styles from "./styles.module.scss";

const Reviews = forwardRef<
	HTMLDivElement,
	{ company: GetCompanyByIdResponse; reviews: Review[] | undefined }
>(({ company, reviews }, ref) => {
	const MIN_REVIEWS = 0;
	const ZERO = 0;
	const ONE = 1;

	const DEFAULT_REVIEWS_PER_PAGE = 4;
	const DEFAULT_CURRENT_PAGE = 1;

	const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);
	const [reviewsPerPage] = useState(DEFAULT_REVIEWS_PER_PAGE);

	let pages = 0;

	if (reviews) {
		pages = Math.ceil(reviews.length / reviewsPerPage);
	}

	const [pageCount] = useState(pages);

	const [sortBy, setSortBy] = useState<string>("rating");

	const handleChangeSortBy = useCallback((newSortBy: number | string) => {
		setSortBy(newSortBy.toString());
	}, []);

	const sortedReviews = useMemo(() => {
		if (!reviews) return [];

		return reviews.slice().sort((a, b) => {
			if (sortBy === "rating") {
				return b.rating - a.rating;
			} else if (sortBy === "-rating") {
				return a.rating - b.rating;
			}
			return ZERO;
		});
	}, [reviews, sortBy]);

	const reviewsCount =
		reviews?.reduce(
			(acc, review) => {
				acc[review.rating] = (acc[review.rating] || ZERO) + ONE;
				return acc;
			},
			{} as Record<number, number>,
		) || {};

	if (reviews?.length != MIN_REVIEWS) {
		return (
			<div className={styles["reviews_section"]}>
				<div className={styles["reviews_container"]} ref={ref}>
					<h2 className={styles["reviews_heading"]}>Відгуки</h2>
					<div className={styles["reviews_sort"]}>
						<span
							className={`${globalStyles["small-sb"]} ${styles["reviews_sort-span"]}`}
						>
							Сортувати за
						</span>
						<SortDropdown
							aiEnd={false}
							onChange={handleChangeSortBy}
							options={ReviewsSortOptions}
						/>
					</div>
					{sortedReviews.map((review, index) => (
						<div className={styles["review"]} key={index}>
							<ReviewCard review={review} />
						</div>
					))}
					{pageCount > DEFAULT_CURRENT_PAGE && (
						<Pagination
							defaultCurrentPage={currentPage}
							pages={pageCount}
							setCurrentPage={setCurrentPage}
						/>
					)}
				</div>
				<Statistics company={company} reviewsCount={reviewsCount} />
			</div>
		);
	} else {
		return (
			<div className={styles["reviews_section"]}>
				<div className={styles["no-reviews_container"]} ref={ref}>
					<h2 className={styles["reviews_heading"]}>Відгуки</h2>
					<div className={styles["no-reviews"]}>
						<img
							alt="no reviews image"
							className={styles["no-reviews_image"]}
							src="/src/assets/images/no-reviews.png"
						/>
						<h4 className={styles["no-reviews_title"]}>
							Тут ще ніхто не залишив відгук
						</h4>
						<p className={globalStyles["body-r"]}>
							Станьте першим, хто поділиться враженням!
						</p>
					</div>
				</div>
				<Statistics company={company} reviewsCount={reviewsCount} />
			</div>
		);
	}
});

Reviews.displayName = "Reviews";

export { Reviews };
