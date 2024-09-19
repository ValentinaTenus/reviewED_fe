import clsx from "clsx";
import React from "react";
import { NavLink } from "react-router-dom";

import { Icon } from "~/common/components/index";
import { AppRoute, IconName } from "~/common/enums/index";
import { type ValueOf } from "~/common/types/index";

import styles from "./styles.module.scss";

type Properties = {
	href: ValueOf<typeof AppRoute>;
	iconName?: IconName;
	isActive?: boolean;
	isDisabled: boolean;
	label: string;
};

const PaginationItem: React.FC<Properties> = ({
	href,
	iconName,
	isActive,
	isDisabled,
	label,
}: Properties) => {
	const linkClasses = clsx(styles["item"], {
		[styles["active"] as string]: isActive,
		[styles["disabled"] as string]: isDisabled,
	});

	return (
		<li className={styles["item-container"]}>
			<NavLink className={linkClasses} to={href}>
				{iconName && (
					<Icon className={styles["pagination_arrow"]} name={iconName} />
				)}
				{label}
			</NavLink>
		</li>
	);
};

export { PaginationItem };
