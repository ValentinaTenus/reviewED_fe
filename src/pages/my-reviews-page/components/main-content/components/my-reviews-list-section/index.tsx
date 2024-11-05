import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React, { useEffect, useMemo, useState } from "react";

import { Pagination, Spinner } from "~/common/components";
import { SpinnerVariant } from "~/common/enums";
import { useModalManager } from "~/common/hooks";
import { MyReview, MyReviewCategory } from "~/common/types/my-reviews";
import { useAppSelector } from "~/redux/hooks.type";
import { useGetMyReviewsQuery } from "~/redux/my-reviews/my-reviews-api";

import {
	HeaderList,
	MyReviewsList,
	NotFound,
	ReviewModals,
} from "./components/index";
import styles from "./styles.module.scss";

const DEFAULT_PAGE_COUNT = 0;
const DEFAULT_CURRENT_PAGE = 1;
const DEFAULT_REVIEWS_PER_PAGE = 5;
const INDEX_ONE = 1;
const ZERO_LENGTH = 0;

type Properties = {
	category: MyReviewCategory;
};

const MyReviewsListSection: React.FC<Properties> = ({ category }) => {
	const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);
	const [pageCount, setPageCount] = useState(DEFAULT_PAGE_COUNT);
	const [serverError, setServerError] = useState("");

	const { closeModal, currentModal, id, openModal } = useModalManager();

	const { user } = useAppSelector((state) => state.auth);

	const userId = user?.id as number;
	const reviewsQueryParams = {
		limit: DEFAULT_REVIEWS_PER_PAGE,
		offset: (currentPage - INDEX_ONE) * DEFAULT_REVIEWS_PER_PAGE,
		type: category,
	};

	const {
		data: reviewsData,
		error,
		isLoading,
	} = useGetMyReviewsQuery(
		{
			params: reviewsQueryParams,
			userId,
		},
		{
			refetchOnMountOrArgChange: true,
			skip: userId === undefined,
		},
	);

	useEffect(() => {
		if (error) {
			const loadError = (error as FetchBaseQueryError)?.data
				? ((error as FetchBaseQueryError).data as Error)
				: { message: "An error occurred during the retrieval of my reviews." };

			setServerError(loadError.message);
		} else {
			setServerError("");
		}
	}, [error]);

	useEffect(() => {
		if (reviewsData) {
			setPageCount(Math.ceil(reviewsData.count / DEFAULT_REVIEWS_PER_PAGE));
		}
	}, [reviewsData]);

	useEffect(() => {
		setCurrentPage(DEFAULT_CURRENT_PAGE);
	}, [category]);

	const reviews = reviewsData?.results;
	const isAvailableMyReviews = reviews && reviews.length > ZERO_LENGTH;
	const isMyReviewListEmpty = reviews && reviews.length === ZERO_LENGTH;

	const selectedModalReview = useMemo(() => {
		return reviews?.find((review) => review.id === id) || null;
	}, [reviews, id]);

	return (
		<div className={styles["my-reviews-list"]}>
			<div className={styles["my-reviews-list__header"]}>
				<HeaderList category={category} />
			</div>

			<div className={styles["my-reviews-list__content"]}>
				{isAvailableMyReviews && (
					<MyReviewsList
						category={category}
						openModal={openModal}
						reviews={reviewsData.results}
					/>
				)}

				{isMyReviewListEmpty && <NotFound />}

				{isLoading && (
					<div className={styles["spinner"]}>
						<Spinner variant={SpinnerVariant.SMALL} />
					</div>
				)}

				{serverError && <div className={styles["error"]}>{serverError}</div>}
			</div>

			{isAvailableMyReviews && (
				<Pagination
					defaultCurrentPage={currentPage}
					pages={pageCount}
					setCurrentPage={setCurrentPage}
				/>
			)}

			{currentModal && (
				<ReviewModals
					category={category}
					closeModal={closeModal}
					currentModal={currentModal}
					openModal={openModal}
					review={selectedModalReview as MyReview}
				/>
			)}
		</div>
	);
};

export { MyReviewsListSection };
