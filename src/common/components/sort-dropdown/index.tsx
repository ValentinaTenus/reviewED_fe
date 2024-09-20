import clsx from "clsx";
import React, { useCallback, useEffect, useRef, useState } from "react";

import ArrowDown from "~/assets/images/arrow-down.svg?react";
import ArrowUp from "~/assets/images/arrow-up.svg?react";
import { IconName } from "~/common/enums/index";
import { type DropdownOption } from "~/common/types/index";

import { Icon } from "../icon";
import { IconButton } from "../icon-button";
import styles from "./styles.module.scss";

const FIRST_OPTION = 0;

type Properties = {
	className?: string;
	isDisabled?: boolean;
	isIconButton?: boolean;
	name: string;
	onChange: (value: number | string) => void;
	options: DropdownOption[];
};

const SortDropdown: React.FC<Properties> = ({
	className,
	isDisabled,
	isIconButton = false,
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
				{isIconButton && (
					<IconButton
						className={styles["sort__button"]}
						onClick={handleToggleDropdown}
					>
						<Icon
							className={styles["sort__button_icon"]}
							name={IconName.SORT}
						/>
					</IconButton>
				)}
				{!isIconButton && (
					<div
						className={clsx(styles["dropdown_trigger"], {
							[styles["open"]]: isOpen,
						})}
						onClick={handleToggleDropdown}
					>
						{selectedOption
							? selectedOption.label
							: options[FIRST_OPTION].label}
						{isOpen ? (
							<ArrowUp className={styles["dropdown_icon"]} />
						) : (
							<ArrowDown className={styles["dropdown_icon"]} />
						)}
					</div>
				)}
				{isOpen && !isDisabled && (
					<div
						className={clsx(
							styles["dropdown_menu"],
							isIconButton && styles["icon_button__menu"],
						)}
					>
						{options.map((option, index) => (
							<div
								className={clsx(
									styles["dropdown_item"],
									isIconButton && styles["icon_button__menu_item"],
								)}
								key={index}
								onClick={() => handleOptionClick(option)}
							>
								{option.label}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export { SortDropdown };
