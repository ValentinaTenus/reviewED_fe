import { forwardRef } from "react";

import { Review } from "~/common/types";
import globalStyles from "~/pages/company-details-page/components/company-details/styles.module.scss";

import { ReviewCard } from "./components/review-card";
import styles from "./styles.module.scss";

// eslint-disable-next-line react/display-name
const Reviews = forwardRef<HTMLDivElement, { reviews: Review[] | undefined }>(
	({ reviews }, ref) => {
		const MIN_REVIEWS = 0;

		if (reviews?.length != MIN_REVIEWS) {
			return (
				<div className={styles["reviews"]} ref={ref}>
					<h2 className={styles["reviews_heading"]}>Відгуки</h2>
					{reviews?.map((review, index) => (
						<div className={styles["review"]} key={index}>
							<ReviewCard review={review} />
						</div>
					))}
				</div>
			);
		} else {
			return (
				<div className={styles["no-reviews_container"]}>
					<h2 className={styles["reviews_heading"]}>Відгуки</h2>
					<div className={styles["no-reviews"]}>
						<img
							alt="no reviews image"
							className={styles["no-reviews_image"]}
							src="/src/assets/images/no-reviews.png"
						/>
						<h4 className={styles["no-reviews_title"]}>
							Тут ще ніхто не залишив відгук
						</h4>
						<p className={globalStyles["body-r"]}>
							Станьте першим, хто поділиться враженням!
						</p>
					</div>
				</div>
			);
		}
	},
);

export { Reviews };
