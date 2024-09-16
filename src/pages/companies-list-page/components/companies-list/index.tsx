import React, { useCallback, useEffect, useState } from "react";

import { useGetCategoriesQuery } from "~/redux/categories/categories-api";
import { useGetCompaniesByFilterQuery } from "~/redux/companies/companies-api";

import { FilteredCompaniesList, FilterSection } from "./components/index";
import styles from "./styles.module.scss";

const DEFAULT_SCREEN_WIDTH = 0;

const CompaniesContent: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [sortBy, setSortBy] = useState<string>("");
	const [selectedCategoriesIds, setSelectedCategoriesIds] = useState<number[]>(
		[],
	);

	const { data: categories } = useGetCategoriesQuery(undefined);
	const { data: companies } = useGetCompaniesByFilterQuery(
		{
			name: searchTerm,
			sort: sortBy,
		},
		{
			refetchOnMountOrArgChange: true,
		},
	);

	const [screenWidth, setScreenWidth] = useState<number>(DEFAULT_SCREEN_WIDTH);

	const handleChangeSearchTerm = useCallback((newSearchTerm: string) => {
		setSearchTerm(newSearchTerm);
	}, []);

	const handleChangeSortBy = useCallback((newSortBy: number | string) => {
		setSortBy(newSortBy.toString());
	}, []);

	const handleChooseCategory = useCallback(
		(chosenCategoryId: number) => {
			const isChosen = selectedCategoriesIds.find(
				(categoryId) => categoryId === chosenCategoryId,
			);

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
					categories={categories}
					onChangeSearchTerm={handleChangeSearchTerm}
					onChangeSortBy={handleChangeSortBy}
					onChooseCategory={handleChooseCategory}
					screenWidth={screenWidth}
				/>
			)}
			{companies && <FilteredCompaniesList companies={companies} />}
		</div>
	);
};

export { CompaniesContent };
