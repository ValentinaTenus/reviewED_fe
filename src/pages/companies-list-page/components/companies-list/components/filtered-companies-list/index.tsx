import React from "react";

import { SortDropdown, ViewTabs } from "~/common/components/index";
import { CompaniesSortOptions } from "~/common/constants/index";
import { ViewStyle } from "~/common/enums/index";
import { type Company } from "~/common/types/index";
import { NotFound } from "~/pages/home-page/components/main-content/components/search-block/components";

import { CompaniesList, CompaniesTable } from "./components/index";
import styles from "./styles.module.scss";

const LENGTH_ZERO = 0;

type FilteredCompaniesListProperties = {
	companies: Company[];
	onChangeSortBy: (newSortBy: number | string) => void;
	onChangeViewStyle: (newViewStyle: ViewStyle) => void;
	viewStyle: ViewStyle;
};

const FilteredCompaniesList: React.FC<FilteredCompaniesListProperties> = ({
	companies,
	onChangeSortBy,
	onChangeViewStyle,
	viewStyle,
}) => {
	return (
		<div className={styles["filtered_companies__container"]}>
			<div className={styles["filtered_companies__sort_and_view"]}>
				<div className={styles["filtered_companies__view_by"]}>
					<p className={styles["filtered_companies__view_text"]}>
						Переглянути як
					</p>
					<ViewTabs defaultViewStyle={viewStyle} onChange={onChangeViewStyle} />
				</div>
				<div className={styles["filtered_companies__sort_button"]}>
					<SortDropdown
						className={styles["filtered_companies__sort_dropdown"]}
						isIconButton
						onChange={onChangeSortBy}
						options={CompaniesSortOptions}
					/>
				</div>
			</div>

			<div className={styles["filtered_companies__search_result_wrapper"]}>
				{viewStyle === ViewStyle.TABLE && companies.length > LENGTH_ZERO && (
					<CompaniesTable companies={companies} />
				)}

				{viewStyle === ViewStyle.LIST && companies.length > LENGTH_ZERO && (
					<CompaniesList companies={companies} />
				)}

				{!companies && <NotFound />}
			</div>
		</div>
	);
};

export { FilteredCompaniesList };
