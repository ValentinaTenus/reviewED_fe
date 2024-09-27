import React from "react";

import { Footer, Header } from "~/common/components/index";

import { CompanyDetails } from "./components/index";
import styles from "./styles.module.scss";

const CompanyDetailsPage: React.FC = () => {
	return (
		<div className={styles["company-details_page"]}>
			<Header />
			<CompanyDetails companyId="1" />
			<Footer />
		</div>
	);
};

export { CompanyDetailsPage };
