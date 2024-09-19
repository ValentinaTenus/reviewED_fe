import React from "react";

import styles from "./styles.module.scss";
import { Header } from "./components/header";
import { PricingBar } from "./components/pricing-bar";

const MainContent: React.FC = () => {
	return (
		<div className={styles["main_content_wrapper"]}>
			<div className={styles["main_content"]}>
				<Header />
                <PricingBar />
			</div>
		</div>
	);
};

export { MainContent };
