import React, { useCallback, useEffect, useState } from "react";

import { Pagination } from "~/common/components/index";
import { ScreenBreakpoints } from "~/common/constants/index";
import { ViewStyle } from "~/common/enums/index";
import { Category } from "~/common/types/index";
import { useGetCategoriesQuery } from "~/redux/categories/categories-api";
import { useGetCompaniesByFilterQuery } from "~/redux/companies/companies-api";

import { FilteredCompaniesList, FilterSection } from "./components/index";
import styles from "./styles.module.scss";

const DEFAULT_SCREEN_WIDTH = 0;
const ALL_CATEGORIES_ID = 0;
const DEFAULT_PAGE_COUNT = 0;
const DEFAULT_COMPANIES_PER_PAGE = 12;
const DEFAULT_CURRENT_PAGE = 1;
const INDEX_ONE = 1;

enum TableCompaniesPerPage {
	LARGE_SCREEN = 12,
	SMALL_SCREEN = 10,
}

enum ListCompaniesPerPage {
	LARGE_SCREEN = 10,
	SMALL_SCREEN = 5,
}

const CompaniesContent: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [sortBy, setSortBy] = useState<string>("");
	const [selectedCategoryId, setSelectedCategoryId] =
		useState<number>(ALL_CATEGORIES_ID);

	const [screenWidth, setScreenWidth] = useState<number>(DEFAULT_SCREEN_WIDTH);

	const [pageCount, setPageCount] = useState(DEFAULT_PAGE_COUNT);
	const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);
	const [companiesPerPage, setCompaniesPerPage] = useState(
		DEFAULT_COMPANIES_PER_PAGE,
	);

	const [viewStyle, setViewStyle] = useState(ViewStyle.TABLE);

	const { data: categories } = useGetCategoriesQuery(undefined);
	const { data: getCompaniesResponse, refetch } = useGetCompaniesByFilterQuery(
		{
			category_by_id:
				selectedCategoryId === ALL_CATEGORIES_ID
					? undefined
					: selectedCategoryId,
			limit: companiesPerPage,
			name: searchTerm,
			offset: (currentPage - INDEX_ONE) * companiesPerPage,
			sort: sortBy,
		},
		{
			refetchOnMountOrArgChange: true,
		},
	);

	const updateCompaniesPerPageAndPageCount = useCallback(() => {
		let companiesPerPage;

		if (viewStyle === ViewStyle.TABLE) {
			companiesPerPage =
				screenWidth >= ScreenBreakpoints.TABLET
					? TableCompaniesPerPage.LARGE_SCREEN
					: TableCompaniesPerPage.SMALL_SCREEN;
		} else {
			companiesPerPage =
				screenWidth >= ScreenBreakpoints.DESKTOP
					? ListCompaniesPerPage.LARGE_SCREEN
					: ListCompaniesPerPage.SMALL_SCREEN;
		}

		setCompaniesPerPage(companiesPerPage);

		if (getCompaniesResponse?.count) {
			setPageCount(Math.ceil(getCompaniesResponse.count / companiesPerPage));
		}
	}, [viewStyle, screenWidth, getCompaniesResponse?.count]);

	const handleViewChange = useCallback(
		(newViewStyle: ViewStyle) => {
			setViewStyle(newViewStyle);
			setCurrentPage(DEFAULT_CURRENT_PAGE);
			updateCompaniesPerPageAndPageCount();
		},
		[updateCompaniesPerPageAndPageCount],
	);

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
		updateCompaniesPerPageAndPageCount();
	}, [
		getCompaniesResponse,
		viewStyle,
		screenWidth,
		updateCompaniesPerPageAndPageCount,
	]);

	useEffect(() => {
		refetch();
	}, [currentPage, refetch]);

	useEffect(() => {
		updateScreenWidth();
		window.addEventListener("resize", updateScreenWidth);

		return () => window.removeEventListener("resize", updateScreenWidth);
	}, []);

	const allCategories: Category[] = categories
		? [{ id: 0, name: "All", subcategories: [] }, ...categories]
		: [];

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
					onChangeViewStyle={handleViewChange}
					viewStyle={viewStyle}
				/>
			)}
			<Pagination pages={pageCount} setCurrentPage={setCurrentPage} />
		</div>
	);
};

export { CompaniesContent };
