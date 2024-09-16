import React from "react";
import { Link } from "react-router-dom";

import RightArrow from "~/assets/images/expant-right-light.svg?react";

import styles from "./styles.module.scss";

const INDEX_ONE = 1;

type BreadcrumbItem = {
	label: string;
	path?: string;
};

type BreadCrumbProps = {
	items: BreadcrumbItem[];
};

const BreadCrumb: React.FC<BreadCrumbProps> = ({ items }) => {
	return (
		<div className={styles["bread_crumb"]}>
			{items.map((item, index) => (
				<span className={styles["bread_crumb_item"]} key={index}>
					{item.path ? (
						<Link className={styles["bread_crumb_link"]} to={item.path}>
							{item.label}
						</Link>
					) : (
						<span className={styles["bread_crumb_active"]}>{item.label}</span>
					)}

					{index < items.length - INDEX_ONE && (
						<RightArrow className={styles["bread_crumb__arrow"]} />
					)}
				</span>
			))}
		</div>
	);
};

export { BreadCrumb };
