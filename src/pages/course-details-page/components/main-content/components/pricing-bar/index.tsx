import React from "react";

import { IconName } from "~/common/enums/index";

import { SectionTitle } from "../section-title";
import styles from "./styles.module.scss";

type PricingBarProperties = {
	price: string;
};

const PricingBar: React.FC<PricingBarProperties> = ({ price }) => {
	return (
		<div className={styles["pricing-bar"]}>
			<SectionTitle iconName={IconName.DOLLAR_SIGN} title="Ціна за навчання:" />
			{price}
		</div>
	);
};

export { PricingBar };
