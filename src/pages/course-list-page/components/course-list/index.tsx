import React, { useCallback, useEffect, useState } from "react";

import { Spinner } from "~/common/components/index";
import { SpinnerVariant } from "~/common/enums/index";
import { Category } from "~/common/types/index";
import { useGetCategoriesQuery } from "~/redux/categories/categories-api";
import { setFilters } from "~/redux/companies/companies-slice";
import { useGetCoursesByFilterQuery } from "~/redux/courses/courses-api";
import { useAppDispatch, useAppSelector } from "~/redux/hooks.type";

import { FilterSection } from "./components/index";
import styles from "./styles.module.scss";

const DEFAULT_SCREEN_WIDTH = 0;
const ALL_CATEGORIES_ID = "0";
const DEFAULT_CURRENT_PAGE = 1;
const DEFAULT_COURSES_PER_PAGE = 10;
const INDEX_ONE = 1;

const CourseContent: React.FC = () => {
	const dispatch = useAppDispatch();

	const { data: categories } = useGetCategoriesQuery(undefined);
	const { filters } = useAppSelector((state) => state.courses);

	const [sortBy, setSortBy] = useState<string>("");

	const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);

	const [screenWidth, setScreenWidth] = useState<number>(DEFAULT_SCREEN_WIDTH);
	const [searchTerm, setSearchTerm] = useState(filters?.title || "");

	const [selectedCategoryId, setSelectedCategoryId] =
		useState<string>(ALL_CATEGORIES_ID);
	const [selectedSubCategoryId, setSelectedSubCategoryId] =
		useState<string>(ALL_CATEGORIES_ID);

	const { isLoading } = useGetCoursesByFilterQuery(
		{
			category_by_id:
				selectedCategoryId === ALL_CATEGORIES_ID
					? undefined
					: selectedCategoryId,
			city: filters?.city,
			limit: DEFAULT_COURSES_PER_PAGE,
			offset: (currentPage - INDEX_ONE) * DEFAULT_COURSES_PER_PAGE,
			sort: sortBy,
			subcategory_by_id:
				selectedSubCategoryId === ALL_CATEGORIES_ID
					? undefined
					: selectedSubCategoryId,
			title: searchTerm,
		},
		{
			refetchOnMountOrArgChange: true,
		},
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

	const handleSelectCategory = useCallback(
		(chosenCategoryId: string) => {
			setSelectedCategoryId(chosenCategoryId);
			setSelectedSubCategoryId("");
			void dispatch(setFilters({ city: "" }));
			setCurrentPage(DEFAULT_CURRENT_PAGE);
		},
		[dispatch],
	);

	const handleSelectSubCategory = useCallback(
		(chosenSubCategoryId: string) => {
			setSelectedSubCategoryId(chosenSubCategoryId);
			setSelectedCategoryId("");
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
		updateScreenWidth();
		window.addEventListener("resize", updateScreenWidth);

		return () => window.removeEventListener("resize", updateScreenWidth);
	}, []);

	const allCategories: Category[] = categories
		? [{ id: 0, name: "All", subcategories: [] }, ...categories]
		: [];

	return (
		<div className={styles["courses_list__container"]}>
			{isLoading && (
				<div className={styles["spinner"]}>
					<Spinner variant={SpinnerVariant.MEDIUM} />
				</div>
			)}
			<FilterSection
				categories={allCategories}
				onChangeSearchTerm={handleChangeSearchTerm}
				onChangeSortBy={handleChangeSortBy}
				onChooseCategory={handleSelectCategory}
				onChooseSubCategory={handleSelectSubCategory}
				screenWidth={screenWidth}
				searchTerm={searchTerm}
				selectedCategoryId={selectedCategoryId}
			/>
		</div>
	);
};

export { CourseContent };