import styles from "./styles.module.scss";
import { Category } from "~/common/types/index";
import { AppRoute } from "~/common/enums/index";
import {
	BreadCrumb,
	IconButton,
	SearchBar,
	SortDropdown,
} from "~/common/components";
import { ScreenBreakpoints, CompaniesSortOptions } from "~/common/constants";
import { useState } from "react";
import Filter from "~/assets/images/filter.svg?react";
import Close from "~/assets/images/close.svg?react";

const BreadCrumbPaths = [
	{ label: "Головна сторінка", path: AppRoute.ROOT },
	{ label: "Courses", path: AppRoute.ALL_COURSES },
];

type FilterSectionProperties = {
	categories: Category[];
	onChangeSearchTerm: (searchTerm: string) => void;
	onChangeSortBy: (sortBy: number | string) => void;
	onChooseCategory: (categoryId: number) => void;
	screenWidth: number;
	searchTerm: string;
	selectedCategoryId: number;
};

const FilterSection: React.FC<FilterSectionProperties> = ({
	categories,
	onChangeSearchTerm,
	onChangeSortBy,
	onChooseCategory,
	screenWidth,
	searchTerm,
	selectedCategoryId,
}) => {
	const [filters, setFilter] = useState([]);
	const [isOpen, setIsOpen] = useState(false);

	const handlerOpen = () => {
		setIsOpen(true);
		console.log(isOpen);
	};

	const handlerClose = () => {
		setIsOpen(false);
		console.log(isOpen);
	};

	return (
		<div className={styles["course_filter__container"]}>
			<BreadCrumb items={BreadCrumbPaths} />
			<SearchBar
				onSubmit={onChangeSearchTerm}
				placeholder="Find your perfect course"
				value={searchTerm}
			/>
			<div className={styles["filter-button"]}>
				Filters ({filters.length})
				<IconButton onClick={handlerOpen}>
					<Filter className={styles["filter-button__icon"]} />
				</IconButton>
			</div>
			{isOpen && (
				<div className={styles["modal"]} onClick={handlerClose}>
					<div
						className={styles["modal__container"]}
						onClick={(e) => e.stopPropagation()}
					>
						<div className={styles["modal__header"]}>
							<h2>Filter by</h2>
							<IconButton onClick={handlerClose}>
								<Close className={styles["modal__icon-close"]} />
							</IconButton>
						</div>
					</div>
				</div>
			)}
			<SortDropdown
				name="sort"
				onChange={onChangeSortBy}
				options={CompaniesSortOptions} // CoursesSortOptios?
			/>
		</div>
	);
};

export { FilterSection };
