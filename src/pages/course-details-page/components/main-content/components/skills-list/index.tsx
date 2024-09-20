import React from "react";

import styles from "./styles.module.scss";
import { ListItem } from "./components/list-item";

const mockSkills = new Array(10).fill("Основи тестування ПЗ");
const SkillsList: React.FC = () => {
	return (
		<div>
			<h4 className={styles["skills_header"]}>Навички які ви отримаєте:</h4>
			<ul className={styles["skills_list"]}>
				{mockSkills.map((item, index) => {
					return <ListItem title={item} key={index} />;
				})}
			</ul>
		</div>
	);
};

export { SkillsList };
