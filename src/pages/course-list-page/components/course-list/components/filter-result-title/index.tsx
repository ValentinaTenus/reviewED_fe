import React from "react";

import { SortDropdown } from "~/common/components/index";
import {
	CoursesSortOptions,
	ScreenBreakpoints,
} from "~/common/constants/index";
import { useGetScreenWidth } from "~/common/hooks/index";
import { IconName } from "~/common/enums/index";
import { Icon } from "~/common/components/index";

import styles from "./styles.module.scss";

type Properties = {
	onChangeSortBy: (newSortBy: number | string) => void;
	resultCount: number;
	resultTerm: string;
	resultReviewsCount: number;
};

const FilterResultTitle: React.FC<Properties> = ({
	onChangeSortBy,
	resultCount,
	resultTerm,
	resultReviewsCount,
}) => {
	const screenWidth = useGetScreenWidth();

	return (
		<div className={styles["filter_result__title_and_sort"]}>
			<div className={styles["filter_result__header"]}>
				<h2 className={styles["filter_result__title"]}>
					Знайдено {resultCount} результатів по запиту{" "}
					{resultTerm ? resultTerm : ""}
				</h2>
				<p className={styles["filter_result__subtitle"]}>
					<Icon
						className={styles["filter_result__subtitle_icon"]}
						name={IconName.USERS}
					/>
					{resultReviewsCount} Відгуків за запитом
				</p>
			</div>
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
