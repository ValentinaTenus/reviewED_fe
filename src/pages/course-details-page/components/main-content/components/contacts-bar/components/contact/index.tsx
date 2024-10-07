import React, { ReactNode } from "react";

import { Icon } from "~/common/components";
import { IconName } from "~/common/enums/index";

import styles from "./styles.module.scss";

type ContactProperties = {
	iconName: IconName;
	children?: ReactNode;
};

const Contact: React.FC<ContactProperties> = ({ iconName, children }) => {
	return (
		<div className={styles["contact"]}>
			<Icon className={styles["contact__icon"]} name={iconName} />
			{children}
		</div>
	);
};

export { Contact };
