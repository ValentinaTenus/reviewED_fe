import clsx from "clsx";
import React, { useCallback, useEffect, useState } from "react";

import {
	Button,
	CheckDropdown,
	Icon,
	IconButton,
} from "~/common/components/index";
import { ScreenBreakpoints } from "~/common/constants";
import { ButtonVariant, IconName } from "~/common/enums/index";
import { useGetScreenWidth, useModal } from "~/common/hooks/index";
import { DropdownOption, FilterType } from "~/common/types/index";
import { mapCoursesCategories } from "~/pages/home-page/components/main-content/components/search-block/helpers";
import { useGetCategoriesQuery } from "~/redux/categories/categories-api";
import { useGetCoursesLocationsQuery } from "~/redux/locations/locations-api";

import styles from "./styles.module.scss";

const OPTIONS_FIRST_ITEM_INDEX = 1;

type FilterModalProperties = {
	isOpen: boolean;
	onApplyFiltersAndSearch: () => void;
	onChooseLocation: (locations: FilterType[]) => void;
	onChooseSubCategory: (categoryIds: FilterType[]) => void;
	onClearFilters: () => void;
	onClose: () => void;
	selectedLocations: FilterType[];
	selectedSubCategories: FilterType[];
};

const FilterModal: React.FC<FilterModalProperties> = ({
	isOpen,
	onApplyFiltersAndSearch,
	onChooseLocation,
	onChooseSubCategory,
	onClearFilters,
	onClose,
	selectedLocations,
	selectedSubCategories,
}) => {
	const [locationOptions, setLocation] = useState<DropdownOption[]>([]);
	const screenWidth = useGetScreenWidth();

	const { data: fetchedCategories } = useGetCategoriesQuery(undefined);
	const { data: locations } = useGetCoursesLocationsQuery(undefined);

	const coursesCategoriesOptions = mapCoursesCategories(
		fetchedCategories || [],
	);

	const { handleOutsideClick, preventModalCloseOnClick } = useModal({
		isOpen,
		onClose,
	});

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

	const handleSelectSubCategory = useCallback(
		(value: { isTitle: boolean; values: FilterType[] }) => {
			onChooseSubCategory(value.values);
		},
		[onChooseSubCategory],
	);

	const handleSelectLocation = useCallback(
		(value: { isTitle: boolean; values: FilterType[] }) => {
			onChooseLocation(value.values);
		},
		[onChooseLocation],
	);

	const handleApplyFilters = useCallback(() => {
		onApplyFiltersAndSearch();
		onClose();
	}, [onApplyFiltersAndSearch, onClose]);

	if (!isOpen) {
		return null;
	}

	return (
		<div
			className={clsx(
				screenWidth > ScreenBreakpoints.MOBILE ? styles["modal"] : "",
				screenWidth <= ScreenBreakpoints.MOBILE ? styles["modal_mobile"] : "",
			)}
			onClick={handleOutsideClick}
		>
			<div
				className={clsx(
					screenWidth > ScreenBreakpoints.MOBILE
						? styles["modal__container"]
						: "",
					screenWidth <= ScreenBreakpoints.MOBILE
						? styles["modal__container_mobile"]
						: "",
				)}
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
						onChange={handleSelectSubCategory}
						options={coursesCategoriesOptions.slice(OPTIONS_FIRST_ITEM_INDEX)}
						placeholder="Види курсів"
						selectedItems={selectedSubCategories}
					/>
					<CheckDropdown
						className={styles["search_dropdown"]}
						name="Локації"
						onChange={handleSelectLocation}
						options={locationOptions}
						placeholder="Локації"
						selectedItems={selectedLocations}
					/>
				</div>
				<div className={styles["modal__buttons_container"]}>
					<Button
						className={styles["modal__clear_button"]}
						onClick={onClearFilters}
						variant={ButtonVariant.DEFAULT}
					>
						Очистити все
					</Button>
					<Button
						className={styles["modal__clear_button"]}
						onClick={handleApplyFilters}
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
