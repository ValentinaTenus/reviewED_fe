import clsx from "clsx";
import { useEffect, useState, useRef, useCallback } from "react";
import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
    useController
} from "react-hook-form";

import { Icon } from "~/common/components/icon";
import { IconName } from "~/common/enums/index";

import styles from "./styles.module.scss";
import { DropdownOption } from "~/common/types";

type Properties<T extends FieldValues> = {
	className?: string | undefined;
	control: Control<T, null>;
	errors: FieldErrors<T>;
	label?: string;
	name: FieldPath<T>;
	placeholder?: string;
	type?: "email" | "password" | "text";
	ref?: React.RefObject<HTMLTextAreaElement>
	rows?: number;
  helperText?: string;
  maxWords?: number;
	suggestions?: DropdownOption[]; 
  onSuggestionClick: (suggestion: string | number) => void;
	iconName?: IconName;
	onChange?: (value: string) => void
};

const SearchInput = <T extends FieldValues>({
	className,
	control,
	errors,
	name,
	placeholder = "",
	type = "text",
	iconName,
	suggestions,
	onSuggestionClick,
	onChange
}: Properties<T>): JSX.Element => {
	const { field } = useController({ control, name });
	const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(true);
	const inputWrapperRef = useRef<HTMLDivElement>(null);

	const error = errors[name]?.message;
	const hasError = Boolean(error);

	const placeholderIcon = iconName ? (
		<Icon className={clsx(styles["icon"], field.value && styles["icon_hidden"])} name={iconName} />
	) : null;

	const inputClasses = clsx(
		className,
		styles["input"],
		hasError && styles["input__error"],
		field.value && styles["input_filled"]
	);

	const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		field.onChange(e);
		onChange?.(e.target.value);
		setIsSuggestionsOpen(true);
	}, [field, onChange]);

	const handleInputFocus = useCallback(() => {
		setIsSuggestionsOpen(true)
	}, []);

	const handleSuggestionClick = useCallback((value: string | number) => {
		onSuggestionClick(value);
		console.log(value)
	}, [onSuggestionClick]);

	useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputWrapperRef.current && !inputWrapperRef.current.contains(event.target as Node)) {
        setIsSuggestionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

	return (
		<label className={styles['container']}>
			<div className={styles['input_wrapper']} ref={inputWrapperRef}>
				{placeholderIcon}
				<input
					className={inputClasses}
					{...field}
					placeholder={placeholder}
					type={type} 
					onFocus={handleInputFocus}
					onChange={handleInputChange}
				/>
			</div>
			{isSuggestionsOpen && suggestions && suggestions.length > 0 && (
				<ul className={styles['suggestions_list']}>
					<li className={styles['suggestion_item']}>
						<Icon className={styles['suggestion_icon']} name={IconName.SEARCH}/>
						<span>{field.value }</span>
					</li>
					{suggestions.map((suggestion, index) => (
						<li
							key={index}
							className={styles['suggestion_item']}
							onClick={() => handleSuggestionClick(suggestion.value)} 
						>
							<span>{suggestion.label}</span>
						</li>
					))}
				</ul>)}
		</label>
	)
};

export { SearchInput };