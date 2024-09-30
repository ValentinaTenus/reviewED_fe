import React from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";

import { Icon } from "~/common/components";
import { PopupMenuOption } from "~/common/types/my-reviews";

type PopupMenuProps = {
	options: PopupMenuOption[];
	onSelect: (option: string) => void;
};

const PopupMenu: React.FC<PopupMenuProps> = ({ options, onSelect }) => {
	const handleSelect = (option: string) => {
		onSelect(option);
	};

	return (
		<div className={styles["popup-menu"]}>
			<div className={styles["popup-menu__options"]}>
				{options.map((option) => (
					<div
						key={option.value}
						className={clsx(
							styles["popup-menu__option"],
							option.value === "delete" && styles["option-delete"],
						)}
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
