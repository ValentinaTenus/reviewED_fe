import React from "react";
import { useParams } from "react-router-dom";

import { Footer, Header } from "~/common/components/index";

import { CompanyDetails } from "./components/index";
import styles from "./styles.module.scss";

const CompanyDetailsPage: React.FC = () => {
	const { companyId } = useParams();

	const ONE = 1;

	if (companyId) {
		const ID = companyId.slice(-ONE);

		return (
			<div className={styles["company-details_page"]}>
				<Header />
				<CompanyDetails companyId={ID} />
				<Footer />
			</div>
		);
	}
};

export { CompanyDetailsPage };
