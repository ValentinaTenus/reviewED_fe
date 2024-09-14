import clsx from "clsx";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { type DropdownOption } from "~/common/types/index";

import styles from "./styles.module.scss";

const ZERO = 0;

type Properties = {
	className?: string;
	defaultValue?: DropdownOption;
	isDisabled?: boolean;
	label?: string;
	name: string;
	onChange: (value: number | string) => void;
	options: DropdownOption[];
	placeholder?: string;
};

const Dropdown: React.FC<Properties> = ({
	className,
	isDisabled,
	onChange,
	options,
	placeholder,
}) => {
	const [selectedOption, setSelectedOption] = useState<
		DropdownOption | undefined
	>(undefined);
	const [isOpen, setIsOpen] = useState(false);
	const [expandedOptions, setExpandedOptions] = useState<DropdownOption | null>(
		null,
	);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const handleOptionClick = (option: DropdownOption) => {
		const { label, value } = option;
		setSelectedOption({ label, value });
		setIsOpen(false);
		onChange(value);
	};

	const handleTitleClick = (option: DropdownOption) => {
		if (option.options && option.options.length > ZERO) {
			setExpandedOptions(expandedOptions === option ? null : option);
		} else {
			handleOptionClick(option);
		}
	};

	const handleToggleDropdown = useCallback(() => {
		if (!isDisabled) {
			setIsOpen(!isOpen);
		}
	}, [isDisabled, isOpen]);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(e.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div
			className={clsx(
				styles["dropdown_container"],
				{ [styles["disabled"]]: isDisabled, [styles["open"]]: isOpen },
				className,
			)}
			ref={dropdownRef}
		>
			<div
				className={clsx(styles["dropdown_trigger"], {
					[styles["open"]]: isOpen,
				})}
				onClick={handleToggleDropdown}
			>
				<span>{selectedOption ? selectedOption.label : placeholder}</span>
			</div>
			{isOpen && !isDisabled && (
				<div className={styles["dropdown_menu"]}>
					<div className={styles["dropdown_menu_content"]}>
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
				</div>
			)}
		</div>
	);
};

export { Dropdown };
