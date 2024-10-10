import React from "react";

import NotFoundImage from "~/assets/images/not-found.svg?react";

import styles from "./styles.module.scss";

const NotFound: React.FC = () => {
	return (
		<div className={styles["not-found_container"]}>
			<div className={styles["not-found_content"]}>
				<h2>Відгуки надіслані</h2>

				<NotFoundImage className={styles["not-found_image"]} />

				<h4>Ви не надіслали жодного відгуку</h4>
				<p className={styles["not-found_text"]}>
					Коли ви залишите відгук для модерації, вони будуть показані тут.
				</p>
			</div>
		</div>
	);
};

export { NotFound };
