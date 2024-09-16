import React from "react";

import BuildingIcon from "~/assets/images/building-4.svg?react";

import styles from "./styles.module.scss";

const FilterSectionText: React.FC = () => {
	return (
		<div className={styles["companies_filter__text_section"]}>
			<h1 className={styles["companies_filter__title"]}>
				Discover Leading Course Provider
			</h1>
			<p className={styles["companies_filter__text"]}>
				Search and compare educational companies. All reviews are verified by
				real students to help you choose wisely
			</p>
			<div className={styles["companies_filter__companies_number"]}>
				<BuildingIcon className={styles["companies_filter__building_icon"]} />
				<p className={styles["companies_filter__number"]}>
					1,000,000 Companies
				</p>
			</div>
		</div>
	);
};

export { FilterSectionText };
