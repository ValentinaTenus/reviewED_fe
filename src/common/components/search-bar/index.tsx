import clsx from "clsx";
import React, { useCallback, useState } from "react";

import FilterIcon from "~/assets/images/filter.svg?react";
import {
	Button,
	Icon,
	IconButton,
	SearchInput,
} from "~/common/components/index";
import { ScreenBreakpoints } from "~/common/constants/index";
import {
	ButtonSize,
	ButtonType,
	ButtonVariant,
	IconName,
} from "~/common/enums/index";
import { useAppForm, useGetScreenWidth } from "~/common/hooks/index";
import { type DropdownOption } from "~/common/types/index";

import styles from "./styles.module.scss";

type SearchBarProperties = {
	containerStyles?: string;
	filtersLength?: number;
	iconSearch?: boolean;
	inputStyles?: string;
	isFilterButton?: boolean;
	onChangeSearchTerm?: (searchTerm: string) => void;
	onInputChange?: (value: string) => [];
	onOpenFilter?: () => void;
	onSubmit: (searchTerm: string) => void;
	placeholder: string;
	value: string;
};

const SearchBar: React.FC<SearchBarProperties> = ({
	containerStyles,
	filtersLength,
	iconSearch = false,
	inputStyles,
	isFilterButton,
	onChangeSearchTerm,
	onInputChange,
	onOpenFilter,
	onSubmit,
	placeholder,
	value,
}) => {
	const [searchTerm, setSearchTerm] = useState(value);
	const [filteredSuggestions, setFilteredSuggestions] = useState<
		DropdownOption[]
	>([]);
	const screenWidth = useGetScreenWidth();

	const { control, errors, handleSubmit } = useAppForm({
		defaultValues: {
			search: value,
		},
	});

	const handleInputChange = useCallback(
		async (value: string) => {
			setSearchTerm(value);

			if (value.trim() === "") {
				setFilteredSuggestions([]);
				onSubmit("");
			} else {
				if (onInputChange) {
					const suggestions = await onInputChange(value);
					setFilteredSuggestions(suggestions);
				}
			}

			if (onChangeSearchTerm) {
				onChangeSearchTerm(value);
			}
		},
		[onInputChange, onChangeSearchTerm, onSubmit],
	);

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			event_.preventDefault();
			void handleSubmit(() => {
				onSubmit(searchTerm);
			})(event_);
		},
		[onSubmit, searchTerm, handleSubmit],
	);

	const handleSuggestionClick = useCallback((suggestion: number | string) => {
		setSearchTerm(suggestion.toString());
	}, []);

	return (
		<div className={clsx(styles["container"], containerStyles)}>
			<form className={styles["search_form"]} onSubmit={handleFormSubmit}>
				<div className={styles["form"]}>
					<div className={styles["search_wrapper"]}>
						<SearchInput
							className={clsx(styles["search__input"], inputStyles)}
							control={control}
							errors={errors}
							iconName={iconSearch ? IconName.SEARCH : null}
							name="search"
							onChange={handleInputChange}
							onSuggestionClick={handleSuggestionClick}
							placeholder={placeholder}
							suggestions={filteredSuggestions}
						/>
					</div>
					{isFilterButton && (
						<Button
							appendedIcon={
								<FilterIcon className={styles["filter-button__icon"]} />
							}
							className={styles["filter-button"]}
							onClick={onOpenFilter}
							type={ButtonType.BUTTON}
							variant={ButtonVariant.DEFAULT}
						>
							{screenWidth > ScreenBreakpoints.TABLET
								? `Фільтр (${filtersLength})`
								: ""}
						</Button>
					)}
					{screenWidth > ScreenBreakpoints.TABLET ? (
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
					) : (
						<IconButton
							className={styles["search__icon_button"]}
							type={ButtonType.SUBMIT}
						>
							<Icon
								className={styles["search__icon_button__icon"]}
								name={IconName.SEARCH}
							/>
						</IconButton>
					)}
				</div>
			</form>
		</div>
	);
};

export { SearchBar };
