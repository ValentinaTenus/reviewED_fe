import clsx from "clsx";
import React, { useCallback } from "react";

import { DropdownOption } from "~/common/types";

import styles from "./styles.module.scss";

type Properties = {
	className?: string;
	isSelected: boolean;
	onClick: (subOption: DropdownOption) => void;
	subOption: DropdownOption;
};

const SubcategoryItem: React.FC<Properties> = ({
	className,
	isSelected,
	onClick,
	subOption,
}) => {
	const handleOptionClick = useCallback(
		(subOption: DropdownOption) => {
			onClick(subOption);
		},
		[onClick],
	);

	return (
		<div
			className={clsx(styles["nested_option"], className)}
			key={`subOption-${subOption.value}`}
			onClick={() => handleOptionClick(subOption)}
		>
			<div className={styles["checkbox_container"]}>
				<input
					checked={isSelected}
					className={styles["checkbox__input"]}
					onChange={() => handleOptionClick(subOption)}
					type="checkbox"
				/>
			</div>
			{subOption.label}
		</div>
	);
};

export { SubcategoryItem };
