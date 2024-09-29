import React, { useCallback, useEffect, useState } from "react";

import { Pagination, Spinner } from "~/common/components/index";
import { SpinnerVariant } from "~/common/enums/index";
import { useLazyGetCoursesByFilterQuery } from "~/redux/courses/courses-api";
import { useAppSelector } from "~/redux/hooks.type";

import { FilterSection } from "./components/index";
import styles from "./styles.module.scss";

const DEFAULT_SCREEN_WIDTH = 0;
const DEFAULT_PAGE_COUNT = 0;
const ALL_CATEGORIES_ID = "0";
const DEFAULT_CURRENT_PAGE = 1;
const DEFAULT_COURSES_PER_PAGE = 6;
const INDEX_ONE = 1;
const ZERO_LENGTH = 0;

const CourseContent: React.FC = () => {
	const { filters } = useAppSelector((state) => state.courses);

	const [sortBy, setSortBy] = useState<string>("");

	const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);
	const [pageCount, setPageCount] = useState(DEFAULT_PAGE_COUNT);

	const [screenWidth, setScreenWidth] = useState<number>(DEFAULT_SCREEN_WIDTH);
	const [searchTerm, setSearchTerm] = useState(filters?.title || "");

	const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>(
		filters?.category_by_id || [],
	);
	const [selectedSubCategoryIds, setSelectedSubCategoryIds] = useState<
		string[]
	>(filters?.subcategory_by_id || []);
	const [selectedLocations, setSelectedLocations] = useState<string[]>(
		filters?.city || [],
	);

	const [getCourses, { data: coursesResponse, isLoading }] =
		useLazyGetCoursesByFilterQuery();

	const handleChangeSortBy = useCallback((newSortBy: number | string) => {
		setSortBy(newSortBy.toString());
	}, []);

	const handleSelectSubCategory = useCallback(
		(chosenSubCategories: string[]) => {
			if (selectedSubCategoryIds.includes(ALL_CATEGORIES_ID)) {
				setSelectedSubCategoryIds(chosenSubCategories);
			} else {
				setSelectedSubCategoryIds([...chosenSubCategories]);
			}
			setSelectedCategoryIds([]);
			setCurrentPage(DEFAULT_CURRENT_PAGE);
		},
		[selectedSubCategoryIds],
	);

	const handleSelectLocation = useCallback((chosenLocations: string[]) => {
		if (chosenLocations.includes(ALL_CATEGORIES_ID)) {
			setSelectedLocations([ALL_CATEGORIES_ID]);
		} else {
			setSelectedLocations([...chosenLocations]);
		}
		setSelectedCategoryIds([]);
		setCurrentPage(DEFAULT_CURRENT_PAGE);
	}, []);

	const handleClearFilters = useCallback(() => {
		setSelectedCategoryIds([]);
		setSelectedSubCategoryIds([]);
		setSelectedLocations([]);
	}, []);

	const handleApplyFiltersAndSearch = useCallback(
		(newSearchTerm?: string) => {
			getCourses({
				category_by_id: selectedCategoryIds.includes(ALL_CATEGORIES_ID)
					? undefined
					: selectedCategoryIds,
				city: selectedLocations,
				limit: DEFAULT_COURSES_PER_PAGE,
				offset: (currentPage - INDEX_ONE) * DEFAULT_COURSES_PER_PAGE,
				sort: sortBy,
				subcategory_by_id: selectedSubCategoryIds.includes(ALL_CATEGORIES_ID)
					? undefined
					: selectedSubCategoryIds,
				title: newSearchTerm || searchTerm,
			});
		},
		[
			currentPage,
			getCourses,
			selectedCategoryIds,
			selectedLocations,
			selectedSubCategoryIds,
			searchTerm,
			sortBy,
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
		updateScreenWidth();
		window.addEventListener("resize", updateScreenWidth);

		return () => window.removeEventListener("resize", updateScreenWidth);
	}, []);

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
					onChangeSortBy={handleChangeSortBy}
					onChooseLocation={handleSelectLocation}
					onChooseSubCategory={handleSelectSubCategory}
					onClearFilters={handleClearFilters}
					screenWidth={screenWidth}
					searchTerm={searchTerm}
					selectedLocations={selectedLocations}
					selectedSubCategories={selectedSubCategoryIds}
				/>
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
