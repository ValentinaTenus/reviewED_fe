import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Dropdown, SearchInput } from "~/common/components/index";
import { ScreenBreakpoints } from "~/common/constants";
import {
	AppRoute,
	ButtonSize,
	ButtonType,
	ButtonVariant,
	CompaniesPerPageTableView,
	IconName,
} from "~/common/enums/index";
import { useAppForm } from "~/common/hooks/index";
import {
	Company,
	Course,
	DropdownOption,
	FilterType,
} from "~/common/types/index";
import { useGetCategoriesQuery } from "~/redux/categories/categories-api";
import { useGetCompaniesByFilterQuery } from "~/redux/companies/companies-api";
import {
	clearFilters as clearCompaniesFilters,
	setFilters as setCompaniesFilters,
} from "~/redux/companies/companies-slice";
import { useGetCoursesByFilterQuery } from "~/redux/courses/courses-api";
import {
	clearFilters as clearCoursesFilters,
	setFilters as setCoursesFilters,
} from "~/redux/courses/courses-slice";
import { useAppDispatch } from "~/redux/hooks.type";
import {
	useGetCompaniesLocationsQuery,
	useGetCoursesLocationsQuery,
} from "~/redux/locations/locations-api";

import {
	getDropdownOptionsFormat,
	mapCoursesCategories,
	mapLocations,
} from "../../helpers/index";
import styles from "./styles.module.scss";

const categories = [
	{
		label: "Курси",
		value: "курси",
	},
	{
		label: "Компанії",
		value: "компанії",
	},
];

const INDEX_COURSES = 0;
const INDEX_COMPANIES = 1;
const ZERO_INDEX = 0;

type SearchElementProperties = {
	companies: Company[];
	onSearch: (searchResult: Company[] | Course[]) => void;
};

