import React, { useCallback, useState } from "react";

import { ViewTabs } from "~/common/components/index";
import { ViewStyle } from "~/common/enums/index";
import { type Company } from "~/common/types/index";
import { NotFound } from "~/pages/home-page/components/main-content/components/search-block/components";

import { CompaniesList, CompaniesTable } from "./components/index";
import styles from "./styles.module.scss";

const LENGTH_ZERO = 0;

type FilteredCompaniesListProperties = {
	companies: Company[];
};

const FilteredCompaniesList: React.FC<FilteredCompaniesListProperties> = ({
	companies,
}) => {
	const [viewStyle, setViewStyle] = useState(ViewStyle.TABLE);

	const handleViewChange = useCallback((newViewStyle: ViewStyle) => {
		setViewStyle(newViewStyle);
	}, []);

	return (
		<div className={styles["filtered_companies__container"]}>
			<div className={styles["filtered_companies__view_by"]}>
				<p className={styles["filtered_companies__view_text"]}>View by</p>
				<ViewTabs defaultViewStyle={viewStyle} onChange={handleViewChange} />
			</div>
			<div className={styles["filtered_companies__search_result_wrapper"]}>
				{viewStyle === ViewStyle.TABLE && (
					<CompaniesTable companies={companies} />
				)}
				{viewStyle === ViewStyle.LIST && (
					<CompaniesList companies={companies} />
				)}
				{companies.length === LENGTH_ZERO && <NotFound />}
			</div>
		</div>
	);
};

export { FilteredCompaniesList };
