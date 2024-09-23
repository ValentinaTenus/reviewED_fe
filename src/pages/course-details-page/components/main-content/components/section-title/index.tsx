import React from "react";

import { Icon } from "~/common/components";
import { IconName } from "~/common/enums/index";

import styles from "./styles.module.scss";

type SectionTitleProperties = {
	iconName: IconName;
	title: string;
};

const SectionTitle: React.FC<SectionTitleProperties> = ({
	iconName,
	title,
}) => {
	return (
		<span className={styles["main_content"]}>
			<Icon name={iconName} />
			{title}
		</span>
	);
};

export { SectionTitle };
