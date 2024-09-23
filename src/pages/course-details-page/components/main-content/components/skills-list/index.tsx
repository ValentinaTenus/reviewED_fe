import React from "react";

import { ListItem } from "./components/list-item";
import styles from "./styles.module.scss";

const mockSkills = new Array(10).fill("Основи тестування ПЗ");
const SkillsList: React.FC = () => {
	return (
		<div>
			<h4 className={styles["skills_header"]}>Навички які ви отримаєте:</h4>
			<ul className={styles["skills_list"]}>
				{mockSkills.map((item, index) => {
					return <ListItem key={index} title={item} />;
				})}
			</ul>
		</div>
	);
};

export { SkillsList };
