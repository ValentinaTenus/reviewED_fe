import React from "react";

import { BreadCrumb, SearchBar, SortDropdown } from "~/common/components/index";
import {
	CompaniesSortOptions,
	ScreenBreakpoints,
} from "~/common/constants/index";
import { AppRoute } from "~/common/enums/index";
import { Category, FilterType } from "~/common/types/index";

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

const ZERO = 0;

type FilterSectionProperties = {
	categories: Category[];
	onChangeSearchTerm: (searchTerm: string) => void;
	onChangeSortBy: (sortBy: number | string) => void;
	onChooseCategory: (categoryId: number) => void;
	onSubmitSearchTerm: (searchTerm: string) => void;
	screenWidth: number;
	searchTerm: string;
	selectedCategoryIds: number[];
	selectedSubcategory: FilterType[];
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
	selectedSubcategory,
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
					{selectedSubcategory.length > ZERO && (
						<div className={styles["companies_filter__subcategory"]}>
							<span className={styles["companies_filter__subcategory_title"]}>
								Вибрана підкатегорія:
							</span>{" "}
							{selectedSubcategory[ZERO]?.name}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export { FilterSection };
