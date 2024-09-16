import clsx from "clsx";
import React, { useCallback, useEffect, useRef, useState } from "react";

import ArrowDown from "~/assets/images/arrow-down.svg?react";
import ArrowUp from "~/assets/images/arrow-up.svg?react";
import { type DropdownOption } from "~/common/types/index";

import styles from "./styles.module.scss";

const FIRST_OPTION = 0;

type Properties = {
	className?: string;
	defaultValue?: DropdownOption;
	isDisabled?: boolean;
	label?: string;
	name: string;
	onChange: (value: number | string) => void;
	options: DropdownOption[];
};

const SortDropdown: React.FC<Properties> = ({
	className,
	isDisabled,
	onChange,
	options,
}) => {
	const [selectedOption, setSelectedOption] = useState<
		DropdownOption | undefined
	>(undefined);
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const handleOptionClick = (option: DropdownOption) => {
		const { label, value } = option;
		setSelectedOption({ label, value });
		setIsOpen(false);
		onChange(value);
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
		<div className={styles["sort_container"]}>
			<p className={styles["sort_text"]}>Sort by</p>
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
					{selectedOption ? selectedOption.label : options[FIRST_OPTION].label}
					<ArrowDown className={styles["dropdown_icon"]} />
				</div>
				{isOpen && !isDisabled && (
					<div className={styles["dropdown_menu"]}>
						{options.map((option, index) => (
							<div
								className={clsx(styles["dropdown_item"])}
								key={index}
								onClick={() => handleOptionClick(option)}
							>
								{option.label}
								{index === FIRST_OPTION && (
									<ArrowUp className={styles["dropdown_icon"]} />
								)}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export { SortDropdown };
