import React from "react";

import { SectionTitle } from "../section-title";
import styles from "./styles.module.scss";
import { IconName } from "~/common/enums/index";

const TargetGroupSection: React.FC = () => {
	return (
		<div className={styles["main_content"]}>
			<SectionTitle iconName={IconName.PEOPLE} title="Для кого:" />
			Молодша школа, середня школа, студенти, дорослі, пенсіонери
		</div>
	);
};

export { TargetGroupSection };
