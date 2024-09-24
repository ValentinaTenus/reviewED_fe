import React from "react";

import { IconName } from "~/common/enums/index";

import { SectionTitle } from "../section-title";
import styles from "./styles.module.scss";

type TargetGroupProperties = {
	targetGroup: string;
};

const TargetGroupSection: React.FC<TargetGroupProperties> = ({
	targetGroup,
}) => {
	return (
		<div className={styles["main_content"]}>
			<SectionTitle iconName={IconName.PEOPLE} title="Для кого:" />
			{targetGroup}
		</div>
	);
};

export { TargetGroupSection };
