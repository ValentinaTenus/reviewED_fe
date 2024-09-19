import React from "react";

import Image from "~/assets/images/medium-shot-woman-working-with-laptop .png";

import styles from "./styles.module.scss";

const BanerBlock: React.FC = () => {
	return (
		<div className={styles["baner_block"]}>
			<div className={styles["baner_block_text"]}>
				<h1 className={styles["header"]}>
					Тільки перевірені відгуки про{" "}
					<span className={styles["header_yellow_text"]}>
						компанії або курси
					</span>
				</h1>
				<p className={styles["text"]}>
					Ви також можете відіслати свій власний відгук про компанію чи курс.
					Коли ми впевнимось в дійсності Вашої особи, ми його опублікуємо.
				</p>
			</div>
			<div className={styles["baner_block_picture_wrapper"]}>
				<img
					alt="Woman working on laptop"
					className={styles["baner_block_picture"]}
					src={Image}
				/>
			</div>
		</div>
	);
};

export { BanerBlock };
