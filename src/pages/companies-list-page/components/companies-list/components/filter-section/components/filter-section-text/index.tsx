import React from "react";

import BuildingIcon from "~/assets/images/building-4.svg?react";

import styles from "./styles.module.scss";

const FilterSectionText: React.FC = () => {
	return (
		<div className={styles["companies_filter__text_section"]}>
			<h1 className={styles["companies_filter__title"]}>
				Відкрийте для себе провідного постачальника курсів
			</h1>
			<p className={styles["companies_filter__text"]}>
				Шукайте та порівнюйте навчальні компанії. Усі відгуки перевірені
				реальними студентами, щоб допомогти вам зробити правильний вибір.
			</p>
			<div className={styles["companies_filter__companies_number"]}>
				<BuildingIcon className={styles["companies_filter__building_icon"]} />
				<p className={styles["companies_filter__number"]}>1,000,000 Компаній</p>
			</div>
		</div>
	);
};

export { FilterSectionText };
