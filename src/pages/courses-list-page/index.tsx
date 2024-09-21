import React, { useEffect, useState } from "react";

import { Button } from "~/common/components/index";
import { ButtonSize, ButtonType, ButtonVariant } from "~/common/enums/index";
import { Course } from "~/common/types/index";
import { useGetCoursesQuery } from "~/redux/courses/courses-api-temp";
import { clearFilter, setFilter } from "~/redux/courses/courses-filter-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks.type";

import CoursesList from "./components/courses-list/CoursesList";
import SearchField from "./components/search-field/SearchField";
import filters from "./configFilters";
import styles from "./styles.module.scss";

interface IFilterState {
	[key: string]: string;
}

function CoursesListPage() {
	const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

	const dispatch = useAppDispatch();
	const filterCourse = useAppSelector((state) => state.filter as IFilterState);
	const { data, error, isLoading } = useGetCoursesQuery();

	const updateFilterCourse = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (!value.trim()) {
			handleClearText();
		} else {
			dispatch(setFilter({ name, value }));
		}
	};

	const handleFilterCourse = () => {
		if (data) {
			const isFilterEmpty = Object.values(filterCourse).every(
				(filter) => !filter.trim(),
			);

			if (isFilterEmpty) {
				setFilteredCourses(data.results);
			} else {
				const filteredCourses = data.results.filter((course: Course) =>
					Object.keys(filterCourse).every((key) => {
						const courseValue = course[key]?.toString().toLowerCase() || "";
						const filterValue =
							filterCourse[key]?.toString().toLowerCase() || "";
						return !filterValue || courseValue.includes(filterValue);
					}),
				);
				setFilteredCourses(filteredCourses);
			}
		}
	};

	const handleClearText = () => {
		dispatch(clearFilter(filters[0].filterName));
		setFilteredCourses(data?.results || []);
	};

	useEffect(() => {
		if (data) {
			handleFilterCourse();
		}
	}, [data]);

	return (
		<div>
			{error ? (
				<div>
					<p>There is an error</p>
					<p>{error?.status}</p>
					<p>{error?.error || error?.data?.message}</p>
				</div>
			) : isLoading ? (
				<>Loading...</>
			) : filteredCourses?.length ? (
				<div>
					<div className={styles["container"]}>
						<div className={styles["search_wrapper"]}>
							<SearchField
								className={styles["search__input"]}
								filter={filters[0]}
								updateFilterCourse={updateFilterCourse}
								value={filterCourse[filters[0].filterName] || ""}
							/>
						</div>

						<div className={styles["search_button_wrapper"]}>
							<Button
								className={styles["search__button"]}
								onClick={handleFilterCourse}
								size={ButtonSize.LARGE}
								type={ButtonType.SUBMIT}
								variant={ButtonVariant.PRIMARY}
							>
								Знайти
							</Button>
						</div>
					</div>
					<CoursesList courses={filteredCourses} />
				</div>
			) : (
				<p>There are no courses that match the filters</p>
			)}
		</div>
	);
}

export { CoursesListPage };
