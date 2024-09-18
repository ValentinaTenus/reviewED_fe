import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React, { useCallback, useState } from "react";

import { Button, Dropdown, SearchInput } from "~/common/components/index";
import { CITIES } from "~/common/constants/index";
import {
	ButtonSize,
	ButtonType,
	ButtonVariant,
	IconName,
} from "~/common/enums/index";
import { useAppForm } from "~/common/hooks/index";
import { Company, Course, DropdownOption } from "~/common/types/index";
import { useGetCompaniesByFilterQuery } from "~/redux/companies/companies-api";
import { useGetCoursesByFilterQuery } from "~/redux/courses/courses-api";

import {
	getDropdownOptionsFormat,
	mapCompanies,
	mapCourses,
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
	courses: Course[];
	onSearch: (searchResult: Company[] | Course[]) => void;
};

const SearchElement: React.FC<SearchElementProperties> = ({
	companies,
	courses,
	onSearch,
}) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredSuggestions, setFilteredSuggestions] = useState<
		DropdownOption[]
	>([]);
	const [selectedCategory, setSelectedCategory] = useState<string>(
		categories[INDEX_COMPANIES].value,
	);
	const [selectedLocation, setSelectedLocation] = useState<string>("");
	const [selectedFromAll, setSelectedFromAll] = useState<string>("");
	const [serverError, setServerError] = useState("");

	const { data: filteredCourses, refetch: refetchCourses } =
		useGetCoursesByFilterQuery(
			{
				city: selectedLocation,
				title: selectedFromAll ? selectedFromAll : searchTerm,
			},
			{
				refetchOnMountOrArgChange: true,
				skip: selectedCategory !== categories[INDEX_COURSES].value,
			},
		);

	const { data: getCompaniesResponse, refetch: refetchCompanies } =
		useGetCompaniesByFilterQuery(
			{
				city: selectedLocation,
				name: selectedFromAll ? selectedFromAll : searchTerm,
			},
			{
				refetchOnMountOrArgChange: true,
				skip: selectedCategory !== categories[INDEX_COMPANIES].value,
			},
		);

	const coursesOptions = mapCourses(courses);
	const companiesOptions = mapCompanies(companies);

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

	const handleSelectCategory = useCallback((value: number | string) => {
		setSelectedCategory(value.toString());
	}, []);

	const handleSelectLocation = useCallback((value: number | string) => {
		setSelectedLocation(value.toString());
	}, []);

	const handleSelectedFromAll = useCallback((value: number | string) => {
		setSelectedFromAll(value.toString());
	}, []);

	const handleSuggestionClick = useCallback((suggestion: number | string) => {
		setSearchTerm(suggestion.toString());
	}, []);

	const handleFormChange = useCallback(async (): Promise<void> => {
		try {
			if (selectedCategory === categories[INDEX_COMPANIES].value) {
				const result = await refetchCompanies().unwrap();
				onSearch(result.results);
			} else {
				const result = await refetchCourses().unwrap();
				onSearch(result);
			}
		} catch (error) {
			const loadError = (error as FetchBaseQueryError).data
				? ((error as FetchBaseQueryError).data as Error)
				: { message: "Невідома помилка" };
			setServerError(loadError.message);
		}
	}, [onSearch, selectedCategory, refetchCompanies, refetchCourses]);

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			event_.preventDefault();
			void handleSubmit(handleFormChange)(event_);
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
								label="Всі Локації"
								name="allLocations"
								onChange={handleSelectLocation}
								options={CITIES}
								placeholder="Всі Локації"
							/>
						</div>
						<div className={styles["search_dropdown_wrapper"]}>
							<Dropdown
								className={styles["search_dropdown"]}
								label="Всі компанії"
								name="allCompanies"
								onChange={handleSelectedFromAll}
								options={
									selectedCategory === categories[INDEX_COMPANIES].value
										? companiesOptions
										: coursesOptions
								}
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
