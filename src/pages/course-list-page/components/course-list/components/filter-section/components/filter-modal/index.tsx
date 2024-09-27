import React, { useCallback, useEffect, useState } from "react";

import {
	Button,
	CheckDropdown,
	Icon,
	IconButton,
} from "~/common/components/index";
import { ButtonVariant, IconName } from "~/common/enums/index";
import { useModal } from "~/common/hooks/index";
import { DropdownOption } from "~/common/types/index";
import { mapCoursesCategories } from "~/pages/home-page/components/main-content/components/search-block/helpers";
import { useGetCategoriesQuery } from "~/redux/categories/categories-api";
import { useGetCoursesLocationsQuery } from "~/redux/locations/locations-api";

import styles from "./styles.module.scss";

const OPTIONS_FIRST_ITEM_INDEX = 1;

type FilterModalProperties = {
	isOpen: boolean;
	onChooseLocation: (locations: string[]) => void;
	onChooseSubCategory: (categoryIds: string[]) => void;
	onClose: () => void;
};

const FilterModal: React.FC<FilterModalProperties> = ({
	isOpen,
	onChooseLocation,
	onChooseSubCategory,
	onClose,
}) => {
	const [locationOptions, setLocation] = useState<DropdownOption[]>([]);

	const { data: fetchedCategories } = useGetCategoriesQuery(undefined);
	const { data: locations } = useGetCoursesLocationsQuery(undefined);

	const coursesCategoriesOptions = mapCoursesCategories(
		fetchedCategories || [],
	);

	useEffect(() => {
		if (locations) {
			const coursesLocationOptions: DropdownOption[] = locations.map(
				(location) => ({
					label: location,
					value: location,
				}),
			);
			const options = [
				{
					label: "",
					options: [
						{
							label: "Всі міста",
							value: "0",
						},
						...coursesLocationOptions,
					],
					value: "",
				},
			];
			setLocation(options);
		}
	}, [locations]);

	const handleSelectCategory = useCallback(
		(value: { isTitle: boolean; values: string[] }) => {
			onChooseSubCategory(value.values);
		},
		[onChooseSubCategory],
	);

	const handleSelectLocation = useCallback(
		(value: { isTitle: boolean; values: string[] }) => {
			onChooseLocation(value.values);
		},
		[onChooseLocation],
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
						onChange={handleSelectCategory}
						options={coursesCategoriesOptions.slice(OPTIONS_FIRST_ITEM_INDEX)}
						placeholder="Види курсів"
					/>
					<CheckDropdown
						className={styles["search_dropdown"]}
						name="Локації"
						onChange={handleSelectLocation}
						options={locationOptions}
						placeholder="Локації"
					/>
				</div>
				<div className={styles["modal__buttons_container"]}>
					<Button
						className={styles["modal__clear_button"]}
						variant={ButtonVariant.DEFAULT}
					>
						Очистити все
					</Button>
					<Button
						className={styles["modal__clear_button"]}
						variant={ButtonVariant.PRIMARY}
					>
						Застосувати
					</Button>
				</div>
			</div>
		</div>
	);
};

export { FilterModal };
