import React from "react";

import { Button } from "~/common/components/index";
import { ButtonVariant, CoursesFilterType } from "~/common/enums/index";
import { FilterType } from "~/common/types/index";

import { FilterResultItem } from "./components/filter-result-item";
import styles from "./styles.module.scss";

const ZERO_LENGTH = 0;

type Properties = {
	onClearFilters: () => void;
	onRemoveFilter: (filterType: CoursesFilterType, id: string) => void;
	selectedCategories: FilterType[];
	selectedLocations: FilterType[];
	selectedSubCategories: FilterType[];
};

const FilterResultItems: React.FC<Properties> = ({
	onClearFilters,
	onRemoveFilter,
	selectedCategories,
	selectedLocations,
	selectedSubCategories,
}) => {
	const filtersLength =
		selectedLocations.length +
		selectedSubCategories.length +
		selectedCategories.length;

	if (filtersLength === ZERO_LENGTH) {
		return null;
	}

	return (
		<div className={styles["filter_items__container"]}>
			{selectedLocations.map((filter, index) => (
				<FilterResultItem
					filter={filter}
					filterType={CoursesFilterType.LOCATIONS}
					key={index}
					onRemoveFilter={onRemoveFilter}
				/>
			))}
			{selectedCategories.map((filter, index) => (
				<FilterResultItem
					filter={filter}
					filterType={CoursesFilterType.CATEGORIES}
					key={index}
					onRemoveFilter={onRemoveFilter}
				/>
			))}
			{selectedSubCategories.map((filter, index) => (
				<FilterResultItem
					filter={filter}
					filterType={CoursesFilterType.SUBCATEGORIES}
					key={index}
					onRemoveFilter={onRemoveFilter}
				/>
			))}
			{filtersLength > ZERO_LENGTH && (
				<Button
					className={styles["clear_filters__button"]}
					onClick={onClearFilters}
					variant={ButtonVariant.DEFAULT}
				>
					<span className={styles["clear_filters__button_text"]}>
						Очистити все{" "}
					</span>
				</Button>
			)}
		</div>
	);
};

export { FilterResultItems };
