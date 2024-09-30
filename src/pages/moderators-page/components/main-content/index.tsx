import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useGetReviewsModerationQuery } from "~/redux/reviews-moderation/reviews-moderation-api";
import { setRewiews } from "~/redux/reviews-moderation/reviews-moderation-slice";

import styles from "./styles.module.scss";

const MainModeratorsContent: React.FC = () => {
	const { data: moderatorsReviews } = useGetReviewsModerationQuery();
	const dispatch = useDispatch();

	useEffect(() => {
		if (moderatorsReviews) {
			dispatch(setRewiews(moderatorsReviews.results));
		}
	}, [moderatorsReviews, dispatch]);

	return (
		<div className={styles["moderators_wrapper"]}>
			<div className={styles["title_wrapper"]}>
				<p>Модерація відгуків</p>
				<p>Знайдено: {moderatorsReviews?.count} відгуків</p>
			</div>
			<div>
				<p>Пошук за UID</p>
			</div>
		</div>
	);
};

export { MainModeratorsContent };
