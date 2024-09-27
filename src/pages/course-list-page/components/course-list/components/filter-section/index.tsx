import React, { useCallback, useState } from "react";

import { BreadCrumb, SearchBar, SortDropdown } from "~/common/components/index";
import { CoursesSortOptions } from "~/common/constants/index";
import { AppRoute } from "~/common/enums/index";
import { Category } from "~/common/types/index";

import { FilterModal } from "./components/index";
import styles from "./styles.module.scss";

const BreadCrumbPaths = [
	{ label: "Головна сторінка", path: AppRoute.ROOT },
	{ label: "Курси", path: AppRoute.ALL_COURSES },
];

type FilterSectionProperties = {
	categories: Category[];
	onChangeSearchTerm: (searchTerm: string) => void;
	onChangeSortBy: (sortBy: number | string) => void;
	onChooseLocation: (locations: string[]) => void;
	onChooseSubCategory: (subcategories: string[]) => void;
	screenWidth: number;
	searchTerm: string;
};

const FilterSection: React.FC<FilterSectionProperties> = ({
	onChangeSearchTerm,
	onChangeSortBy,
	onChooseLocation,
	onChooseSubCategory,
	searchTerm,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleOpenFilter = useCallback(() => {
		setIsOpen(true);
	}, []);

	const handleCloseFilter = useCallback(() => {
		setIsOpen(false);
	}, []);

	return (
		<div className={styles["course_filter__container"]}>
			<BreadCrumb items={BreadCrumbPaths} />
			<SearchBar
				filtersLength={3}
				isFilterButton
				onOpenFilter={handleOpenFilter}
				onSubmit={onChangeSearchTerm}
				placeholder="Find your perfect course"
				value={searchTerm}
			/>
			{isOpen && (
				<FilterModal
					isOpen={isOpen}
					onChooseLocation={onChooseLocation}
					onChooseSubCategory={onChooseSubCategory}
					onClose={handleCloseFilter}
				/>
			)}
			<SortDropdown
				name="sort"
				onChange={onChangeSortBy}
				options={CoursesSortOptions}
			/>
		</div>
	);
};

export { FilterSection };
