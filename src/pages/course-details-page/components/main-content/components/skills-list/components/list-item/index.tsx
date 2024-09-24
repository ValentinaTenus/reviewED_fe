import React from "react";

import styles from "./styles.module.scss";

type ListItemProperties = {
	title: string;
};

const ListItem: React.FC<ListItemProperties> = ({ title }) => {
	return <li className={styles["list_item"]}>{title}</li>;
};

export { ListItem };
