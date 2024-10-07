import React, { ReactNode } from "react";

import { Icon } from "~/common/components";
import { IconName } from "~/common/enums/index";

import styles from "./styles.module.scss";

type ContactProperties = {
	children?: ReactNode;
	iconName: IconName;
};

const Contact: React.FC<ContactProperties> = ({ children, iconName }) => {
	return (
		<div className={styles["contact"]}>
			<Icon className={styles["contact__icon"]} name={iconName} />
			{children}
		</div>
	);
};

export { Contact };
