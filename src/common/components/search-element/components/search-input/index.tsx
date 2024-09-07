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
	hasVisuallyHiddenLabel?: boolean;
	iconName?: IconName;
};

const SearchInput = <T extends FieldValues>({
	className,
	control,
	errors,
	name,
	placeholder = "",
	type = "text",
	iconName
}: Properties<T>): JSX.Element => {
	const { field } = useController({ control, name });

	const error = errors[name]?.message;
	const hasError = Boolean(error);

	const placeholderIcon = iconName ? (
		<Icon className={styles["icon"]} name={iconName} />
	) : null;

	const inputClasses = clsx(
		className,
		styles["input"],
		hasError && styles["input__error"],
	);

	return (
		<label className={styles["container"]}>
			<div className={styles["input-wrapper"]}>
				{placeholderIcon}
					<input
						className={inputClasses}
						{...field}
						placeholder={placeholder}
						type={type}
					/>
			</div>
		</label>
	);
};

export { SearchInput };