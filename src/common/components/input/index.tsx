import clsx from "clsx";
import { useEffect, useState } from "react";
import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
    useController
} from "react-hook-form";

import styles from "./styles.module.scss";

type Properties<T extends FieldValues> = {
	className?: string | undefined;
	control: Control<T, null>;
  disabled: boolean;
	errors: FieldErrors<T>;
	label: string;
	name: FieldPath<T>;
	placeholder?: string;
	type?: "email" | "password" | "text";
	ref?: React.RefObject<HTMLTextAreaElement>
	rows?: number;
  helperText?: string;
  maxWords?: number;
};

const Input = <T extends FieldValues>({
	className,
	control,
  disabled,
	errors,
	label,
	name,
	placeholder = "",
	type = "text",
	ref,
	rows,
  helperText,
  maxWords = 2000
}: Properties<T>): JSX.Element => {
	const { field } = useController({ control, name });
  const [wordCount, setWordCount] = useState(0);

	const error = errors[name]?.message;
	const hasError = Boolean(error);
	const isTextArea = Boolean(rows);

	const inputClasses = clsx(
		className,
		styles["input"],
		hasError && styles["input__error"],
    disabled && styles["input__disabled"],
		isTextArea && styles["textarea"]
	);

  const handleWordCount = (value: string) => {
		const words = value.trim().split(/\s+/);
		const count = words[0] === '' ? 0 : words.length; 
		setWordCount(count);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    if (textarea) {
      textarea.style.height = "auto"; 
      textarea.style.height = `${textarea.scrollHeight}px`; 
    }

    field.onChange(e);
		handleWordCount(e.target.value);
  };

  useEffect(() => {
    if (ref && ref.current) {
      handleInputChange({ target: ref.current } as React.ChangeEvent<HTMLTextAreaElement>);
    }
  }, [ref]);

	return (
		<label className={styles["container"]}>
			<span className={"label"}>{label}</span>
			{ isTextArea ? (
        <>
          <textarea
            className={inputClasses}
            disabled={disabled}
            {...field}
            placeholder={placeholder}
            rows={rows}
            onChange={(e) => {
              field.onChange(e);
              handleInputChange(e);
            }}
            onBlur={field.onBlur}
            value={field.value || ""}
            ref={ref}
				  />
          <div className={styles['helper_container']}>
            <span className={styles['helper_text']}>{helperText}</span>
            <span className={styles['word_count']}>{wordCount}/{maxWords}</span>
          </div>
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
		</label>
	);
};

export { Input };