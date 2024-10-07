import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { Pagination, Spinner } from "~/common/components/index";
import { ScreenBreakpoints } from "~/common/constants/index";
import {
	CompaniesPerPageListView,
	CompaniesPerPageTableView,
	SpinnerVariant,
	ViewStyle,
} from "~/common/enums/index";
import { useGetScreenWidth } from "~/common/hooks";
import { Category, FilterType } from "~/common/types/index";
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

	const categoriesFilter =
		filters?.category_by_id && filters?.category_by_id?.length > ZERO_LENGTH
			? filters?.category_by_id.map((c) => +c.id)
			: null;

	const [searchTerm, setSearchTerm] = useState(filters?.name || "");
	const [pageCount, setPageCount] = useState(DEFAULT_PAGE_COUNT);
	const [sortBy, setSortBy] = useState<string>("");
	const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>(
		categoriesFilter ?? [ALL_CATEGORIES_ID],
	);
	const [selectedSubCategoryIds, setSelectedSubCategoryIds] = useState<
		FilterType[]
	>(filters?.subcategory_by_id ?? []);
	const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);
	const [companiesPerPage, setCompaniesPerPage] = useState(
		DEFAULT_COMPANIES_PER_PAGE,
	);
	const [viewStyle, setViewStyle] = useState(ViewStyle.TABLE);
	const [serverError, setServerError] = useState("");

	const listRef = useRef<HTMLDivElement>(null);

	const screenWidth = useGetScreenWidth();

	const { data: categories } = useGetCategoriesQuery(undefined);
	const {
		data: companiesFromApi,
		error,
		isLoading: isCompaniesLoading,
	} = useGetCompaniesByFilterQuery(
		{
			category_by_id: selectedCategoryIds.filter(
				(sc) => sc !== ALL_CATEGORIES_ID,
			),
			city: filters?.city,
			limit: companiesPerPage,
			name: searchTerm,
			offset: (currentPage - INDEX_ONE) * companiesPerPage,
			sort: sortBy,
			subcategory_by_id: selectedSubCategoryIds.map((sc) => +sc.id),
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

		if (listRef.current) {
			window.scrollTo({
				behavior: "smooth",
				top: listRef.current.offsetTop,
			});
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

	const handleChangeSortBy = useCallback((newSortBy: number | string) => {
		setSortBy(newSortBy.toString());
	}, []);

	const handleChooseCategory = useCallback(
		(chosenCategoryId: number) => {
			setSelectedSubCategoryIds([]);

			if (chosenCategoryId === ALL_CATEGORIES_ID) {
				setSelectedCategoryIds([ALL_CATEGORIES_ID]);
			} else if (selectedCategoryIds.includes(ALL_CATEGORIES_ID)) {
				setSelectedCategoryIds([chosenCategoryId]);
			} else if (selectedCategoryIds.includes(chosenCategoryId)) {
				const newCategories = selectedCategoryIds.filter(
					(id) => id !== chosenCategoryId,
				);
				setSelectedCategoryIds(newCategories);
			} else {
				setSelectedCategoryIds([...selectedCategoryIds, chosenCategoryId]);
			}

			void dispatch(setFilters({ city: "" }));
			setCurrentPage(DEFAULT_CURRENT_PAGE);
		},
		[dispatch, selectedCategoryIds],
	);

	const handleSubmitSearchTerm = useCallback(
		(newSearchTerm: string) => {
			setSearchTerm(newSearchTerm);
			void dispatch(setFilters({ city: "" }));
		},
		[dispatch],
	);

	const handleChangeSearchTerm = useCallback(
		(newSearchTerm: string) => {
			if (newSearchTerm.trim() === "") {
				setSearchTerm(newSearchTerm);
				void dispatch(setFilters({ city: "" }));
			}
		},
		[dispatch],
	);

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
					onSubmitSearchTerm={handleSubmitSearchTerm}
					screenWidth={screenWidth}
					searchTerm={searchTerm}
					selectedCategoryIds={selectedCategoryIds}
					selectedSubcategory={selectedSubCategoryIds ?? []}
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
						<div ref={listRef}>
							<FilteredCompaniesList
								companies={companiesFromApi?.results}
								onChangeSortBy={handleChangeSortBy}
								onChangeViewStyle={handleViewChange}
								viewStyle={viewStyle}
							/>
						</div>
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
			{user && <ReviewsSection screenWidth={screenWidth} userId={user.id} />}
		</div>
	);
};

export { CompaniesContent };
