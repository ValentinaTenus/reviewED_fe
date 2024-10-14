import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { CourseCard, Pagination, Spinner } from "~/common/components/index";
import { CoursesFilterType, SpinnerVariant } from "~/common/enums/index";
import { useGetScreenWidth } from "~/common/hooks";
import { FilterType } from "~/common/types";
import { NotFound } from "~/pages/home-page/components/main-content/components/search-block/components";
import { useGetCategoriesQuery } from "~/redux/categories/categories-api";
import { useLazyGetCoursesByFilterQuery } from "~/redux/courses/courses-api";
import { clearFilters } from "~/redux/courses/courses-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks.type";

import {
	FilterResultItems,
	FilterResultTitle,
	FilterSection,
} from "./components/index";
import styles from "./styles.module.scss";

const DEFAULT_PAGE_COUNT = 0;
const DEFAULT_REVIEWS_COUNT = 0;
const ALL_CATEGORIES_ID = "0";
const DEFAULT_CURRENT_PAGE = 1;
const DEFAULT_COURSES_PER_PAGE = 6;
const INDEX_ONE = 1;
const ZERO_LENGTH = 0;

const CourseContent: React.FC = () => {
	const location = useLocation();

	const getQueryParams = useCallback(
		() => new URLSearchParams(location.search),
		[location.search],
	);

	const dispatch = useAppDispatch();
	const { filters } = useAppSelector((state) => state.courses);
	const screenWidth = useGetScreenWidth();

	const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);
	const [pageCount, setPageCount] = useState(DEFAULT_PAGE_COUNT);

	const [searchTerm, setSearchTerm] = useState(filters?.title || "");
	const [reviewsCount, setReviewsCount] = useState(DEFAULT_REVIEWS_COUNT);

	const [sortBy, setSortBy] = useState<string>("");
	const [selectedCategories, setSelectedCategories] = useState<FilterType[]>(
		filters?.category_by_id || [],
	);
	const [selectedSubCategories, setSelectedSubCategories] = useState<
		FilterType[]
	>(filters?.subcategory_by_id || []);
	const [selectedLocations, setSelectedLocations] = useState<FilterType[]>(
		filters?.city || [],
	);

	const { data: categoriesFromApi } = useGetCategoriesQuery(undefined);
	const [getCourses, { data: coursesResponse, isFetching }] =
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

	const handleChangeSortBy = useCallback((newSortBy: number | string) => {
		setSortBy(newSortBy.toString());
	}, []);

	const handleClearFilters = useCallback(() => {
		setSelectedCategories([]);
		setSelectedSubCategories([]);
		setSelectedLocations([]);
		dispatch(clearFilters());
	}, [dispatch]);

	const handleApplyFiltersAndSearch = useCallback(
		(newSearchTerm?: string) => {
			getCourses({
				category_by_id: selectedCategories.find(
					(sc) => sc.id === ALL_CATEGORIES_ID,
				)
					? [""]
					: selectedCategories.map((c) => c.id),
				city: selectedLocations.find((sl) => sl.id === ALL_CATEGORIES_ID)
					? [""]
					: selectedLocations.map((c) => c.id),
				limit: DEFAULT_COURSES_PER_PAGE,
				offset: (currentPage - INDEX_ONE) * DEFAULT_COURSES_PER_PAGE,
				sort: sortBy,
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
			selectedCategories,
			selectedLocations,
			selectedSubCategories,
			searchTerm,
			sortBy,
		],
	);

	const handleChangeSearchTerm = useCallback(
		(newSearchTerm: string) => {
			if (newSearchTerm.trim() === "") {
				setSearchTerm(newSearchTerm);
				handleApplyFiltersAndSearch(newSearchTerm);
			}
		},
		[handleApplyFiltersAndSearch],
	);

	const handleSubmitSearchTerm = useCallback(
		(newSearchTerm: string) => {
			setSearchTerm(newSearchTerm);
			handleApplyFiltersAndSearch(newSearchTerm);
		},
		[handleApplyFiltersAndSearch],
	);

	const updateCoursesPageCount = useCallback(() => {
		if (coursesResponse?.count) {
			setPageCount(Math.ceil(coursesResponse.count / DEFAULT_COURSES_PER_PAGE));
		}

		if (coursesResponse?.reviews_count) {
			setReviewsCount(coursesResponse.reviews_count);
		}
	}, [coursesResponse?.count, coursesResponse?.reviews_count]);

	useEffect(() => {
		const queryParams = getQueryParams();
		const subcategoryId = queryParams.get("subcategory") || ALL_CATEGORIES_ID;
		const subcategory = categoriesFromApi
			?.flatMap((category) => category.subcategories)
			.find((sc) => sc.id === +subcategoryId);

		if (subcategory) {
			const selectedSubcategory: FilterType = {
				id: subcategory.id.toString(),
				name: subcategory.name,
			};

			setSelectedSubCategories([selectedSubcategory]);
			handleSelectSubCategory([selectedSubcategory]);
		}
	}, [location, categoriesFromApi, getQueryParams, handleSelectSubCategory]);

	useEffect(() => {
		updateCoursesPageCount();
	}, [coursesResponse, screenWidth, updateCoursesPageCount]);

	useEffect(() => {
		handleApplyFiltersAndSearch();
	}, [handleApplyFiltersAndSearch]);

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

			if (filterType === CoursesFilterType.CATEGORIES) {
				const filteredCategories = selectedCategories.filter(
					(c) => c.id !== id,
				);
				setSelectedCategories(filteredCategories);
			}

			handleApplyFiltersAndSearch();
			dispatch(clearFilters());
		},
		[
			dispatch,
			handleApplyFiltersAndSearch,
			selectedCategories,
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
				<FilterSection
					onApplyFiltersAndSearch={handleApplyFiltersAndSearch}
					onChangeSearchTerm={handleChangeSearchTerm}
					onChooseLocation={handleSelectLocation}
					onChooseSubCategory={handleSelectSubCategory}
					onClearFilters={handleClearFilters}
					onSubmitSearchTerm={handleSubmitSearchTerm}
					searchTerm={searchTerm}
					selectedLocations={selectedLocations}
					selectedSubCategories={selectedSubCategories}
				/>
				<div className={styles["filter_items_and_title"]}>
					<FilterResultItems
						onClearFilters={handleClearAllFilters}
						onRemoveFilter={handleRemoveFilter}
						selectedCategories={selectedCategories}
						selectedLocations={selectedLocations}
						selectedSubCategories={selectedSubCategories}
					/>
					<FilterResultTitle
						onChangeSortBy={handleChangeSortBy}
						resultCount={
							coursesResponse?.count ? coursesResponse.count : ZERO_LENGTH
						}
						resultReviewsCount={reviewsCount}
						resultTerm={searchTerm}
					/>
				</div>
				{isFetching && (
					<div className={styles["spinner"]}>
						<Spinner variant={SpinnerVariant.MEDIUM} />
					</div>
				)}
			</div>
			{coursesResponse &&
				coursesResponse.results.length > ZERO_LENGTH &&
				!isFetching && (
					<div className={styles["courses_results"]}>
						<div className={styles["courses_list"]}>
							{coursesResponse.results.map((course) => (
								<CourseCard course={course} key={course.id} />
							))}
						</div>
						<Pagination
							defaultCurrentPage={currentPage}
							pages={pageCount}
							setCurrentPage={setCurrentPage}
						/>
					</div>
				)}
			{coursesResponse &&
				coursesResponse.results.length === ZERO_LENGTH &&
				!isFetching && <NotFound />}
		</>
	);
};

export { CourseContent };
