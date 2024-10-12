import React from "react";

import { BreadCrumb, Footer, Header } from "~/common/components/index";
import { AppRoute } from "~/common/enums/index";

import { MainContent } from "./components/index";
import styles from "./styles.module.scss";

const MyReviewsPage: React.FC = () => {
	return (
		<div className={styles["my-reviews_page"]}>
			<Header />
			<BreadCrumb
				className="bread_crumb__container"
				items={[
					{ label: "Головна сторінка", path: AppRoute.ROOT },
					{ label: "Мої відгуки" },
				]}
			/>
			<MainContent />
			<Footer />
		</div>
	);
};

export { MyReviewsPage };
