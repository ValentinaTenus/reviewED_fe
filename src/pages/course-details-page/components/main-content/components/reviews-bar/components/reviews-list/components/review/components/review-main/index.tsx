import React from "react";

import styles from "./styles.module.scss";


type ReviewMainProperties = {
	text: string;
};

const ReviewMain: React.FC<ReviewMainProperties> = ({ text }) => {
	return (
		<div className={styles["review__main"]}>
			<section className={styles["review__text"]}>{text}</section>
	
		</div>
	);
};

export { ReviewMain };
