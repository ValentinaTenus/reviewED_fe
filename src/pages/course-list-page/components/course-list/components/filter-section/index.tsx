import React, { useCallback, useEffect, useState } from "react";

import { BreadCrumb, SearchBar } from "~/common/components/index";
import { AppRoute } from "~/common/enums/index";
import { type FilterType } from "~/common/types/index";

import { FilterModal } from "./components/index";
import styles from "./styles.module.scss";

const BreadCrumbPaths = [
	{ label: "Головна сторінка", path: AppRoute.ROOT },
	{ label: "Курси", path: AppRoute.ALL_COURSES },
];

const DEFAULT_FILTER_LENGTH = 0;

type FilterSectionProperties = {
	onApplyFiltersAndSearch: () => void;
	onChangeSearchTerm: (searchTerm: string) => void;
	onChooseLocation: (locations: FilterType[]) => void;
	onChooseSubCategory: (subcategories: FilterType[]) => void;
	onClearFilters: () => void;
	searchTerm: string;
	selectedLocations: FilterType[];
	selectedSubCategories: FilterType[];
};

const FilterSection: React.FC<FilterSectionProperties> = ({
	onApplyFiltersAndSearch,
	onChangeSearchTerm,
	onChooseLocation,
	onChooseSubCategory,
	onClearFilters,
	searchTerm,
	selectedLocations,
	selectedSubCategories,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [filterLenght, setFilterLenght] = useState<number>(
		DEFAULT_FILTER_LENGTH,
	);

	const handleOpenFilter = useCallback(() => {
		setIsOpen(true);
	}, []);

	const handleCloseFilter = useCallback(() => {
		setIsOpen(false);
	}, []);

	useEffect(() => {
		setFilterLenght(selectedLocations.length + selectedSubCategories.length);
	}, [selectedLocations, selectedSubCategories]);

	return (
		<div className={styles["course_filter__container"]}>
			<BreadCrumb items={BreadCrumbPaths} />
			<SearchBar
				filtersLength={filterLenght}
				isFilterButton
				onOpenFilter={handleOpenFilter}
				onSubmit={onChangeSearchTerm}
				placeholder="Find your perfect course"
				value={searchTerm}
			/>
			{isOpen && (
				<FilterModal
					isOpen={isOpen}
					onApplyFiltersAndSearch={onApplyFiltersAndSearch}
					onChooseLocation={onChooseLocation}
					onChooseSubCategory={onChooseSubCategory}
					onClearFilters={onClearFilters}
					onClose={handleCloseFilter}
					selectedLocations={selectedLocations}
					selectedSubCategories={selectedSubCategories}
				/>
			)}
		</div>
	);
};

export { FilterSection };
