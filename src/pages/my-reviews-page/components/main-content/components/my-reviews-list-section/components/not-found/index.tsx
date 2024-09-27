import React from "react";

import NotFoundImage from "~/assets/images/not-found.svg?react";

import styles from "./styles.module.scss";

const NotFound: React.FC = () => {
	return (
		<div className={styles["not-found_container"]}>
			<div className={styles["not-found_content"]}>
				<h2>Reviews posted</h2>

				<NotFoundImage className={styles["not-found_image"]} />

				<h4>You haven’t submitted any Review</h4>
				<p className={styles["not-found_text"]}>
					When you leave a Review for moderation, they will be shown here.
				</p>
			</div>
		</div>
	);
};

export { NotFound };
