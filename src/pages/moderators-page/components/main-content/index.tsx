import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
	useGetReviewsModerationByFilterQuery,
	// useGetReviewsModerationQuery,
} from "~/redux/reviews-moderation/reviews-moderation-api";
import { setRewiews } from "~/redux/reviews-moderation/reviews-moderation-slice";

import { ReviewModeratorsCard } from "./components/index";
import styles from "./styles.module.scss";
import { SearchBar, SortDropdown } from "~/common/components";

const MainModeratorsContent: React.FC = () => {
	// const { data: moderatorsReviews } = useGetReviewsModerationQuery();
	const { data: filteredModeratorsReviews } =
		useGetReviewsModerationByFilterQuery(
			{
				ordering: undefined,
				status: undefined,
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
					<div>SearchBar</div>
					{/* <SearchBar
						onSubmit={onChangeSearchTerm}
						placeholder="Find your perfect company"
						value={searchTerm}
					/> */}
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
						<div>SortDropdown1</div>
						<div>SortDropdown2</div>
						{/* <SortDropdown
							name="sort"
							onChange={onChangeSortBy}
							options={CompaniesSortOptions}
						/>
						<SortDropdown
							name="sort"
							onChange={onChangeSortBy}
							options={CompaniesSortOptions}
						/> */}
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
