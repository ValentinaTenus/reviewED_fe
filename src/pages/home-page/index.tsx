import React from "react";

import { Footer, Header } from "~/common/components/index";

import { MainContent } from "./components/index";
import styles from "./styles.module.scss";

const HomePage: React.FC = () => {
	return (
		<div className={styles["home_page"]}>
			<Header />
			<MainContent />
			<Footer />
		</div>
	);
};

export { HomePage };
