import clsx from "clsx";
import React from "react";

import { Button } from "~/common/components";
import { DropdownKey } from "~/common/constants/faq-page-data";
import { ButtonVariant } from "~/common/enums";

import styles from "./styles.module.scss";

type Properties = {
	activeButtonValue: DropdownKey;
	handleButtonClick: (value: DropdownKey) => void;
	toggleButtonGroupData: DropdownKey[];
};

const ToggleGroupButtons: React.FC<Properties> = ({
	activeButtonValue,
	handleButtonClick,
	toggleButtonGroupData,
}) => {
	const handleClick = (value: DropdownKey) => {
		handleButtonClick(value);
	};

	return (
		<div className={styles["button-group"]}>
			{toggleButtonGroupData.map((buttonValue) => (
				<Button
					className={clsx(
						styles["button-group__item"],
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
