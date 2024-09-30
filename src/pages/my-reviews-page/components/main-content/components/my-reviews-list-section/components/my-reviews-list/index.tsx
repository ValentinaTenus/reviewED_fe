import React, { useState } from "react";

import { MyReview, MyReviewCategory } from "~/common/types/my-reviews";

import { ReviewListItem } from "../reviews-list-item";
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

interface Properties {
	category: MyReviewCategory;
	reviews: MyReview[];
}

const MyReviewsList: React.FC<Properties> = ({ category, reviews }) => {
	const [activePopup, setActivePopup] = useState<null | number>(null);

	const handleTogglePopup = (item: number | null) => {
		setActivePopup((prev) => (prev === item ? null : item));
	};

	const handleEditReview = ({
		reviewId,
		text,
	}: {
		reviewId: number;
		text: string;
	}) => {
		console.log(reviewId, text);
	};

	const handleDeleteReview = (reviewId: number) => {
		console.log(reviewId);
	};

	return (
		<ul className={styles["my-reviews-list__list"]}>
			{myReviewsListData.map((review) => (
				<ReviewListItem
					category={category}
					key={review.id}
					review={review}
					handleEditReview={handleEditReview}
					handleDeleteReview={handleDeleteReview}
					handleTogglePopup={handleTogglePopup}
					activePopup={activePopup}
				/>
			))}
		</ul>
	);
};

export { MyReviewsList };
