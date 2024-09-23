import React from "react";

import { IconName } from "~/common/enums/index";

import { SectionTitle } from "../section-title";
import styles from "./styles.module.scss";

const PricingBar: React.FC = () => {
	return (
		<div className={styles["main_content"]}>
			<SectionTitle iconName={IconName.DOLLAR_SIGN} title="Ціна за навчання" />2
			000 грн (місяць)
		</div>
	);
};

export { PricingBar };