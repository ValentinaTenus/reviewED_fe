import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Dropdown, SearchInput } from "~/common/components/index";
import {
	AppRoute,
	ButtonSize,
	ButtonType,
	ButtonVariant,
	IconName,
} from "~/common/enums/index";
import { useAppForm } from "~/common/hooks/index";
import { Company, Course, DropdownOption } from "~/common/types/index";
import { useGetCategoriesQuery } from "~/redux/categories/categories-api";
import { useGetCompaniesByFilterQuery } from "~/redux/companies/companies-api";
import { setCompanies } from "~/redux/companies/companies-slice";
import { useGetCoursesByFilterQuery } from "~/redux/courses/courses-api";
import { setCourses } from "~/redux/courses/courses-slice";
import { useAppDispatch } from "~/redux/hooks.type";
import {
	useGetCompaniesLocationsQuery,
	useGetCoursesLocationsQuery,
} from "~/redux/locations/locations-api";

import {
	getDropdownOptionsFormat,
	mapCompanies,
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

type SearchElementProperties = {
	companies: Company[];
	onSearch: (searchResult: Company[] | Course[]) => void;
};

const SearchElement: React.FC<SearchElementProperties> = ({
	companies,
	onSearch,
}) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [searchTerm, setSearchTerm] = useState("");
	const [filteredSuggestions, setFilteredSuggestions] = useState<
		DropdownOption[]
	>([]);
	const [selectedCategory, setSelectedCategory] = useState<string>(
		categories[INDEX_COMPANIES].value,
	);
	const [selectedLocation, setSelectedLocation] = useState<string>("");
	const [selectedCompanyFromAll, setSelectedCompanyFromAll] =
		useState<string>("");
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

	const { data: filteredCourses, refetch: refetchCourses } =
		useGetCoursesByFilterQuery(
			{
				category_by_id: selectedCourseCategory || "",
				city: selectedLocation,
				subcategory_by_id: selectedCourseSubCategory || "",
				title: selectedCompanyFromAll ? selectedCompanyFromAll : searchTerm,
			},
			{
				refetchOnMountOrArgChange: false,
				skip: selectedCategory !== categories[INDEX_COURSES].value,
			},
		);

	const { data: getCompaniesResponse, refetch: refetchCompanies } =
		useGetCompaniesByFilterQuery(
			{
				city: selectedLocation,
				name: selectedCompanyFromAll ? selectedCompanyFromAll : searchTerm,
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
	const companiesOptions = mapCompanies(companies);

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

			if (value.trim() === "") {
				setFilteredSuggestions([]);
			} else {
				if (
					selectedCategory === categories[INDEX_COURSES].value &&
					filteredCourses
				) {
					const mappedCourses = getDropdownOptionsFormat({
						courses: filteredCourses,
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
		[getCompaniesResponse?.results, filteredCourses, selectedCategory],
	);

	const handleSelectCategory = useCallback(
		({ value }: { value: number | string }) => {
			setSelectedCategory(value.toString());
		},
		[],
	);

	const handleSelectLocation = useCallback(
		({ value }: { value: number | string }) => {
			setSelectedLocation(value.toString());
		},
		[],
	);

	const handleSelectedCompanyFromAll = useCallback(
		({ value }: { value: number | string }) => {
			setSelectedCompanyFromAll(value.toString());
		},
		[],
	);

	const handleSelectedCoursesCategory = useCallback(
		({ isTitle, value }: { isTitle: boolean; value: number | string }) => {
			if (isTitle) {
				setSelectedCourseSubCategory(null);
				setSelectedCourseCategory(value.toString());
			} else {
				setSelectedCourseCategory(null);
				setSelectedCourseSubCategory(value.toString());
			}
		},
		[],
	);

	const handleSuggestionClick = useCallback((suggestion: number | string) => {
		setSearchTerm(suggestion.toString());
	}, []);

	const handleFormChange = useCallback(async (): Promise<void> => {
		try {
			if (selectedCategory === categories[INDEX_COMPANIES].value) {
				const result = await refetchCompanies().unwrap();
				onSearch(result.results);
				void dispatch(setCompanies(result.results));
			} else {
				const result = await refetchCourses().unwrap();
				onSearch(result);
				void dispatch(setCourses(result));
			}
		} catch (error) {
			const loadError = (error as FetchBaseQueryError).data
				? ((error as FetchBaseQueryError).data as Error)
				: { message: "Невідома помилка" };
			setServerError(loadError.message);
		}
	}, [dispatch, onSearch, selectedCategory, refetchCompanies, refetchCourses]);

	const handleFormSubmit = useCallback(
		async (event_: React.BaseSyntheticEvent): Promise<void> => {
			event_.preventDefault();
			await handleSubmit(handleFormChange)(event_);

			if (selectedCategory === categories[INDEX_COMPANIES].value) {
				navigate(AppRoute.ALL_COMPANIES);
			} else {
				navigate(AppRoute.ALL_COURSES);
			}
		},
		[handleFormChange, handleSubmit, navigate, selectedCategory],
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
								placeholder="Всі Локації"
							/>
						</div>
						<div className={styles["search_dropdown_wrapper"]}>
							{selectedCategory === categories[INDEX_COURSES].value ? (
								<Dropdown
									className={styles["search_dropdown"]}
									label={
										selectedCategory === categories[INDEX_COURSES].value
											? "Всі курси"
											: "Всі компанії"
									}
									name="allCourses"
									onChange={handleSelectedCoursesCategory}
									options={coursesCategoriesOptions}
									placeholder={
										selectedCategory === categories[INDEX_COURSES].value
											? "Всі курси"
											: "Всі компанії"
									}
								/>
							) : (
								<Dropdown
									className={styles["search_dropdown"]}
									isTitleClickable={false}
									label={
										selectedCategory === categories[INDEX_COURSES].value
											? "Всі курси"
											: "Всі компанії"
									}
									name="allCompanies"
									onChange={handleSelectedCompanyFromAll}
									options={companiesOptions}
									placeholder={
										selectedCategory === categories[INDEX_COURSES].value
											? "Всі курси"
											: "Всі компанії"
									}
								/>
							)}
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
