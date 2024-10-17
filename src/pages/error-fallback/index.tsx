import React from "react";

import { BreadCrumb, Footer, Header } from "~/common/components";

import styles from "./styles.module.scss";

const BreadCrumbs = [
	{ label: "Головна сторінка", path: "/" },
	{ label: "Помилка" },
];

const ErrorFallback: React.FC = () => {
	return (
		<div className={styles["error_fallback__page"]}>
			<Header />
			<div className={styles["error_fallback__page-content"]}>
				<BreadCrumb items={BreadCrumbs} />
				<div className={styles["error_fallback__page-content-text"]}>
					Щось пішло не так :(
				</div>
			</div>
			<Footer />
		</div>
	);
};

export { ErrorFallback };
