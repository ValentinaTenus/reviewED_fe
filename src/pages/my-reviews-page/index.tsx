import React from "react";

import { BreadCrumb, Footer, Header } from "~/common/components/index";

import { MainContent } from "./components/index";
import styles from "./styles.module.scss";

const MyReviewsPage: React.FC = () => {
	return (
		<div className={styles["my-reviews_page"]}>
			<Header />
			<BreadCrumb
				className="bread_crumb__container"
				items={[
					{ label: "Main page", path: "/" },
					{ label: "My reviews", path: "/my-reviews-page" },
				]}
			/>
			<MainContent />
			<Footer />
		</div>
	);
};

export { MyReviewsPage };
