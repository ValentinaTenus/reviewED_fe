import React, { useCallback, useEffect, useState } from "react";

import { Pagination } from "~/common/components";
import { Category } from "~/common/types";
import { useGetCategoriesQuery } from "~/redux/categories/categories-api";
import { useGetCompaniesByFilterQuery } from "~/redux/companies/companies-api";

import { FilteredCompaniesList, FilterSection } from "./components/index";
import styles from "./styles.module.scss";

const DEFAULT_SCREEN_WIDTH = 0;
const ALL_CATEGORIES_ID = 0;
const DEFAULT_PAGE_NUMBER = 0;
const DEFAULT_COMPANIES_PER_PAGE = 10;
const DEFAULT_CURRENT_PAGE = 1;

const CompaniesContent: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [sortBy, setSortBy] = useState<string>("");
	const [selectedCategoryId, setSelectedCategoryId] =
		useState<number>(ALL_CATEGORIES_ID);
	const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);
	const [companiesPerPage] = useState(DEFAULT_COMPANIES_PER_PAGE);

	const { data: categories } = useGetCategoriesQuery(undefined);
	const { data: getCompaniesResponse, refetch } = useGetCompaniesByFilterQuery(
		{
			category_by_id:
				selectedCategoryId === ALL_CATEGORIES_ID
					? undefined
					: selectedCategoryId,
			name: searchTerm,
			page: currentPage,
			sort: sortBy,
		},
		{
			refetchOnMountOrArgChange: true,
		},
	);

	const howManyPages = Math.ceil(
		(getCompaniesResponse?.count || DEFAULT_PAGE_NUMBER) / companiesPerPage,
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

	const handleChooseCategory = useCallback((chosenCategoryId: number) => {
		setSelectedCategoryId(chosenCategoryId);
	}, []);

	const updateScreenWidth = () => {
		const screenWidth = window.innerWidth;
		setScreenWidth(screenWidth);
	};

	useEffect(() => {
		refetch();
	}, [currentPage, refetch]);

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
					selectedCategoryId={selectedCategoryId}
				/>
			)}
			{getCompaniesResponse?.results && (
				<FilteredCompaniesList
					companies={getCompaniesResponse.results}
					onChangeSortBy={handleChangeSortBy}
				/>
			)}
			<Pagination pages={howManyPages} setCurrentPage={setCurrentPage} />
		</div>
	);
};

export { CompaniesContent };
