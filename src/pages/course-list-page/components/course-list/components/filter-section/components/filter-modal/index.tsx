import React, { useCallback, useEffect, useState } from "react";

import { CheckDropdown, Icon, IconButton } from "~/common/components/index";
import { IconName } from "~/common/enums/index";
import { useModal } from "~/common/hooks/use-modal.hook";
import { DropdownOption } from "~/common/types";
import {
	mapCoursesCategories,
	mapLocations,
} from "~/pages/home-page/components/main-content/components/search-block/helpers";
import { useGetCategoriesQuery } from "~/redux/categories/categories-api";
import { useGetCoursesLocationsQuery } from "~/redux/locations/locations-api";

import styles from "./styles.module.scss";

const OPTIONS_FIRST_ITEM_INDEX = 1;

type FilterModalProperties = {
	isOpen: boolean;
	onClose: () => void;
};

const FilterModal: React.FC<FilterModalProperties> = ({ isOpen, onClose }) => {
	const [locationOptions, setLocation] = useState<DropdownOption[]>([]);

	const { data: fetchedCategories } = useGetCategoriesQuery(undefined);
	const { data: locations } = useGetCoursesLocationsQuery(undefined);

	const coursesCategoriesOptions = mapCoursesCategories(
		fetchedCategories || [],
	);

	useEffect(() => {
		if (locations) {
			const coursesLocationOptions = mapLocations(locations);
			setLocation(coursesLocationOptions);
		}
	}, [locations]);

	const handleSelectСategory = useCallback(
		(value: { isTitle: boolean; values: (number | string)[] }) => {
			return value;
		},
		[],
	);

	const handleSelectLocation = useCallback(
		(value: { isTitle: boolean; values: (number | string)[] }) => {
			return value;
		},
		[],
	);

	const { handleOutsideClick, preventModalCloseOnClick } = useModal({
		isOpen,
		onClose,
	});

	if (!isOpen) {
		return null;
	}

	return (
		<div className={styles["modal"]} onClick={handleOutsideClick}>
			<div
				className={styles["modal__container"]}
				onClick={preventModalCloseOnClick}
				tabIndex={-1}
			>
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
					<CheckDropdown
						className={styles["search_dropdown"]}
						name="Види курсів"
						onChange={handleSelectСategory}
						options={coursesCategoriesOptions.slice(OPTIONS_FIRST_ITEM_INDEX)}
						placeholder="Види курсів"
					/>
					<CheckDropdown
						className={styles["search_dropdown"]}
						name="Локації"
						onChange={handleSelectLocation}
						options={locationOptions.slice(OPTIONS_FIRST_ITEM_INDEX)}
						placeholder="Локації"
					/>
				</div>
			</div>
		</div>
	);
};

export { FilterModal };
