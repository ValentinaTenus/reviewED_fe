import clsx from "clsx";
import React from "react";

import { MyReviewCategory } from "~/common/types/my-reviews";

import styles from "./styles.module.scss";

interface Properties {
	category: MyReviewCategory;
	handleClick: (category: MyReviewCategory) => void;
}

const OptionsSection: React.FC<Properties> = ({ category, handleClick }) => {
	return (
		<div className={styles["options-section"]}>
			<ul className={styles["options-section__list"]}>
				{["course", "company"].map((item) => (
					<li
						className={clsx(
							styles["options-section__item"],
							category === item && styles["active"],
						)}
						key={item}
						onClick={() => handleClick(item as MyReviewCategory)}
					>
						Відгуки про {item === "course" ? "курси" : "компанії"}
					</li>
				))}
			</ul>
		</div>
	);
};

export { OptionsSection };
