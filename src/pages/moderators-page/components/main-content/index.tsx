import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { SearchBar, SortDropdown } from "~/common/components";
import {
	moderationsReviewSortOptionsByPeriod,
	moderationsReviewSortOptionsByStatus,
} from "~/common/constants";
import { DropdownOption, GetModerationReviewsRequest } from "~/common/types";
import {
	useGetReviewsModerationByFilterQuery,
	// useGetReviewsModerationQuery,
} from "~/redux/reviews-moderation/reviews-moderation-api";
import { setRewiews } from "~/redux/reviews-moderation/reviews-moderation-slice";

import { ReviewModeratorsCard } from "./components/index";
import styles from "./styles.module.scss";

const MainModeratorsContent: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [sortByStatus, setSortByStatus] = useState<DropdownOption["value"]>();
	const [sortByPeriod, setSortByPeriod] = useState<DropdownOption["value"]>();

	const { data: filteredModeratorsReviews } =
		useGetReviewsModerationByFilterQuery(
			{
				ordering:
					(sortByPeriod as GetModerationReviewsRequest["ordering"]) ||
					undefined,
				status:
					(sortByStatus as GetModerationReviewsRequest["status"]) || undefined,
				type: "course",
			},
			{
				refetchOnMountOrArgChange: false,
				// skip: selectedCategory !== categories[INDEX_COURSES].value,
			},
		);

	const dispatch = useDispatch();

	useEffect(() => {
		if (filteredModeratorsReviews) {
			dispatch(setRewiews(filteredModeratorsReviews.results));
		}
	}, [filteredModeratorsReviews, dispatch]);

	return (
		<div className={styles["moderators_wrapper"]}>
			<header className={styles["header_wrapper"]}>
				<h2 className={styles["title"]}>Модерація відгуків</h2>
				<p className={styles["sub_title"]}>
					Знайдено: <span>{filteredModeratorsReviews?.count}</span> відгуків
				</p>
			</header>

			<section className={styles["moderators_fitters_section"]}>
				<div className={styles["search_block"]}>
					<p className={styles["search_title"]}>Пошук за UID</p>
					<SearchBar
						onSubmit={(term) => setSearchTerm(term)}
						placeholder="Введіть UID відгуку"
						value={searchTerm}
					/>
				</div>
				<div className={styles["fitters_block"]}>
					<div className={styles["fitters_block__category"]}>
						<p className={styles["fitters_block__category_title"]}>
							Оберіть категорію
						</p>
						<div>categori filter</div>
					</div>
					<div className={styles["fitters_block__sort"]}>
						<p className={styles["fitters_block__sort_title"]}>Сортувати за</p>
						<SortDropdown
							className={styles["dropdown_fullwidth"]}
							onChange={(sortOption) => {
								setSortByStatus(sortOption);
							}}
							options={moderationsReviewSortOptionsByStatus}
						/>
						<SortDropdown
							className={styles["dropdown_fullwidth"]}
							onChange={(sortOption) => {
								setSortByPeriod(sortOption);
							}}
							options={moderationsReviewSortOptionsByPeriod}
						/>
					</div>
				</div>
			</section>

			{filteredModeratorsReviews?.results.map((review) => (
				<ReviewModeratorsCard key={review.id} review={review} />
			))}
		</div>
	);
};

export { MainModeratorsContent };
