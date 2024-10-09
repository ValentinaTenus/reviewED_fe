import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Pagination, Spinner } from "~/common/components";
import { SpinnerVariant } from "~/common/enums";
import { MyReview, MyReviewCategory } from "~/common/types/my-reviews";
import { useAppSelector } from "~/redux/hooks.type";
import {
	useDeleteMyReviewMutation,
	useEditMyReviewMutation,
	useGetMyReviewsQuery,
} from "~/redux/my-reviews/my-reviews-api";

import {
	DeleteReviewModal,
	EditReviewModal,
	HeaderList,
	MyReviewsList,
	NotFound,
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
	const [entityId, setEntityId] = useState<null | number>(null);
	const [isOpenEditReviewModal, setIsOpenEditReviewModal] =
		useState<boolean>(false);
	const [isOpenDeleteReviewModal, setIsOpenDeleteReviewModal] =
		useState<boolean>(false);

	const { user } = useAppSelector((state) => state.auth);

	const [deleteMyReview, { isLoading: isDeleting }] =
		useDeleteMyReviewMutation();
	const [editMyReview, { isLoading: isEditing }] = useEditMyReviewMutation();

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

	const handleClickDeleteReview = useCallback((entityId: null | number) => {
		setIsOpenDeleteReviewModal(true);
		setEntityId(entityId);
	}, []);

	const handleClickEditReview = useCallback((entityId: null | number) => {
		setIsOpenEditReviewModal(true);
		setEntityId(entityId);
	}, []);

	const handleCloseDeleteReview = useCallback(() => {
		setIsOpenDeleteReviewModal(false);
		setEntityId(null);
	}, []);

	const handleCloseEditReview = useCallback(() => {
		setIsOpenEditReviewModal(false);
		setEntityId(null);
	}, []);

	const handleError = (error: unknown, fallbackMessage?: string) => {
		if (error instanceof Error) {
			toast.error(`Error: ${error.message}`);
		} else {
			toast.error(fallbackMessage || "Something went wrong");
		}
	};

	const handleDeleteReview = useCallback(async () => {
		if (entityId) {
			try {
				await deleteMyReview({ category, entityId }).unwrap();
			} catch (error) {
				handleError(error, "Failed to delete review");
			} finally {
				handleCloseDeleteReview();
			}
		}
	}, [entityId, category, deleteMyReview, handleCloseDeleteReview]);

	const handleEditReview = useCallback(
		async (data: { rating: number; text: string }) => {
			if (entityId) {
				try {
					await editMyReview({ body: data, category, entityId }).unwrap();
				} catch (error) {
					handleError(error, "Failed to edit review");
				} finally {
					handleCloseEditReview();
				}
			}
		},
		[entityId, category, editMyReview, handleCloseEditReview],
	);

	const reviews = reviewsData?.results;
	const isAvailableMyReviews = reviews && reviews.length > ZERO_LENGTH;
	const isMyReviewListEmpty = reviews && reviews.length === ZERO_LENGTH;

	return (
		<div className={styles["my-reviews-list"]}>
			<div className={styles["my-reviews-list__header"]}>
				<HeaderList category={category} />
			</div>

			<div className={styles["my-reviews-list__content"]}>
				{isAvailableMyReviews && (
					<MyReviewsList
						category={category}
						handleClickDeleteReview={handleClickDeleteReview}
						handleClickEditReview={handleClickEditReview}
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

			{isOpenEditReviewModal && entityId && (
				<EditReviewModal
					handleCloseEditReview={handleCloseEditReview}
					handleEditReview={handleEditReview}
					isEditing={isEditing}
					isOpen={isOpenEditReviewModal}
					review={reviews?.find((review) => review.id === entityId) as MyReview}
				/>
			)}

			{isOpenDeleteReviewModal && (
				<DeleteReviewModal
					handleCloseDeleteReview={handleCloseDeleteReview}
					handleDeleteReview={handleDeleteReview}
					isDeleting={isDeleting}
					isOpen={isOpenDeleteReviewModal}
				/>
			)}
		</div>
	);
};

export { MyReviewsListSection };
