import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React, { useCallback, useEffect, useState } from "react";

import { Button, Dropdown } from "~/common/components/index";
import { CITIES } from "~/common/constants/index";
import {
	ButtonSize,
	ButtonType,
	ButtonVariant,
	IconName,
} from "~/common/enums/index";
import { useAppForm } from "~/common/hooks/index";
import { Company, Course, DropdownOption } from "~/common/types/index";
import { useGetCompaniesQuery } from "~/redux/companies/companies-api";
import { useGetCoursesQuery } from "~/redux/courses/courses-api";

import {
	getDropdownOptionsFormat,
	mapCompanies,
	mapCourses,
} from "../../helpers/index";
import { SearchInput } from "./components/search-input";
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

const COURSES_INDEX = 0;
const COMPANIES_INDEX = 1;

type SearchElementProperties = {
	onSearch: (searchResult: Company[] | Course[]) => void;
};

const SearchElement: React.FC<SearchElementProperties> = ({ onSearch }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredSuggestions, setFilteredSuggestions] = useState<
		DropdownOption[]
	>([]);
	const [companiesOptions, setCompaniesOptions] = useState<DropdownOption[]>(
		[],
	);
	const [coursesOptions, setCoursesOptions] = useState<DropdownOption[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<string>(
		categories[COMPANIES_INDEX].value,
	);
	const [selectedLocation, setSelectedLocation] = useState<string>("");
	const [selectedFromAll, setSelectedFromAll] = useState<string>("");
	const [serverError, setServerError] = useState("");

	const { data: companies, refetch: refetchCompanies } = useGetCompaniesQuery(
		{
			city: selectedLocation,
			name: selectedFromAll ? selectedFromAll : searchTerm,
		},
		{
			refetchOnMountOrArgChange: true,
			skip: selectedCategory !== categories[COMPANIES_INDEX].value,
		},
	);

	const { data: courses, refetch: refetchCourses } = useGetCoursesQuery(
		{
			city: selectedLocation,
			title: selectedFromAll ? selectedFromAll : searchTerm,
		},
		{
			refetchOnMountOrArgChange: true,
			skip: selectedCategory !== categories[COURSES_INDEX].value,
		},
	);

	const { control, errors, handleSubmit } = useAppForm({
		defaultValues: {
			search: "",
		},
	});

	useEffect(() => {
		if (companies) {
			const options = mapCompanies(companies);
			setCompaniesOptions(options);
		}
	}, [companies]);

	useEffect(() => {
		if (courses) {
			const options = mapCourses(courses);
			setCoursesOptions(options);
		}
	}, [courses]);

	const handleInputChange = useCallback(
		(value: string) => {
			setSearchTerm(value);

			if (value.trim() === "") {
				setFilteredSuggestions([]);
			} else {
				if (
					selectedCategory === categories[COMPANIES_INDEX].value &&
					companies
				) {
					const mappedCompanies = getDropdownOptionsFormat({
						companies: companies,
					});
					setFilteredSuggestions(mappedCompanies);
				}

				if (selectedCategory === categories[COURSES_INDEX].value && courses) {
					const mappedCourses = getDropdownOptionsFormat({ courses: courses });
					setFilteredSuggestions(mappedCourses);
				}
			}
		},
		[selectedCategory, companies, courses],
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
			if (selectedCategory === categories[COMPANIES_INDEX].value) {
				const result = await refetchCompanies().unwrap();
				onSearch(result);
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
	}, [onSearch, refetchCompanies, refetchCourses, selectedCategory]);

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			event_.preventDefault();
			void handleSubmit(handleFormChange)(event_);
		},
		[handleFormChange, handleSubmit],
	);

	return (
		<div>
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
									selectedCategory === categories[COMPANIES_INDEX].value
										? companiesOptions
										: coursesOptions
								}
								placeholder={
									selectedCategory === categories[COURSES_INDEX].value
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
		</div>
	);
};

export { SearchElement };
