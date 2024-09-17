import React from "react";

import { BreadCrumb, SearchBar, SortDropdown } from "~/common/components/index";
import {
	CompaniesSortOptions,
	ScreenBreakpoints,
} from "~/common/constants/index";
import { AppRoute } from "~/common/enums/index";
import { Category } from "~/common/types/index";

import { CompaniesCategories, FilterSectionText } from "./components/index";
import styles from "./styles.module.scss";

const BreadCrumbPaths = [
	{
		label: "Main page",
		path: AppRoute.ROOT,
	},
	{
		label: "Companies",
	},
];

type FilterSectionProperties = {
	categories: Category[];
	onChangeSearchTerm: (searchTerm: string) => void;
	onChangeSortBy: (sortBy: number | string) => void;
	onChooseCategory: (categoryId: number) => void;
	screenWidth: number;
	selectedCategoriesIds: number[];
};

const FilterSection: React.FC<FilterSectionProperties> = ({
	categories,
	onChangeSearchTerm,
	onChangeSortBy,
	onChooseCategory,
	screenWidth,
	selectedCategoriesIds,
}) => {
	return (
		<div className={styles["companies_filter__container"]}>
			<BreadCrumb items={BreadCrumbPaths} />

			<div className={styles["companies_filter__content"]}>
				<FilterSectionText />
				<div className={styles["companies_filter__search_and_categories"]}>
					<div className={styles["companies_filter__search_bar"]}>
						<SearchBar
							onSubmit={onChangeSearchTerm}
							placeholder="Find your perfect company"
						/>
						{screenWidth > ScreenBreakpoints.TABLET && (
							<SortDropdown
								name="sort"
								onChange={onChangeSortBy}
								options={CompaniesSortOptions}
							/>
						)}
					</div>
					<CompaniesCategories
						categories={categories}
						onSelectCategory={onChooseCategory}
						selectedCategoriesIds={selectedCategoriesIds}
					/>
				</div>
			</div>
		</div>
	);
};

export { FilterSection };
