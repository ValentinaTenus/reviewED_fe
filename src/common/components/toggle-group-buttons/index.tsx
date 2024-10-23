import clsx from "clsx";
import React from "react";

import { Button } from "~/common/components";
import { DropdownKey } from "~/common/constants/faq-page-data";
import { ButtonVariant } from "~/common/enums";

import styles from "./styles.module.scss";

type Properties = {
	activeButtonValue: string;
	buttonGroupItemStyles?: string;
	buttonGroupStyles?: string;
	handleButtonClick: (value: string) => void;
	toggleButtonGroupData: string[];
};

const ToggleGroupButtons: React.FC<Properties> = ({
	activeButtonValue,
	buttonGroupItemStyles,
	buttonGroupStyles,
	handleButtonClick,
	toggleButtonGroupData,
}) => {
	const handleClick = (value: DropdownKey) => {
		handleButtonClick(value);
	};

	return (
		<div className={clsx(styles["button-group"], buttonGroupStyles)}>
			{toggleButtonGroupData.map((buttonValue) => (
				<Button
					className={clsx(
						styles["button-group__item"],
						buttonGroupItemStyles,
						activeButtonValue === buttonValue && styles["active"],
					)}
					isFullWidth
					key={buttonValue}
					onClick={() => handleClick(buttonValue as DropdownKey)}
					variant={ButtonVariant.GROUP_BUTTONS}
				>
					{buttonValue}
				</Button>
			))}
		</div>
	);
};

export { ToggleGroupButtons };
