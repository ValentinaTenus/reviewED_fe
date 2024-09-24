import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useGetReviewsModerationQuery } from "~/redux/reviews-moderation/reviews-moderation-api";
import { setRewiews } from "~/redux/reviews-moderation/reviews-moderation-slice";

import { ReviewModeratorsCard } from "./components/index";
import styles from "./styles.module.scss";
import { ModerationReviews } from "~/common/types/review";

// const mockData: ModerationReviews[] = [
// 	{
// 		id: 0,
// 		logo: "string",
// 		author_email: "user@example.com",
// 		author_profile_link: "string",
// 		text: "blablabla blablabla",
// 		rating: 4,
// 		avg_rating: 5,
// 		status: "pending",
// 		type: "company_review",
// 		related_entity_name: "Course XXX",
// 		time_added: "2024-09-24T18:33:51.500Z",
// 	},
// ];

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
				<h2 className={styles["title"]}>Модерація відгуків</h2>
				<p className={styles["sub_title"]}>
					Знайдено: <span>{moderatorsReviews?.count}</span> відгуків
				</p>
			</div>
			<div>
				<p>Пошук за UID</p>
			</div>
			{moderatorsReviews?.results.map((review) => (
				<ReviewModeratorsCard key={review.id} review={review} />
			))}
		</div>
	);
};

export { MainModeratorsContent };