const SearchElement: React.FC<SearchElementProperties> = ({
	// companies,
	onSearch,
}) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const screenWidth = window.innerWidth;

	const [searchTerm, setSearchTerm] = useState("");
	const [filteredSuggestions, setFilteredSuggestions] = useState<
		DropdownOption[]
	>([]);
	const [selectedCategory, setSelectedCategory] = useState<string>(
		categories[INDEX_COMPANIES].value,
	);
	const [selectedLocation, setSelectedLocation] = useState<FilterType>({
		id: "",
		name: "",
	});

	const [selectedCourseCategory, setSelectedCourseCategory] = useState<
		null | string
	>(null);
	const [selectedCourseSubCategory, setSelectedCourseSubCategory] = useState<
		null | string
	>(null);

	const [coursesDropdownLocations, setCoursesDropdownLocations] = useState<
		DropdownOption[]
	>([]);
	const [companiesDropdownLocations, setCompaniesDropdownLocations] = useState<
		DropdownOption[]
	>([]);

	const [serverError, setServerError] = useState("");

	const { data: filteredCoursesResponse, refetch: refetchCourses } =
		useGetCoursesByFilterQuery(
			{
				category_by_id: selectedCourseCategory ? [selectedCourseCategory] : [],
				city: selectedLocation ? [selectedLocation.id] : [],
				subcategory_by_id: selectedCourseSubCategory
					? [selectedCourseSubCategory]
					: [],
				title: searchTerm,
			},
			{
				refetchOnMountOrArgChange: false,
				skip: selectedCategory !== categories[INDEX_COURSES].value,
			},
		);

	const { data: getCompaniesResponse, refetch: refetchCompanies } =
		useGetCompaniesByFilterQuery(
			{
				category_by_id: selectedCourseCategory ? [+selectedCourseCategory] : [],
				city: selectedLocation.id,
				limit:
					screenWidth > ScreenBreakpoints.TABLET
						? CompaniesPerPageTableView.LARGE_SCREEN
						: CompaniesPerPageTableView.SMALL_SCREEN,
				name: searchTerm,
				subcategory_by_id: selectedCourseSubCategory
					? [+selectedCourseSubCategory]
					: [],
			},
			{
				refetchOnMountOrArgChange: false,
				skip: selectedCategory !== categories[INDEX_COMPANIES].value,
			},
		);

	const { data: coursesLocations } = useGetCoursesLocationsQuery(undefined);
	const { data: companiesLocations } = useGetCompaniesLocationsQuery(undefined);
	const { data: fetchedCategories } = useGetCategoriesQuery(undefined);

	const coursesCategoriesOptions = mapCoursesCategories(
		fetchedCategories || [],
	);

	useEffect(() => {
		dispatch(clearCompaniesFilters());
		dispatch(clearCoursesFilters());
	}, [dispatch]);

	useEffect(() => {
		if (coursesLocations) {
			const coursesLocationOptions = mapLocations(coursesLocations);
			setCoursesDropdownLocations(coursesLocationOptions);
		}

		if (companiesLocations) {
			const companiesLocationOptions = mapLocations(companiesLocations);
			setCompaniesDropdownLocations(companiesLocationOptions);
		}
	}, [coursesLocations, companiesLocations]);

	const { control, errors, handleSubmit } = useAppForm({
		defaultValues: {
			search: "",
		},
	});

	const handleInputChange = useCallback(
		async (value: string) => {
			setSearchTerm(value);

			if (selectedCategory === categories[INDEX_COURSES].value) {
				void dispatch(setCompaniesFilters({ name: "" }));
				void dispatch(setCoursesFilters({ title: value }));
			} else {
				void dispatch(setCompaniesFilters({ name: value }));
				void dispatch(setCoursesFilters({ title: "" }));
			}

			if (value.trim() === "") {
				setFilteredSuggestions([]);
			} else {
				if (
					selectedCategory === categories[INDEX_COURSES].value &&
					filteredCoursesResponse?.results
				) {
					const mappedCourses = getDropdownOptionsFormat({
						courses: filteredCoursesResponse.results,
					});
					setFilteredSuggestions(mappedCourses);
				}

				if (
					selectedCategory === categories[INDEX_COMPANIES].value &&
					getCompaniesResponse?.results
				) {
					const mappedCompanies = getDropdownOptionsFormat({
						companies: getCompaniesResponse.results,
					});
					setFilteredSuggestions(mappedCompanies);
				}
			}
		},
		[
			dispatch,
			getCompaniesResponse?.results,
			filteredCoursesResponse?.results,
			selectedCategory,
		],
	);

	const handleSelectCategory = useCallback(
		({ option }: { option: DropdownOption }) => {
			setSelectedCategory(option.value.toString());

			if (option.value.toString() === categories[INDEX_COURSES].value) {
				void dispatch(setCompaniesFilters({ city: "", name: "" }));
				void dispatch(
					setCoursesFilters({
						category_by_id: [{ id: "", name: "Всі курси" }],
						city: [{ id: "", name: "Всі міста" }],
						subcategory_by_id: [],
						title: searchTerm,
					}),
				);
			} else {
				void dispatch(
					setCompaniesFilters({
						city: selectedLocation.id,
						name: searchTerm,
					}),
				);
			}
		},
		[dispatch, searchTerm, selectedLocation],
	);

	const handleSelectLocation = useCallback(
		({ option }: { option: DropdownOption }) => {
			const selectedLocation = {
				id: option.value.toString(),
				name: option.label,
			};
			setSelectedLocation(selectedLocation);

			if (selectedCategory === categories[INDEX_COMPANIES].value) {
				void dispatch(setCompaniesFilters({ city: option.value.toString() }));
			}

			if (selectedCategory === categories[INDEX_COURSES].value) {
				void dispatch(setCoursesFilters({ city: [selectedLocation] }));
			}
		},
		[dispatch, selectedCategory],
	);

	const handleSelectedCoursesCategory = useCallback(
		({ isTitle, option }: { isTitle: boolean; option: DropdownOption }) => {
			if (isTitle) {
				setSelectedCourseSubCategory(null);
				setSelectedCourseCategory(option.value.toString());

				if (selectedCategory === categories[INDEX_COURSES].value) {
					void dispatch(
						setCoursesFilters({
							category_by_id: [
								{ id: option.value.toString(), name: option.label },
							],
							subcategory_by_id: [],
						}),
					);
				} else {
					void dispatch(
						setCompaniesFilters({
							category_by_id: [
								{ id: option.value.toString(), name: option.label },
							],
							subcategory_by_id: [],
						}),
					);
				}
			} else {
				const categoryOfSubcategory = fetchedCategories?.find((category) => {
					return category.subcategories.find((sb) => sb.id === option.value);
				}) ?? { id: "", name: "" };

				setSelectedCourseCategory(
					categoryOfSubcategory?.id?.toString() ?? null,
				);
				setSelectedCourseSubCategory(option.value.toString());

				if (selectedCategory === categories[INDEX_COURSES].value) {
					void dispatch(
						setCoursesFilters({
							category_by_id: [
								{
									id: categoryOfSubcategory?.id.toString(),
									name: categoryOfSubcategory?.name.toString(),
								},
							],
							subcategory_by_id: [
								{ id: option.value.toString(), name: option.label },
							],
						}),
					);
				} else {
					void dispatch(
						setCompaniesFilters({
							category_by_id: [
								{
									id: categoryOfSubcategory?.id.toString(),
									name: categoryOfSubcategory?.name.toString(),
								},
							],
							subcategory_by_id: [
								{ id: option.value.toLocaleString(), name: option.label },
							],
						}),
					);
				}
			}
		},
		[selectedCategory, dispatch, fetchedCategories],
	);

	const handleSuggestionClick = useCallback((suggestion: number | string) => {
		setSearchTerm(suggestion.toString());
	}, []);

	const handleFormChange = useCallback(async (): Promise<void> => {
		try {
			if (selectedCategory === categories[INDEX_COMPANIES].value) {
				const { results } = await refetchCompanies().unwrap();
				onSearch(results);

				if (results.length > ZERO_INDEX) {
					navigate(AppRoute.ALL_COMPANIES);
				}
			} else {
				const response = await refetchCourses().unwrap();
				onSearch(response.results);

				if (response.results.length > ZERO_INDEX) {
					navigate(AppRoute.ALL_COURSES);
				}
			}
		} catch (error) {
			const loadError = (error as FetchBaseQueryError).data
				? ((error as FetchBaseQueryError).data as Error)
				: { message: "Невідома помилка" };
			setServerError(loadError.message);
		}
	}, [onSearch, navigate, selectedCategory, refetchCompanies, refetchCourses]);

	const handleFormSubmit = useCallback(
		async (event_: React.BaseSyntheticEvent): Promise<void> => {
			event_.preventDefault();
			await handleSubmit(handleFormChange)(event_);
		},
		[handleFormChange, handleSubmit],
	);

	return (
		<>
			<div className={styles["container"]}>
				<form className={styles["search_form"]} onSubmit={handleFormSubmit}>
					<div className={styles["form"]}>
						<div className={styles["search_wrapper"]}>
							<SearchInput
								className={styles["search__input"]}
								control={control}
								errors={errors}
								iconName={IconName.SEARCH}
								name="search"
								onChange={handleInputChange}
								onSuggestionClick={handleSuggestionClick}
								placeholder="Введіть запит"
								suggestions={filteredSuggestions}
							/>
						</div>
						<div className={styles["search_dropdown_wrapper"]}>
							<Dropdown
								className={styles["search_dropdown"]}
								label="Компанії"
								name="companies"
								onChange={handleSelectCategory}
								options={categories}
								placeholder="Компанії"
							/>
						</div>
						<div className={styles["search_dropdown_wrapper"]}>
							<Dropdown
								className={styles["search_dropdown"]}
								label="Всі локації"
								name="allLocations"
								onChange={handleSelectLocation}
								options={
									selectedCategory === categories[INDEX_COURSES].value
										? coursesDropdownLocations
										: companiesDropdownLocations
								}
								placeholder="Всі локації"
							/>
						</div>
						<div className={styles["search_dropdown_wrapper"]}>
							<Dropdown
								className={styles["search_dropdown"]}
								isTitleClickable
								label={
									selectedCategory === categories[INDEX_COURSES].value
										? "Всі курси"
										: "Всі компанії"
								}
								name="allCompanies"
								onChange={handleSelectedCoursesCategory}
								options={coursesCategoriesOptions}
								placeholder={
									selectedCategory === categories[INDEX_COURSES].value
										? "Всі курси"
										: "Всі компанії"
								}
							/>
						</div>
					</div>
					<div className={styles["search_button_wrapper"]}>
						<Button
							className={styles["search__button"]}
							size={ButtonSize.LARGE}
							type={ButtonType.SUBMIT}
							variant={ButtonVariant.PRIMARY}
						>
							Знайти
						</Button>
					</div>
				</form>
			</div>
			{serverError && <p>{serverError}</p>}
		</>
	);
};

export { SearchElement };
