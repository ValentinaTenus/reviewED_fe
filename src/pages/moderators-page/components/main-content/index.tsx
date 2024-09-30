import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
	SearchBar,
	SortDropdown,
	Spinner,
	ToggleGroupButtons,
} from "~/common/components";
import {
	moderationsReviewSortOptionsByPeriod,
	moderationsReviewSortOptionsByStatus,
	ScreenBreakpoints,
} from "~/common/constants";
import { ButtonGroupData, SpinnerVariant } from "~/common/enums";
import { useGetScreenWidth } from "~/common/hooks";
import { DropdownOption, GetModerationReviewsRequest } from "~/common/types";
import { FilterModal } from "~/pages/course-list-page/components/course-list/components/filter-section/components";
import { NotFound } from "~/pages/home-page/components/main-content/components/search-block/components";
import useReviewModerationApi from "~/redux/reviews-moderation/hookUseReviewModerationApi";
import { setRewiews } from "~/redux/reviews-moderation/reviews-moderation-slice";

import { ReviewModeratorsCard } from "./components/index";
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
						filtersLength={3}
						isFilterButton={useGetScreenWidth() <= ScreenBreakpoints.TABLET}
						onOpenFilter={() => setIsOpenSerchFiltersModal((prev) => !prev)}
						onSubmit={handleSetSearchTerm}
						placeholder="Введіть UID відгуку"
						value={searchTerm}
					/>
				</div>
				{useGetScreenWidth() > ScreenBreakpoints.TABLET && (
					<div className={styles["fitters_block"]}>
						<div className={styles["fitters_block__category"]}>
							<p className={styles["fitters_block__category_title"]}>
								Оберіть категорію
							</p>
							<ToggleGroupButtons
								activeButtonValue={filterByType}
								handleButtonClick={(type) =>
									setFilterByType(type as keyof typeof ButtonGroupData)
								}
								toggleButtonGroupData={["Компанії", "Курси"]}
							/>
						</div>
						<div className={styles["fitters_block__sort"]}>
							<p className={styles["fitters_block__sort_title"]}>
								Сортувати за
							</p>
							<SortDropdown
								className={styles["dropdown_fullwidth"]}
								onChange={handleSetFilterByStatus}
								options={moderationsReviewSortOptionsByStatus}
							/>
							<SortDropdown
								className={styles["dropdown_fullwidth"]}
								onChange={handleSetSortByPeriod}
								options={moderationsReviewSortOptionsByPeriod}
							/>
						</div>
					</div>
				)}
			</section>

			<main className={styles["main_section"]}>
				{fetchResult?.isFetching && (
					<div className={styles["spinner"]}>
						<Spinner variant={SpinnerVariant.MEDIUM} />
					</div>
				)}

				{fetchResult?.error && <NotFound />}

				{!fetchResult?.isFetching &&
					!fetchResult?.error &&
					fetchResult?.reviews?.results.map((review) => (
						<ReviewModeratorsCard key={review.id} review={review} />
					))}
			</main>
			{isOpenSerchFiltersModal && (
				<FilterModal
					onClose={() => setIsOpenSerchFiltersModal((prev) => !prev)}
				/>
			)}
		</div>
	);
};

export { MainModeratorsContent };
