import React from "react";

import { Company } from "~/common/types/index";

import { CompanyListCard, CompanyListCardDesktop } from "./components";
import styles from "./styles.module.scss";

const TableHeaders = ["Компанії", "Кількість курсів", "Відгуки", "Рейтинг"];

type CompaniesListProperties = {
	companies: Company[];
};

const CompaniesList: React.FC<CompaniesListProperties> = ({ companies }) => {
	return (
		<div className={styles["filtered_companies__search_result"]}>
			<div className={styles["companies_list__header"]}>
				{TableHeaders.map((header, index) => (
					<div className={styles["companies_list__header_item"]} key={index}>
						{header}
					</div>
				))}
			</div>
			<div className={styles["filtered_companies__desktop_content"]}>
				{companies.map((company, index) => (
					<CompanyListCardDesktop company={company} key={index} />
				))}
			</div>
			<div className={styles["filtered_companies__tablet_content"]}>
				{companies.map((company, index) => (
					<CompanyListCard company={company} key={index} />
				))}
			</div>
		</div>
	);
};

export { CompaniesList };
