import { forwardRef, useCallback, useMemo, useState } from "react";

import NoReviews from "~/assets/images/no-reviews.png";
import { Pagination, SortDropdown } from "~/common/components";
import { ReviewsSortOptions } from "~/common/constants";
import {
	type CompanyReview,
	type GetCompanyByIdResponse,
} from "~/common/types";
import globalStyles from "~/pages/company-details-page/components/company-details/styles.module.scss";
import { useGetReviewsStatsQuery } from "~/redux/reviews/reviews-stats-api";

import { ReviewCard } from "./components/review-card";
import { Statistics } from "./components/statistics";
import styles from "./styles.module.scss";

const Reviews = forwardRef<
	HTMLDivElement,
	{ company: GetCompanyByIdResponse; reviews: CompanyReview[] | undefined }
>(({ company, reviews }, ref) => {
	const MIN_REVIEWS = 0;
	const ZERO = 0;

	const DEFAULT_REVIEWS_PER_PAGE = 4;
	const DEFAULT_CURRENT_PAGE = 1;

	const { data: reviewsStat } = useGetReviewsStatsQuery({
		id: company.id,
		type: "company",
	});
	const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);
	const [reviewsPerPage] = useState(DEFAULT_REVIEWS_PER_PAGE);
	const [sortBy, setSortBy] = useState<string>("rating");

	const pageCount = useMemo(() => {
		if (reviews) {
			return Math.ceil(reviews.length / reviewsPerPage);
		}
		return DEFAULT_CURRENT_PAGE;
	}, [reviews, reviewsPerPage]);

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

	if (reviews?.length != MIN_REVIEWS) {
		return (
			<div className={styles["reviews_section"]}>
				<h2 className={styles["reviews_heading"]}>Відгуки</h2>
				<div className={styles["reviews_content"]}>
					<div className={styles["reviews_container"]} ref={ref}>
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
						<div className={styles["reviews"]}>
							{sortedReviews.map((review, index) => (
								<div className={styles["review"]} key={index}>
									<ReviewCard review={review} />
								</div>
							))}
						</div>
						{pageCount > DEFAULT_CURRENT_PAGE && (
							<Pagination
								defaultCurrentPage={currentPage}
								pages={pageCount}
								setCurrentPage={setCurrentPage}
							/>
						)}
					</div>
					{reviewsStat && (
						<Statistics company={company} reviewsCount={reviewsStat} />
					)}
				</div>
			</div>
		);
	} else {
		return (
			<div className={styles["reviews_section"]}>
				<h2 className={styles["reviews_heading"]}>Відгуки</h2>
				<div className={styles["reviews_content"]}>
					<div className={styles["no-reviews_container"]} ref={ref}>
						<div className={styles["no-reviews"]}>
							<img
								alt="Not found reviews"
								className={styles["no-reviews_image"]}
								src={NoReviews}
							/>
							<h4 className={styles["no-reviews_title"]}>
								Тут ще ніхто не залишив відгук
							</h4>
							<p className={globalStyles["body-r"]}>
								Станьте першим, хто поділиться враженням!
							</p>
						</div>
					</div>
					{reviewsStat && (
						<Statistics company={company} reviewsCount={reviewsStat} />
					)}
				</div>
			</div>
		);
	}
});

Reviews.displayName = "Reviews";

export { Reviews };
