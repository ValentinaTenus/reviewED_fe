import React from "react";

import { BreadCrumb, Footer, Header } from "~/common/components/index";

import { MainModeratorsContent } from "./components/index";
import styles from "./styles.module.scss";

const ModeratorsPage: React.FC = () => {
	return (
		<div className={styles["moderators_page"]}>
			<Header />
			<BreadCrumb
				className="bread_crumb__container"
				items={[
					{ label: "Головна сторінка", path: "/" },
					{ label: "Модерація відгуків", path: "/moderators-page" },
				]}
			/>
			<MainModeratorsContent />
			<Footer />
		</div>
	);
};

export { ModeratorsPage };
