import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React, { useCallback, useEffect, useState } from "react";

import { Pagination, Spinner } from "~/common/components/index";
import { ScreenBreakpoints } from "~/common/constants/index";
import {
	CompaniesPerPageListView,
	CompaniesPerPageTableView,
	SpinnerVariant,
	ViewStyle,
} from "~/common/enums/index";
import { Category } from "~/common/types/index";
import { NotFound } from "~/pages/home-page/components/main-content/components/search-block/components";
import { useGetCategoriesQuery } from "~/redux/categories/categories-api";
import { useGetCompaniesByFilterQuery } from "~/redux/companies/companies-api";
import { setFilters } from "~/redux/companies/companies-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks.type";

import {
	FilteredCompaniesList,
	FilterSection,
	ReviewsSection,
} from "./components/index";
import styles from "./styles.module.scss";

const DEFAULT_SCREEN_WIDTH = 0;
const ALL_CATEGORIES_ID = 0;
const DEFAULT_PAGE_COUNT = 0;
const DEFAULT_COMPANIES_PER_PAGE = 12;
const DEFAULT_CURRENT_PAGE = 1;
const INDEX_ONE = 1;
const ZERO_LENGTH = 0;

const CompaniesContent: React.FC = () => {
	const dispatch = useAppDispatch();
	const { filters } = useAppSelector((state) => state.companies);
	const { user } = useAppSelector((state) => state.auth);

	const [searchTerm, setSearchTerm] = useState(filters?.name || "");
	const [pageCount, setPageCount] = useState(DEFAULT_PAGE_COUNT);
	const [sortBy, setSortBy] = useState<string>("");
	const [selectedCategoryId, setSelectedCategoryId] =
		useState<number>(ALL_CATEGORIES_ID);

	const [screenWidth, setScreenWidth] = useState<number>(DEFAULT_SCREEN_WIDTH);
	const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);
	const [companiesPerPage, setCompaniesPerPage] = useState(
		DEFAULT_COMPANIES_PER_PAGE,
	);
	const [viewStyle, setViewStyle] = useState(ViewStyle.TABLE);
	const [serverError, setServerError] = useState("");

	const { data: categories } = useGetCategoriesQuery(undefined);
	const {
		data: companiesFromApi,
		error,
		isLoading: isCompaniesLoading,
	} = useGetCompaniesByFilterQuery(
		{
			category_by_id:
				selectedCategoryId === ALL_CATEGORIES_ID
					? undefined
					: selectedCategoryId,
			city: filters?.city,
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
					? CompaniesPerPageTableView.LARGE_SCREEN
					: CompaniesPerPageTableView.SMALL_SCREEN;
		} else {
			companiesPerPage =
				screenWidth >= ScreenBreakpoints.DESKTOP
					? CompaniesPerPageListView.LARGE_SCREEN
					: CompaniesPerPageListView.SMALL_SCREEN;
		}

		setCompaniesPerPage(companiesPerPage);

		if (companiesFromApi?.count) {
			setPageCount(Math.ceil(companiesFromApi.count / companiesPerPage));
		}
	}, [viewStyle, screenWidth, companiesFromApi?.count]);

	const handleViewChange = useCallback(
		(newViewStyle: ViewStyle) => {
			setViewStyle(newViewStyle);
			setCurrentPage(DEFAULT_CURRENT_PAGE);
			updateCompaniesPerPageAndPageCount();
		},
		[updateCompaniesPerPageAndPageCount],
	);

	const handleChangeSearchTerm = useCallback(
		(newSearchTerm: string) => {
			setSearchTerm(newSearchTerm);
			void dispatch(setFilters({ city: "" }));
		},
		[dispatch],
	);

	const handleChangeSortBy = useCallback((newSortBy: number | string) => {
		setSortBy(newSortBy.toString());
	}, []);

	const handleChooseCategory = useCallback(
		(chosenCategoryId: number) => {
			setSelectedCategoryId(chosenCategoryId);
			void dispatch(setFilters({ city: "" }));
			setCurrentPage(DEFAULT_CURRENT_PAGE);
		},
		[dispatch],
	);

	const updateScreenWidth = () => {
		const screenWidth = window.innerWidth;
		setScreenWidth(screenWidth);
	};

	useEffect(() => {
		updateCompaniesPerPageAndPageCount();
	}, [
		companiesFromApi,
		viewStyle,
		screenWidth,
		updateCompaniesPerPageAndPageCount,
	]);

	useEffect(() => {
		const loadError = (error as FetchBaseQueryError)?.data
			? ((error as FetchBaseQueryError).data as Error)
			: { message: "Невідома помилка" };
		setServerError(loadError.message);
	}, [error]);

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
					searchTerm={searchTerm}
					selectedCategoryId={selectedCategoryId}
				/>
			)}
			{isCompaniesLoading && (
				<div className={styles["spinner"]}>
					<Spinner variant={SpinnerVariant.MEDIUM} />
				</div>
			)}
			{!error &&
				!isCompaniesLoading &&
				companiesFromApi &&
				companiesFromApi?.results.length > ZERO_LENGTH && (
					<>
						<FilteredCompaniesList
							companies={companiesFromApi?.results}
							onChangeSortBy={handleChangeSortBy}
							onChangeViewStyle={handleViewChange}
							viewStyle={viewStyle}
						/>
						<Pagination
							defaultCurrentPage={currentPage}
							pages={pageCount}
							setCurrentPage={setCurrentPage}
						/>
					</>
				)}
			{!error &&
				!isCompaniesLoading &&
				companiesFromApi &&
				companiesFromApi?.results.length === ZERO_LENGTH && (
					<div className={styles["not_found__container"]}>
						<NotFound />
					</div>
				)}
			{error && <div className={styles["error"]}>{serverError}</div>}
			{user && user.id && (
				<ReviewsSection screenWidth={screenWidth} userId={user.id} />
			)}
		</div>
	);
};

export { CompaniesContent };
