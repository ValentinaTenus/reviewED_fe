import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Modal, SearchBar, Spinner } from "~/common/components";
import { ScreenBreakpoints } from "~/common/constants";
import { ButtonGroupData, SpinnerVariant } from "~/common/enums";
import { useGetScreenWidth } from "~/common/hooks";
import { DropdownOption, GetModerationReviewsRequest } from "~/common/types";
import { NotFound } from "~/pages/home-page/components/main-content/components/search-block/components";
import useReviewModerationApi from "~/redux/reviews-moderation/hookUseReviewModerationApi";
import { setRewiews } from "~/redux/reviews-moderation/reviews-moderation-slice";

import {
	ModeratorsReviewFilterSection,
	ReviewModeratorsCard,
} from "./components/index";
import styles from "./styles.module.scss";

const INDEX_ZERO = 0;

const MainModeratorsContent: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [filterByStatus, setFilterByStatus] =
		useState<DropdownOption["value"]>();
	const [sortByPeriod, setSortByPeriod] = useState<DropdownOption["value"]>();
	const [filterByType, setFilterByType] =
		useState<keyof typeof ButtonGroupData>("Компанії");
	const [isOpenSerchFiltersModal, setIsOpenSerchFiltersModal] = useState(false);
	const screenWidth = useGetScreenWidth();

	const handleSetSearchTerm = (term: string) => {
		setSearchTerm(term);
	};

	// const handleOpenSearchFilter = () => {
	// 	setIsOpenSerchFiltersModal(true);
	// };

	const handleSetFilterByStatus = (sortOption: DropdownOption["value"]) => {
		if (sortOption) setFilterByStatus(sortOption);
		if (!sortOption) setFilterByStatus(undefined);
	};
	const handleSetSortByPeriod = (sortOption: DropdownOption["value"]) => {
		if (sortOption) setSortByPeriod(sortOption);
		if (!sortOption) setSortByPeriod(undefined);
	};

	const fetchResult = useReviewModerationApi({
		id: searchTerm,
		ordering: sortByPeriod as GetModerationReviewsRequest["ordering"],
		status: filterByStatus as GetModerationReviewsRequest["status"],
		type: ButtonGroupData[filterByType],
	});
	// const err = (fetchResult?.error as FetchBaseQueryError)?.status;
	// const loadError = (error as FetchBaseQueryError)?.data
	// 	? ((error as FetchBaseQueryError).data as Error)
	// 	: { message: "Невідома помилка" };
	// setServerError(loadError.message);

	const dispatch = useDispatch();

	useEffect(() => {
		if (fetchResult?.reviews) {
			dispatch(setRewiews(fetchResult?.reviews.results));
		}
	}, [fetchResult?.reviews, dispatch]);

	return (
		<div className={styles["moderators_wrapper"]}>
			<header className={styles["header_wrapper"]}>
				<h2 className={styles["title"]}>Модерація відгуків</h2>
				<p className={styles["sub_title"]}>
					Знайдено:{" "}
					<span>
						{fetchResult?.error ? INDEX_ZERO : fetchResult?.reviews?.count}
					</span>{" "}
					відгуків
				</p>
			</header>

			<section className={styles["moderators_fitters_section"]}>
				<div className={styles["search_block"]}>
					<p className={styles["search_title"]}>Пошук за UID</p>
					<SearchBar
						filterButtonText=" "
						filtersLength={3}
						isFilterButton={screenWidth <= ScreenBreakpoints.MOBILE}
						onOpenFilter={() => setIsOpenSerchFiltersModal((prev) => !prev)}
						onSubmit={handleSetSearchTerm}
						placeholder="Введіть UID відгуку"
						value={searchTerm}
					/>
				</div>
				{useGetScreenWidth() > ScreenBreakpoints.MOBILE && (
					<ModeratorsReviewFilterSection
						filterByType={filterByType}
						handleSetFilterByStatus={handleSetFilterByStatus}
						handleSetSortByPeriod={handleSetSortByPeriod}
						setFilterByType={setFilterByType}
					/>
				)}
			</section>

			<main className={styles["main_section"]}>
				{fetchResult?.isFetching && (
					<div className={styles["spinner"]}>
						<Spinner variant={SpinnerVariant.MEDIUM} />
					</div>
				)}

				{(fetchResult?.error || fetchResult?.reviews?.count === INDEX_ZERO) && (
					<NotFound />
				)}

				{!fetchResult?.isFetching &&
					!fetchResult?.error &&
					fetchResult?.reviews?.results.map((review) => (
						<ReviewModeratorsCard key={review.id} review={review} />
					))}
			</main>
			{isOpenSerchFiltersModal && screenWidth <= ScreenBreakpoints.MOBILE && (
				<Modal
					isOpen={isOpenSerchFiltersModal}
					onClose={() => setIsOpenSerchFiltersModal((prev) => !prev)}
				>
					<ModeratorsReviewFilterSection
						filterByType={filterByType}
						handleSetFilterByStatus={handleSetFilterByStatus}
						handleSetSortByPeriod={handleSetSortByPeriod}
						setFilterByType={setFilterByType}
					/>
				</Modal>
			)}
		</div>
	);
};

export { MainModeratorsContent };
