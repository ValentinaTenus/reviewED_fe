import clsx from "clsx";
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
	suggestions?: string[]; 
  onSuggestionClick?: (suggestion: string) => void;
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

	return (
		<label className={styles['container']}>
			<div className={styles['input_wrapper']}>
				{placeholderIcon}
				<input
					className={inputClasses}
					{...field}
					placeholder={placeholder}
					type={type} 
					onChange={(e) => {
						field.onChange(e);
						onChange?.(e.target.value); 
					}}
				/>
			</div>
			{suggestions && suggestions.length > 0 && (
				<ul className={styles['suggestions_list']}>
					<li className={styles['suggestion_item']}>
						<Icon className={styles['suggestion_icon']} name={IconName.SEARCH}/>
						<span>{field.value }</span>
					</li>
					{suggestions.map((suggestion, index) => (
						<li
							key={index}
							className={styles['suggestion_item']}
							onClick={() => onSuggestionClick?.(suggestion)} 
						>
							<span>{suggestion}</span>
						</li>
					))}
				</ul>)}
		</label>
	)
};

export { SearchInput };