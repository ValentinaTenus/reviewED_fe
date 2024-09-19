import React from "react";

import { BreadCrumb, Footer, Header } from "~/common/components/index";

import { MainContent } from "./components/index";
import styles from "./styles.module.scss";

const FaqPage: React.FC = () => {
	return (
		<div className={styles["faq_page"]}>
			<Header />
			<BreadCrumb
				className="bread_crumb__container"
				items={[
					{ label: "Головна сторінка", path: "/" },
					{ label: "FAQ", path: "/faq-page" },
				]}
			/>
			<MainContent />
			<Footer />
		</div>
	);
};

export { FaqPage };
