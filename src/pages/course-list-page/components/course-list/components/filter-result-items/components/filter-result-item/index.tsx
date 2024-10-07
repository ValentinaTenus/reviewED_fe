import React, { useCallback } from "react";

import { Icon, IconButton } from "~/common/components/index";
import { CoursesFilterType, IconName } from "~/common/enums/index";
import { type FilterType } from "~/common/types/index";

import styles from "./styles.module.scss";

type Properties = {
	filter: FilterType;
	filterType: CoursesFilterType;
	onRemoveFilter: (filterType: CoursesFilterType, id: string) => void;
};

const FilterResultItem: React.FC<Properties> = ({
	filter,
	filterType,
	onRemoveFilter,
}) => {
	const handleRemoveFilter = useCallback(() => {
		onRemoveFilter(filterType, filter.id);
	}, [filter.id, filterType, onRemoveFilter]);

	return (
		<div className={styles["filter_item__container"]}>
			<span className={styles["filter_item__label"]}>{filter.name}</span>
			<IconButton
				className={styles["filter_item__cross_button"]}
				onClick={handleRemoveFilter}
			>
				<Icon
					className={styles["filter_item__button_icon"]}
					name={IconName.CLOSE}
				/>
			</IconButton>
		</div>
	);
};

export { FilterResultItem };
