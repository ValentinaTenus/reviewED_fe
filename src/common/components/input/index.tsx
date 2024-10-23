import clsx from "clsx";
import React, { useCallback, useEffect, useState } from "react";
import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
	useController,
} from "react-hook-form";

import { Icon } from "~/common/components/index";
import { IconName } from "~/common/enums/index";

import styles from "./styles.module.scss";

const MAX_TEXT_AREA_WORDS = 2000;
const INITIAL_WORD_COUNT = 0;

type Properties<T extends FieldValues> = {
	className?: string | undefined;
	control: Control<T, null>;
	disabled?: boolean;
	errors: FieldErrors<T>;
	hasVisuallyHiddenLabel?: boolean;
	helperText?: string;
	iconName?: IconName;
	label?: string;
	maxWords?: number;
	name: FieldPath<T>;
	placeholder?: string;
	ref?: React.RefObject<HTMLTextAreaElement>;
	rows?: number;
	type?: "email" | "password" | "text";
};

const Input = <T extends FieldValues>({
	className,
	control,
	disabled = false,
	errors,
	hasVisuallyHiddenLabel = false,
	helperText,
	iconName,
	label,
	maxWords = MAX_TEXT_AREA_WORDS,
	name,
	placeholder = "",
	ref,
	rows,
	type = "text",
}: Properties<T>): React.JSX.Element => {
	const { field } = useController({ control, name });
	const [wordCount, setWordCount] = useState(INITIAL_WORD_COUNT);

	const error = errors[name]?.message;
	const hasError = Boolean(error);
	const isTextArea = Boolean(rows);

	const placeholderIcon = iconName ? (
		<Icon className={styles["icon"]} name={iconName} />
	) : null;
	const hasIcon = Boolean(iconName);

	const inputClasses = clsx(
		className,
		styles["input"],
		hasError && styles["input__error"],
		hasIcon && styles["input-with-icon"],
		disabled && styles["input__disabled"],
		field.value && styles["input__filled"],
		isTextArea && styles["textarea"],
	);

	const labelClasses = clsx(
		styles["label"],
		hasVisuallyHiddenLabel && "visually-hidden",
	);

	const handleWordCount = (value: string) => {
		const words = value.trim().split("");
		const count =
			words[INITIAL_WORD_COUNT] === "" ? INITIAL_WORD_COUNT : words.length;
		setWordCount(count);
	};

	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLTextAreaElement>) => {
			const textarea = e.target;
			if (textarea) {
				textarea.style.height = "auto";
				textarea.style.height = `${textarea.scrollHeight}px`;
			}

			field.onChange(e);
			handleWordCount(e.target.value);
		},
		[field],
	);

	useEffect(() => {
		if (ref && ref.current) {
			handleInputChange({
				target: ref.current,
			} as React.ChangeEvent<HTMLTextAreaElement>);
		}
	}, [handleInputChange, ref]);

	return (
		<label
			className={clsx(
				styles["container"],
				disabled && styles["container__disabled"],
			)}
		>
			<span className={styles["label-wrapper"]}>
				<span className={labelClasses}>{label}</span>
				{hasError && !hasVisuallyHiddenLabel && (
					<span className={styles["error-asterisk"]}>*</span>
				)}
			</span>

			<div className={styles["input-wrapper"]}>
				{placeholderIcon}
				{isTextArea ? (
					<>
						<textarea
							className={inputClasses}
							disabled={disabled}
							{...field}
							onBlur={field.onBlur}
							onChange={(e) => {
								field.onChange(e);
								handleInputChange(e);
							}}
							placeholder={placeholder}
							ref={ref}
							rows={rows}
							value={field.value || ""}
						/>
					</>
				) : (
					<input
						className={inputClasses}
						disabled={disabled}
						{...field}
						placeholder={placeholder}
						type={type}
					/>
				)}
			</div>
			{isTextArea && (
				<div className={styles["helper_container"]}>
					<span className={styles["helper_text"]}>{helperText}</span>
					<span className={styles["word_count"]}>
						{wordCount}/{maxWords}
					</span>
				</div>
			)}
		</label>
	);
};

export { Input };
