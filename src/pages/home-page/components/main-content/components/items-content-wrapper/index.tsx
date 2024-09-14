import clsx from "clsx";
import React, { ReactNode } from "react";

import styles from "./styles.module.scss";

type ItemsContentWrapperProperties = {
	children: ReactNode;
	className?: string;
};

const ItemsContentWrapperSection: React.FC<ItemsContentWrapperProperties> = ({
	children,
	className,
}) => {
	return (
		<div className={clsx(styles["items_wrapper"], className)}>{children}</div>
	);
};

export { ItemsContentWrapperSection };
