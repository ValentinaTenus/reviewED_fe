import { useAppSelector, useAppDispatch } from "~/redux/hooks.type";
import styles from "./styles.module.scss";
import React, { useState, useCallback } from "react";
import { setFilters } from "~/redux/companies/companies-slice";
import { FilterSection } from "./components/index";
import { Category } from "~/common/types/index";
import { useGetCategoriesQuery } from "~/redux/categories/categories-api";

const DEFAULT_SCREEN_WIDTH = 0;
const ALL_CATEGORIES_ID = 0;
const DEFAULT_CURRENT_PAGE = 1;

const CourseContent: React.FC = () => {
	const dispatch = useAppDispatch();
	const { data: categories } = useGetCategoriesQuery(undefined);
	const { filters } = useAppSelector((state) => state.companies); // state.courses?
	const [sortBy, setSortBy] = useState<string>("");
	const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);
	const [screenWidth, setScreenWidth] = useState<number>(DEFAULT_SCREEN_WIDTH);
	const [searchTerm, setSearchTerm] = useState(filters?.name || "");
	const [selectedCategoryId, setSelectedCategoryId] =
		useState<number>(ALL_CATEGORIES_ID);

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

	const allCategories: Category[] = categories
		? [{ id: 0, name: "All", subcategories: [] }, ...categories]
		: [];

	return (
		<div className={styles["courses_list__container"]}>
			<FilterSection
				categories={allCategories}
				onChangeSearchTerm={handleChangeSearchTerm}
				onChangeSortBy={handleChangeSortBy}
				onChooseCategory={handleChooseCategory}
				screenWidth={screenWidth}
				searchTerm={searchTerm}
				selectedCategoryId={selectedCategoryId}
			/>
		</div>
	);
};

export { CourseContent };
