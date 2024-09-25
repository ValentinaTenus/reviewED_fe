import React, { useCallback, useState } from "react";

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
import { useAppForm } from "~/common/hooks/index";
import { type DropdownOption } from "~/common/types/index";

import styles from "./styles.module.scss";

type SearchBarProperties = {
	iconSearch?: boolean;
	onInputChange?: (value: string) => [];
	onSubmit: (searchTerm: string) => void;
	placeholder: string;
	value: string;
};

const SearchBar: React.FC<SearchBarProperties> = ({
	iconSearch = false,
	onInputChange,
	onSubmit,
	placeholder,
	value,
}) => {
	const screenWidth = window.innerWidth;
	const [searchTerm, setSearchTerm] = useState(value);
	const [filteredSuggestions, setFilteredSuggestions] = useState<
		DropdownOption[]
	>([]);

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
			} else {
				if (onInputChange) {
					const suggestions = await onInputChange(value);
					setFilteredSuggestions(suggestions);
				}
			}
		},
		[onInputChange],
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
		<div className={styles["container"]}>
			<form className={styles["search_form"]} onSubmit={handleFormSubmit}>
				<div className={styles["form"]}>
					<div className={styles["search_wrapper"]}>
						<SearchInput
							className={styles["search__input"]}
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
						<IconButton className={styles["search__icon_button"]}>
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
