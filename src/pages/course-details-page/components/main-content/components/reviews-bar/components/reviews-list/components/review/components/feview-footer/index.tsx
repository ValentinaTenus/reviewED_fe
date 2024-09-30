import React from "react";

import styles from "./styles.module.scss";


type ReviewFooterProperties = {
	
};

const ReviewFooter: React.FC<ReviewFooterProperties> = ({  }) => {
	return (
		<div className={styles["review-footer"]}>
	That's a review-footer
		</div>
	);
};

export { ReviewFooter };
