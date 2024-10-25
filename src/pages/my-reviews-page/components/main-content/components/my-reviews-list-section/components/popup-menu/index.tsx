import clsx from "clsx";
import React, { useCallback, useEffect, useRef } from "react";

import { Icon } from "~/common/components";
import { MyReviewOptions } from "~/common/types/my-reviews";

import styles from "./styles.module.scss";

type Properties = {
	handleClosePopup: () => void;
	handleSelect: (option: string) => void;
	isOpen: boolean;
	options: MyReviewOptions[];
};

const PopupMenu: React.FC<Properties> = ({
	handleClosePopup,
	handleSelect,
	isOpen,
	options,
}) => {
	const popupRef = useRef<HTMLDivElement>(null);

	const onSelect = useCallback(
		(option: string, event: React.MouseEvent) => {
			event.stopPropagation();
			handleSelect(option);
		},
		[handleSelect],
	);

	const handleClickOutside = useCallback(
		(event: MouseEvent) => {
			const isClickOutsidePopup = !popupRef.current?.contains(
				event.target as Node,
			);

			if (isClickOutsidePopup) {
				handleClosePopup();
			}
		},
		[handleClosePopup],
	);

	useEffect(() => {
		//If the Popup is open, add event listener to detect clicks outside the Popup
		if (isOpen) {
			document.addEventListener("pointerdown", handleClickOutside);
		}
		return () => {
			document.removeEventListener("pointerdown", handleClickOutside);
		};
	}, [isOpen, handleClickOutside]);

	return (
		<div
			className={clsx(styles["popup-menu"], { [styles["open"]]: isOpen })}
			ref={popupRef}
		>
			<div className={styles["popup-menu__options"]}>
				{options.map((option) => (
					<div
						className={clsx(
							styles["popup-menu__option"],
							option.value === "delete" && styles["option-delete"],
						)}
						key={option.value}
						onClick={(event) => onSelect(option.value, event)}
					>
						<Icon name={option.iconName} />
						<span>{option.label}</span>
					</div>
				))}
			</div>
		</div>
	);
};

export { PopupMenu };
