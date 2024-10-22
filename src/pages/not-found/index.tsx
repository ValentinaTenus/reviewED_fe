import React from "react";
import { Link } from "react-router-dom";

import NotFoundImage from "~/assets/images/404.png";
import { BreadCrumb, Footer, Header } from "~/common/components";
import { AppRoute } from "~/common/enums/index";

import styles from "./styles.module.scss";

const BreadCrumbs = [
	{ label: "Головна сторінка", path: "/" },
	{ label: "404" },
];

const NotFound: React.FC = () => {
	return (
		<>
			<Header />
			<div className={styles["not-found__page"]}>
				<BreadCrumb items={BreadCrumbs} />
				<div className={styles["not-found__page-main"]}>
					<img
						alt="Not found"
						className={styles["not-found__page-main-image"]}
						src={NotFoundImage}
					/>
					<div className={styles["not-found__page-main-content"]}>
						<h1 className={styles["not-found__page-main-content-title"]}>
							<span
								className={styles["not-found__page-main-content-title-span"]}
							>
								Упссссс......
							</span>
							Сторінку не знайдено!
						</h1>
						<p className={styles["not-found__page-main-content-text"]}>
							Перейти на{" "}
							<Link
								className={styles["not-found__page-main-content-text-link"]}
								to={AppRoute.ROOT}
							>
								головну сторінку
							</Link>
						</p>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export { NotFound };
