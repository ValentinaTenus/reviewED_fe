import React, { useCallback, useEffect, useState } from "react";

import { Category } from "~/common/types";
import { useGetCategoriesQuery } from "~/redux/categories/categories-api";
import { useGetCompaniesByFilterQuery } from "~/redux/companies/companies-api";

import { FilteredCompaniesList, FilterSection } from "./components/index";
import styles from "./styles.module.scss";

const DEFAULT_SCREEN_WIDTH = 0;
const ALL_CATEGORIES_ID = 0;

const CompaniesContent: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [sortBy, setSortBy] = useState<string>("");
	const [selectedCategoriesIds, setSelectedCategoriesIds] = useState<number[]>(
		[],
	);
	const { data: categories } = useGetCategoriesQuery(undefined);
	const { data: companies } = useGetCompaniesByFilterQuery(
		{
			categories:
				selectedCategoriesIds.length &&
				!selectedCategoriesIds.includes(ALL_CATEGORIES_ID)
					? selectedCategoriesIds
					: undefined,
			name: searchTerm,
			sort: sortBy,
		},
		{
			refetchOnMountOrArgChange: true,
		},
	);

	const allCategories: Category[] = categories
		? [{ id: 0, name: "All", subcategories: [] }, ...categories]
		: [];

	const [screenWidth, setScreenWidth] = useState<number>(DEFAULT_SCREEN_WIDTH);

	const handleChangeSearchTerm = useCallback((newSearchTerm: string) => {
		setSearchTerm(newSearchTerm);
	}, []);

	const handleChangeSortBy = useCallback((newSortBy: number | string) => {
		setSortBy(newSortBy.toString());
	}, []);

	const handleChooseCategory = useCallback(
		(chosenCategoryId: number) => {
			if (chosenCategoryId === ALL_CATEGORIES_ID) {
				setSelectedCategoriesIds([ALL_CATEGORIES_ID]);
			} else {
				if (selectedCategoriesIds.includes(ALL_CATEGORIES_ID)) {
					setSelectedCategoriesIds([chosenCategoryId]);
				} else {
					const isChosen = selectedCategoriesIds.includes(chosenCategoryId);
					if (isChosen) {
						const newSelectedCategories = selectedCategoriesIds.filter(
							(categoryId) => categoryId !== chosenCategoryId,
						);
						setSelectedCategoriesIds(newSelectedCategories);
					} else {
						setSelectedCategoriesIds((selectedCategoriesIds) => [
							...selectedCategoriesIds,
							chosenCategoryId,
						]);
					}
				}
			}
		},
		[selectedCategoriesIds],
	);

	const updateScreenWidth = () => {
		const screenWidth = window.innerWidth;
		setScreenWidth(screenWidth);
	};

	useEffect(() => {
		updateScreenWidth();
		window.addEventListener("resize", updateScreenWidth);

		return () => window.removeEventListener("resize", updateScreenWidth);
	}, []);

	return (
		<div className={styles["companies_list__container"]}>
			{categories && (
				<FilterSection
					categories={allCategories}
					onChangeSearchTerm={handleChangeSearchTerm}
					onChangeSortBy={handleChangeSortBy}
					onChooseCategory={handleChooseCategory}
					screenWidth={screenWidth}
					selectedCategoriesIds={selectedCategoriesIds}
				/>
			)}
			{companies && (
				<FilteredCompaniesList
					companies={companies}
					onChangeSortBy={handleChangeSortBy}
				/>
			)}
		</div>
	);
};

export { CompaniesContent };
