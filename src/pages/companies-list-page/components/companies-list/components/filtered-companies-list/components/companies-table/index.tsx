import React from "react";

import { Company } from "~/common/types/index";

import { CompanyCard } from "../company-card/index";
import styles from "./styles.module.scss";

type CompaniesTableProperties = {
	companies: Company[];
};

const CompaniesTable: React.FC<CompaniesTableProperties> = ({ companies }) => {
	return (
		<div className={styles["filtered_companies__search_result"]}>
			{companies.map((company) => (
				<CompanyCard company={company} key={company.id} />
			))}
		</div>
	);
};

export { CompaniesTable };
