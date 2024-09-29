import clsx from "clsx";
import React, { useMemo, useState } from "react";

import { DropdownOption } from "~/common/types/index";

import { SubcategoryItem } from "./components/index";
import styles from "./styles.module.scss";

const INITIAL_VISIBLE_COUNT = 5;
const DEFAULT_OPTIONS_LENGTH = 0;
const INDEX_ONE = 1;

type Properties = {
	className?: string;
	isDisabled?: boolean;
	label?: string;
	name: string;
	onChange: (value: { isTitle: boolean; values: string[] }) => void;
	options: DropdownOption[];
	placeholder?: string;
	selectedItems: string[];
};

const CheckDropdown: React.FC<Properties> = ({
	className,
	isDisabled,
	onChange,
	options,
	placeholder,
	selectedItems,
}) => {
	const selectedOptions = useMemo(() => {
		const selectedOptions: DropdownOption[] = [];

		options.forEach((option) => {
			if (selectedItems.includes(option.value.toString())) {
				selectedOptions.push(option);
			}

			if (option.options) {
				option.options.forEach((subOption) => {
					if (selectedItems.includes(subOption.value.toString())) {
						selectedOptions.push(subOption);
					}
				});
			}
		});

		return selectedOptions;
	}, [options, selectedItems]);

	const [isOpen, setIsOpen] = useState(false);
	const [visibleItemsCount, setVisibleItemsCount] = useState(
		INITIAL_VISIBLE_COUNT,
	);

	const handleOptionClick = (option: DropdownOption) => {
		const isSelected = selectedOptions?.some((o) => o.value === option.value);

		let updatedSelectedOptions;
		if (isSelected) {
			updatedSelectedOptions = selectedOptions?.filter(
				(o) => o.value !== option.value,
			);
		} else {
			updatedSelectedOptions = [...selectedOptions, option];
		}

		onChange({
			isTitle: false,
			values: updatedSelectedOptions.map((o) => o.value.toString()),
		});
	};

	const handleToggleDropdown = () => {
		if (!isDisabled) {
			setIsOpen(!isOpen);
		}
	};

	const handleShowMore = () => {
		setVisibleItemsCount((prevCount) => prevCount + INITIAL_VISIBLE_COUNT);
	};

	const renderVisibleItems = () => {
		const renderedItems = [];
		let itemsCount = DEFAULT_OPTIONS_LENGTH;

		for (const option of options) {
			if (itemsCount >= visibleItemsCount) break;

			renderedItems.push(
				<div
					className={clsx(styles["dropdown_title"], styles["dropdown_item"])}
					key={`option-${option.value}`}
				>
					{option.label}
				</div>,
			);
			itemsCount++;

			if (option.options && option.options.length > DEFAULT_OPTIONS_LENGTH) {
				for (const subOption of option.options) {
					if (itemsCount >= visibleItemsCount) break;
					const isSelected = selectedOptions.some(
						(o) => o.value === subOption.value,
					);

					renderedItems.push(
						<SubcategoryItem
							className={styles["dropdown_item"]}
							isSelected={isSelected}
							onClick={handleOptionClick}
							subOption={subOption}
						/>,
					);
					itemsCount++;
				}
			}
		}

		return renderedItems;
	};

	const totalItemsCount = options.reduce(
		(acc, cur) =>
			acc +
			(cur.options ? cur.options.length : DEFAULT_OPTIONS_LENGTH) +
			INDEX_ONE,
		DEFAULT_OPTIONS_LENGTH,
	);

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
				<span className={styles["dropdown_trigger_text"]}>{placeholder}</span>
			</div>

			{isOpen && !isDisabled && (
				<div className={styles["dropdown_menu"]}>
					{renderVisibleItems()}

					{visibleItemsCount < totalItemsCount && (
						<div className={styles["see_more"]} onClick={handleShowMore}>
							Дивитись більше
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export { CheckDropdown };
