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
		label: "Головна сторінка",
		path: AppRoute.ROOT,
	},
	{
		label: "Компанії",
	},
];

type FilterSectionProperties = {
	categories: Category[];
	onChangeSearchTerm: (searchTerm: string) => void;
	onChangeSortBy: (sortBy: number | string) => void;
	onChooseCategory: (categoryId: number) => void;
	screenWidth: number;
	searchTerm: string;
	selectedCategoryId: number;
};

const FilterSection: React.FC<FilterSectionProperties> = ({
	categories,
	onChangeSearchTerm,
	onChangeSortBy,
	onChooseCategory,
	screenWidth,
	searchTerm,
	selectedCategoryId,
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
							placeholder="Знайди свою ідеальну компанію"
							value={searchTerm}
						/>
						{screenWidth > ScreenBreakpoints.TABLET && (
							<SortDropdown
								name="Сортувати за"
								onChange={onChangeSortBy}
								options={CompaniesSortOptions}
							/>
						)}
					</div>
					<CompaniesCategories
						categories={categories}
						onSelectCategory={onChooseCategory}
						selectedCategoryId={selectedCategoryId}
					/>
				</div>
			</div>
		</div>
	);
};

export { FilterSection };
