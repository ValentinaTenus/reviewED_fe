import React, { useCallback } from "react";

import { Icon, IconButton } from "~/common/components/index";
import { IconName } from "~/common/enums/index";

import styles from "./styles.module.scss";

type FilterModalProperties = {
	onClose: () => void;
};

const FilterModal: React.FC<FilterModalProperties> = ({ onClose }) => {
	const handleClickOutside = useCallback(
		(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			if (e.target === e.currentTarget) {
				onClose();
			}
		},
		[onClose],
	);

	return (
		<div className={styles["modal"]} onClick={handleClickOutside}>
			<div className={styles["modal__container"]}>
				<div className={styles["modal__header"]}>
					<h2 className={styles["modal__title"]}>Фільтр за</h2>
					<IconButton onClick={onClose}>
						<Icon
							className={styles["modal__icon-close"]}
							name={IconName.CLOSE}
						/>
					</IconButton>
				</div>
			</div>
		</div>
	);
};

export { FilterModal };
