import clsx from "clsx";
import React from "react";

import { Button } from "~/common/components";
import { ButtonGroupData, ButtonVariant } from "~/common/enums";

import styles from "./styles.module.scss";

type Properties = {
	activeButtonValue: keyof typeof ButtonGroupData;
	handleButtonClick: (value: keyof typeof ButtonGroupData) => void;
	toggleButtonGroupData: (keyof typeof ButtonGroupData)[];
};

const ToggleGroupButtonsModerationReview: React.FC<Properties> = ({
	activeButtonValue,
	handleButtonClick,
	toggleButtonGroupData,
}) => {
	const handleClick = (value: Properties["activeButtonValue"]) => {
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
					onClick={() =>
						handleClick(buttonValue as Properties["activeButtonValue"])
					}
					variant={ButtonVariant.GROUP_BUTTONS}
				>
					{ButtonGroupData[buttonValue]}
				</Button>
			))}
		</div>
	);
};

export { ToggleGroupButtonsModerationReview };
