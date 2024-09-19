import clsx from "clsx";
import React from "react";
import styles from "./styles.module.scss";

import { DropdownKey } from "~/common/constants/faq-page-data";
import { Button } from "~/common/components";
import { ButtonVariant } from "~/common/enums";

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
					onClick={() => handleClick(buttonValue as DropdownKey)}
					isFullWidth
					variant={ButtonVariant.GROUP_BUTTONS}
				>
					{buttonValue}
				</Button>
			))}
		</div>
	);
};

export { ToggleGroupButtons };
