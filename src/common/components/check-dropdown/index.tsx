import clsx from "clsx";
import React, { useState } from "react";

import { type DropdownOption } from "~/common/types/index";

import styles from "./styles.module.scss";

const INITIAL_VISIBLE_COUNT = 5;
const DEFAULT_OPTIONS_LENGTH = 0;
const INDEX_ONE = 1;

type Properties = {
	className?: string;
	isDisabled?: boolean;
	label?: string;
	name: string;
	onChange: (value: { isTitle: boolean; values: (number | string)[] }) => void;
	options: DropdownOption[];
	placeholder?: string;
};

const CheckDropdown: React.FC<Properties> = ({
	className,
	isDisabled,
	onChange,
	options,
	placeholder,
}) => {
	const [selectedOptions, setSelectedOptions] = useState<DropdownOption[]>([]);
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

		setSelectedOptions(updatedSelectedOptions);
		onChange({
			isTitle: false,
			values: updatedSelectedOptions.map((o) => o.value),
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
						<div
							className={clsx(styles["nested_option"], styles["dropdown_item"])}
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
						</div>,
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
