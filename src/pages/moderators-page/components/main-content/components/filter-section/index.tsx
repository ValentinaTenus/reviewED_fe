import clsx from "clsx";
import React, { useState } from "react";

import CloseCircle from "~/assets/images/close-circle.svg?react";
import { Button, SortDropdown, ToggleGroupButtons } from "~/common/components";
import {
	moderationsReviewSortOptionsByPeriod,
	moderationsReviewSortOptionsByStatus,
	ScreenBreakpoints,
} from "~/common/constants";
import { ButtonGroupData, ButtonVariant } from "~/common/enums";
import { useGetScreenWidth } from "~/common/hooks";
import { DropdownOption } from "~/common/types";

import styles from "./styles.module.scss";

type Props = {
	filterByType: keyof typeof ButtonGroupData;
	handleSetFilterByStatus: (sortOption: DropdownOption["value"]) => void;
	handleSetSortByPeriod: (sortOption: DropdownOption["value"]) => void;
	isActiveGroupCleaner?: boolean;
	setFilterByType: (
		value: React.SetStateAction<keyof typeof ButtonGroupData>,
	) => void;
};

const ModeratorsReviewFilterSection: React.FC<Props> = ({
	filterByType,
	handleSetFilterByStatus,
	handleSetSortByPeriod,
	isActiveGroupCleaner,
	setFilterByType,
}) => {
	const [isClean, setIsClean] = useState(false);

	const handleCleanSortGroup = () => {
		handleSetFilterByStatus("");
		handleSetSortByPeriod("");
		setIsClean(true);
	};

	const handleSetIsClean = (state: boolean) => {
		setIsClean(state);
	};

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
					isClean={isClean}
					isWithCleaner
					menuStaticStyle={useGetScreenWidth() <= ScreenBreakpoints.MOBILE}
					onChange={handleSetFilterByStatus}
					onSetIsClean={handleSetIsClean}
					options={moderationsReviewSortOptionsByStatus}
					title="Стан перевірки"
				/>
				<SortDropdown
					className={styles["dropdown_fullwidth"]}
					isClean={isClean}
					isWithCleaner
					menuStaticStyle={useGetScreenWidth() <= ScreenBreakpoints.MOBILE}
					onChange={handleSetSortByPeriod}
					onSetIsClean={handleSetIsClean}
					options={moderationsReviewSortOptionsByPeriod}
					title="Період"
				/>

				<Button
					className={clsx(
						styles["sort-group_cleaner-btn"],
						isActiveGroupCleaner && styles["sort-group_cleaner-btn__active"],
					)}
					onClick={handleCleanSortGroup}
					prependedIcon={<CloseCircle />}
					variant={ButtonVariant.DEFAULT}
				>
					Скинути налаштування
				</Button>
			</div>
		</div>
	);
};

export { ModeratorsReviewFilterSection };
