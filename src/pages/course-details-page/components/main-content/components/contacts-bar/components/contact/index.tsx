import React from "react";

import { Icon } from "~/common/components";
import { IconName } from "~/common/enums/index";

import styles from "./styles.module.scss";

type ContactProperties = {
	iconName: IconName;
	title: string;
};

const Contact: React.FC<ContactProperties> = ({ iconName, title }) => {
	return (
		<div className={styles["contact"]}>
			<Icon className={styles["contact__icon"]} name={iconName} />
			<p>{title}</p>
		</div>
	);
};

export { Contact };
