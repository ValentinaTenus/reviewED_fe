import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
	useGetReviewsModerationByFilterQuery,
	// useGetReviewsModerationQuery,
} from "~/redux/reviews-moderation/reviews-moderation-api";
import { setRewiews } from "~/redux/reviews-moderation/reviews-moderation-slice";

import { ReviewModeratorsCard } from "./components/index";
import styles from "./styles.module.scss";

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
			<div className={styles["title_wrapper"]}>
				<h2 className={styles["title"]}>Модерація відгуків</h2>
				<p className={styles["sub_title"]}>
					Знайдено: <span>{filteredModeratorsReviews?.count}</span> відгуків
				</p>
			</div>
			<div>
				<p>Пошук за UID</p>
			</div>
			{filteredModeratorsReviews?.results.map((review) => (
				<ReviewModeratorsCard key={review.id} review={review} />
			))}
		</div>
	);
};

export { MainModeratorsContent };
