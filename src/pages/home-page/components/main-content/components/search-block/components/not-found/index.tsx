import React from "react";

import NotFoundImage from "~/assets/images/not-found.svg?react";

import styles from "./styles.module.scss";

const NotFound: React.FC = () => {
	return (
		<div className={styles["not-found_container"]}>
			<div className={styles["not-found_content"]}>
				<NotFoundImage className={styles["not-found_image"]} />
				<p className={styles["not-found_text"]}>
					За вашим запитом нічого не знайдено
				</p>
			</div>
		</div>
	);
};

export { NotFound };
