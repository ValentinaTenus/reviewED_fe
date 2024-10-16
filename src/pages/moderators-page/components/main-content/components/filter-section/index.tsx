import clsx from "clsx";
import React, { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";

import CloseCircle from "~/assets/images/close-circle.svg?react";
import { Button, SortDropdown, ToggleGroupButtons } from "~/common/components";
import {
	moderationsReviewSortOptionsByPeriod,
	moderationsReviewSortOptionsByStatus,
	ScreenBreakpoints,
} from "~/common/constants";
import { ButtonVariant } from "~/common/enums";
import { useGetScreenWidth } from "~/common/hooks";

import styles from "./styles.module.scss";

const ModeratorsReviewFilterSection: React.FC = () => {
	const [isClean, setIsClean] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();
	const filterByType = searchParams.get("type");
	const filterByStatus = searchParams.get("status");
	const sortByPeriod = searchParams.get("ordering");

	const handleSetFilterByType = useCallback(
		(type: string) => {
			setSearchParams((prev) => {
				prev.set("type", type);
				return prev;
			});
		},
		[setSearchParams],
	);

	const handleCleanSortGroup = () => {
		setSearchParams((prev) => {
			prev.set("ordering", "");
			prev.set("status", "");
			return prev;
		});
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
					activeButtonValue={filterByType || "Курси"}
					handleButtonClick={handleSetFilterByType}
					toggleButtonGroupData={["Курси", "Компанії"]}
				/>
			</div>
			<div className={styles["fitters_block__sort"]}>
				<p className={styles["fitters_block__sort_title"]}>Сортувати за</p>
				<SortDropdown
					className={styles["dropdown_fullwidth"]}
					isClean={isClean}
					isWithCleaner
					menuStaticStyle={useGetScreenWidth() <= ScreenBreakpoints.MOBILE}
					onSetIsClean={handleSetIsClean}
					options={moderationsReviewSortOptionsByStatus}
					searchParam="status"
					title="Стан перевірки"
				/>
				<SortDropdown
					className={styles["dropdown_fullwidth"]}
					isClean={isClean}
					isWithCleaner
					menuStaticStyle={useGetScreenWidth() <= ScreenBreakpoints.MOBILE}
					onSetIsClean={handleSetIsClean}
					options={moderationsReviewSortOptionsByPeriod}
					searchParam="ordering"
					title="Період"
				/>

				<Button
					className={clsx(
						styles["sort-group_cleaner-btn"],
						(filterByStatus || sortByPeriod) &&
							styles["sort-group_cleaner-btn__active"],
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
