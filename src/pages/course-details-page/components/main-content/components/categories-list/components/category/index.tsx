import React from "react";

import styles from "./styles.module.scss";

type CategoryProperties = {
	categoryName: string;
};
const mockSkills = new Array(2).fill("Програмування, розробка");
const Category: React.FC<CategoryProperties> = ({ categoryName }) => {
	return (
		<div>
			<h4>{ categoryName }</h4>
			<ul className={styles["categories_list"]}>
				{mockSkills.map((item) => {
					return <a href="#">{item}</a>;
				})}
			</ul>
		</div>
	);
};

export { Category };
