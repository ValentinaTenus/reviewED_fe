import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { Modal, Pagination, SearchBar, Spinner } from "~/common/components";
import { ScreenBreakpoints } from "~/common/constants";
import { ButtonGroupData, SpinnerVariant } from "~/common/enums";
import { useGetScreenWidth } from "~/common/hooks";
import {
	GetModerationReviewsRequest,
	GetModerationReviewsResponse,
} from "~/common/types";
import { NotFound } from "~/pages/home-page/components/main-content/components/search-block/components";
import {
	useLazyGetReviewsModerationByFilterQuery,
	useLazyGetReviewsModerationByIdQuery,
} from "~/redux/reviews-moderation/reviews-moderation-api";
import { setRewiews } from "~/redux/reviews-moderation/reviews-moderation-slice";

import {
	ModeratorsReviewFilterSection,
	ReviewModeratorsCard,
} from "./components/index";
import styles from "./styles.module.scss";

const INDEX_ZERO = 0;
const INDEX_ONE = 1;
const DEFAULT_CURRENT_PAGE = 1;
const DEFAULT_REVIEWS_PER_PAGE = 10;
const DEFAULT_PAGE_COUNT = 0;

const MainModeratorsContent: React.FC = () => {
	const [searchedID, setSearchedID] = useState<string>("");
	const [isOpenSerchFiltersModal, setIsOpenSerchFiltersModal] = useState(false);
	const [fetchResult, setFetchResult] = useState<
		GetModerationReviewsResponse | undefined
	>();
	const [pageCount, setPageCount] = useState(DEFAULT_PAGE_COUNT);
	const screenWidth = useGetScreenWidth();

	const [searchParams, setSearchParams] = useSearchParams();
	const filterByType = searchParams.get("type") || "Курси";
	const filterByStatus = searchParams.get("status");
	const sortByPeriod = searchParams.get("ordering");
	const currentPage = searchParams.get("page") || DEFAULT_CURRENT_PAGE;

	const handleSetSearchTerm = useCallback(
		(term: string) => {
			setSearchedID(term);
			setSearchParams((prev) => {
				prev.set("ordering", "");
				prev.set("status", "");
				return prev;
			});
		},
		[setSearchedID, setSearchParams],
	);

	const handleSetIsOpenSerchFiltersModal = useCallback(
		() => setIsOpenSerchFiltersModal((prev) => !prev),
		[setIsOpenSerchFiltersModal],
	);

	const handleSetCurrentPage = useCallback(
		(page: number) =>
			setSearchParams((prev) => {
				prev.set("page", page.toString());
				return prev;
			}),
		[setSearchParams],
	);

	const [getModeratorsReviewByID, { isFetching: isFetchingByID }] =
		useLazyGetReviewsModerationByIdQuery();

	const [getModeratorsReviewsByFilters, { isFetching: isFetchingByFilters }] =
		useLazyGetReviewsModerationByFilterQuery();

	const handleUpdateModeratorsReviews = useCallback(async () => {
		if (searchedID) {
			const res = await getModeratorsReviewByID({
				id: searchedID,
				type: ButtonGroupData[filterByType as keyof typeof ButtonGroupData],
			});
			setFetchResult({
				count: res.data ? INDEX_ONE : INDEX_ZERO,
				next: null,
				previous: null,
				results: res.data ? [res.data] : [],
			});

			handleSetCurrentPage(DEFAULT_CURRENT_PAGE);
			setPageCount(DEFAULT_PAGE_COUNT);
		} else {
			const res = await getModeratorsReviewsByFilters({
				id: searchedID,
				limit: DEFAULT_REVIEWS_PER_PAGE,
				offset: (+currentPage - INDEX_ONE) * DEFAULT_REVIEWS_PER_PAGE,
				ordering: sortByPeriod
					? (sortByPeriod as GetModerationReviewsRequest["ordering"])
					: undefined,
				status: filterByStatus
					? (filterByStatus as GetModerationReviewsRequest["status"])
					: undefined,
				type: ButtonGroupData[filterByType as keyof typeof ButtonGroupData],
			});

			setFetchResult(res.data);
			if (res.data?.count)
				setPageCount(Math.ceil(res.data?.count / DEFAULT_REVIEWS_PER_PAGE));
		}
	}, [
		filterByStatus,
		filterByType,
		getModeratorsReviewByID,
		getModeratorsReviewsByFilters,
		searchedID,
		sortByPeriod,
		currentPage,
		handleSetCurrentPage,
	]);

	useEffect(() => {
		handleUpdateModeratorsReviews();
	}, [
		searchedID,
		filterByType,
		sortByPeriod,
		filterByStatus,
		handleUpdateModeratorsReviews,
		currentPage,
	]);

	const dispatch = useDispatch();

	useEffect(() => {
		if (fetchResult?.results) {
			dispatch(setRewiews(fetchResult?.results));
		}
	}, [fetchResult, dispatch]);

	return (
		<div className={styles["moderators_wrapper"]}>
			<header className={styles["header_wrapper"]}>
				<h2 className={styles["title"]}>Модерація відгуків</h2>
				<p className={styles["sub_title"]}>
					Знайдено: <span>{fetchResult?.count || INDEX_ZERO}</span> відгуків
				</p>
			</header>

			<section className={styles["moderators_fitters_section"]}>
				<div className={styles["search_block"]}>
					<p className={styles["search_title"]}>Пошук за UID</p>
					<SearchBar
						containerStyles={styles["searc-bar_container"]}
						inputStyles={styles["searc-bar_input"]}
						isFilterButton={screenWidth <= ScreenBreakpoints.MOBILE}
						onOpenFilter={handleSetIsOpenSerchFiltersModal}
						onSubmit={handleSetSearchTerm}
						placeholder="Введіть UID відгуку"
						value={searchedID}
					/>
				</div>
				{useGetScreenWidth() > ScreenBreakpoints.MOBILE && (
					<ModeratorsReviewFilterSection />
				)}
			</section>

			<main className={styles["main_section"]}>
				{(isFetchingByID || isFetchingByFilters) && (
					<div className={styles["spinner"]}>
						<Spinner variant={SpinnerVariant.MEDIUM} />
					</div>
				)}

				{fetchResult?.count === INDEX_ZERO && <NotFound />}

				{!isFetchingByID &&
					!isFetchingByFilters &&
					fetchResult?.results.map((review) => (
						<ReviewModeratorsCard
							key={review.id}
							onUpdateModeratorsReviews={handleUpdateModeratorsReviews}
							review={review}
						/>
					))}
				{fetchResult?.results && pageCount > INDEX_ONE && (
					<Pagination
						defaultCurrentPage={+currentPage}
						pages={pageCount}
						setCurrentPage={handleSetCurrentPage}
					/>
				)}
			</main>

			{isOpenSerchFiltersModal && screenWidth <= ScreenBreakpoints.MOBILE && (
				<Modal
					isOpen={isOpenSerchFiltersModal}
					onClose={handleSetIsOpenSerchFiltersModal}
				>
					<ModeratorsReviewFilterSection />
				</Modal>
			)}
		</div>
	);
};

export { MainModeratorsContent };
