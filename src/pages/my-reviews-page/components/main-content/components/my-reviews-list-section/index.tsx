import React from "react";

import { MyReview, MyReviewCategory } from "~/common/types/my-reviews";

import { HeaderList, ReviewListItem } from "./components/index";
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
		text: "The course is well-organized and offers practical examples for hands-on learning. The instructors were knowledgeable and provided clear explanations of complex topics, making the material accessible to everyone.",
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
		text: "I found the Selenium automation training to be very useful. It helped me solidify my knowledge in test automation, and I was able to start implementing it in my job within a week of completing the course.",
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
		text: "The class was comprehensive, covering everything from the basics of testing to more advanced concepts in automated test frameworks. I would recommend this to anyone looking to improve their QA testing skills.",
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
		text: "This is one of the best QA courses I've ever taken. It covers everything from theory to practical implementation. The assignments were particularly helpful in reinforcing what was taught during the lectures.",
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
		text: "The hands-on approach is what I loved the most. We were able to immediately apply the skills learned to real-world examples. Overall, the course is a must-take for any aspiring QA tester looking to grow their skills.",
		time_added: "04/04/2024",
		total_courses_count: 102,
	},
];

type Properties = {
	category: MyReviewCategory;
};

const MyReviewsList: React.FC<Properties> = ({ category }) => {
	return (
		<div className={styles["my-reviews-list"]}>
			<div className={styles["my-reviews-list__header"]}>
				<HeaderList category={category} />
			</div>

			<div className={styles["my-reviews-list__content"]}>
				<ul className={styles["my-reviews-list__list"]}>
					{myReviewsListData.map((review) => (
						<ReviewListItem
							category={category}
							key={review.id}
							review={review}
						/>
					))}
				</ul>
			</div>

			{/* <Pagination pages={12} setCurrentPage={setCurrentPage} /> */}
		</div>
	);
};

export { MyReviewsList };
