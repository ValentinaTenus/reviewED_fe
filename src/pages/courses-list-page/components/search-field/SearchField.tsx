import clsx from "clsx";
import React from "react";

import styles from "./styles.module.scss";

interface IFilter {
	filterName: string;
	label: string;
}

interface ISearchFieldProps {
	className?: string | undefined;
	filter: IFilter;
	updateFilterCourse: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
}

function SearchField({
	className,
	filter,
	updateFilterCourse,
	value,
}: ISearchFieldProps) {
	const inputClasses = clsx(className, styles["input"]);

	return (
		<div className={styles["input_wrapper"]}>
			<input
				className={inputClasses}
				id={filter.filterName}
				name={filter.filterName}
				onChange={(e) => updateFilterCourse(e)}
				placeholder={filter.label}
				type="text"
				value={value}
			/>
		</div>
	);
}

export default SearchField;
