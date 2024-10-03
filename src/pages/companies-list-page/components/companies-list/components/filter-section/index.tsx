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
	onSubmitSearchTerm: (searchTerm: string) => void;
	screenWidth: number;
	searchTerm: string;
	selectedCategoryIds: number[];
};

const FilterSection: React.FC<FilterSectionProperties> = ({
	categories,
	onChangeSearchTerm,
	onChangeSortBy,
	onChooseCategory,
	onSubmitSearchTerm,
	screenWidth,
	searchTerm,
	selectedCategoryIds,
}) => {
	return (
		<div className={styles["companies_filter__container"]}>
			<BreadCrumb items={BreadCrumbPaths} />

			<div className={styles["companies_filter__content"]}>
				<FilterSectionText />
				<div className={styles["companies_filter__search_and_categories"]}>
					<div className={styles["companies_filter__search_bar"]}>
						<SearchBar
							onChangeSearchTerm={onChangeSearchTerm}
							onSubmit={onSubmitSearchTerm}
							placeholder={
								screenWidth > ScreenBreakpoints.MOBILE
									? "Знайди свою ідеальну компанію"
									: "Пошук"
							}
							value={searchTerm}
						/>
						{screenWidth > ScreenBreakpoints.TABLET && (
							<SortDropdown
								className={styles["companies_filter__sort"]}
								name="Сортувати за"
								onChange={onChangeSortBy}
								options={CompaniesSortOptions}
							/>
						)}
					</div>
					<CompaniesCategories
						categories={categories}
						onSelectCategory={onChooseCategory}
						selectedCategoryIds={selectedCategoryIds}
					/>
				</div>
			</div>
		</div>
	);
};

export { FilterSection };
