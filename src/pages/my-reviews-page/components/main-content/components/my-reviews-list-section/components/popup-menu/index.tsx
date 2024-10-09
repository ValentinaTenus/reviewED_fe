import clsx from "clsx";
import React from "react";

import { Icon } from "~/common/components";
import { MyReviewOptions } from "~/common/types/my-reviews";

import styles from "./styles.module.scss";

type PopupMenuProps = {
	onSelect: (option: string) => void;
	options: MyReviewOptions[];
};

const PopupMenu: React.FC<PopupMenuProps> = ({ onSelect, options }) => {
	const handleSelect = (option: string) => {
		onSelect(option);
	};

	return (
		<div className={styles["popup-menu"]}>
			<div className={styles["popup-menu__options"]}>
				{options.map((option) => (
					<div
						className={clsx(
							styles["popup-menu__option"],
							option.value === "delete" && styles["option-delete"],
						)}
						key={option.value}
						onClick={() => handleSelect(option.value)}
					>
						<Icon name={option.iconName} />
						<span>{option.value}</span>
					</div>
				))}
			</div>
		</div>
	);
};

export { PopupMenu };
