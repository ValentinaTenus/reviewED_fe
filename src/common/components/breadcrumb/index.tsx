import clsx from "clsx";
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
	className?: string;
	items: BreadcrumbItem[];
	style?: React.CSSProperties;
};

const BreadCrumb: React.FC<BreadCrumbProps> = ({
	className,
	items,
	style = {},
}) => {
	return (
		<div
			className={clsx(styles["bread_crumb"], className && styles[className])}
			style={style}
		>
			{items.map((item, index) => (
				<span
					className={`${styles["bread_crumb_item"]} ${
						index === items.length - INDEX_ONE ? styles["bread_crumb_last"] : ""
					}`}
					key={index}
				>
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
