import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { SearchBar, SortDropdown, Spinner } from "~/common/components";
import {
	moderationsReviewSortOptionsByPeriod,
	moderationsReviewSortOptionsByStatus,
} from "~/common/constants";
import { ButtonGroupData, SpinnerVariant } from "~/common/enums";
import { DropdownOption, GetModerationReviewsRequest } from "~/common/types";
import useReviewModerationApi from "~/redux/reviews-moderation/hookUseReviewModerationApi";
import { setRewiews } from "~/redux/reviews-moderation/reviews-moderation-slice";

import { ReviewModeratorsCard } from "./components/index";
import { ToggleGroupButtonsModerationReview } from "./components/toggle-group-buttons-moderation-review";
import styles from "./styles.module.scss";

const MainModeratorsContent: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [filterByStatus, setFilterByStatus] =
		useState<DropdownOption["value"]>();
	const [sortByPeriod, setSortByPeriod] = useState<DropdownOption["value"]>();
	const [filterByType, setFilterByType] =
		useState<keyof typeof ButtonGroupData>("company");

	const handleSetSearchTerm = (term: string) => {
		setSearchTerm(term);
	};
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
		type: filterByType,
	});
	// const err = (fetchResult?.error as FetchBaseQueryError)?.status;
	// const loadError = (error as FetchBaseQueryError)?.data
	// 	? ((error as FetchBaseQueryError).data as Error)
	// 	: { message: "Невідома помилка" };
	// setServerError(loadError.message);

	const dispatch = useDispatch();

	useEffect(() => {
		if (fetchResult?.reviews) {
			dispatch(setRewiews(fetchResult?.reviews));
		}
	}, [fetchResult?.reviews, dispatch]);

	return (
		<div className={styles["moderators_wrapper"]}>
			<header className={styles["header_wrapper"]}>
				<h2 className={styles["title"]}>Модерація відгуків</h2>
				<p className={styles["sub_title"]}>
					Знайдено:{" "}
					<span>{fetchResult?.error ? "0" : fetchResult?.reviews?.length}</span>{" "}
					відгуків
				</p>
			</header>

			<section className={styles["moderators_fitters_section"]}>
				<div className={styles["search_block"]}>
					<p className={styles["search_title"]}>Пошук за UID</p>
					<SearchBar
						onSubmit={handleSetSearchTerm}
						placeholder="Введіть UID відгуку"
						value={searchTerm}
					/>
				</div>
				<div className={styles["fitters_block"]}>
					<div className={styles["fitters_block__category"]}>
						<p className={styles["fitters_block__category_title"]}>
							Оберіть категорію
						</p>
						<ToggleGroupButtonsModerationReview
							activeButtonValue={filterByType}
							handleButtonClick={(type) => setFilterByType(type)}
							toggleButtonGroupData={["course", "company"]}
						/>
					</div>
					<div className={styles["fitters_block__sort"]}>
						<p className={styles["fitters_block__sort_title"]}>Сортувати за</p>
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
			</section>

			{fetchResult?.isFetching && (
				<div className={styles["spinner"]}>
					<Spinner variant={SpinnerVariant.MEDIUM} />
				</div>
			)}

			{fetchResult?.error && <div>error</div>}

			{!fetchResult?.isFetching &&
				!fetchResult?.error &&
				fetchResult?.reviews?.map((review) => (
					<ReviewModeratorsCard key={review.id} review={review} />
				))}
		</div>
	);
};

export { MainModeratorsContent };
