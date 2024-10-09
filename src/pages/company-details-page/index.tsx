import React from "react";
import { useParams } from "react-router-dom";

import { Footer, Header } from "~/common/components/index";

import { CompanyDetails } from "./components/index";
import styles from "./styles.module.scss";

const CompanyDetailsPage: React.FC = () => {
	const { companyId } = useParams();

	if (companyId) {
		return (
			<div className={styles["company-details_page"]}>
				<Header />
				<div className={styles["company-details_page-main"]}>
					<CompanyDetails companyId={companyId} />
				</div>
				<Footer />
			</div>
		);
	}
};

export { CompanyDetailsPage };
