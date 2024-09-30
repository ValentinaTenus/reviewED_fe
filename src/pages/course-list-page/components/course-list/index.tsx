import React, { useCallback, useEffect, useState } from "react";

import { Pagination, Spinner } from "~/common/components/index";
import { CoursesFilterType, SpinnerVariant } from "~/common/enums/index";
import { FilterType } from "~/common/types";
import { useLazyGetCoursesByFilterQuery } from "~/redux/courses/courses-api";
import { clearFilters } from "~/redux/courses/courses-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks.type";

import {
	FilterResultItems,
	FilterResultTitle,
	FilterSection,
} from "./components/index";
import styles from "./styles.module.scss";

const DEFAULT_SCREEN_WIDTH = 0;
const DEFAULT_PAGE_COUNT = 0;
const ALL_CATEGORIES_ID = "0";
const DEFAULT_CURRENT_PAGE = 1;
const DEFAULT_COURSES_PER_PAGE = 6;
const INDEX_ONE = 1;
const ZERO_LENGTH = 0;

const CourseContent: React.FC = () => {
	const dispatch = useAppDispatch();
	const { filters } = useAppSelector((state) => state.courses);

	const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);
	const [pageCount, setPageCount] = useState(DEFAULT_PAGE_COUNT);

	const [screenWidth, setScreenWidth] = useState<number>(DEFAULT_SCREEN_WIDTH);
	const [searchTerm, setSearchTerm] = useState(filters?.title || "");

	const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>(
		filters?.category_by_id || [],
	);
	const [selectedSubCategories, setSelectedSubCategories] = useState<
		{ id: string; name: string }[]
	>(filters?.subcategory_by_id || []);
	const [selectedLocations, setSelectedLocations] = useState<
		{ id: string; name: string }[]
	>(filters?.city || []);

	const [getCourses, { data: coursesResponse, isLoading }] =
		useLazyGetCoursesByFilterQuery();

	const handleSelectSubCategory = useCallback(
		(chosenSubCategories: FilterType[]) => {
			setSelectedSubCategories([...chosenSubCategories]);
			dispatch(clearFilters());
			setCurrentPage(DEFAULT_CURRENT_PAGE);
		},
		[dispatch],
	);

	const handleSelectLocation = useCallback(
		(chosenLocations: FilterType[]) => {
			setSelectedLocations([...chosenLocations]);
			dispatch(clearFilters());
			setCurrentPage(DEFAULT_CURRENT_PAGE);
		},
		[dispatch],
	);

	const handleClearFilters = useCallback(() => {
		setSelectedCategoryIds([]);
		setSelectedSubCategories([]);
		setSelectedLocations([]);
		dispatch(clearFilters());
	}, [dispatch]);

	const handleApplyFiltersAndSearch = useCallback(
		(newSearchTerm?: string) => {
			getCourses({
				category_by_id: selectedCategoryIds.includes(ALL_CATEGORIES_ID)
					? undefined
					: selectedCategoryIds,
				city: selectedLocations.find((sl) => sl.id === ALL_CATEGORIES_ID)
					? [""]
					: selectedLocations.map((c) => c.id),
				limit: DEFAULT_COURSES_PER_PAGE,
				offset: (currentPage - INDEX_ONE) * DEFAULT_COURSES_PER_PAGE,
				subcategory_by_id: selectedSubCategories.find(
					(sb) => sb.id === ALL_CATEGORIES_ID,
				)
					? undefined
					: selectedSubCategories.map((sb) => sb.id),
				title: newSearchTerm || searchTerm,
			});
		},
		[
			currentPage,
			getCourses,
			selectedCategoryIds,
			selectedLocations,
			selectedSubCategories,
			searchTerm,
		],
	);

	const handleChangeSearchTerm = useCallback(
		(newSearchTerm: string) => {
			setSearchTerm(newSearchTerm);
			handleApplyFiltersAndSearch(newSearchTerm);
		},
		[handleApplyFiltersAndSearch],
	);

	const updateScreenWidth = () => {
		const screenWidth = window.innerWidth;
		setScreenWidth(screenWidth);
	};

	const updateCoursesPageCount = useCallback(() => {
		if (coursesResponse?.count) {
			setPageCount(Math.ceil(coursesResponse.count / DEFAULT_COURSES_PER_PAGE));
		}
	}, [coursesResponse?.count]);

	useEffect(() => {
		updateCoursesPageCount();
	}, [coursesResponse, screenWidth, updateCoursesPageCount]);

	useEffect(() => {
		handleApplyFiltersAndSearch();
	}, [handleApplyFiltersAndSearch]);

	useEffect(() => {
		updateScreenWidth();
		window.addEventListener("resize", updateScreenWidth);

		return () => window.removeEventListener("resize", updateScreenWidth);
	}, []);

	const handleRemoveFilter = useCallback(
		(filterType: CoursesFilterType, id: string) => {
			if (filterType === CoursesFilterType.LOCATIONS) {
				const filteredLocations = selectedLocations.filter(
					(sl) => sl.id !== id,
				);
				setSelectedLocations(filteredLocations);
			}

			if (filterType === CoursesFilterType.SUBCATEGORIES) {
				const filteredSubCategories = selectedSubCategories.filter(
					(sc) => sc.id !== id,
				);
				setSelectedSubCategories(filteredSubCategories);
			}

			handleApplyFiltersAndSearch();
			dispatch(clearFilters());
		},
		[
			dispatch,
			handleApplyFiltersAndSearch,
			selectedLocations,
			selectedSubCategories,
		],
	);

	const handleClearAllFilters = useCallback(() => {
		handleClearFilters();
		handleApplyFiltersAndSearch();
	}, [handleClearFilters, handleApplyFiltersAndSearch]);

	return (
		<>
			<div className={styles["courses_list__container"]}>
				{isLoading && (
					<div className={styles["spinner"]}>
						<Spinner variant={SpinnerVariant.MEDIUM} />
					</div>
				)}
				<FilterSection
					onApplyFiltersAndSearch={handleApplyFiltersAndSearch}
					onChangeSearchTerm={handleChangeSearchTerm}
					onChooseLocation={handleSelectLocation}
					onChooseSubCategory={handleSelectSubCategory}
					onClearFilters={handleClearFilters}
					screenWidth={screenWidth}
					searchTerm={searchTerm}
					selectedLocations={selectedLocations}
					selectedSubCategories={selectedSubCategories}
				/>
				<div className={styles["filter_items_and_title"]}>
					<FilterResultItems
						onClearFilters={handleClearAllFilters}
						onRemoveFilter={handleRemoveFilter}
						selectedLocations={selectedLocations}
						selectedSubCategories={selectedSubCategories}
					/>
					<FilterResultTitle
						resultCount={
							coursesResponse?.count ? coursesResponse.count : ZERO_LENGTH
						}
					/>
				</div>
			</div>
			{coursesResponse && coursesResponse.results.length > ZERO_LENGTH && (
				<Pagination
					defaultCurrentPage={currentPage}
					pages={pageCount}
					setCurrentPage={setCurrentPage}
				/>
			)}
		</>
	);
};

export { CourseContent };
