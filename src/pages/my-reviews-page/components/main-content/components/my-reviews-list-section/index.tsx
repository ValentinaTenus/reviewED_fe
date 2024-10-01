import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React, { useEffect, useState } from "react";

import { Pagination, Spinner } from "~/common/components";
import { SpinnerVariant } from "~/common/enums";
import {
	DeleteReviewModalData,
	EditReviewModalData,
	MyReview,
	MyReviewCategory,
} from "~/common/types/my-reviews";
import { useGetMyReviewsQuery } from "~/redux/my-reviews/my-reviews-api";
import { useGetUserQuery } from "~/redux/user/user-api";

import { DeleteReviewModal } from "../delete-review-modal";
import { EditReviewModal } from "../edit-review-modal";
import { HeaderList, MyReviewsList, NotFound } from "./components/index";
import styles from "./styles.module.scss";

const myReviewsListData: MyReview[] = [
	{
		author_full_name: "Lemon academy",
		company_reviews_count: 123,
		id: 1,
		logo: "https://placehold.co/150x150/png",
		rating: 5,
		related_entity_name: "QA Testing, Become a Tester",
		status: "pending",
		text: "I recently completed a test automation course using Selenium, and I want to share my experience. The course turned out to be extremely useful and effective in deepening my knowledge in the field test automation. The Selenium classes were especially valuable because they allowed me to learn a tool for automating the testing of web applications. I learned how to create and execute automated test cases, set up a test environment, and integrate Selenium with other tools such as JIRA. I recently completed a test automation course using Selenium",
		time_added: "00/00/2024",
		total_courses_count: 102,
	},
	{
		author_full_name: "Lemon academy",
		company_reviews_count: 123,
		id: 2,
		logo: "https://placehold.co/150x150/png",
		rating: 5,
		related_entity_name: "QA Testing, Become a Tester",
		status: "pending",
		text: "I recently completed a test automation course using Selenium, and I want to share my experience. The course turned out to be extremely useful and effective in deepening my knowledge in the field test automation. The Selenium classes were especially valuable because they allowed me to learn a tool for automating the testing of web applications. I learned how to create and execute automated test cases, set up a test environment, and integrate Selenium with other tools such as JIRA. I recently completed a test automation course using Selenium",
		time_added: "01/01/2024",
		total_courses_count: 102,
	},
	{
		author_full_name: "Lemon academy",
		company_reviews_count: 123,
		id: 3,
		logo: "https://placehold.co/150x150/png",
		rating: 5,
		related_entity_name: "QA Testing, Become a Tester",
		status: "removed",
		text: "I recently completed a test automation course using Selenium, and I want to share my experience. The course turned out to be extremely useful and effective in deepening my knowledge in the field test automation. The Selenium classes were especially valuable because they allowed me to learn a tool for automating the testing of web applications. I learned how to create and execute automated test cases, set up a test environment, and integrate Selenium with other tools such as JIRA. I recently completed a test automation course using Selenium",
		time_added: "02/02/2024",
		total_courses_count: 102,
	},
	{
		author_full_name: "Lemon academy",
		company_reviews_count: 123,
		id: 4,
		logo: "https://placehold.co/150x150/png",
		rating: 5,
		related_entity_name: "QA Testing, Become a Tester",
		status: "published",
		text: "I recently completed a test automation course using Selenium, and I want to share my experience. The course turned out to be extremely useful and effective in deepening my knowledge in the field test automation. The Selenium classes were especially valuable because they allowed me to learn a tool for automating the testing of web applications. I learned how to create and execute automated test cases, set up a test environment, and integrate Selenium with other tools such as JIRA. I recently completed a test automation course using Selenium",
		time_added: "03/03/2024",
		total_courses_count: 102,
	},
	{
		author_full_name: "Lemon academy",
		company_reviews_count: 123,
		id: 5,
		logo: "https://placehold.co/150x150/png",
		rating: 5,
		related_entity_name: "QA Testing, Become a Tester",
		status: "pending",
		text: "I recently completed a test automation course using Selenium, and I want to share my experience. The course turned out to be extremely useful and effective in deepening my knowledge in the field test automation. The Selenium classes were especially valuable because they allowed me to learn a tool for automating the testing of web applications. I learned how to create and execute automated test cases, set up a test environment, and integrate Selenium with other tools such as JIRA. I recently completed a test automation course using Selenium",
		time_added: "04/04/2024",
		total_courses_count: 102,
	},
];

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

	const [editReviewModalData, setEditReviewModalData] =
		useState<EditReviewModalData>({ isOpen: false, reviewId: null, text: "" });
	const [deleteReviewModalData, setDeleteReviewModalData] =
		useState<DeleteReviewModalData>({ isOpen: false, reviewId: null });

	const { data: user, error: fetchUserError } = useGetUserQuery(undefined);
	const {
		data: reviews,
		error: fetchReviewsError,
		// isLoading,
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
				{/* {reviews?.results && reviews.results.length > ZERO_LENGTH && (
					<MyReviewsList
						category={category}
						reviews={reviews.results}
						setEditReviewModalData={setEditReviewModalData}
						setDeleteReviewModalData={setDeleteReviewModalData}
					/>
				)}

				{reviews?.results && reviews.results.length === ZERO_LENGTH && (
					<NotFound />
				)}

				{isLoading && <Spinner variant={SpinnerVariant.SMALL} />}
				{serverError && <div className={styles["error"]}>{serverError}</div>} */}

				<MyReviewsList
					category={category}
					reviews={myReviewsListData}
					setDeleteReviewModalData={setDeleteReviewModalData}
					setEditReviewModalData={setEditReviewModalData}
				/>
			</div>

			{reviews?.results && reviews.results.length > ZERO_LENGTH && (
				<Pagination
					defaultCurrentPage={currentPage}
					pages={pageCount}
					setCurrentPage={setCurrentPage}
				/>
			)}

			{editReviewModalData.isOpen && (
				<EditReviewModal
					isOpen={editReviewModalData.isOpen}
					// review={
					// 	reviews?.results.find(
					// 		(review) => review.id === editReviewModalData.reviewId,
					// 	) as MyReview
					// }
					review={
						myReviewsListData.find(
							(review) => review.id === editReviewModalData.reviewId,
						) as MyReview
					}
					setEditReviewModalData={setEditReviewModalData}
				/>
			)}

			{deleteReviewModalData.isOpen && (
				<DeleteReviewModal
					{...deleteReviewModalData}
					setDeleteReviewModalData={setDeleteReviewModalData}
				/>
			)}
		</div>
	);
};

export { MyReviewsListSection };
