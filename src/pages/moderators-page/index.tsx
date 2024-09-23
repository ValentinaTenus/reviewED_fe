import React from "react";

import { BreadCrumb, Footer, Header } from "~/common/components/index";
import { AppRoute } from "~/common/enums";

import { MainModeratorsContent } from "./components/index";
import styles from "./styles.module.scss";

const ModeratorsPage: React.FC = () => {
	return (
		<div className={styles["moderators_page"]}>
			<Header />
			<BreadCrumb
				className="bread_crumb__container"
				items={[
					{ label: "Головна сторінка", path: AppRoute.ROOT },
					{ label: "Модерація відгуків", path: AppRoute.MODERATORS_PAGE },
				]}
			/>
			<MainModeratorsContent />
			<Footer />
		</div>
	);
};

export { ModeratorsPage };
