import clsx from "clsx";
import React from "react";

import { Company } from "~/common/types/index";

import { CompanyListCardDesktop } from "./components";
import styles from "./styles.module.scss";

const TableHeaders = ["Company", "Total courses", "Reviews", "Rating"];

type CompaniesListProperties = {
	companies: Company[];
};

const CompaniesList: React.FC<CompaniesListProperties> = ({ companies }) => {
	return (
		<div className={styles["filtered_companies__search_result"]}>
			<div
				className={clsx(
					styles["companies_list__item"],
					styles["companies_list__header"],
				)}
			>
				{TableHeaders.map((header, index) => (
					<div className={styles["companies_list__header_item"]} key={index}>
						{header}
					</div>
				))}
			</div>
			{companies.map((company) => (
				<CompanyListCardDesktop company={company} key={company.id} />
			))}
		</div>
	);
};

export { CompaniesList };
