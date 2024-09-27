import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React, { useEffect, useState } from "react";

import { Pagination, Spinner } from "~/common/components";
import { SpinnerVariant } from "~/common/enums";
import { MyReviewCategory } from "~/common/types/my-reviews";
import { useGetMyReviewsQuery } from "~/redux/my-reviews/my-reviews-api";
import { useGetUserQuery } from "~/redux/user/user-api";

import { HeaderList, MyReviewsList, NotFound } from "./components/index";
import styles from "./styles.module.scss";

const DEFAULT_PAGE_COUNT = 0;
const DEFAULT_CURRENT_PAGE = 1;
const DEFAULT_REVIEWS_PER_PAGE = 10;
const INDEX_ONE = 1;
const ZERO_LENGTH = 0;

type Properties = {
	category: MyReviewCategory;
};

const MyReviewsListSection: React.FC<Properties> = ({ category }) => {
	const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);
	const [pageCount, setPageCount] = useState(DEFAULT_PAGE_COUNT);
	const [serverError, setServerError] = useState("");
	const { data: user, error: fetchUserError } = useGetUserQuery(undefined);
	const {
		data: reviews,
		error: fetchReviewsError,
		isLoading,
	} = useGetMyReviewsQuery(
		{
			params: {
				limit: DEFAULT_REVIEWS_PER_PAGE,
				offset: (currentPage - INDEX_ONE) * DEFAULT_REVIEWS_PER_PAGE,
				type: category,
			},
			userId: user?.id as number,
		},
		{
			refetchOnMountOrArgChange: true,
		},
	);

	useEffect(() => {
		if (reviews) {
			setPageCount(Math.ceil(reviews.count / DEFAULT_REVIEWS_PER_PAGE));
		}
	}, [reviews]);

	useEffect(() => {
		if (fetchReviewsError || fetchUserError) {
			const error = fetchReviewsError || fetchUserError;

			const loadError = (error as FetchBaseQueryError)?.data
				? ((error as FetchBaseQueryError).data as Error)
				: { message: "An error occurred during the retrieval of my reviews." };

			setServerError(loadError.message);
		}
	}, [fetchReviewsError, fetchUserError]);

	return (
		<div className={styles["my-reviews-list"]}>
			<div className={styles["my-reviews-list__header"]}>
				<HeaderList category={category} />
			</div>

			<div className={styles["my-reviews-list__content"]}>
				{reviews?.results && reviews.results.length > ZERO_LENGTH && (
					<MyReviewsList category={category} myReviews={reviews.results} />
				)}

				{reviews?.results && reviews.results.length === ZERO_LENGTH && (
					<NotFound />
				)}

				{isLoading && <Spinner variant={SpinnerVariant.SMALL} />}
				{serverError && <div className={styles["error"]}>{serverError}</div>}
			</div>

			{reviews?.results && reviews.results.length > ZERO_LENGTH && (
				<Pagination
					defaultCurrentPage={currentPage}
					pages={pageCount}
					setCurrentPage={setCurrentPage}
				/>
			)}
		</div>
	);
};

export { MyReviewsListSection };
