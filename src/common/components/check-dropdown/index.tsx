import clsx from "clsx";
import React, { useCallback, useEffect, useState } from "react";

import { type DropdownOption } from "~/common/types/index";

import styles from "./styles.module.scss";

const ZERO = 0;

type Properties = {
	className?: string;
	defaultValue?: DropdownOption;
	isDisabled?: boolean;
	isTitleClickable?: boolean;
	label?: string;
	name: string;
	onChange: (value: { isTitle: boolean; value: number | string }) => void;
	options: DropdownOption[];
	placeholder?: string;
};

const CheckDropdown: React.FC<Properties> = ({
	className,
	isDisabled,
	isTitleClickable = true,
	label,
	onChange,
	options,
	placeholder,
}) => {
	const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(
		null,
	);
	const [isOpen, setIsOpen] = useState(false);
	const [expandedOptions, setExpandedOptions] = useState<DropdownOption | null>(
		null,
	);

	const handleOptionClick = (option: DropdownOption) => {
		const { label, value } = option;
		setSelectedOption({ label, value });
		setIsOpen(false);
		onChange({ isTitle: false, value });
	};

	const handleTitleClick = (option: DropdownOption) => {
		if (option.options && option.options.length > ZERO && !isTitleClickable) {
			setExpandedOptions(expandedOptions === option ? null : option);
		} else {
			handleOptionClick(option);
		}
		setIsOpen(!isOpen);
		onChange({ isTitle: true, value: option.value });
	};

	const handleToggleDropdown = useCallback(() => {
		if (!isDisabled) {
			setIsOpen(!isOpen);
		}
	}, [isDisabled, isOpen]);

	useEffect(() => {
		setSelectedOption(null);
	}, [label]);

	return (
		<div
			className={clsx(
				styles["dropdown_container"],
				{ [styles["disabled"]]: isDisabled, [styles["open"]]: isOpen },
				className,
			)}
		>
			<div
				className={clsx(styles["dropdown_trigger"], {
					[styles["open"]]: isOpen,
				})}
				onClick={handleToggleDropdown}
			>
				<span className={styles["dropdown_trigger_text"]}>
					{selectedOption ? selectedOption.label : placeholder}
				</span>
			</div>
			{/* Render dropdown menu */}
			{isOpen && !isDisabled && (
				<div className={styles["dropdown_menu"]}>
					{options.map((option, index) => (
						<div key={index}>
							<div
								className={clsx(
									styles["dropdown_title"],
									styles["dropdown_item"],
								)}
								onClick={() => handleTitleClick(option)}
							>
								{option.label}
							</div>
							{/* Nested options */}
							{option.options?.map((nestedOption, nestedIndex) => (
								<div
									className={clsx(
										styles["dropdown_item"],
										styles["nested_option"],
									)}
									key={nestedIndex}
									onClick={() => handleOptionClick(nestedOption)}
								>
									{nestedOption.label}
								</div>
							))}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export { CheckDropdown };
