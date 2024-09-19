import React, { useCallback, useEffect, useState } from "react";

import { Spinner } from "~/common/components";
import { SpinnerVariant } from "~/common/enums";
import { Category } from "~/common/types/index";
import { useGetCategoriesQuery } from "~/redux/categories/categories-api";
import { useGetCompaniesByFilterQuery } from "~/redux/companies/companies-api";
import { useAppSelector } from "~/redux/hooks.type";

import {
	FilteredCompaniesList,
	FilterSection,
	ReviewsSection,
} from "./components/index";
import styles from "./styles.module.scss";

const DEFAULT_SCREEN_WIDTH = 0;
const ALL_CATEGORIES_ID = 0;
const ZERO_LENGTH = 0;

const CompaniesContent: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [sortBy, setSortBy] = useState<string>("");
	const [selectedCategoryId, setSelectedCategoryId] =
		useState<number>(ALL_CATEGORIES_ID);

	const { companies: companiesInState } = useAppSelector(
		(state) => state.companies,
	);
	const { data: categories, isLoading: isCategoriesLoading } =
		useGetCategoriesQuery(undefined);
	const {
		data: companiesFromApi,
		isLoading: isCompaniesLoading,
		refetch: refetchCompanies,
	} = useGetCompaniesByFilterQuery(
		{
			category_by_id:
				selectedCategoryId === ALL_CATEGORIES_ID
					? undefined
					: selectedCategoryId,
			name: searchTerm,
			sort: sortBy,
		},
		{
			refetchOnMountOrArgChange: false,
		},
	);
	const [companies, setCompanies] = useState(companiesInState || []);

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
		if (!companiesInState || companiesInState.length === ZERO_LENGTH) {
			refetchCompanies();
		} else {
			setCompanies(companiesInState);
		}
	}, [companiesInState, refetchCompanies]);

	const getCompanies = useCallback(async () => {
		const result = await refetchCompanies();
		if (result.data?.results) {
			setCompanies(result.data?.results);
		}
	}, [refetchCompanies]);

	useEffect(() => {
		getCompanies();
	}, [getCompanies, searchTerm, selectedCategoryId]);

	useEffect(() => {
		if (
			companiesFromApi?.results &&
			(!companiesInState || companiesInState.length === ZERO_LENGTH)
		) {
			setCompanies(companiesFromApi.results);
		}
	}, [companiesFromApi, companiesInState]);

	useEffect(() => {
		updateScreenWidth();
		window.addEventListener("resize", updateScreenWidth);

		return () => window.removeEventListener("resize", updateScreenWidth);
	}, []);

	return (
		<div className={styles["companies_list__container"]}>
			{isCategoriesLoading && <Spinner variant={SpinnerVariant.MEDIUM} />}
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

			{isCompaniesLoading ? (
				<div className={styles["spinner"]}>
					<Spinner variant={SpinnerVariant.MEDIUM} />
				</div>
			) : (
				<FilteredCompaniesList
					companies={companies}
					onChangeSortBy={handleChangeSortBy}
				/>
			)}

			<ReviewsSection screenWidth={screenWidth} />
		</div>
	);
};

export { CompaniesContent };
