import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { AppRoute } from "~/common/enums/index";
import { Company } from "~/common/types/index";

import {
	ItemsContainer,
	ItemsContentWrapperSection,
	ItemsHeader,
} from "../index";
import { CompanyCard } from "./components/index";
import styles from "./styles.module.scss";

type CompaniesSectionProperties = {
	companies: Company[];
	screenWidth: number;
};

const CompaniesSection: React.FC<CompaniesSectionProperties> = ({
	companies,
	screenWidth,
}) => {
	const navigate = useNavigate();

	const handleSeeAllClick = useCallback(() => {
		navigate(AppRoute.ALL_COMPANIES);
	}, [navigate]);

	return (
		<ItemsContainer>
			<ItemsHeader
				header="TOП Компанії"
				onClick={handleSeeAllClick}
				screenWidth={screenWidth}
			/>
			<ItemsContentWrapperSection className={styles["items_section"]}>
				{companies.map((company) => (
					<CompanyCard company={company} key={company.id} />
				))}
			</ItemsContentWrapperSection>
		</ItemsContainer>
	);
};

export { CompaniesSection };
