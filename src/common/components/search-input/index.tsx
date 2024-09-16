import clsx from "clsx";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
	useController,
} from "react-hook-form";

import { Icon } from "~/common/components/icon";
import { IconName } from "~/common/enums/index";
import { DropdownOption } from "~/common/types/index";

import styles from "./styles.module.scss";

const ZERO_LENGTH = 0;
const TIME_CLOSE_SUGGESTIONS = 100;

type Properties<T extends FieldValues> = {
	className?: string | undefined;
	control: Control<T, null>;
	errors: FieldErrors<T>;
	helperText?: string;
	iconName?: IconName | null;
	label?: string;
	maxWords?: number;
	name: FieldPath<T>;
	onChange?: (value: string) => void;
	onSuggestionClick: (suggestion: number | string) => void;
	placeholder?: string;
	ref?: React.RefObject<HTMLTextAreaElement>;
	rows?: number;
	suggestions?: DropdownOption[];
	type?: "email" | "password" | "text";
};

const SearchInput = <T extends FieldValues>({
	className,
	control,
	errors,
	iconName,
	name,
	onChange,
	onSuggestionClick,
	placeholder = "",
	suggestions,
	type = "text",
}: Properties<T>): React.JSX.Element => {
	const { field } = useController({ control, name });
	const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(true);
	const inputWrapperRef = useRef<HTMLDivElement>(null);

	const error = errors[name]?.message;
	const hasError = Boolean(error);

	const placeholderIcon = iconName ? (
		<Icon
			className={clsx(styles["icon"], field.value && styles["icon_hidden"])}
			name={iconName}
		/>
	) : null;

	const inputClasses = clsx(
		className,
		styles["input"],
		hasError && styles["input__error"],
		placeholderIcon && styles["input_with_icon_placeholder"],
		field.value && styles["input_filled"],
	);

	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			field.onChange(e);
			onChange?.(e.target.value);
			setIsSuggestionsOpen(true);
		},
		[field, onChange],
	);

	const handleInputFocus = useCallback(() => {
		setIsSuggestionsOpen(true);
	}, []);

	const handleSuggestionClick = useCallback(
		(suggestion: DropdownOption) => {
			onSuggestionClick(suggestion.value);
			field.onChange(suggestion.value);
			onChange?.(suggestion.value.toString());
		},
		[field, onChange, onSuggestionClick],
	);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				inputWrapperRef.current &&
				!inputWrapperRef.current.contains(event.target as Node)
			) {
				setTimeout(() => {
					setIsSuggestionsOpen(false);
				}, TIME_CLOSE_SUGGESTIONS);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<label className={styles["container"]}>
			<div className={styles["input_wrapper"]} ref={inputWrapperRef}>
				{placeholderIcon}
				<input
					className={inputClasses}
					{...field}
					onChange={handleInputChange}
					onFocus={handleInputFocus}
					placeholder={placeholder}
					type={type}
				/>
			</div>
			{isSuggestionsOpen && suggestions && suggestions.length > ZERO_LENGTH && (
				<ul className={styles["suggestions_list"]}>
					<li className={styles["suggestion_item"]}>
						<Icon
							className={styles["suggestion_icon"]}
							name={IconName.SEARCH}
						/>
						<span>{field.value}</span>
					</li>
					{suggestions.map((suggestion, index) => (
						<li
							className={styles["suggestion_item"]}
							key={index}
							onClick={() => handleSuggestionClick(suggestion)}
							value={suggestion.value}
						>
							<span>{suggestion.label}</span>
						</li>
					))}
				</ul>
			)}
		</label>
	);
};

export { SearchInput };
