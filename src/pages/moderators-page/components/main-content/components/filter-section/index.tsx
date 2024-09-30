import React from "react";

import { SortDropdown, ToggleGroupButtons } from "~/common/components";
import {
	moderationsReviewSortOptionsByPeriod,
	moderationsReviewSortOptionsByStatus,
} from "~/common/constants";
import { ButtonGroupData } from "~/common/enums";
import { DropdownOption } from "~/common/types";

import styles from "./styles.module.scss";

type Props = {
	filterByType: keyof typeof ButtonGroupData;
	handleSetFilterByStatus: (sortOption: DropdownOption["value"]) => void;
	handleSetSortByPeriod: (sortOption: DropdownOption["value"]) => void;
	setFilterByType: (
		value: React.SetStateAction<keyof typeof ButtonGroupData>,
	) => void;
};

const ModeratorsReviewFilterSection: React.FC<Props> = ({
	filterByType,
	handleSetFilterByStatus,
	handleSetSortByPeriod,
	setFilterByType,
}) => {
	return (
		<div className={styles["fitters_block"]}>
			<div className={styles["fitters_block__category"]}>
				<p className={styles["fitters_block__category_title"]}>
					Оберіть категорію
				</p>
				<ToggleGroupButtons
					activeButtonValue={filterByType}
					handleButtonClick={(type) =>
						setFilterByType(type as keyof typeof ButtonGroupData)
					}
					toggleButtonGroupData={["Компанії", "Курси"]}
				/>
			</div>
			<div className={styles["fitters_block__sort"]}>
				<p className={styles["fitters_block__sort_title"]}>Сортувати за</p>
				<SortDropdown
					className={styles["dropdown_fullwidth"]}
					onChange={handleSetFilterByStatus}
					options={moderationsReviewSortOptionsByStatus}
				/>
				<SortDropdown
					className={styles["dropdown_fullwidth"]}
					onChange={handleSetSortByPeriod}
					options={moderationsReviewSortOptionsByPeriod}
				/>
			</div>
		</div>
	);
};

export { ModeratorsReviewFilterSection };
