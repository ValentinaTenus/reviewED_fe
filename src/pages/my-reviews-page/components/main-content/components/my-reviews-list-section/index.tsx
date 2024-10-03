import React, { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { Pagination, Spinner } from "~/common/components";
import { SpinnerVariant } from "~/common/enums";
import { MyReview, MyReviewCategory } from "~/common/types/my-reviews";
import {
	useDeleteMyReviewMutation,
	useEditMyReviewMutation,
	useGetMyReviewsQuery,
} from "~/redux/my-reviews/my-reviews-api";
import { DeleteReviewModal } from "../delete-review-modal";
import { EditReviewModal } from "../edit-review-modal";
import { HeaderList, MyReviewsList, NotFound } from "./components/index";
import { useAppSelector } from "~/redux/hooks.type";

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
	const [entityId, setEntityId] = useState<number | null>(null);
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
			skip: userId === undefined,
			refetchOnMountOrArgChange: true,
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

	const handleClickDeleteReview = useCallback((entityId: number | null) => {
		setIsOpenDeleteReviewModal(true);
		setEntityId(entityId);
	}, []);

	const handleClickEditReview = useCallback((entityId: number | null) => {
		setIsOpenEditReviewModal(true);
		setEntityId(entityId);
	}, []);

	const handleCloseDeleteReview = useCallback(() => {
		setIsOpenDeleteReviewModal(false);
		setEntityId(null);
	}, []);

	const handleCloseEditReview = () => {
		setIsOpenEditReviewModal(false);
		setEntityId(null);
	};

	const handleDeleteReview = useCallback(async () => {
		if (entityId) {
			await deleteMyReview({ entityId, category }).unwrap();
			handleCloseDeleteReview();
		}
	}, [entityId, category, deleteMyReview]);

	const handleEditReview = useCallback(
		async (data: { text: string; rating: number }) => {
			if (entityId) {
				await editMyReview({ body: data, category, entityId }).unwrap();
				handleCloseEditReview();
			}
		},
		[entityId, category, editMyReview],
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
						reviews={reviewsData.results}
						handleClickEditReview={handleClickEditReview}
						handleClickDeleteReview={handleClickDeleteReview}
					/>
				)}

				{isMyReviewListEmpty && <NotFound />}

				{isLoading && <Spinner variant={SpinnerVariant.SMALL} />}

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
					isOpen={isOpenEditReviewModal}
					isEditing={isEditing}
					review={reviews?.find((review) => review.id === entityId) as MyReview}
					handleEditReview={handleEditReview}
					handleCloseEditReview={handleCloseEditReview}
				/>
			)}

			{isOpenDeleteReviewModal && (
				<DeleteReviewModal
					isOpen={isOpenDeleteReviewModal}
					isDeleting={isDeleting}
					handleDeleteReview={handleDeleteReview}
					handleCloseDeleteReview={handleCloseDeleteReview}
				/>
			)}
		</div>
	);
};

export { MyReviewsListSection };
