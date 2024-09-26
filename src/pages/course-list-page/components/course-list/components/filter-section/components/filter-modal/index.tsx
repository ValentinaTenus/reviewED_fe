import React, { useCallback } from "react";

import { CheckDropdown, Icon, IconButton } from "~/common/components/index";
import { IconName } from "~/common/enums/index";
import { mapCoursesCategories } from "~/pages/home-page/components/main-content/components/search-block/helpers";
import { useGetCategoriesQuery } from "~/redux/categories/categories-api";

import styles from "./styles.module.scss";

type FilterModalProperties = {
	onClose: () => void;
};

const FilterModal: React.FC<FilterModalProperties> = ({ onClose }) => {
	const { data: fetchedCategories } = useGetCategoriesQuery(undefined);

	const coursesCategoriesOptions = mapCoursesCategories(
		fetchedCategories || [],
	);

	const handleClickOutside = useCallback(
		(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			if (e.target === e.currentTarget) {
				onClose();
			}
		},
		[onClose],
	);

	const handleSelectOption = useCallback(
		(value: { isTitle: boolean; value: number | string }) => {
			return value;
		},
		[],
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
				<div className={styles["modal__filters_content"]}>
					{/* <div className={styles['search_dropdown_wrapper']}> */}
					<CheckDropdown
						className={styles["search_dropdown"]}
						name="Види курсів"
						onChange={handleSelectOption}
						options={coursesCategoriesOptions}
						placeholder="Види курсів"
					/>
					{/* </div> */}
				</div>
			</div>
		</div>
	);
};

export { FilterModal };
