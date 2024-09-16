import React from "react";

import { Footer } from "~/common/components/index";

import { Header } from "../home-page/components";
import { CompaniesContent } from "./components/index";
import styles from "./styles.module.scss";

const CompaniesListPage: React.FC = () => {
	return (
		<div className={styles["companies_list_page"]}>
			<Header />
			<div className={styles["companies_list_main_content"]}>
				<CompaniesContent />
			</div>
			<Footer />
		</div>
	);
};

export { CompaniesListPage };
