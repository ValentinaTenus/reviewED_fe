import clsx from "clsx";
import React, { ReactNode } from "react";

import styles from "./styles.module.scss";

type ItemsContainerProperties = {
	children?: ReactNode;
	className?: string;
};

const ItemsContainer: React.FC<ItemsContainerProperties> = ({
	children,
	className,
}) => {
	return (
		<div className={clsx(styles["items_container"], className)}>{children}</div>
	);
};

export { ItemsContainer };
