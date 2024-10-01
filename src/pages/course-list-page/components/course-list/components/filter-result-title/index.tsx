import React from "react";

import { SortDropdown } from "~/common/components/index";
import {
	CoursesSortOptions,
	ScreenBreakpoints,
} from "~/common/constants/index";
import { useGetScreenWidth } from "~/common/hooks/index";

import styles from "./styles.module.scss";

type Properties = {
	onChangeSortBy: (newSortBy: number | string) => void;
	resultCount: number;
	resultTerm: string;
};

const FilterResultTitle: React.FC<Properties> = ({
	onChangeSortBy,
	resultCount,
	resultTerm,
}) => {
	const screenWidth = useGetScreenWidth();

	return (
		<div className={styles["filter_result__title_and_sort"]}>
			<h2 className={styles["filter_result__title"]}>
				Знайдено {resultCount} результатів по запиту{" "}
				{resultTerm ? resultTerm : ""}
			</h2>
			<SortDropdown
				className={styles["filter_result__sort"]}
				isIconButton={screenWidth < ScreenBreakpoints.TABLET}
				name="Cортувати за"
				onChange={onChangeSortBy}
				options={CoursesSortOptions}
			/>
		</div>
	);
};

export { FilterResultTitle };
