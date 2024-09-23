import React from "react";

import styles from "./styles.module.scss";

type CategoryProperties = {
	categoryName: string;
};
const mockSkills = new Array(1).fill("Програмування, розробка");
const Category: React.FC<CategoryProperties> = ({ categoryName }) => {
	return (
		<div>
			<h4 className={styles["categories_header"]}>{categoryName}</h4>
			<ul className={styles["categories_list"]}>
				{mockSkills.map((item, index) => {
					return (
						<li className={styles["categories_item"]}>
							<a href="#">{item}</a>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export { Category };
